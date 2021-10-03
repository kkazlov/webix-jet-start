import { JetView } from "webix-jet";
import ContactsForm from "./contacts-form";
import ContactsList from "./contacts-list";


export default class Contacts extends JetView {
	config() {
		return { cols: [ ContactsList, ContactsForm ] };
	}
}

