import React from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { useRootStore } from "../../provider";
const CareersWelcome = () => {
  const store = useRootStore();
  let characteristic = store.pages.find((item) => {
    return item.id === "CAREERS WELCOME CHARACTERISTICS";
  });

  if (characteristic) {
    characteristic = characteristic.children;

    characteristic = characteristic.map((characteristic, i) => {
      return (
        <dl key={i} className="mb-3">
          <dt className="font-weight-bold">{characteristic.title}</dt>
          <dd className="">{characteristic.description}</dd>
        </dl>
      );
    });

    return (
      <div className="careers-welcome dark-blue-bg pt-3 pb-5">
        <Container>
          <div className="stars">
            <span className="star-1"></span>
            <span className="star-2"></span>
            <span className="star-3"></span>
            <span className="star-4"></span>
            <span className="star-5"></span>
            <span className="star-6"></span>
            <span className="star-7"></span>
            <span className="star-8"></span>
          </div>
          <img
            src="/images/illustrations/career-planet-small-left.png"
            alt="left-planet"
            className="small-left"
          />
          <img
            src="/images/illustrations/career-planet-small-right.png"
            alt="right-planet"
            className="small-right"
          />
          <div className="planets-images left">
            <span className="locate office-1">Plovdiv, Bulgaria</span>
            <span className="locate office-2">Home Office</span>
            <span className="locate office-3">Sofia, Bulgaria</span>
            <img
              src="/images/illustrations/career-planet-group-left.png"
              alt="planet-group-left"
              className=""
            />
            <img
              src="/images/illustrations/rocket.png"
              alt="rocket"
              className="rocket landing"
            />
          </div>
          <div className="planets-images right">
            <span className="locate office-4">
              Lidköping, <br></br>Sweden
            </span>
            <span className="locate office-5">Home Office</span>
            <img
              src="/images/illustrations/career-planet-group-right.png"
              alt="planet-group-right"
              className=""
            />
          </div>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto my-5">
              <h2 className="text-uppercase text-white font-weight-bold">
                Welcome to the Novarto planet!
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto mb-3">
              <h3 className="h2 text-uppercase light-blue-text font-weight-bold">
                Characteristics:
              </h3>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto mb-5">
              {characteristic}
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto">
              <h3 className="h2 text-uppercase light-blue-text font-weight-bold">
                Become a novartian!
              </h3>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto">
              <p className="text-white font-weight-light">
                Are you adaptive, creative and inspired by innovation?
              </p>
              <p className="text-white font-weight-light mb-4">
                Apply for residence at:{" "}
                <a
                  className="light-blue-text font-weight-bold"
                  href="mailto:jobsbg@novarto.com"
                >
                  jobsbg@novarto.com
                </a>
              </p>
              <p className="font-weight-bold light-blue-text">
                We are always happy to hear from talented and motivated
                individuals.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default observer(CareersWelcome);
