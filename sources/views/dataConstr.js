import { JetView } from "webix-jet";

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

		const localeTableColumns = this._tableColumns.map((item) => {
			return {...item, header:_(item.header)};
		});
		const localeFormElements = this._formElements.map((item) => {
			return {...item, label:_(item.label)};
		});

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
				...localeTableColumns,
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
							this.$scope._dataBase.remove(id);
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

			elements: [...localeFormElements, saveBtn, {}],
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
