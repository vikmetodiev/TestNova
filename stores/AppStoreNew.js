import React from "react";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_PATH } from "../env.js";
import { LANG } from "../lang.js";
import eventService from "../events";
export default class AppStore {
  loaded = false;
  data = [];
  pages = [];
  pagesMap = {};
  translations = {};
  metatags = [];
  API_PATH = "http://" + API_PATH;
  translationData = [];
  activeTab = "1";
  jobsAvailable = [];
  skillsFilter = [];
  typesFilter = "";
  locationFilter = "";
  counter = "";
  projectsTabs = new Map();
  activePhase = "1";
  locationImages = [];
  loadedData = true;

  nomenclature = "NOVA" + LANG + "**";

  setProjectTab(projectId, tabId) {
    this.projectsTabs.set(projectId, tabId);
  }

  getProjectTab(projectId) {
    const res = this.projectsTabs.get(projectId);
    return res ? res : "1";
  }

  constructor() {
    makeAutoObservable(this);
    this.readTree();
  }

  readTree = async () => {
    // let { data } = await axios.get("http://nvt200.novarto.com/api/readJson/" + this.nomenclature);
    // console.log("------>", window.location.protocol + "//" + API_PATH + "readJson/" + this.nomenclature)
    let { data } = await axios.get(
      "http:" + "//" + API_PATH + "readJson/" + this.nomenclature
    );
    if (data.children.length === 0) {
      this.loadedData = false;
    } else {
      this.loadedData = true;
    }
    let info = data.children;
    this.translationData = data.children[1].children;
    let pages = info.find((item) => item.id === "PAGES");
    let translations = data.children.find((item) => item.id === "TRANSLATIONS");
    translations = translations.children;
    let metatags = info.find((item) => item.id === "METATAGS");
    if (metatags) {
      this.metatags = metatags.children;
      let test = this.metatags.find((item) => {
        return item.name === "Homepage";
      });
    }
    if (pages) {
      this.pagesMap = this.createMap(pages.children, {});
      this.pages = pages.children.map((page) => {
        let newId = page.children.map((item) => {
          let newItem = "";
          if (item.title) {
            newItem = item.title;
          } else if (item.PROBLEM_TITLE) {
            newItem = item.PROBLEM_TITLE;
          } else {
            newItem = item.name;
          }
          item.id = newItem;
          if (newItem) {
            item.id = newItem.split(" ").join("-").split("/").join("-");
          }
          return item;
        });

        return page;
      });
      this.jobsAvailable = this.pages.find((item) => {
        return item.id === "CAREERS";
      });
      let test = this.jobsAvailable.children.filter((item) => {
        return item.TYPE === "Frontend development";
      });
    }
    if (translations) {
      let translations = this.translationData;
      let tempObj = {};
      translations.forEach((item) => {
        tempObj[item.ID] = item.translation;
      });
      this.translations = tempObj;
    }
    this.loaded = true;
    eventService.triggerEvent("Loaded", this);
    return;
  };

  createMap(pages, map) {
    pages.forEach((page) => {
      map[page.id] = page;
      if (page.children && page.children.length > 0) {
        map = this.createMap(page.children, map);
      }
    });
    return map;
  }

  getCounter(item) {
    let searchItem = this.jobsAvailable.children;

    let test = searchItem.find((item) => {
      return item.TYPE === "Frontend development";
    });
  }

  get getFiltered() {
    let copy = this.jobsAvailable.children || [];
    if (this.locationFilter !== "") {
      copy = copy.filter((item) => {
        return item.LOCATION.split(", ").indexOf(this.locationFilter) !== -1;
      });
    }
    if (this.typesFilter !== "") {
      copy = copy.filter((item) => item.TYPE === this.typesFilter);
    }
    if (this.skillsFilter.length > 0) {
      copy = copy.filter((item) => {
        return item.SKILLS.split(", ").some(
          (item) => this.skillsFilter.indexOf(item) != -1
        );
      });
    }
    return copy;
  }

  filterSkills(filter) {
    let filterIndex = this.skillsFilter.indexOf(filter);
    if (filterIndex > -1) this.skillsFilter.splice(filterIndex, 1);
    else this.skillsFilter.push(filter);
  }

  filterTypes(filter) {
    if (filter === this.typesFilter) {
      filter = "";
    }
    this.typesFilter = filter;
  }

  filterLocation(filter) {
    debugger;
    // let data = JSON.parse(JSON.stringify(this.completeData));
    // let location = data.children
    // location = location.filter(item => {
    //     let locationFilter = item.LOCATION.split(", ").filter(item => {
    //         return item === filter
    //     })
    //     let returningItem = locationFilter.toString()
    //     return returningItem === filter
    // })

    // console.log("BEFORE ---->", this.jobsAvailable)
    // this.jobsAvailable = location;
    // console.log("AFTER ---->", this.jobsAvailable)

    // let filterIndex = this.locationFilter.indexOf(filter);
    // if (filterIndex > -1) this.locationFilter.splice(index, 1);
    // else this.locationFilter.push(filter);
    if (filter === this.locationFilter) {
      filter = "";
    }
    this.locationFilter = filter;
  }

  clearFilter = () => {
    this.locationFilter = "";
    this.skillsFilter = [];
    this.typesFilter = "";
  };

  getActiveTab = (tab) => {
    this.activeTab = tab;
  };

  activateTab = (tab) => {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  };

  getActivePhase = (tab) => {
    this.activePhase = tab;
  };

  activatePhase = (tab) => {
    if (this.activePhase !== tab) {
      this.activePhase = tab;
    }
  };

  get getLocations() {
    let page = this.pages.find((item) => item.id === "LOCATIONS");
    if (page) {
      return this.regroupLocations(page.children);
    } else {
      return null;
    }
  }

  get getLocationImages() {
    let employees = [
      <img
        key="employee_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Numbers.svg"
        alt="Employees"
      />,
      this.translations.locationpage_employees,
    ];
    let interior = [
      <img
        key="interior_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Interior.svg"
        alt="Interior"
      />,
      this.translations.locationpage_interior,
    ];
    let location = [
      <img
        key="locaiton_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Location.svg"
        alt="Location"
      />,
      this.translations.locationpage_location,
    ];
    let building = [
      <img
        key="building_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Building.svg"
        alt="Building"
      />,
      this.translations.locationpage_building,
    ];
    let address = [
      <img
        key="address_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Address.svg"
        alt="Address"
      />,
      this.translations.locationpage_address,
    ];
    let email = [
      <img
        key="email_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Email.svg"
        alt="E-mail"
      />,
      this.translations.locationpage_email,
    ];
    let allImages = [address, email, employees, interior, location, building];
    return allImages;
  }

  get getCareers() {
    let career = this.pages.find((item) => item.id === "CAREERS");
    if (career) {
      return career.children;
    } else {
      return null;
    }
  }

  findById(id) {
    if (this.pagesMap[id]) {
      if (this.pagesMap[id].title) {
        return this.pagesMap[id].title;
      } else if (this.pagesMap[id].PROBLEM_TITLE) {
        return this.pagesMap[id].PROBLEM_TITLE;
      } else {
        return this.pagesMap[id].name;
      }
    }
  }

  regroupLocations(locs) {
    let employees = [
      <img
        key="employee_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Numbers.svg"
        alt="Employees"
      />,
      this.translations.locationpage_employees,
    ];
    let interior = [
      <img
        key="interior_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Interior.svg"
        alt="Interior"
      />,
      this.translations.locationpage_interior,
    ];
    let location = [
      <img
        key="location_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Location.svg"
        alt="Location"
      />,
      this.translations.locationpage_location,
    ];
    let building = [
      <img
        key="building_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Building.svg"
        alt="Building"
      />,
      this.translations.locationpage_building,
    ];
    let address = [
      <img
        key="address_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Address.svg"
        alt="Address"
      />,
      this.translations.locationpage_address,
    ];
    let email = [
      <img
        key="email_image"
        className="location-icons"
        src="https://api.novarto.com/api/images/svg/Email.svg"
        alt="E-mail"
      />,
      this.translations.locationpage_email,
    ];
    let result = {
      title: [""],
      EMPLOYEES: [employees],
      INTERIOR: [interior],
      LOCATION: [location],
      BUILDING: [building],
      address: [address],
      email: [email],
    };

    locs.forEach((loc) => {
      for (let key in loc) {
        if (result.hasOwnProperty(key)) {
          result[key].push(loc[key]);
        }
      }
    });
    //this.locationImages = [address, email, employees, interior, location, building];

    return [
      result.title,
      result.address,
      result.email,
      result.EMPLOYEES,
      result.INTERIOR,
      result.LOCATION,
      result.BUILDING,
    ];
  }
}
