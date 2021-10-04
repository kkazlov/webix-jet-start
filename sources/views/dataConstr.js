import { JetView } from "webix-jet";
import { contactsCollection } from "../models/dataCollections";

export default class DataConstr extends JetView {
	constructor(app, { tableColumns, formElements, rules, dataBase }) {
		super(app);

		this._tableColumns = tableColumns;
		this._formElements = formElements;
		this._rules = rules;
		this._dataBase = dataBase;
	}

	config() {
		const _ = this.app.getService("locale")._;
		const saveBtn = {
			view: "button",
			value: _("Add new"),
			css: "webix_primary",
			click: () => {
				const form = this.$$("form");

				if (form.validate()) {
					const item = form.getValues();
					this._dataBase.add(item);

					form.clear();
					webix.message("New record was added");
				}
			},
		};

		const datatable = {
			view: "datatable",
			localId: "table",
			editable: true,
			rules: this._rules,

			columns: [
				...this._tableColumns,
				{
					id: "del",
					header: "",
					template: "{common.trashIcon()}",
					fillspace: 1,
				},
			],

			onClick: {
				"wxi-trash": function (e, id) {
					webix
						.confirm({
							title: "Delete",
							text: "Do you want delete this record?",
						})
						.then(() => {
							const collection = this.$scope._dataBase;
							const collectionName = collection.config.id;
							collection.remove(id);

							if (collectionName === "countriesCollection") {
								contactsCollection.data.each((obj) => {
									if (obj.Country == id) {
										const contactID = obj.id;
										contactsCollection.updateItem(
											contactID,
											{ Country: "empty" }
										);
									}
								});
							}

							if (collectionName === "statusesCollection") {
								contactsCollection.data.each((obj) => {
									if (obj.Status == id) {
										const contactID = obj.id;
										contactsCollection.updateItem(
											contactID,
											{ Status: "empty" }
										);
									}
								});
							}
						});
				},
			},
		};

		const form = {
			view: "form",
			localId: "form",
			rules: this._rules,
			elementsConfig: {
				invalidMessage: "Enter the correct value!",
				on: {
					onFocus: () => {
						this.$$("form").clearValidation();
					},
				},
			},

			elements: [...this._formElements, saveBtn, {}],
		};

		const ui = {
			cols: [datatable, form],
		};

		return ui;
	}

	init() {
		this.$$("table").parse(this._dataBase);
	}
}
