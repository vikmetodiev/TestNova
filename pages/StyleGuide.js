import React from "react";
import { observer } from "mobx-react";
import { Badge, Button, Col, Container, Row } from "reactstrap";
import OverviewTabs from "../OverviewTabs";

const StyleGuide = () => {
  return (
    <div className="page style-guide">
      <Container>
        <Row className="mb-4">
          <Col md={12}>
            <Button color="primary" className="btn-tab">
              Button
            </Button>
            <div className="d-inline-block mr-1"></div>
            <Button color="primary" className="btn-tab selected">
              Button
            </Button>
            <div className="d-inline-block mr-1"></div>
            <Button color="primary" className="btn-tab inactive">
              Button
            </Button>
            <div className="d-inline-block mr-1"></div>
            <Button color="primary" className="btn-big">
              Button
            </Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12}>
            <h1 className="dark-blue-text text-uppercase">H1 SERVICES</h1>
            <h2 className="font-weight-lighter text-uppercase">H2 solutions</h2>
            <h3 className="font-serif light-blue-text">
              <span className="font-weight-lighter">H3 TROUBLE finding</span>{" "}
              <span className="bold">your bussines?</span>
            </h3>
            <h4 className="light-blue-text">H4 Common Problems</h4>
            <h4 className="green-text">H4 Our Solutions</h4>
            <h5>H5 </h5>
            <small>small text</small>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12}>
            <div className="light-grey-text text-uppercase">Labels:</div>
            <Badge color="experienced">experienced</Badge>
            <div className="d-inline-block mr-1"></div>
            <Badge color="latest">latest</Badge>
            <div className="d-inline-block mr-1"></div>
            <Badge color="new">new</Badge>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={{ size: 6 }}>
            <ul className="blue-bullet-list">
              <li>
                Hybris <span className="font-weight-bold">certification.</span>
              </li>
              <li>
                Experience in integrations with third party services supporting
                e-commerce processes.
              </li>
              <li>Experience in integrations with SAP backend systems.</li>
              <li>Working experience following Agile methodology.</li>
            </ul>
          </Col>
        </Row>

        <OverviewTabs />
      </Container>
    </div>
  );
};

export default observer(StyleGuide);
