const statuses = [
	{"id":1,"Name":"Busy","Icon":"cogs"},
	{"id":2,"Name":"Open","Icon":"user"}
];

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
	dataBase: statuses,
	multiID: "dataStatuses"
};

export {statusesConfig, statuses};

