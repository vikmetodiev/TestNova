import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import PageMainHeader from "../public/PageMainHeader";
import LocationTabs from "../public/LocationTabs";
import { useRootStore } from "../provider";
const Location = () => {
  const store = useRootStore();

  let locations = store.getLocations;

  if (locations) {
    locations = locations.map((row, i) => {
      return (
        <Row key={i}>
          {row.map((col, i) => {
            if (Array.isArray(col)) {
              return (
                <Col key={i} xs={3}>
                  {col}
                </Col>
              );
            } else {
              return (
                <Col
                  key={i}
                  xs={3}
                  dangerouslySetInnerHTML={{ __html: col }}
                ></Col>
              );
            }
          })}
        </Row>
      );
    });
    return (
      <div className="page location">
        <PageMainHeader
          stars={
            <div>
              <span className="star-item star-1"></span>
              <span className="star-item star-2"></span>
              <span className="star-item star-3"></span>
              <span className="star-item star-4"></span>
              <span className="star-item star-5"></span>
              <span className="star-item star-6"></span>
            </div>
          }
          bgcolor={"dark-blue-bg"}
          header={store.translations.locations_title}
          title={store.translations.locations_subtitle}
          imageleft={
            <img
              src="/images/illustrations/locations-left-blank.png"
              alt=""
              className="image image-left"
            />
          }
          imageright={
            <img
              src="/images/illustrations/locations-right-blank.png"
              alt=""
              className="image image-right"
            />
          }
        />
        <Container className="mt-5">
          <div className="hide-mobile">
            <Row className="location-table">
              <Col sm={12}>{locations}</Col>
            </Row>
          </div>

          <div className="show-mobile">
            <LocationTabs />
          </div>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(Location);
