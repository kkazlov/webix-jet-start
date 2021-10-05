import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";
import { statusesCollection } from "../models/dataCollections";
import { countriesCollection } from "../models/dataCollections";
import ComboConstr from "./comboConstr";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const comboCountries = new ComboConstr(this.app, {
			dataBase: countriesCollection,
			name: "Country",
			label: "Countries",
		});

		const comboStatuses = new ComboConstr(this.app, {
			dataBase: statusesCollection,
			name: "Status",
			label: "Statuses",
		});

		const saveBtn = {
			view: "button",
			value: _("Save"),
			css: "webix_primary",
			click: () => {
				const form = this.$$("contactsForm");
				const validation = form.validate();
				const contactsID = this.getParam("id");

				if (validation) {
					contactsCollection.updateItem(contactsID, form.getValues());

					webix.message("Record was updated");
				}
			},
		};

		return {
			view: "form",
			id: "mainForm",
			localId: "contactsForm",
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isNotEmpty,
				Status: webix.rules.isNotEmpty,
				Country: webix.rules.isNotEmpty,
			},
			elementsConfig: {
				invalidMessage: "Enter the correct value!",
				on: {
					onFocus: () => {
						this.$$("contactsForm").clearValidation();
					},
				},
			},
			elements: [
				{ view: "text", label: "Name", name: "Name" },
				{ view: "text", label: "Email", name: "Email" },
				comboCountries,
				comboStatuses,
				saveBtn,
				{},
			],
		};
	}

	urlChange(view) {
		const contactsID = this.getParam("id");
		if (contactsID) {
			view.setValues(contactsCollection.getItem(contactsID));
			view.enable();
		} else {
			view.clear();
			view.disable();
		}
	}
}
