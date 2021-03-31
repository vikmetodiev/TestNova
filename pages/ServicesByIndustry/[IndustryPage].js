import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import Link from "next/link";
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
import renderPlatformLinks from "../../public/renderPlatforms"
const IndustryPage = () => {
  const store = useRootStore();

  const [activeTab, setActiveTab] = useState("1");
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
  let lightboxCounter = 0;

  const scrollIntoView = (refName) => {
    const element = document.getElementById(refName);
    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element && refName !== "item-1" ? element.offsetTop + 370 : 0,
      });
    }, 100);
  };

  const activateOverviewTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  let industryId = path[path.length - 2];
  let findIndustry = store.pages.find((industry) => {
    return industry.id === "INDUSTRY";
  });
  let metatag = store.metatags.find((item) => {
    return item.name === "IndustryPage";
  });

  if (path.length > 0) {
    if (findIndustry) {
      findIndustry = findIndustry.children;
      let industry = findIndustry.find(
        (industry) => industry.id === industryId
      );

      let descrHtml = { __html: industry.description };

      const contentHtml = [
        { html: industry.description, title: "Industry Overview" },
        { html: industry.INDUSTRY_PROBLEMS, title: "Problems" },
        { html: industry.INDUSTRY_PLATFORMS, title: "Platforms" },
        { html: industry.PROJECTS, title: "Projects" },
      ];
      if (!industry.INDUSTRY_PROBLEMS) {
        industry.INDUSTRY_PROBLEMS = "";
      }

      let localLightboxSources = [];

      for (let imgIndex = 1; imgIndex < 4; ++imgIndex) {
        let imgSrc = industry["img" + imgIndex]
          ? industry["img" + imgIndex]
          : "NULL";
        if (imgSrc != "NULL") {
          lightboxSources.push(store.API_PATH + imgSrc);
          localLightboxSources.push({
            src: store.API_PATH + imgSrc,
            idx: imgIndex,
          });
        }
      }

      const gallery = localLightboxSources.map((imgSource, i) => (
        <img
          key={i}
          src={imgSource.src}
          alt={industry.title}
          className="gallery-image mr-3 my-3"
          width="30%"
          onClick={() => showSlide(imgSource.idx)}
        />
      ));

      let projects = store.pages.find((platform) => {
        return platform.id === "PROJECTS";
      });

      let displayProjects;
      if (projects && industry.PROJECTS) {
        let IndustryProjects = industry.PROJECTS.split(", ").map((item) => {
          return projects.children.filter((itm) => {
            return (
              itm.id ===
              store.findById(item).split(" ").join("-").split("/").join("-")
            );
          });
        });
        displayProjects = IndustryProjects.map((project, i) => {
          return (
            <Col key={i} md={6} sm={6} xs={6} className="mb-4 d-flex">
              <Link
                href={{
                  pathname: "/Projects/[slug]",
                  query: { slug: project[0].id },
                }}
              >
                <a className="card-item project-card">
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
              </Link>
            </Col>
          );
        });
      }
      return (
        <div className="page mt-5">
          <Head>
            <title>
              {metatag.title} - {industry.title}
            </title>
            <meta name="description" content={metatag.description} />
            <meta name="keywords" content={metatag.keywords} />
            <meta
              property="og:title"
              content={metatag.title + " - " + industry.title}
            />
            <meta property="og:url" content={metatag.page_url + industry.id} />
          </Head>
          <Container>
            <Row className="mb-4">
              <Col md={{ size: 6, offset: 3 }} sm={{ size: 12, offset: 0 }}>
                <div className="breadcrumbs mb-4">
                  <Link href="/Services">Services </Link>
                  <span>/ By Industry</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 3 }} sm={{ size: 12 }} className="text-right">
                <img
                  src={store.API_PATH + industry.icon}
                  alt={industry.title}
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
                  {industry.title}
                </h2>
                <p className="h4 light-blue-text font-weight-light mb-4">
                  {industry.SHORTDESCRIPTION}
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
                      const linkOpen = "#" + index;
                      if (
                        content.html &&
                        content.html !== "" &&
                        content.html !== "NULL" &&
                        content.html !== "<p>&nbsp;</p>"
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
              <div className="content-sticky ">
                <Scrollspy
                  items={["test-1", "test-2", "test-3", "test-4"]}
                  currentClassName="active-content-tab"
                >
                  <div id="test-1">
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
                  {industry.INDUSTRY_PROBLEMS !== "NULL" &&
                    industry.INDUSTRY_PROBLEMS.length > 0 && (
                      <div id="test-3">
                        <div id="item-3">
                          <div className="pt-3">
                            <div>
                              <div className="text-center">
                                {industry.INDUSTRY_PROBLEMS}
                              </div>
                              <hr className="inner-space" />
                            </div>
                            )
                          </div>
                        </div>
                      </div>
                    )}
                  <div id="test-3">
                    <div id="item-3">
                      <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                        {store.translations.tabs_platforms} {industry.title}
                      </div>
                      <div className="">
                        {renderPlatformLinks(industry.INDUSTRY_PLATFORMS)}
                      </div>
                      <hr className="inner-space" />
                    </div>
                  </div>
                  <div id="test-4">
                    <div id="item-4">
                      <div className=" pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                        {store.translations.tabs_projects} {industry.title}
                      </div>
                      <div className="page projects">
                        <Container className="mt-5">
                          <Row>{displayProjects && displayProjects}</Row>
                        </Container>
                      </div>
                      <hr className="inner-space" />
                    </div>
                  </div>
                </Scrollspy>
              </div>
            </div>
          </Container>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default observer(IndustryPage);
