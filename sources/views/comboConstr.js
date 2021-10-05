import { JetView } from "webix-jet";

export default class ComboConstr extends JetView {
	constructor(app, { dataBase, name, label }) {
		super(app);

		this._dataBase = dataBase;
		this._name = name;
		this._label = label;
	}

	config() {
		return {
			view: "combo",
			label: this._label,
			name: this._name,
			options: {
				filter: function (item, value) {
					return (
						item.Name.toString()
							.toLowerCase()
							.indexOf(value.toLowerCase()) !== -1
					);
				},
				body: {
					template: "#Name#",
					data: this._dataBase,
				},
			},
		};
	}
}
