import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";

export default class ContactsList extends JetView {
	config() {
		return {
			view: "list",
			template: "#id#. #Name#, email: #Email#",
			select: true,
			data: contactsCollection,
		};
	}

	init(view) {
		let initSelect = this.getParam("id") || 1;

		view.select(initSelect);
		this.setParam("id", initSelect, true);

		view.attachEvent("onAfterSelect", (id) => {
			this.show(`contacts?id=${id}`);
		});
	}
	

}
