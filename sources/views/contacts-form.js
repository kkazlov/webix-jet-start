import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

export default class ContactsForm extends JetView {
	config() {
		const comboCountries = {
			view: "combo",
			label: "Countries",
			options: {
				body: {
					template: "#Name#",
					data: countries,
				},
			},
		};

		const comboStatuses = {
			view: "combo",
			label: "Statuses",
			options: {
				body: {
					template: "#Name#",
					data: statuses,
				},
			},
		};

		return {
			view: "form",
			elements: [
				{ view: "text", label: "Name", name: "Name" },
				{ view: "text", label: "Email", name: "Email" },
				comboCountries,
				comboStatuses,
				{
					cols: [
						{ view: "button", value: "Save", css: "webix_primary" },
						{ view: "button", value: "Cancel" },
					],
				},
				{},
			],
		};
	}

	urlChange(view) {
		const contactsID = this.getParam("id");
		view.setValues(contactsCollection.getItem(contactsID));
	}
}
