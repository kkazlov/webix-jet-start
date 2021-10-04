import { JetView } from "webix-jet";

export default class Settings extends JetView {
	config() {
		
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
					on: {
						onAfterTabClick: (id) => this.toggleLanguage(id)
					},
					
				},
				{},
			],
		};
	}

	toggleLanguage(id) {
		const langs = this.app.getService("locale");
		langs.setLang(id);
	}
}
