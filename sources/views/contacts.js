import { JetView } from "webix-jet";
import { contacts } from "../models/contacts";

export default class Contacts extends JetView {
	config() {
		return {
			cols: [
				{
					view:"list",
					template:"#id#. #Name#, email: #Email#",
					select:true,
					data:contacts
				},
				{
					view:"form", 
					elements:[
						{ view:"text", label:"Name", name: "Name" },
						{ view:"text", label:"Email", name: "Email" },
						{cols:[
							{ view:"button", value:"Save", css:"webix_primary" },
							{ view:"button", value:"Cancel" }
						]},
						{}
					]
				}
			]
			
		};
	}
}

