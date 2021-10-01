import {JetView} from "webix-jet";
import DataCountries from "./data-countries";
import DataStatuses from "./data-statuses";


export default class DataView extends JetView{
	config(){
		return { 
			margin: 10,
			rows:[
				{
					view:"tabbar", 
					value:"dataCountries",
					multiview: true,
					options: [
						{id:"dataCountries", value:"Countries"},
						{id:"dataStatuses", value:"Statuses"},
					]
				},
				{ cells:[ DataCountries, DataStatuses ] }
			]
		};
	}
	
}