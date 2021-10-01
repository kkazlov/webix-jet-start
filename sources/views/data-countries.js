import {JetView} from "webix-jet";
import { countries } from "../models/countries";

export default class DataCountries extends JetView {
	config() {
		const rules = {
			Name: webix.rules.isNotEmpty,
		};
		
		const saveBtn = { 
			view:"button", 
			value:"Add new", 
			css:"webix_primary", 
			click: function() {
				const form = $$("formCountry");
				
				if (form.validate()) {
					const item = form.getValues();
					$$("tableCountry").add(item);
					
					form.clear();
					webix.message("New record was added");
				} 
				
			} 
		};

		const datatable = {
			view:"datatable",
			id: "tableCountry",
			editable: true,
			rules: rules,
			columns:[
				{ id:"id", header:"ID", fillspace: 1},
				{ id:"Name", header:"Name", editor: "text", fillspace: 2},
				{
					id: "del",
					header: "",
					template: "{common.trashIcon()}",
					fillspace: 1,
				}
				
			],
			data: countries,
			onClick: {
				"wxi-trash": function (e, id) {
					webix
						.confirm({
							title: "Delete",
							text: "Do you want delete this record?",
						})
						.then(() => {
							this.remove(id);
							return false;
						});
				},
			}
		};

		const form = {
			view:"form",
			id: "formCountry", 
			rules: rules,
			elementsConfig: {
				invalidMessage: "Enter the correct value!",
				on: {
					onFocus: function () {
						$$("formCountry").clearValidation();
					},
				},
			},

			elements:[
				{ view:"text", label:"Name", name: "Name" },
				saveBtn,
				{}
			]
		};

		const ui = {
			id:"dataCountries",
			cols:[ datatable, form, ]
		};

		return ui;
	}
}