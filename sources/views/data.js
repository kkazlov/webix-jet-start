import {JetView} from "webix-jet";
import { countriesConfig } from "../models/dataConfig";
import { statusesConfig } from "../models/dataConfig";
import DataConstr from "./dataConstr";


export default class DataView extends JetView{
	config(){
		const dataCountries = new DataConstr(this.app, countriesConfig);
		const dataStatuses = new DataConstr(this.app, statusesConfig);

		return { 
			rows:[
				{
					view:"tabbar", 
					value:"dataCountries",
					multiview: true,
					options: [
						{id:"dataCountries", value:"Countries"} ,
						{id:"dataStatuses", value:"Statuses"}, 
					]
				},
				{ cells:[
					{$subview:dataCountries, id:"dataCountries"}, 
					{$subview:dataStatuses, id:"dataStatuses"}
				] 
				}
			]
		};
	}
	
}