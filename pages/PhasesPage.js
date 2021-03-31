import React from "react";
import { observer } from "mobx-react";
import {
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Col,
  Container,
  Row
} from "reactstrap";
import classnames from "classnames";
import { useRootStore } from "../provider";
import Link from "next/link";


const PhasesPage = () => {
  const store = useRootStore();

    let classNameVar;
    let phases = store.pages.find((item) => {
      return item.id === "PROJECT PHASES";
    });

    let phasesTabs;
    let phasesContent;

    if (phases) {
      phasesTabs = phases.children.map((phaseTab, i) => {
        const tabId = i + 1;
        let thirdTitle;
        if (i === 0) {
          thirdTitle = phaseTab.third_title.substring(0, 2);
        } else {
          thirdTitle = phaseTab.third_title;
        }
        return (
          <Col key={i} md={4} sm={4} xs={4} className="phases-tabs">
            <NavItem className="position-relative">
              <NavLink
                className={classnames({
                  active: store.activePhase === `${tabId}`,
                })}
                onClick={() => {
                  store.activatePhase(`${tabId}`);
                }}
              >
                <p className="h4 mb-4 font-weight-light ">
                  {phaseTab.phase_title}
                </p>
                <ul className="blue-bullet-list hide-mobile">
                  {phaseTab.first_title !== "NULL" &&
                  phaseTab.first_title.length > 0 ? (
                    <li>{phaseTab.first_title}</li>
                  ) : (
                    ""
                  )}

                  {phaseTab.second_title !== "NULL" &&
                  phaseTab.second_title.length > 0 ? (
                    <li>{phaseTab.second_title}</li>
                  ) : (
                    ""
                  )}

                  {phaseTab.third_title !== "NULL" &&
                  phaseTab.third_title.length > 0 ? (
                    <li>{thirdTitle}</li>
                  ) : (
                    ""
                  )}

                  {phaseTab.fourth_title !== "NULL" &&
                  phaseTab.fourth_title.length > 0 ? (
                    <li>{phaseTab.fourth_title}</li>
                  ) : (
                    ""
                  )}
                </ul>
                <img
                  className="icon hide-mobile"
                  src={store.API_PATH + phaseTab.main_image}
                  alt="Tab image"
                  width="120"
                />
              </NavLink>
            </NavItem>
          </Col>
        );
      });

      phasesContent = phases.children.map((phaseContent, i) => {
        let html = { __html: phaseContent.phase_description };
        let firstHtml = { __html: phaseContent.first_description };
        let secondHtml = { __html: phaseContent.second_description };
        let thirdHtml = { __html: phaseContent.third_description };
        let fourthHtml = { __html: phaseContent.fourth_description };
        if (i === store.activePhase - 1) {
          classNameVar = "selected-tab-phase" + i;
          return (
            <TabPane key={i} tabId={store.activePhase} className="phase-content">
              <div className={classNameVar}>
                <Container>
                  <Row className="mb-5">
                    <Col
                      md={{ size: 6, offset: 3 }}
                      xs={{ size: 11 }}
                      className="my-5"
                    >
                      <h1 className="text-white mb-4 hide-mobile">
                        {phaseContent.phase_title}
                      </h1>
                      <div
                        className="paragraphs text-white"
                        dangerouslySetInnerHTML={html}
                      ></div>
                    </Col>
                    <Col md={{ size: 3 }} xs={{ size: 1 }}>
                      <img
                        className="phase-main-image"
                        src={store.API_PATH + phaseContent.main_image}
                        alt="Phase image"
                      />
                    </Col>
                  </Row>
                </Container>
              </div>

              <Container>
                {phaseContent.phase_subtitle !== "NULL" &&
                phaseContent.phase_subtitle.length > 0 ? (
                  <Row>
                    <Col className="mx-auto col-sm-12 col-md-6">
                      <p className="h4 dark-blue-text font-weight-bold mb-5 ">
                        {phaseContent.phase_subtitle}
                      </p>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}

                {phaseContent.first_title !== "NULL" &&
                phaseContent.first_title.length > 0 ? (
                  <Row>
                    <Col md={3} sm={3} xs={12}>
                      <img
                        src={store.API_PATH + phaseContent.first_img}
                        alt="Phase image"
                        width="100"
                        className="stage-img"
                      />
                    </Col>
                    <Col md={6} sm={9} xs={12} className="mb-5">
                      <p className="h4 font-weight-bold dark-blue-text mb-4">
                        {phaseContent.first_title}
                      </p>
                      <div
                        className="paragraphs mb-2"
                        dangerouslySetInnerHTML={firstHtml}
                      ></div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}

                {phaseContent.second_title !== "NULL" &&
                phaseContent.second_title.length > 0 ? (
                  <Row>
                    <Col md={3} sm={3} xs={12}>
                      <img
                        src={store.API_PATH + phaseContent.second_img}
                        alt="Phase image"
                        width="100"
                        className="stage-img"
                      />
                    </Col>
                    <Col md={6} sm={9} xs={12} className="mb-5">
                      <h4 className="font-weight-bold dark-blue-text mb-4">
                        {phaseContent.second_title}
                      </h4>
                      <div
                        className="paragraphs mb-2"
                        dangerouslySetInnerHTML={secondHtml}
                      ></div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}

                {phaseContent.third_title !== "NULL" &&
                phaseContent.third_title.length > 0 ? (
                  <Row>
                    <Col md={3} sm={3} xs={12}>
                      <img
                        src={store.API_PATH + phaseContent.third_img}
                        alt="Phase image"
                        width="100"
                        className="stage-img"
                      />
                    </Col>
                    <Col md={6} sm={9} xs={12} className="mb-5">
                      <h4 className="font-weight-bold dark-blue-text mb-4">
                        {phaseContent.third_title}
                      </h4>
                      <div
                        className="paragraphs mb-2"
                        dangerouslySetInnerHTML={thirdHtml}
                      ></div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {phaseContent.fourth_title !== "NULL" &&
                phaseContent.fourth_title.length > 0 ? (
                  <Row>
                    <Col md={3} sm={3} xs={12}>
                      <img
                        src={store.API_PATH + phaseContent.fourth_img}
                        alt="Phase image"
                        width="100"
                        className="stage-img"
                      />
                    </Col>

                    <Col md={6} sm={9} xs={12} className="mb-5">
                      <h4 className="font-weight-bold dark-blue-text mb-4">
                        {phaseContent.fourth_title}
                      </h4>
                      <div
                        className="paragraphs mb-2"
                        dangerouslySetInnerHTML={fourthHtml}
                      ></div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </Container>
            </TabPane>
          );
        }
      });

      return (
        <div className="page phases-page mt-4">
          <Container>
            <div className="breadcrumbs mb-5">
              <Link href="/Services">Services </Link>
              <span>/ Project Phases</span>
            </div>
            <Row>{phasesTabs}</Row>
          </Container>
          <TabContent activeTab={store.activePhase}>
            {phasesContent}
          </TabContent>
        </div>
      );
    } else {
      return <div></div>;
    }
}

export default observer(PhasesPage);
