import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Col, Container } from "reactstrap";
import FsLightbox from "fslightbox-react";
import { useRootStore } from "../../provider";
const Benefits = (props) => {
  const store = useRootStore();
  const [isVisible, setVisible] = useState(false);
  const [slide, setSlide] = useState(1);

  const showSlide = (slide) => {
    setSlide(slide);
    setVisible(!isVisible);
  };
  let lightboxSources = [];
  let lightboxCounter = 0;

  let benefits = store.pages.find((benefit) => {
    return benefit.id === "BENEFITS";
  });

  if (benefits) {
    benefits = benefits.children;

    benefits = benefits.map((benefit, i) => {
      let descrHtml = { __html: benefit.desc };

      let localLightboxSources = [];

      for (let imgIndex = 1; imgIndex < 5; ++imgIndex) {
        let imgSrc = benefit["img" + imgIndex]
          ? benefit["img" + imgIndex]
          : "NULL";
        if (imgSrc != "NULL") {
          lightboxSources.push(store.API_PATH + imgSrc);
          localLightboxSources.push({
            src: store.API_PATH + imgSrc,
            idx: ++lightboxCounter,
          });
        }
      }

      return (
        <div key={i} className="row mb-2">
          <Col md={3} sm={3} xs={12}>
            <img
              src={store.API_PATH + benefit.icon}
              alt="Environment"
              width="80"
              className="float-right"
            />
          </Col>
          <Col md={6} sm={9} xs={12} className="">
            <h3 className="font-weight-bold light-blue-text text-uppercase mb-3 mt-4">
              {benefit.title}
            </h3>
            <div className="career-photos mb-2">
              {localLightboxSources.map((imgSource) => {
                return (
                  <img
                    key={"lbImg" + imgSource.idx}
                    onClick={() => showSlide(imgSource.idx)}
                    alt={imgSource.src}
                    src={imgSource.src}
                  />
                );
              })}
            </div>
            <p
              dangerouslySetInnerHTML={descrHtml}
              className="paragraphs pt-2"
            ></p>
          </Col>
        </div>
      );
    });

    return (
      <div className="light-grey-bg">
        <Container className="py-5">
          {benefits}
          <FsLightbox
            toggler={isVisible}
            slide={slide}
            sources={lightboxSources}
            type="image"
          />
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default observer(Benefits);