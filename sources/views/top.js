import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config(){
		const header = {
			type:"header", template:this.app.config.name, css:"webix_header app_header"
		};

		const menu = {
			view:"menu", id:"top:menu", 
			css:"app_menu",
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon #icon#'></span> #value# ",
			data:[
				{ value:"Contacts",	 id:"contacts",  icon:"wxi-pencil" },
				{ value:"Data",		 id:"data",  icon:"wxi-pencil" },
				{ value:"Settings",	 id:"settings",  icon:"wxi-pencil" },
			]
		};

		const ui = {
			margin:10,
			rows: [
				header,
				{type:"clean", css:"webix_shadow_medium", cols:[
					menu,
					{ type:"wide", rows:[
						{ $subview:true } 
					]}
				]}
			]
			
		};

		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}