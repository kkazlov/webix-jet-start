import { countriesCollection } from "./dataCollections";
import { statusesCollection } from "./dataCollections";


const countriesConfig = {
	tableColumns:[
		{ id:"id", header:"ID", fillspace: 1},
		{ id:"Name", header:"Name", editor: "text", fillspace: 2}
	],
	formElements: [{ view:"text", label:"Name", name: "Name" }],
	rules: {Name: webix.rules.isNotEmpty},
	dataBase: countriesCollection,
};

const statusesConfig = {
	tableColumns:[
		{ id:"id", header:"ID", fillspace: 1},
		{ id:"Name", header:"Name", editor: "text", fillspace: 2},
		{ id:"Icon", header:"Icon", editor: "text", fillspace: 1},
	],
	formElements: [
		{ view:"text", label:"Name", name: "Name" },
		{ view:"text", label:"Icon", name: "Icon" },
	],
	rules: {
		Name: webix.rules.isNotEmpty,
		Icon: webix.rules.isNotEmpty,
	},
	dataBase: statusesCollection,
};

export { countriesConfig, statusesConfig };