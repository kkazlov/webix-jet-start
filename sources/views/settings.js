import {JetView} from "webix-jet";

export default class Settings extends JetView {
	config() {
		return {
			view:"segmented", 
			value: "RU",
			options:[
				{ id:"RU", value:"RU" }, 
				{ id:"EN", value:"EN" }, 
			]
			
		};
	}
}