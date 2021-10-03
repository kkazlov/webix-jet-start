import { contacts } from "./contacts";

const contactsCollection = new webix.DataCollection({
	data: contacts
});

export {contactsCollection};