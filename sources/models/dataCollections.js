import { contacts } from "./contacts";
import { countries } from "./countries";
import { statuses } from "./statuses";

const countriesCollection = new webix.DataCollection({
	data: countries
});

const statusesCollection = new webix.DataCollection({
	data: statuses
});


const contactsCollection = new webix.DataCollection({
	data: contacts,
});


export { contactsCollection, countriesCollection, statusesCollection };
