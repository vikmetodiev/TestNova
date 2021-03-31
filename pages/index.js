import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import PageMainHeader from "../public/PageMainHeader";
import { useRootStore } from "../provider";
import Link from "next/link";
const Home = () => {
  const store = useRootStore();

  const renderHomeLinks = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        let findSolution = store.pages.find((item) => {
          return item.id === "SOLUTIONS";
        });
        let foundItem = findSolution.children.find((itm) => {
          return itm.id === found.split(" ").join("-").split("/").join("-");
        });
        return (
          <Col
            key={i}
            md={{ size: 3 }}
            sm={{ size: 12 }}
            className="col pt-2 px-4"
          >
            
            <Link
              href={{
                pathname: "/ServicesBySolution/[slug]",
                query: {
                  slug: found.split(" ").join("-").split("/").join("-"),
                },
              }}
            >
              <a>
              <div className="home-info">
                <div className="text-center mr-3">
                  {foundItem ? (
                    <img
                      src={store.API_PATH + foundItem.icon}
                      alt={foundItem.title}
                      title={foundItem.title}
                      width="65"
                    />
                  ) : (
                    item
                  )}
                </div>
                <div className="pl-0 d-flex align-items-start justify-content-center flex-column">
                  <div className="h4 pt-2">
                    {foundItem ? foundItem.title : item}
                  </div>
                  <div className="pb-4 show-mobile">
                    {foundItem ? foundItem.SUBTITLE : item}
                  </div>
                </div>
              </div>
              <div className="pb-4  dark-grey-text mt-3 hide-mobile">
                {foundItem ? foundItem.SUBTITLE : item}
              </div>
              <div className="light-blue-text read-more ">
                {store.translations.read_more}
              </div>
              </a>
            </Link>
          </Col>
        );
      }
    });
  };

  const renderClientsLinks = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        let findClients = store.pages.find((item) => {
          return item.id === "CLIENTS";
        });

        let foundItem = findClients.children.find((itm) => {
          return itm.id === found.split(" ").join("-");
        });
        if (foundItem) {
          return (
            <Link
              key={i}
              href={{
                pathname: "/Clients/[slug]",
                query: {
                  slug: found.split(" ").join("-").split("/").join("-"),
                },
              }}
            >
              <a className="d-inline-block mx-2 my-3">
                <span className="client-image d-inline-block">
                  <img
                    src={store.API_PATH + foundItem.logo}
                    alt={foundItem.title}
                    title={foundItem.title}
                    width={100}
                  />
                </span>
              </a>
            </Link>
          );
        }
      }
    });
  };

  const renderPartnersLinks = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        let findPartners = store.pages.find((item) => {
          return item.id === "PARTNERS";
        });

        let foundItem = findPartners.children.find((itm) => {
          return itm.id === found.split(" ").join("-");
        });
        if (foundItem) {
          return (
            <Link
              key={i}
              href={{
                pathname: "/Partners/[slug]",
                query: {
                  slug: found.split(" ").join("-").split("/").join("-"),
                },
              }}
            >
              <a className="d-inline-block mx-3 my-3">
              <span className="partner-image d-inline-block">
                <img
                  src={store.API_PATH + foundItem.logo}
                  alt={foundItem.name}
                  title={foundItem.name}
                  height={60}
                />
              </span>
              </a>
            </Link>
          );
        }
      }
    });
  };

  const renderPlatformsLinks = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        let findPlatforms = store.pages.find((item) => {
          return item.id === "PLATFORMS";
        });
        let foundItem = findPlatforms.children.find((itm) => {
          found = found.split("/").join("-");
          return itm.id === found.split(" ").join("-");
        });
        if (foundItem) {
          return (
            <Link
              key={i}
              href={{
                pathname: "/ServicesByPlatform/[slug]",
                query: {
                  slug: found.split(" ").join("-").split("/").join("-"),
                },
              }}
            >
              <a className="d-inline-block mx-4 py-3">
              <span className="partner-image d-inline-block mt-3">
                <img
                  src={store.API_PATH + foundItem.Platform_icon}
                  alt={foundItem.name}
                  title={foundItem.name}
                  height={34}
                />
              </span>
              </a>
            </Link>
          );
        }
      }
    });
  };

  let homepage = store.pages.find((item) => {
    return item.id === "HOMEPAGE";
  });
  if (!homepage) {
    return null;
  }
  homepage = homepage.children[0];

  return (
    <div className="page home overflow-hidden">
      {/*<ListGroup>*/}
      {/*	*/}
      {/*	{this.store.pages.map((page) => {*/}
      {/*		return <ListGroupItem key={page.id}>{page.id}</ListGroupItem>*/}
      {/*	})}*/}
      {/*</ListGroup>*/}

      <PageMainHeader
        stars={
          <div>
            <span className="star-item star-1"></span>
            <span className="star-item star-2"></span>
            <span className="star-item star-3"></span>
            <span className="star-item star-4"></span>
            <span className="star-item star-5"></span>
            <span className="star-item star-6"></span>
            <span className="star-item star-7"></span>
            <span className="star-item star-8"></span>
            <span className="star-item star-9"></span>
            <div className="stars-animated">
              <span className="star-animated"></span>
              <span className="star-animated"></span>
              <span className="star-animated"></span>
            </div>
          </div>
        }
        bgcolor={"dark-blue-bg"}
        header={homepage.title}
        title={homepage.subtitle}
        imageleft={
          <div>
            <img
              src="/images/illustrations/homepage-left-blank-v3.png"
              alt="image"
              className="image image-left"
            />
            <div id="galaxy">
              <div id="earth"></div>
              <div className="orbit">
                <div className="pos">
                  <div className="planet"></div>
                </div>
              </div>
            </div>
          </div>
        }
        imageright={
          <div>
            <img
              src="/images/illustrations/homepage-right-blank-v2.png"
              alt="image"
              className="image image-right"
            />
            <div className="animation-container">
              <div className="rocket-container">
                <div className="rocket">
                  <div className="booster-flames"></div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Container className="main-solutions mt-5">
        <Row>
          <Col className="mb-3">
            <h2 className="h3 text-center mb-4 dark-blue-text">
              {homepage.rel_title}
            </h2>
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          {renderHomeLinks(homepage.relation)}
        </Row>
        <Row>
          <Col md={9} className="mx-auto mb-2">
            <hr className="" />
          </Col>
          <Col md={12} className="mb-2 text-center">
            <h2 className="h3 my-4 dark-blue-text">
              {store.translations.clients}
            </h2>
            <p className="h4 mid-grey-text font-weight-light">
              {store.translations.homepage_clintssubtitle}
            </p>
          </Col>
          <Col md={12} className="text-center">
            <div className="clients-widget d-inline-block pr-2">
              {renderClientsLinks(homepage.clients_relations)}
            </div>
          </Col>
          <Col md={9} className="mx-auto mb-2">
            <hr className="" />
          </Col>
          <Col md={12} className="mb-2 text-center">
            <h2 className="h3 my-4 dark-blue-text">
              {store.translations.partner}
            </h2>
            <p className="h4 mid-grey-text font-weight-light">
              {store.translations.homepage_partnersubtitle}
            </p>
          </Col>
          <Col md={12} className="text-center">
            <div className="partner-widget d-inline-block">
              {renderPartnersLinks(homepage.partners_relations)}
            </div>
          </Col>

          <Col md={9} className="mx-auto mb-2">
            <hr className="" />
          </Col>
          <Col md={12} className="mb-2 text-center">
            <h2 className="h3 my-4 dark-blue-text">
              {store.translations.tab_platforms}
            </h2>
            <p className="h4 mid-grey-text font-weight-light">
              {store.translations.homepage_platformsubtitle}
            </p>
          </Col>
          <Col md={12} className="text-center">
            <div className="clients-widget d-inline-block">
              {renderPlatformsLinks(homepage.platforms_relations)}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(Home);
