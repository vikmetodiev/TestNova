import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Link from "next/link";
import Head from "next/head";
import { useRootStore } from "../../provider";
import { withRouter } from "next/router";
import renderProjectLinks from "../../public/renderProjects"
const PartnersPage = () => {
  const store = useRootStore();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(window?.location.pathname.split("/"));
  }, []);

  let partnerId = path[path.length - 2];
  let findPartner = store.pages.find((partner) => {
    return partner.id === "PARTNERS";
  });

  if (path.length > 0) {
    if (findPartner) {
      findPartner = findPartner.children;
      let partner = findPartner.find((partner) => partner.id === partnerId);
      let htmlDesc = { __html: partner.description };

      return (
        <div className="page mt-5">
          <Head>
            <title>Novarto Partners</title>
            <meta
              name="description"
              content="We are proud to partner with world-class companies"
            />
            <meta
              name="keywords"
              content="Novarto partner partnership world-class companies"
            />
          </Head>

          <Container>
            <Row>
              <Col md={6} sm={{ size: 12 }} className="mx-auto">
                <div className="breadcrumbs mb-4">
                  <a href="#" onClick={() => window.history.back()}>
                    Back to previous page
                  </a>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={{ size: 12 }} className="mx-auto">
                <h1 className="dark-blue-text mb-3 text-uppercase">
                  {partner.name}
                </h1>
                <p className="mb-3 h4 font-serif font-weight-normal">
                  {partner.SUBTITLE}
                </p>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col
                md={{ size: 3 }}
                sm={{ size: 12 }}
                className="logo-leftaligned"
              >
                <div className="mt-3 mobile-padding">
                  <img
                    src={store.API_PATH + partner.logo}
                    alt={partner.title}
                    width="200"
                  />
                </div>
              </Col>
              <Col md={{ size: 6 }} sm={{ size: 12 }}>
                <hr className="inner-space " />
                <div
                  className="paragraphs mb-4"
                  dangerouslySetInnerHTML={htmlDesc}
                ></div>
                <p className="mb-4 mobile-padding">
                  <a href={partner.link} target="_blank" className="link">
                    {partner.link}
                  </a>
                </p>

                <hr className="inner-space" />

                <Row className="pt-3">
                  <h4 className="h4 dark-blue-text font-weight-normal ml-3 mb-4 d-block clearfix">
                    {store.translations.tab_projects}
                  </h4>
                </Row>
                <Row>{renderProjectLinks(partner.rel)}</Row>
                <p className="mobile-padding">{partner.TESTIMONIALS}</p>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default withRouter(observer(PartnersPage));
