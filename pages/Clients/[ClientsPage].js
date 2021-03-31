import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import Head from "next/head";
import { useRootStore } from "../../provider";
import { withRouter } from "next/router";
import renderProjectLinks from "../../public/renderProjects"
const ClientsPage = () => {
  const store = useRootStore();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window?.location.pathname.split("%C3%A5").join("å").split("/"));
  }, []);

  let clientId = path[path.length - 2];
  let findClient = store.pages.find((client) => {
    return client.id === "CLIENTS";
  });
  let metatag = store.metatags.find((item) => {
    return item.name === "Clients";
  });
  if (path.length > 0) {
    if (findClient) {
      findClient = findClient.children;
      let client = findClient.find((client) => client.id === clientId);
      let htmlDesc = { __html: client.description };

      let projectLength = client.PROJECTS.split(", ").filter((item) => {
        return item.includes("ins__") ? undefined : item;
      });

      return (
        <div className="page mt-5">
          <Head>
            <title>{metatag.title}</title>
            <meta name="description" content={metatag.description} />
            <meta name="keywords" content={metatag.keywords} />
            <meta property="og:url" content={metatag.page_url + client.id} />
            <meta property="og:description" content={metatag.description} />
            <meta
              property="og:image"
              content={
                metatag.Image_meta
                  ? this.store.AppStore.API_PATH + metatag.Image_meta
                  : "https://api.novarto.com/api/images/novarto-oglogo.jpg"
              }
            />
            <meta
              property="twitter:description"
              content={metatag.description}
            />
            <meta property="og:title" content={metatag.title} />
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
                  {client.title}
                </h1>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col
                md={{ size: 3 }}
                sm={{ size: 12 }}
                className="logo-leftaligned"
              >
                <div className="client-image mt-3">
                  <img
                    src={store.API_PATH + client.logo}
                    alt={client.title}
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
                  <a
                    href={client.link}
                    rel="noopener"
                    target="_blank"
                    className="link"
                  >
                    {client.link}
                  </a>
                </p>

                <hr className="inner-space" />

                <Row className="pt-3">
                  <p className="h4 dark-blue-text font-weight-normal ml-3 mb-4 d-block clearfix">
                    {projectLength.length === 1
                      ? `${store.translations.project}`
                      : `${store.translations.nav_projects}`}
                  </p>
                </Row>
                <Row>{renderProjectLinks(client.PROJECTS)}</Row>
                <p className="mobile-padding">
                  {client.TESTIMONIALS !== "NULL" &&
                  client.TESTIMONIALS.length > 0
                    ? client.TESTIMONIALS
                    : ""}
                </p>
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
export default withRouter(observer(ClientsPage));
