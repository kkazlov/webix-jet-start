import { contacts } from "./contacts";
import { countries } from "./countries";
import { statuses } from "./statuses";

const contactsCollection = new webix.DataCollection({
	data: contacts,
	scheme: {
		$change: function (obj) {
			obj.countryName = countries.find(
				(item) => item.id === +obj.Country
			).Name;
			obj.statusName = statuses.find(
				(item) => item.id === +obj.Status
			).Name;
		},
	},
});

export { contactsCollection };
