import React, { Component } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import { useRootStore } from "../provider";

const PlatformsList = () => {
  const store = useRootStore();

  let platforms = store.pages.find((platform) => {
    return platform.id === "PLATFORMS";
  });
  if (platforms) {
    platforms = platforms.children;

    platforms = platforms.map((platform, i) => {
      return (
        <Col key={i} md={4} sm={6} xs={12} className="mb-4 d-flex">
          <Link
            href={{
              pathname: "/ServicesByPlatform/[slug]",
              query: { slug: platform.id },
            }}
          >
            <a className="card-item">
              <Card className="gradient-border spec-platform-mobile">
                <div className="image-holder services-cards">
                  <img
                    className="icon"
                    src={store.API_PATH + platform.Platform_icon}
                    alt={platform.title}
                    width="120"
                  />
                </div>
                <CardBody>
                  <CardTitle>{platform.name}</CardTitle>
                  <CardText>{platform.SHORTDESCRIPTION}</CardText>
                </CardBody>
              </Card>
            </a>
          </Link>
        </Col>
      );
    });

    return (
      <div>
        <Row>{platforms}</Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(PlatformsList);
