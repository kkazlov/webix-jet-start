import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";
import { statusesCollection } from "../models/dataCollections";
import { countriesCollection } from "../models/dataCollections";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const comboCountries = {
			view: "combo",
			label: "Countries",
			name: "Country",
			options: {
				filter: function (item, value) {
					return (
						item.Name
							.toString()
							.toLowerCase()
							.indexOf(value.toLowerCase()) !== -1
					);
				},
				body: {
					template: "#Name#",
					data: countriesCollection,
				},
			},
		};

		const comboStatuses = {
			view: "combo",
			name: "Status",
			label: "Statuses",
			options: {
				filter: function (item, value) {
					return (
						item.Name
							.toString()
							.toLowerCase()
							.indexOf(value.toLowerCase()) !== -1
					);
				},
				body: {
					template: "#Name#",
					data: statusesCollection,
				},
			},
		};

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
