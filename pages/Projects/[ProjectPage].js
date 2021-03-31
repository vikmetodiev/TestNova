import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import Scrollspy from "react-scrollspy";
import FsLightbox from "fslightbox-react";
import { useRootStore } from "../../provider";
import { withRouter } from "next/router";
import renderClientLinks from "../../public/renderClients";
import renderPlatformLinks from "../../public/renderPlatforms";
const ProjectPage = () => {
  const store = useRootStore();

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

  const lightboxSources = [];

  const scrollIntoView = (refName) => {
    const element = document.getElementById(refName);
    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element && refName !== "item-1" ? element.offsetTop + 385 : 0,
      });
    }, 100);
  };

  const renderIndustryLinks = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        return (
          <div key={i} className="mb-2">
            <Link
              href={{
                pathname: "/ServicesByIndustry/[slug]",
                query: {
                  slug: found.split(" ").join("-").split("/").join("-"),
                },
              }}
              key={item}
            >
              <a className="link">{found ? found : item}</a>
            </Link>
          </div>
        );
      }
    });
  };

  const renderPartnerTitles = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);

        return (
          <div key={i} className="mb-2">
            <Link
              href={{
                pathname: "/Partners/[slug]",
                query: {
                  slug: found.split(" ").join("-").split("/").join("-"),
                },
              }}
              key={item}
            >
              <a className="link">{found ? found : item}</a>
            </Link>
          </div>
        );
      }
    });
  };

  const renderPhaseTitles = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        return (
          <div key={i} className="mb-2">
            {found ? found : item}
          </div>
        );
      }
    });
  };

  const renderSimilarProjects = (link) => {
    const links = link.split(", ");
    return links.map((item, i) => {
      if (item.includes("ins__")) {
        return;
      } else {
        let found = store.findById(item);
        let findProject = store.pages.find((item) => {
          return item.id === "PROJECTS";
        });
        let projectData = findProject.children.find((itm) => {
          return itm.id === found.split(" ").join("-").split("/").join("-");
        });
        return (
          <Col key={i} md={4} sm={4} xs={6} className="mb-4 d-flex">
            <a
              href={
                "/Projects/" + found.split(" ").join("-").split("/").join("-")
              }
              key={item}
              className="card-item project-card similar"
            >
              <Card>
                <div className="image-holder">
                  <CardImg
                    alt={projectData.title}
                    top
                    width="100"
                    src={projectData ? store.API_PATH + projectData.ICON : item}
                  />
                </div>
                <CardBody className="px-3 pt-2 pb-3">
                  <CardTitle className="text-center">
                    {projectData ? projectData.title : item}
                  </CardTitle>
                </CardBody>
              </Card>
            </a>
          </Col>
        );
      }
    });
  };
  let projectId = decodeURIComponent(decodeURIComponent(path[path.length - 1]));
  if(projectId.length === 0){
    projectId = decodeURIComponent(decodeURIComponent(path[path.length - 2]))
  }
  let findProject = store.pages.find((project) => {
    return project.id === "PROJECTS";
  });

  if (path.length > 0) {
    if (findProject) {
      findProject = findProject.children;
      const projectFromStore = findProject.find(
        (project) => project.id === projectId
      );

      let project = JSON.parse(JSON.stringify(projectFromStore));

      project.description = { __html: project.DESCRIPTION };

      //const { activeTab } = state;
      const activeTab = store.getProjectTab(projectId);

      if (!project.HIGHLIGHTS) {
        project.HIGHLIGHTS = "";
      }
      let highlights = { __html: project.HIGHLIGHTS };
      let summary = { __html: project.summary };

      if (!project.REQUIREMENTS) {
        project.REQUIREMENTS = "";
      }
      let requirements = { __html: project.REQUIREMENTS };

      if (!project.GOALS) {
        project.GOALS = "";
      }
      let goals = { __html: project.GOALS };

      if (!project.CHALLENGES) {
        project.CHALLENGES = "";
      }
      let challenges = { __html: project.CHALLENGES };
      if (!project.RESULTS) {
        project.RESULTS = "";
      }
      let results = { __html: project.RESULTS };
      if (!project.Client_relation) {
        project.Client_relation = "";
      }
      if (!project.PLATFORM) {
        project.PLATFORM = "";
      }
      if (!project.INDUSTRY) {
        project.INDUSTRY = "";
      }
      if (!project.SIMILAR_PROJECTS) {
        project.SIMILAR_PROJECTS = "";
      }

      let testimonials = { __html: project.TESTIMONIALS };
      let platformLength = project.PLATFORM.split(", ");
      let similarProjLength = project.SIMILAR_PROJECTS.split(", ");

      let metatag = store.metatags.find((item) => {
        return item.name === "Projects";
      });

      let localLightboxSources = [];

      for (let imgIndex = 1; imgIndex < 4; ++imgIndex) {
        let imgSrc = project["img" + imgIndex]
          ? project["img" + imgIndex]
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
          alt={project.title}
          className="gallery-image mr-3 my-3"
          width="30%"
          onClick={() => showSlide(imgSource.idx)}
        />
      ));

      return (
        <div className="page mt-4">
          <Head>
            <title>Novarto Project - {project.title}</title>
            <meta name="description" content={project.short_description} />
            <meta name="keywords" content={metatag.keywords} />
            <meta
              property="og:title"
              content={("Novarto Project - ", project.title)}
            />
          </Head>
          <Container>
            <Row className="mb-4">
              <Col md={3}>&nbsp;</Col>
              <Col md={{ size: 6 }} sm={{ size: 12 }}>
                <div className="breadcrumbs mb-4">
                  <Link href={{ pathname: "/Projects" }}>Projects</Link>
                </div>

                <h2 className="h3 dark-blue-text mb-4" id="item-1">
                  {project.title}
                </h2>

                <div
                  className="paragraphs"
                  dangerouslySetInnerHTML={project.DESCRIPTION}
                ></div>
              </Col>
            </Row>

            <div className="nobordered-left-tabs">
              <div className="tabs-sticky">
                <Nav tabs>
                  <Scrollspy
                    items={[
                      "item-1",
                      "item-2",
                      "item-3",
                      "item-4",
                      "item-5",
                      "item-6",
                      "item-7",
                    ]}
                    currentClassName="active-content-tab"
                  >
                    {project.summary.length === 0 ||
                    project.summary === "NULL" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-1")}>
                          {store.translations.overview_text}
                        </a>
                        {/*<img src={require('../../images/overview-40x40.png')} alt="project overview"/>*/}
                        {/* <img src="http://api.novarto.com/api/images/svg/overview40x40.svg" width="100" alt="overview"/>*/}
                      </NavItem>
                    )}
                    {project.HIGHLIGHTS.length === 0 ||
                    project.HIGHLIGHTS === "NULL" ||
                    project.HIGHLIGHTS === "<p>&nbsp;</p>" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-2")}>
                          {store.translations.project_highlights}
                        </a>
                        {/*<img src={require('../../images/tabs-project-highlights.png')} alt="project highlights"/>*/}
                        {/* <img src="http://api.novarto.com/api/images/svg/project-highlights40x40.svg" width="100" alt="project highlights"/> */}
                      </NavItem>
                    )}
                    {project.REQUIREMENTS.length === 0 ||
                    project.REQUIREMENTS === "NULL" ||
                    project.REQUIREMENTS === "<p>&nbsp;</p>" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-3")}>
                          {store.translations.business_requirements}
                        </a>
                        {/*<img src="http://api.novarto.com/api/images/svg/business-requirements40x40.svg" width="100" alt="business requirements"/> */}
                      </NavItem>
                    )}
                    {project.GOALS.length === 0 ||
                    project.GOALS === "NULL" ||
                    project.GOALS === "<p>&nbsp;</p>" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-4")}>
                          {" "}
                          {store.translations.project_tabs_users}
                        </a>
                        {/*<img src="http://api.novarto.com/api/images/svg/user-goals40x40.svg" width="100" alt="user goals"/> */}
                      </NavItem>
                    )}
                    {project.CHALLENGES.length === 0 ||
                    project.CHALLENGES === "NULL" ||
                    project.CHALLENGES === "<p>&nbsp;</p>" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-5")}>
                          {store.translations.project_challenges}
                        </a>
                        {/* <img src="http://api.novarto.com/api/images/svg/challenges40x40.svg" width="100" alt="challenges"/> */}
                      </NavItem>
                    )}
                    {project.RESULTS.length === 0 ||
                    project.RESULTS === "NULL" ||
                    project.RESULTS === "<p>&nbsp;</p>" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-6")}>
                          {" "}
                          {store.translations.project_results}
                        </a>
                        {/*<img src="http://api.novarto.com/api/images/svg/results40x40.svg" width="100" alt="project results"/> */}
                      </NavItem>
                    )}
                    {!project.TESTIMONIALS ||
                    project.TESTIMONIALS === "NULL" ||
                    project.TESTIMONIALS === "<p>&nbsp;</p>" ? (
                      ""
                    ) : (
                      <NavItem>
                        <a onClick={() => scrollIntoView("item-7")}>
                          {store.translations.project_testimonial}
                        </a>
                        {/* <img src="http://api.novarto.com/api/images/svg/testimonial40x40.svg" width="100" alt="testimonial"/> */}
                      </NavItem>
                    )}
                  </Scrollspy>
                </Nav>
              </div>

              <div className="content-sticky ">
                <Scrollspy
                  items={[
                    "test-1",
                    "test-2",
                    "test-3",
                    "test-4",
                    "test-5",
                    "test-6",
                    "test-7",
                  ]}
                  currentClassName="active-content-tab"
                >
                  <div id="test-1">
                    <div
                      className="paragraphs pt-3"
                      dangerouslySetInnerHTML={summary}
                    ></div>
                    {gallery}
                    <FsLightbox
                      toggler={isVisible}
                      slide={slide}
                      sources={lightboxSources}
                      type="image"
                    />
                  </div>
                  {project.HIGHLIGHTS.length === 0 ||
                  project.HIGHLIGHTS === "NULL" ||
                  project.HIGHLIGHTS === "<p>&nbsp;</p>" ? (
                    ""
                  ) : (
                    <div id="test-2">
                      <div
                        id="item-2"
                        className="title-project-tabs text-center light-blue-text"
                      >
                        <img
                          src="http://api.novarto.com/api/images/svg/Project_highlights.svg"
                          width="100"
                          alt="project highlights"
                        />
                        <p className="light-blue-text mb-3 font-weight-bolder text-uppercase">
                          {store.translations.project_highlights}
                        </p>
                      </div>
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={highlights}
                      ></div>
                    </div>
                  )}
                  {project.REQUIREMENTS.length === 0 ||
                  project.REQUIREMENTS === "NULL" ||
                  project.REQUIREMENTS === "<p>&nbsp;</p>" ? (
                    ""
                  ) : (
                    <div id="test-3">
                      <div
                        id="test-3"
                        className="title-project-tabs text-center light-blue-text"
                      >
                        <img
                          src="http://api.novarto.com/api/images/svg/Business_Requirements.svg"
                          width="100"
                          alt="business requirements"
                        />
                        <p className="light-blue-text mb-3 font-weight-bolder text-uppercase">
                          {store.translations.business_requirements}
                        </p>
                      </div>
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={requirements}
                      ></div>
                    </div>
                  )}
                  {project.GOALS.length === 0 ||
                  project.GOALS === "NULL" ||
                  project.GOALS === "<p>&nbsp;</p>" ? (
                    ""
                  ) : (
                    <div id="test-4">
                      <div
                        id="test-4"
                        className="title-project-tabs text-center light-blue-text"
                      >
                        <img
                          src="http://api.novarto.com/api/images/svg/User_Goals.svg"
                          width="100"
                          alt="user goals"
                        />
                        <p className="light-blue-text mb-3 font-weight-bolder text-uppercase">
                          {store.translations.project_tabs_users}
                        </p>
                      </div>
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={goals}
                      ></div>
                    </div>
                  )}
                  {project.CHALLENGES.length === 0 ||
                  project.CHALLENGES === "NULL" ||
                  project.CHALLENGES === "<p>&nbsp;</p>" ? (
                    ""
                  ) : (
                    <div id="test-5">
                      <div
                        id="item-5"
                        className="title-project-tabs text-center light-blue-text"
                      >
                        <img
                          src="http://api.novarto.com/api/images/svg/Challenges.svg"
                          width="100"
                          alt="challenges"
                        />
                        <p className="light-blue-text mb-3 font-weight-bolder text-uppercase">
                          {store.translations.project_challenges}
                        </p>
                      </div>
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={challenges}
                      ></div>
                    </div>
                  )}
                  {project.RESULTS.length === 0 ||
                  project.RESULTS === "NULL" ||
                  project.RESULTS === "<p>&nbsp;</p>" ? (
                    ""
                  ) : (
                    <div id="test-6">
                      <div
                        id="item-6"
                        className="title-project-tabs text-center light-blue-text"
                      >
                        <img
                          src="http://api.novarto.com/api/images/svg/Results.svg"
                          width="100"
                          alt="project results"
                        />
                        <p className="light-blue-text mb-3 font-weight-bolder text-uppercase">
                          {store.translations.project_results}
                        </p>
                      </div>
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={results}
                      ></div>
                    </div>
                  )}
                  {!project.TESTIMONIALS ||
                  project.TESTIMONIALS === "NULL" ||
                  project.TESTIMONIALS === "<p>&nbsp;</p>" ? (
                    ""
                  ) : (
                    <div id="test-7">
                      <div
                        id="item-7"
                        className="title-project-tabs text-center light-blue-text"
                      >
                        <img
                          src="http://api.novarto.com/api/images/svg/Testimonial.svg"
                          width="100"
                          alt="testimonial"
                        />
                        <p className="light-blue-text mb-3 font-weight-bolder text-uppercase">
                          {store.translations.project_testimonial}
                        </p>
                      </div>
                      <div
                        className="paragraphs pt-3"
                        dangerouslySetInnerHTML={testimonials}
                      ></div>
                    </div>
                  )}

                  <Col
                    sm={{ size: 2 }}
                    xs={{ size: 12 }}
                    className="ext-links mt-3 pl-0"
                  >
                    {!project.PARTNER || project.PARTNER === "NULL" ? (
                      ""
                    ) : (
                      <div>
                        <small className="text-uppercase mb-2 d-block">
                          {store.translations.partner}
                        </small>
                        <div>{renderPartnerTitles(project.PARTNER)}</div>
                        <div className="my-4"></div>{" "}
                      </div>
                    )}
                    {project.Client_relation.length === 0 ||
                    project.Client_relation === "NULL" ? (
                      ""
                    ) : (
                      <div>
                        <small className="text-uppercase mb-2 d-block">
                          {store.translations.client}
                        </small>
                        <div>{renderClientLinks(project.Client_relation)}</div>
                        <div className="my-4"></div>{" "}
                      </div>
                    )}
                    {project.PLATFORM.length === 0 ||
                    project.PLATFORM === "NULL" ? (
                      ""
                    ) : (
                      <div>
                        <small className="text-uppercase mb-2 d-block">
                          {platformLength.length === 1
                            ? `${store.translations.platforms_title}`
                            : `${store.translations.tab_platforms}`}
                        </small>
                        <div>{renderPlatformLinks(project.PLATFORM)}</div>
                      </div>
                    )}
                    <div className="my-4"></div>
                    {project.INDUSTRY.length === 0 ||
                    project.INDUSTRY === "NULL" ? (
                      ""
                    ) : (
                      <div>
                        <small className="text-uppercase mb-2 d-block">
                          {store.translations.industry}
                        </small>
                        <div>{renderIndustryLinks(project.INDUSTRY)}</div>
                      </div>
                    )}
                    <div className="my-4"></div>
                    {project.PHASES.length === 0 ||
                    project.PHASES === "NULL" ? (
                      ""
                    ) : (
                      <div>
                        <small className="text-uppercase mb-2 d-block">
                          {store.translations.project_phases}
                        </small>
                        <div>{renderPhaseTitles(project.PHASES)}</div>
                      </div>
                    )}
                  </Col>
                </Scrollspy>
              </div>
            </div>

            {project.SIMILAR_PROJECTS.length === 0 ||
            project.SIMILAR_PROJECTS === "NULL" ? (
              ""
            ) : (
              <Row>
                <Col md={3}>&nbsp;</Col>
                <Col
                  md={{ size: 6 }}
                  sm={{ size: 12 }}
                  className="mt-5 pt-5 border-top similar-proj"
                >
                  <Row>
                    <p className="h4 dark-blue-text font-weight-normal ml-3 mb-4 d-block clearfix">
                      Check Our{" "}
                      <span className="font-weight-bold">
                        {similarProjLength.length === 1
                          ? "Similar Project"
                          : "Similar Projects"}
                      </span>
                    </p>
                  </Row>
                  <Row>{renderSimilarProjects(project.SIMILAR_PROJECTS)}</Row>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default withRouter(observer(ProjectPage));
