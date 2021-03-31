import React from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { useRootStore } from "../../provider";

const QuotesEmployees = () => {
  const store = useRootStore();

  let quotes = store.pages.find((item) => {
    return item.id === "QUOTES";
  });

  if (quotes) {
    quotes = quotes.children;

    quotes = quotes.map((quotes, i) => {
      let html = { __html: quotes.text };
      return (
        <Col key={i} md={4} sm={4} xs={12} className="mb-5 text-center">
          <img
            src={store.API_PATH + quotes.picture}
            alt={"Image" + i}
            className="center-sm-image mb-3"
          />
          <div
            className="paragraphs pl-3 pr-3"
            dangerouslySetInnerHTML={html}
          ></div>
        </Col>
      );
    });

    return (
      <div className="colleagues-quotes light-grey-bg pt-3 pb-3">
        <Container>
          <Row>
            <Col
              md={{ size: 6 }}
              sm={{ size: 12 }}
              className="mx-auto mt-5 mb-4"
            >
              <h2 className="text-uppercase light-blue-text font-weight-bold text-center">
                {store.translations.colleagues_say}
              </h2>
            </Col>
          </Row>

          <Row className="mt-5">{quotes}</Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(QuotesEmployees);
