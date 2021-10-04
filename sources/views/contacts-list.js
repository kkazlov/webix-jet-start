import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";
import { countriesCollection } from "../models/dataCollections";
import { statusesCollection } from "../models/dataCollections";

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
						const list = this.$$("contactList");
						const rndStatus = randomInteger(statusesCollection.count());
						const rndCountry = randomInteger(countriesCollection.count());
						
						contactsCollection.add({
							Name: "Ivan Petrov",
							Email: "Petrov@gmail.com",
							Country: countriesCollection.data.order[rndCountry - 1] || "empty",
							Status: statusesCollection.data.order[rndStatus - 1] || "empty",
						});
						list.select(list.getLastId());

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
		
		if (firstID) {
			list.select(firstID);
		} else {
			list.unselectAll();
			this.show("contacts");
			$$("mainForm").clear();
		}
		
	}
}
