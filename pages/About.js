import React, { Component } from "react";
import {  observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import OurStory from "../public/OurStory";
import PageMainHeader from "../public/PageMainHeader";
import { ParallaxProvider } from "react-scroll-parallax";
import { useRootStore } from "../provider";
const About = () => {
  const store = useRootStore();
  let about = store.pages.find((item) => {
    return item.id === "ABOUT";
  });

  if (!about) {
    return null;
  }
  about = about.children[0];
  let html = { __html: about.APPROACH };

  return (
    <div className="page about-page">
      <PageMainHeader
        bgcolor={"light-blue-bg"}
        header={store.translations.about_title}
        title={about.HEADLINE}
        imageleft={
          <img
            src="/images/illustrations/who-we-are-left.png"
            alt="Image left"
            className="image image-left"
          />
        }
        imageright={
          <img
            src="/images/illustrations/who-we-are-right.png"
            alt="Image right"
            className="image image-right"
          />
        }
      />
      <ParallaxProvider>
        <Container className="mt-4">
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto">
              <div className="our-mission mb-4 ">
                <h2 className="text-uppercase light-blue-text mb-5 mr-1 d-inline">
                  {store.translations.mission}
                </h2>

                <img
                  src="http://api.novarto.com/api/images/svg/Spaceship.svg"
                  alt="mission"
                  width="70"
                  className="align-bottom"
                />
              </div>
              <p className="h4 text-uppercase dark-blue-text font-weight-normal mb-4 ">
                {about.MISSION}
              </p>
              <div className="paragraphs" dangerouslySetInnerHTML={html}></div>
            </Col>
          </Row>
        </Container>
        <OurStory />
      </ParallaxProvider>
    </div>
  );
};

export default observer(About);
