import React, { useEffect } from "react";
import { observer } from "mobx-react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
} from "reactstrap";
import classnames from "classnames";
import SolutionList from "../public/SolutionList";
import IndustriesList from "../public/IndustriesList";
import PlatformsList from "../public/PlatformsList";
import PageMainHeader from "../public/PageMainHeader";
import PhasesList from "../public/PhasesList";
import { useRootStore } from "../provider";
 const Services = (props) => {
  const store = useRootStore();

  useEffect(() => {
    if (window.location.hash.toLocaleLowerCase().indexOf("solution") > -1) {
      store.activateTab("1");
    } else if (
      window.location.hash.toLocaleLowerCase().indexOf("industry") > -1
    ) {
      store.activateTab("2");
    } else if (
      window.location.hash.toLocaleLowerCase().indexOf("platform") > -1
    ) {
      store.activateTab("3");
    } else if (
      window.location.hash.toLocaleLowerCase().indexOf("project-phases") > -1
    ) {
      store.activateTab("4");
    }
  },[])

    return (
      <div className="page services">
        <PageMainHeader
          bgcolor={"light-blue-bg"}
          header={store.translations.services_title}
          title={store.translations.services_subtitle}
          imageleft={
            <img
              src="/images/illustrations/what-we-do-left.png"
              alt=""
              className="image image-left"
            />
          }
          imageright={
            <img
              src="/images/illustrations/what-we-do-right.png"
              alt=""
              className="image image-right"
            />
          }
        />
        <Container className="mt-5">
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto">
              <p className="light-grey-text mb-2">
                {store.translations.show_by}
              </p>
              <Nav tabs className="nav-blue-tabs mb-5">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: store.activeTab === "1",
                    })}
                    onClick={() => {
                      store.activateTab("1");
                    }}
                  >
                    {store.translations.solution_title}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: store.activeTab === "2",
                    })}
                    onClick={() => {
                      store.activateTab("2");
                    }}
                  >
                    {store.translations.industries_title}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: store.activeTab === "3",
                    })}
                    onClick={() => {
                      store.activateTab("3");
                    }}
                  >
                    {store.translations.platforms_title}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: store.activeTab === "4",
                    })}
                    onClick={() => {
                      store.activateTab("4");
                    }}
                  >
                    {store.translations.project_phases}
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }}>
              <TabContent activeTab={store.activeTab}>
                <TabPane tabId="1">
                  <div className="text-center">
                    <SolutionList />
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="text-center">
                    <IndustriesList />
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="text-center">
                    <PlatformsList />
                  </div>
                </TabPane>
                <TabPane tabId="4">
                  <div className="text-center">
                    <PhasesList />
                  </div>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default observer(Services);
