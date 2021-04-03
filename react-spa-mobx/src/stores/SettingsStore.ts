import { RootStore } from "@stores";
import { action, computed, observable } from "mobx";

export default class SettingsStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable
  selectedLanguage: "EN" | "RU" = "EN";

  @computed
  get selectedLanguageLong() {
    return {
      EN: "English(EN)",
      RU: "Russian(RU)",
    }[this.selectedLanguage];
  }

  @action
  toggleLanguage() {
    this.selectedLanguage = this.selectedLanguage === "EN" ? "RU" : "EN";
  }
}
