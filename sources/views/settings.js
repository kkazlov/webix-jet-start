import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {

		const value = this.app.getService("locale").getLang();
		
		return {
			rows: [
				{
					view: "segmented",
					name: "lang",
					localId: "btns",
					options: [
						{ id: "en", value: "EN" },
						{ id: "ru", value: "RU" },
					],
					value,
					click: () => this.toggleLanguage()
					
				},
				{},
			],
		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({name: "lang"}).getValue();
		langs.setLang(value);
	}
}
