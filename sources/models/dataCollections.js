import { contacts } from "./contacts";
import { countries } from "./countries";
import { statuses } from "./statuses";



const countriesCollection = new webix.DataCollection({
	id: "countriesCollection",
	data: countries
});

const statusesCollection = new webix.DataCollection({
	id: "statusesCollection",
	data: statuses
});



const contactsCollection = new webix.DataCollection({
	id: "contactsCollection",
	data: contacts,
	scheme: {
		$change: function (obj) {
			if (obj.Country === "empty"){
				obj.countryName = "no country";
			} else {
				obj.countryName = countriesCollection.getItem(obj.Country).Name;
			} 

			if (obj.Status === "empty") {
				obj.statusName = "no status";
			} else {
				obj.statusName = statusesCollection.getItem(obj.Status).Name;
			}
			
		},
	},
});


export { contactsCollection, countriesCollection, statusesCollection };
