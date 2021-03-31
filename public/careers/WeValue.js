import React from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { useRootStore } from "../../provider";
const WeValue = () => {
  const store = useRootStore();

  let value = store.pages.find((item) => {
    return item.id === "WE VALUE";
  });

  if (value) {
    value = value.children;

    value = value.map((value, i) => {
      let html = { __html: value.description };

      let heading = { __html: value.heading };
      return (
        <Col key={i} md={4} sm={4} xs={12} className="mb-4 text-center">
          <img
            src={store.API_PATH + value.icon}
            alt={value.icon}
            className="center-sm-image mb-3"
          />
          <p
            className="text-white font-weight-bold mb-3 text-uppercase"
            style={{ fontSize: 18 }}
            dangerouslySetInnerHTML={heading}
          ></p>
          <div
            className="paragraphs text-white pl-3 pr-3"
            dangerouslySetInnerHTML={html}
          ></div>
        </Col>
      );
    });

    return (
      <div className="we-value dark-blue-bg pt-3 pb-5">
        <Container>
          <Row>
            <Col
              md={{ size: 6 }}
              sm={{ size: 12 }}
              className="mx-auto mt-5 mb-4"
            >
              <h2 className="text-uppercase text-white font-weight-bold text-center">
                {store.translations.we_value}
              </h2>
            </Col>
          </Row>

          <Row className="mt-5">{value}</Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(WeValue);
