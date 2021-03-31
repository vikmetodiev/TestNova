import React from "react";
import { observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { useRootStore } from "../provider";
import Head from "next/head";

const PrivacyPage = () => {
  let store = useRootStore();

  const isHTML = (str) => {
    var a = document.createElement("div");
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  };

  let privacy = store.pages.find((item) => {
    return item.id === "PRIVACY";
  });

  if (privacy) {
    privacy = privacy.children[0];
    let html = { __html: privacy.PRIVACY_POLICY };

    return (
      <div className="page terms-page">
        <Head>
          <title>Novarto Privacy</title>
          <meta name="description" content="Helmet application" />
        </Head>
        <div className="terms-bg light-blue-bg mb-5">
          <Container>
            <Row>
              <Col
                md={{ size: 6 }}
                sm={{ size: 12 }}
                className="mx-auto my-5 text-center"
              >
                <h1 className="text-white mb-0 pt-2 text-uppercase font-weight-bolder">
                  {store.translations.terms_conditions}
                </h1>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 12 }} className="mx-auto">
              <div className="paragraphs" dangerouslySetInnerHTML={html}></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(PrivacyPage);
