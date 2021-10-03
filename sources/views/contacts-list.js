import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class ContactsList extends JetView {
	config() {
		return {
			view: "list",
			template: "#id#. #Name#, email: #Email#",
			select: true,
			data: contacts,
		};
	}
}
