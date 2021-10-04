import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";
import "../styles/contacts.css";

export default class ContactsList extends JetView {
	config() {
		const randomInteger = (max) => {
			let rand = Math.random() * max;
			return Math.floor(rand) + 1;
		};
		return {
			rows: [
				{
					view: "list",
					localId: "contactList",
					template: function ({
						Name,
						countryName,
						Email,
						statusName,
					}) {
						return `
							<div class='contacts-list__item'>
								${Name} from ${countryName} | Email: ${Email} | Status: ${statusName}
								<span class='webix_icon wxi-close removeBtn'></span>
							</div>
						`;
					},
					select: true,
					data: contactsCollection,
					onClick: {
						removeBtn: function (e, id) {
							contactsCollection.remove(id);
							this.$scope.refreshList();
						},
					},
				},
				{
					view: "button",
					value: "Add new",
					css: "webix_primary",
					click: () => {
						const rndStatus = randomInteger(statuses.length);
						const rndCountry = randomInteger(countries.length);
						contactsCollection.add({
							Name: "Ivan Petrov",
							Email: "Petrov@gmail.com",
							Country: rndCountry,
							Status: rndStatus,
						});
					},
				},
			],
		};
	}

	init() {
		const list = this.$$("contactList");
		let initSelect = this.getParam("id") || list.getFirstId();
		const checkID = +contactsCollection.data.getIndexById(initSelect);
		if (checkID === -1) {
			initSelect = list.getFirstId();
		}

		list.select(initSelect);
		this.setParam("id", initSelect, true);

		list.attachEvent("onAfterSelect", (id) => {
			this.show(`contacts?id=${id}`);
		});
	}

	refreshList() {
		const list = this.$$("contactList");
		const firstID = list.getFirstId();
		list.select(firstID);
	}
}
