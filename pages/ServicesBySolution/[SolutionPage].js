import React, { Component, useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Card,
  CardTitle,
  CardImg,
  CardBody,
} from "reactstrap";
import { useRootStore } from "../../provider";
import Scrollspy from "react-scrollspy";
import FsLightbox from "fslightbox-react";
import PageMainHeader from "../../public/PageMainHeader";
import Cookies from "universal-cookie";
import renderPlatformLinks from "../../public/renderPlatforms"
const cookies = new Cookies();
if (isNaN(cookies.get("Counter")) || cookies.get("Counter") === "undefined") {
  cookies.set("Counter", 0, { path: "/" });
}

const SolutionPage = () => {
  const store = useRootStore();

  const [activeTab, setActiveTab] = useState("1");
  const [activeId, setActiveId] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [slide, setSlide] = useState(1);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window?.location.pathname.split("/"));
  }, []);

  const showSlide = (slide) => {
    setSlide(slide);
    setVisible(!isVisible);
  };

  let lightboxSources = [];

  const scrollIntoView = (refName) => {
    const element = document.getElementById(refName);
    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element && refName !== "item-1" ? element.offsetTop + 370 : 0,
      });
    }, 100);
  };

  const renderProblemLinks = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        let findProblem = store.pages.find((item) => {
          return item.id === "PROBLEMS";
        });
        let problemFound = findProblem.children.find((itm) => {
          return itm.id === found.split(" ").join("-").split("/").join("-");
        });

        return (
          <div key={i} className="row mb-4">
            <Col md={{ size: 6 }} sm={{ size: 6 }} xs={{ size: 6 }}>
              {problemFound ? problemFound.PROBLEMS_DESCRIPTION : ""}
            </Col>
            <Col md={{ size: 6 }} sm={{ size: 6 }} xs={{ size: 6 }}>
              {problemFound ? problemFound.solution : ""}
            </Col>
          </div>
        );
      }
    });
  };

  const activateOverviewTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  let solutionId = path[path.length - 2];
  let findSolution = store.pages.find((solution) => {
    return solution.id === "SOLUTIONS";
  });

  let metatag = store.metatags.find((item) => {
    return item.name === "SolutionPage";
  });
  if (path.length > 0) {
    if (findSolution) {
      let solution = findSolution.children.find(
        (solution) => solution.id === solutionId
      );
      let descrHtml = { __html: solution.DESCRIPTION };

      let localLightboxSources = [];

      for (let imgIndex = 1; imgIndex < 4; ++imgIndex) {
        let imgSrc = solution["img" + imgIndex]
          ? solution["img" + imgIndex]
          : "NULL";
        if (imgSrc != "NULL") {
          lightboxSources.push(store.API_PATH + imgSrc);
          localLightboxSources.push({
            src: store.API_PATH + imgSrc,
            idx: imgIndex,
          });
        }
      }

      const gallery = localLightboxSources.map((imgSource) => (
        <img
          key={imgSource.idx}
          src={imgSource.src}
          alt={solution.title}
          className="gallery-image mr-3 my-3"
          width="30%"
          onClick={() => showSlide(imgSource.idx)}
        />
      ));

      const contentHtml = [
        {
          html: solution.DESCRIPTION,
          title: `${store.translations.industry_overview}`,
        },
        {
          html: solution.PROBLEMS,
          title: `${store.translations.problems_solutions}`,
        },
        {
          html: solution.PLATFORMLINKS,
          title: `${store.translations.tab_platforms}`,
        },
        {
          html: solution.PROJECTLINKS,
          title: `${store.translations.tab_projects}`,
        },
      ];
      let projects = store.pages.find((platform) => {
        return platform.id === "PROJECTS";
      });

      let displayProjects;
      if (projects && solution.PROJECTLINKS) {
        let SolutionProjects = solution.PROJECTLINKS.split(", ").map((item) => {
          return projects.children.filter((itm) => {
            return (
              itm.id ===
              store.findById(item).split(" ").join("-").split("/").join("-")
            );
          });
        });
        displayProjects = SolutionProjects.map((project, i) => {
          return (
            <Col key={i} md={6} sm={6} xs={6} className="mb-4 d-flex">
              <a
                href={"/Projects/" + project[0].id}
                className="card-item project-card"
              >
                <Card className="">
                  <div className="image-holder">
                    <CardImg
                      alt={project[0].title}
                      top
                      width="100"
                      src={store.API_PATH + project[0].ICON}
                    ></CardImg>
                  </div>
                  <CardBody>
                    <CardTitle className="text-center">
                      {project[0].title}
                    </CardTitle>
                  </CardBody>
                </Card>
              </a>
            </Col>
          );
        });
      }
      return (
        <div className="page mt-5">
          <Head>
            <title>
              {metatag.title} - {solution.title}
            </title>
            <meta name="description" content={metatag.description} />
            <meta name="keywords" content={metatag.keywords} />
            <meta
              property="og:title"
              content={metatag.title + " - " + solution.title}
            />
            <meta property="og:url" content={metatag.page_url + solution.id} />
          </Head>
          <Container>
            <Row className="mb-4">
              <Col md={{ size: 6, offset: 3 }} sm={{ size: 12, offset: 0 }}>
                <div className="breadcrumbs mb-4">
                  <a href="/Services">Services </a>
                  <span>/ By Solution</span>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={{ size: 3 }} sm={{ size: 12 }} className="text-right">
                <img
                  src={store.API_PATH + solution.icon}
                  alt={solution.title}
                  className="center-sm-image"
                  width="120"
                />
              </Col>
              <Col
                md={{ size: 6 }}
                sm={{ size: 12 }}
                className="center-sm-text"
              >
                <h2 className="h1 dark-blue-text mb-4 font-weight-normal">
                  {solution.title}
                </h2>
                <p className="h4 light-blue-text font-weight-light ">
                  {solution.SUBTITLE}
                </p>
              </Col>
            </Row>

            <div className="nobordered-left-tabs">
              <div className="tabs-sticky">
                <Nav tabs>
                  <Scrollspy
                    items={["item-1", "item-2", "item-3", "item-4"]}
                    currentClassName="active-content-tab"
                  >
                    {contentHtml.map((content, index) => {
                      const tabId = index + 1;
                      if (
                        content.html &&
                        content.html !== "" &&
                        content.html !== "NULL"
                      ) {
                        return (
                          <NavItem key={"nav-i-" + index}>
                            <NavLink
                              key={"nav-l-" + index}
                              onClick={() => {
                                activateOverviewTab(`${tabId}`);
                              }}
                            >
                              <div
                                onClick={() =>
                                  scrollIntoView("item-" + (index + 1))
                                }
                              >
                                {content.title}
                              </div>
                            </NavLink>
                          </NavItem>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Scrollspy>
                </Nav>
              </div>

              <div className="content-sticky">
                <Scrollspy
                  items={["test-1", "test-2", "test-3", "test-4"]}
                  currentClassName="active-content-tab"
                >
                  <div id="test-1">
                    <hr className="inner-space mb-2 mt-2 show-mobile" />
                    <div id="item-1">
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={descrHtml}
                      ></div>

                      {gallery}
                      <FsLightbox
                        toggler={isVisible}
                        slide={slide}
                        sources={lightboxSources}
                        type="image"
                      />

                      <hr className="inner-space" />
                    </div>
                  </div>

                  <div id="test-2">
                    <div
                      id="item-2"
                      className={
                        activeId === 1 ? "text-center " : "text-center"
                      }
                    >
                      <div className="pt-3">
                        <Row>
                          <Col
                            md={{ size: 12 }}
                            sm={{ size: 12 }}
                            xs={{ size: 12 }}
                            className="h5 mb-4 dark-blue-text font-serif font-weight-normal"
                          >
                            {store.translations.problems_versus}
                          </Col>
                          <Col
                            md={{ size: 6 }}
                            sm={{ size: 6 }}
                            xs={{ size: 6 }}
                          >
                            <img
                              src="/images/icons/solutions.svg"
                              alt="problems"
                              width="80"
                              className="d-block mx-auto"
                            />
                            <small className="light-blue-text">
                              {store.translations.common}
                            </small>
                            <div className="dark-blue-text font-serif mb-3">
                              {store.translations.problems}
                            </div>
                          </Col>
                          <Col
                            md={{ size: 6 }}
                            sm={{ size: 6 }}
                            xs={{ size: 6 }}
                          >
                            <img
                              src="/images/icons/problems.svg"
                              alt="solutions"
                              width="80"
                              className="d-block mx-auto"
                            />
                            <small className="light-blue-text">
                              {store.translations.our}
                            </small>
                            <div className="dark-blue-text font-serif mb-3 ">
                              {store.translations.solutions}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      {renderProblemLinks(solution.PROBLEMS)}
                      <hr className="inner-space" />
                    </div>
                  </div>
                  <div id="test-3">
                    <div id="item-3">
                      <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                        {store.translations.tabs_platforms} {solution.title}
                      </div>
                      <div className="">
                        {renderPlatformLinks(solution.PLATFORMLINKS)}
                      </div>
                      <hr className="inner-space" />
                    </div>
                  </div>
                  <div id="test-4" className="mb-5">
                    <div id="item-4">
                      <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                        {store.translations.tabs_projects} {solution.title}{" "}
                      </div>
                      <div className="page projects">
                        <Container className="mt-5">
                          <Row>{displayProjects && displayProjects}</Row>
                        </Container>
                      </div>
                      {/*<hr className="inner-space" />*/}
                    </div>
                  </div>
                </Scrollspy>
              </div>
            </div>
          </Container>
          {cookies.get("Counter") < 3 && (
            <div className="bookPage booknowWidget">
              <PageMainHeader
                stars={
                  <div>
                    <span className="star-item star-1"></span>
                    <span className="star-item star-2"></span>
                    <span className="star-item star-3"></span>
                    <span className="star-item star-4"></span>
                    <span className="star-item star-5"></span>
                    <span className="star-item star-6"></span>
                  </div>
                }
                bgcolor={"light-blue-bg"}
                header={
                  <div>
                    <div className="title pt-3">
                      {store.translations.booknow_title}
                    </div>
                    <div>
                      <a href="/BookPage">
                        <button className="btn-tab light-grey-bg dark-blue-text">
                          {store.translations.booknow_btn}
                        </button>
                      </a>
                    </div>
                  </div>
                }
                imageleft={
                  <img
                    src="/images/illustrations/bookNow-left.png"
                    alt="image-left"
                    className="image image-left"
                  />
                }
                imageright={
                  <img
                    src="/images/illustrations/bookNow-right.png"
                    alt="image-right"
                    className="image image-right"
                  />
                }
              />
            </div>
          )}
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default observer(SolutionPage);
