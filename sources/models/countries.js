const countries = [
	{"id":1,"Name":"USA"},
	{"id":2,"Name":"Canada"},
	{"id":3,"Name":"Italy"}
];

const countriesConfig = {
	tableColumns:[
		{ id:"id", header:"ID", fillspace: 1},
		{ id:"Name", header:"Name", editor: "text", fillspace: 2}
	],
	formElements: [{ view:"text", label:"Name", name: "Name" }],
	rules: {Name: webix.rules.isNotEmpty},
	dataBase: countries,
};

export {countriesConfig, countries};

