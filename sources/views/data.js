import {JetView} from "webix-jet";
import { statusesConfig } from "../models/statuses";
import { countriesConfig } from "../models/countries";
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
				{ cells:[dataCountries, dataStatuses] }
			]
		};
	}
	
}