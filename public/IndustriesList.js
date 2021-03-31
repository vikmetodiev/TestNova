import React, { Component } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import { useRootStore } from "../provider";

const IndustriesList = () => {
  const store = useRootStore();

  let industries = store.pages.find((industry) => {
    return industry.id === "INDUSTRY";
  });
  if (industries) {
    industries = industries.children;
    industries = industries.map((industry, i) => {
      return (
        <Col key={i} md={4} sm={6} xs={12} className="mb-4 d-flex">
          <Link
            href={{
              pathname: "/ServicesByIndustry/[slug]",
              query: { slug: industry.id },
            }}
          >
            <a className="card-item">
              <Card className="gradient-border spec-mobile">
                <div className="image-holder services-cards">
                  <img
                    className="icon"
                    src={store.API_PATH + industry.icon}
                    alt={industry.title}
                    width="130"
                  />
                </div>
                <CardBody>
                  <CardTitle>{industry.title}</CardTitle>
                  <CardText>{industry.SHORTDESCRIPTION}</CardText>
                </CardBody>
              </Card>
            </a>
          </Link>
        </Col>
      );
    });

    return (
      <div>
        <Row>{industries}</Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(IndustriesList);
