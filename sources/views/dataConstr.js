import { JetView } from "webix-jet";

export default class DataConstr extends JetView {
	constructor(app, {tableColumns, formElements, rules, dataBase}) {
		super(app);

		this._tableColumns = tableColumns;
		this._formElements = formElements;
		this._rules = rules;
		this._dataBase = dataBase;
		
	}

	config() {
		const saveBtn = { 
			view:"button", 
			value:"Add new", 
			css:"webix_primary", 
			click: () => {
				const form = this.$$("form");
				
				if (form.validate()) {
					const item = form.getValues();
					this.$$("table").add(item);
					
					form.clear();
					webix.message("New record was added");
				} 
				
			} 
		};

		const datatable = {
			view:"datatable",
			localId: "table",
			editable: true,
			rules: this._rules,
			
			columns: [...this._tableColumns, {
				id: "del",
				header: "",
				template: "{common.trashIcon()}",
				fillspace: 1,
			} ],
			
			onClick: {
				"wxi-trash": function (e, id) {
					webix
						.confirm({
							title: "Delete",
							text: "Do you want delete this record?",
						})
						.then(() => {
							this.remove(id);
						});
				},
			}
		};

		const form = {
			view:"form",
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

			elements:[
				...this._formElements,
				saveBtn,
				{}
			]
		};

		const ui = {
			cols:[ datatable, form, ]
		};

		return ui;
	}

	init() {
		this.$$("table").parse(this._dataBase);
	}
}