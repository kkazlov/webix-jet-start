import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";
import { countriesCollection } from "../models/dataCollections";
import { statusesCollection } from "../models/dataCollections";

import "../styles/contacts.css";

export default class ContactsList extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const randomInteger = (max) => {
			let rand = Math.random() * max;
			return Math.floor(rand);
		};

		const list = {
			view: "list",
			localId: "contactList",
			template: function ({ Name, Country, Email, Status }) {
				const countryObj = countriesCollection.getItem(Country);
				const statusObj = statusesCollection.getItem(Status);

				const countryName = countryObj ? countryObj.Name : "no country";
				const statusName = statusObj ? statusObj.Name : "no status";

				return `
					<div class='contacts-list__item'>
						${Name} from ${countryName} | Email: ${Email} | Status: ${statusName}
						<span class='webix_icon wxi-close removeBtn'></span>
					</div>
				`;
			},
			select: true,
			onClick: {
				removeBtn: function (e, id) {
					const selectedID = this.getSelectedId();

					contactsCollection.remove(id);
					if (selectedID === id) {
						this.$scope.refreshList();
					}
				},
			},
		};

		const addBtn = {
			view: "button",
			value: _("Add new"),
			css: "webix_primary",
			click: () => {
				const list = this.$$("contactList");
				const rndStatus = randomInteger(statusesCollection.count());
				const rndCountry = randomInteger(countriesCollection.count());

				contactsCollection
					.waitSave(() => {
						contactsCollection.add({
							Name: "Ivan Petrov",
							Email: "Petrov@gmail.com",
							Country: countriesCollection.data.order[rndCountry],
							Status: statusesCollection.data.order[rndStatus],
						});
					})
					.then(() => {
						list.select(list.getLastId());
					});
			},
		};

		return { rows: [list, addBtn] };
	}

	init() {
		const list = this.$$("contactList");
		list.sync(contactsCollection);

		contactsCollection.waitData.then(() => {
			let initSelect = this.getParam("id") || list.getFirstId();
			const checkID = +contactsCollection.data.getIndexById(initSelect);
			if (checkID === -1) {
				initSelect = list.getFirstId();
			}

			this.setParam("id", initSelect, true);

			list.attachEvent("onAfterSelect", (id) => {
				this.show(`contacts?id=${id}`);
			});

			list.select(initSelect);
		});
	}

	refreshList() {
		const list = this.$$("contactList");
		const firstID = list.getFirstId();

		if (firstID) {
			list.select(firstID);
		} else {
			this.show("contacts");
		}
	}
}
