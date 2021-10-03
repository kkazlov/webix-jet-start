import { JetView } from "webix-jet";

export default class ContactsForm extends JetView {
	config() {
		return {
			view: "form",
			elements: [
				{ view: "text", label: "Name", name: "Name" },
				{ view: "text", label: "Email", name: "Email" },
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
}
