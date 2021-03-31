import React from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { useRootStore } from "../provider";
import { Parallax } from "react-scroll-parallax";

const OurStory = () => {
  const store = useRootStore();
  let history = store.pages.find((item) => {
    return item.id === "HISTORY";
  });

  if (!history) {
    return null;
  }
  history = history.children;
  let displayHistory = history.map((history, i) => {
    let display = {
      color: "white",
    };

    let display_event = {
      color: "white",
    };

    if (history.STORY_NUMBERS === "NULL") {
      display = {
        display: "none",
      };
    }

    if (!history.STORY_DATE) {
      history.STORY_DATE = "";
    }

    if (history.STORY_EVENT === "NULL") {
      display_event = {
        display: "none",
      };
    }

    let html = { __html: history.STORY_NUMBERS };
    let html1 = { __html: history.STORY_EVENT };

    return (
      <div key={i} className="single-story">
        <Parallax
          className="planet-image-container"
          y={["-40px", "70px"]}
          tagOuter="figure"
        >
          {history.planet !== "NULL" && history.planet.length > 0 ? (
            <img
              className="planet-image"
              src={store.API_PATH + history.planet}
              alt="Planet"
            />
          ) : (
            ""
          )}
        </Parallax>
        <h3 className="h4 text-white text-uppercase">{history.STORY_DATE}</h3>
        <p>
          <span dangerouslySetInnerHTML={html1} style={display_event}></span>
          <span dangerouslySetInnerHTML={html} style={display}></span>
        </p>
      </div>
    );
  });
  return (
    <div className="our-story">
      <div className="dark-blue-bg mt-5 py-5">
        <Container className="pb-5">
          <span className="star-item star-1"></span>
          <span className="star-item star-2"></span>
          <span className="star-item star-3"></span>
          <span className="star-item star-4"></span>
          <span className="star-item star-5"></span>
          <span className="star-item star-6"></span>
          <span className="star-item star-7"></span>
          <span className="star-item star-8"></span>
          <span className="star-item star-9"></span>
          <span className="star-item star-10"></span>
          <span className="star-item star-11"></span>
          <div className="rocket-container">
            <Parallax
              className="rocket-image"
              y={["600px", "-90px"]}
              tagOuter="figure"
            >
              <img
                alt="Our Story"
                src="https://api.novarto.com/api/images/our-story-rocket-v3.png"
              />
            </Parallax>
          </div>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }} className="my-4">
              <h2 className="h2 section-title text-white text-uppercase font-weight-bolder">
                {store.translations.our_story}
              </h2>
            </Col>
          </Row>
          <div className="history-content mt-4">{displayHistory}</div>
          <img
            className="rocket-dust"
            alt="rocket-dust"
            src="https://api.novarto.com/api/images/our-story-rocket-dust.png"
          />
        </Container>
      </div>
    </div>
  );
};

export default observer(OurStory);
