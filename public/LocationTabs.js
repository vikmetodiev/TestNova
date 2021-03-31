import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { useRootStore } from "../provider";
const LocationTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const store = useRootStore();

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  let locationsTitles = store.pages.find((locations) => {
    return locations.id === "LOCATIONS";
  });

  let locations = store.pages.find((locations) => {
    return locations.id === "LOCATIONS";
  });

  if (locationsTitles) {
    locationsTitles = locationsTitles.children;
    locations = locations.children;
    locationsTitles = locationsTitles.map((locations, i) => {
      return (
        <NavItem key={"unique" + i}>
          <NavLink
            className={classnames({ active: activeTab === i })}
            onClick={() => toggle(i)}
            key={i}
          >
            {locations.description}
          </NavLink>
        </NavItem>
      );
    });

    return (
      <div className="location-tabs-mobile">
        <Nav tabs>{locationsTitles}</Nav>
        <TabContent activeTab={activeTab}>
          {locations.map((item, i) => {
            return (
              <TabPane tabId={i} key={i}>
                <Row >
                  <Col sm={4} xs={4} className="left-items">
                    {store.getLocationImages.map((item,i) => {
                      return <div key= {i} className="location-left-item">{item}</div>;
                    })}
                  </Col>
                  <Col sm={8} xs={8} className="tab-items">
                    <div
                      dangerouslySetInnerHTML={{ __html: item.address }}
                      className="tab-item"
                    ></div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.email }}
                      className="tab-item"
                    ></div>
                    <div className="tab-item">{item.EMPLOYEES}</div>
                    <div className="tab-item">{item.INTERIOR}</div>
                    <div className="tab-item">{item.LOCATION}</div>
                    <div className="tab-item">{item.BUILDING}</div>
                  </Col>
                </Row>
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(LocationTabs);
