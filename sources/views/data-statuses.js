import { JetView } from "webix-jet";
import { statuses } from "../models/statuses";


export default class DataStatuses extends JetView {
	config() {
		const rules = {
			Name: webix.rules.isNotEmpty,
			Icon: webix.rules.isNotEmpty,
		};

		const saveBtn = { 
			view:"button", 
			value:"Add new", 
			css:"webix_primary", 
			click: function() {
				const form = $$("formStatus");
				
				if (form.validate()) {
					const item = form.getValues();
					$$("tableStatus").add(item);
					
					form.clear();
					webix.message("New record was added");
				} 
				
			} 
		};

		const datatable = {
			view:"datatable",
			id: "tableStatus",
			editable: true,
			rules: rules,
			columns:[
				{ id:"id", header:"ID", fillspace: 1},
				{ id:"Name", header:"Name", editor: "text", fillspace: 2},
				{ id:"Icon", header:"Icon", editor: "text", fillspace: 1},
				{
					id: "del",
					header: "",
					template: "{common.trashIcon()}",
					fillspace: 1,
				}
				
			],
			data: statuses,
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
			id: "formStatus", 
			rules: rules,
			elementsConfig: {
				invalidMessage: "Enter the correct value!",
				on: {
					onFocus: function () {
						$$("formStatus").clearValidation();
					},
				},
			},

			elements:[
				{ view:"text", label:"Name", name: "Name" },
				{ view:"text", label:"Icon", name: "Icon" },
				saveBtn,
				{}
			]
		};

		const ui = {
			id:"dataStatuses",
			cols:[ datatable, form, ]
		};

		return ui;
	}
}