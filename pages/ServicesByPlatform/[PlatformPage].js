import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
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
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Scrollspy from "react-scrollspy";
import FsLightbox from "fslightbox-react";
import ReactPlayer from "react-player";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import validator from "validator";
import BookPageModal from "../../public/BookPageModal";
import LeftArrow from "../../public/videosCarousel/LeftArrow";
import RightArrow from "../../public/videosCarousel/RightArrow";
import { faTimes,faChevronLeft,faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useRootStore } from "../../provider";
const cookies = new Cookies();
let date = new Date();
let minutes = date.getMinutes();
let expiry = date.setTime(date.getTime() + minutes * 60 * 1000);

if (date.toLocaleDateString() !== cookies.get("Time")) {
  cookies.set(
    "Time",
    new Date().toLocaleDateString(),
    { path: "/" },
    { expires: expiry }
  );
}

if (isNaN(cookies.get("Counter"))) {
  cookies.set("Counter", 0, { path: "/" });
}
const PlatformPage = (props) => {
  const store = useRootStore();

  const [openModal, setOpenModal] = useState(false);
  const [checkMobile, setCheckMobile] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const [slide, setSlide] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zoom, setZoom] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showCaptcha, setCaptcha] = useState(false);
  const [path, setPath] = useState("");

  const showSlide = (slide) => {
    setSlide(slide);
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

  useEffect(() => {
    setPath(window?.location.pathname.split("/"));
  }, [])

  useEffect(() => {
    setCheckMobile(window.innerWidth <= 760);
  }, [checkMobile]);

  let localLightboxSources = [];

  useEffect(() => {
    lightboxSources = [];
    localLightboxSources = [];
  }, [isVisible]);

  const toggle = () => {
    setOpenModal(!openModal);
  };

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (event) => {
    if (event && showCaptcha) {
      if (date.toLocaleDateString() === cookies.get("Time")) {
        cookies.set("Counter", parseInt(cookies.get("Counter")) + 1, {
          path: "/",
        });
      }
      if (email.length > 0 && name.length > 0) {
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append(
          "body",
          `${
            "Hello <br> " +
            "You got a new Requested demo from: " +
            name +
            "<br> E-mail: " +
            email +
            "<br> Novarto Team"
          }`
        );
        bodyFormData.append("subject", "Request Demo");
        axios
          .post("https://novarto.com/ws/webform.php", bodyFormData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((response) => {
            setOpenModal(true);
            setCaptcha(false);
          })
          .catch((e) => {
            setOpenModal(true);
            setCaptcha(false);
          });
      }
    }
  };
  const goToPrevSlide = (platform) => {
    let index = activeIndex;
    let length = platform.videos.split(", ").length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    setActiveIndex(index);
    setPaused(false);
  };
  const goToNextSlide = (platform) => {
    let index = activeIndex;
    let length = platform.videos.split(", ").length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    setActiveIndex(index);
    setPaused(false);
  };

  let platformId = path[path.length - 2];
  let findPlatform = store.pages.find((platform) => {
    return platform.id === "PLATFORMS";
  });

  let metatag = store.metatags.find((item) => {
    return item.name === "PlatformPage";
  });
  if (path.length > 0) {
    if (findPlatform) {
      findPlatform = findPlatform.children;
      let platform = findPlatform.find(
        (platform) => platform.id === platformId
      );
      console.log(platform);

      let descrHtml = { __html: platform.description };
      let featuresHtml = { __html: platform.FEATURES };
      let benefitHtml = { __html: platform.BENEFITS };
      let objectiveHtml = { __html: "" };
      let extlinkHtml = { __html: platform.EXT_LINK };
      let sapLogo = (
        <img src="/images/SAP-logo.png" alt="SAP" width="100" />
      );
      let novartoLogo = (
        <img
          src="/images/novarto-logo-blue.png"
          alt="Novarto"
          width="150"
        />
      );

      let ownerLinks = "";
      let extLinks = "";

      if (checkMobile) {
        ownerLinks = {
          html: platform.owner,
          title: `${store.translations.owner}`,
        };
        extLinks = {
          html: platform.EXT_LINK,
          title: `${store.translations.external_link}`,
        };
      }

      const contentHtml = [
        {
          html: platform.description,
          title: `${store.translations.overview_text}`,
        },
        {
          html: platform.FEATURES,
          title: `${store.translations.key_features}`,
        },
        {
          html: platform.BENEFITS,
          title: `${store.translations.benefits}`,
        },
        {
          html: platform.OBJECTIVES,
          title: `${store.translations.objectives}`,
        },
        {
          html: platform.PLATFORMS_PROJECTS,
          title: `${store.translations.project_title}`,
        },
        ownerLinks,
        extLinks,
      ];

      if (
        platform.OBJECTIVES &&
        platform.OBJECTIVES != "" &&
        platform.OBJECTIVES != "NULL"
      ) {
        objectiveHtml = { __html: platform.OBJECTIVES };
      }
      if (!platform.FEATURES) {
        platform.FEATURES = "";
      }
      if (!platform.BENEFITS) {
        platform.BENEFITS = "";
      }

      for (let imgIndex = 1; imgIndex < 4; ++imgIndex) {
        let imgSrc = platform["img" + imgIndex]
          ? platform["img" + imgIndex]
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
          alt={imgSource.src}
          className="gallery-image mr-3 my-3"
          width="30%"
          onClick={() => {
            setVisible(!isVisible);
            showSlide(imgSource.idx);
          }}
        />
      ));
      let iFrameStyles = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 11,
        height: "80vh",
        width: "80vw",
        opacity: "1",
      };
      let videos = platform.videos.split(", ");

      let projects = store.pages.find((platform) => {
        return platform.id === "PROJECTS";
      });

      let displayProjects;
      if (projects && platform.PLATFORMS_PROJECTS && platform.PLATFORMS_PROJECTS !== "NULL") {
        let platformProjects = platform.PLATFORMS_PROJECTS.split(", ").map(
          (item) => {
            return projects.children.filter((itm) => {
              return (
                itm.id ===
                store.findById(item).split(" ").join("-").split("/").join("-")
              );
            });
          }
        );
        displayProjects = platformProjects.map((project, i) => {
          return (
            <Col key={i} md={6} sm={6} xs={6} className="mb-4 d-flex">
              <Link
                href={{
                  pathname: "/Projects/[slug]",
                  query: { slug: "GiveGetService%2C-GGS-–-Development%2C-Evaluation-and-Implementation" },
                }}
              >
                <a className="card-item project-card">
                  <Card className="">
                    <div className="image-holder">
                      <CardImg
                        alt={project[0].id}
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
              {metatag.title} - {platform.name}
            </title>
            <meta name="description" content={metatag.description} />
            <meta name="keywords" content={metatag.keywords} />
            <meta
              property="og:title"
              content={metatag.title + " - " + platform.name}
            />
            <meta property="og:url" content={metatag.page_url + platform.id} />
          </Head>
          <Container>
            <Row className="mb-4">
              <Col md={{ size: 6, offset: 3 }} sm={{ size: 12, offset: 0 }}>
                <div className="breadcrumbs mb-4">
                  <Link href="/Services">Services </Link>
                  <span>/ By Platform</span>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={{ size: 3 }} sm={{ size: 12 }} className="text-right">
                <img
                  src={store.API_PATH + platform.Platform_icon}
                  alt={platform.name}
                  className="center-sm-image"
                  width="120"
                />
              </Col>
              <Col
                md={{ size: 6 }}
                sm={{ size: 12 }}
                className="center-sm-text"
              >
                <h2 className="h1 dark-blue-text mb-4">{platform.name}</h2>
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
                    {contentHtml.map((content, index) => {
                      const tabId = index + 1;
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
                                scrollIntoView("item-" + (index + 1));
                              }}
                              href="#"
                            >
                              {content.title}
                            </NavLink>
                          </NavItem>
                        );
                      } else {
                        return "";
                      }
                    })}
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
                  {platform.description.length > 0 &&
                  platform.description !== "NULL" &&
                  platform.description !== "<p>&nbsp;</p>" ? (
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
                          key={gallery}
                        />
                        <hr className="inner-space" />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {platform.FEATURES !== "NULL" &&
                  platform.FEATURES.length > 0 &&
                  platform.FEATURES !== "<p>&nbsp;</p>" ? (
                    <div id="test-2">
                      <div id="item-2">
                        <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                          {store.translations.key_features}
                        </div>
                        <div
                          className="paragraphs"
                          dangerouslySetInnerHTML={featuresHtml}
                        ></div>
                        <hr className="inner-space" />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {platform.BENEFITS !== "NULL" &&
                  platform.BENEFITS.length > 0 &&
                  platform.BENEFITS !== "<p>&nbsp;</p>" ? (
                    <div id="test-3">
                      <div id="item-3">
                        <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                          {store.translations.benefits}
                        </div>
                        <div
                          className="paragraphs"
                          dangerouslySetInnerHTML={benefitHtml}
                        ></div>
                        {/*<hr className="inner-space"/>*/}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {platform.OBJECTIVES !== "NULL" &&
                  platform.OBJECTIVES.length > 0 &&
                  platform.OBJECTIVES !== "<p>&nbsp;</p>" ? (
                    <div id="test-4">
                      <div id="item-4">
                        <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                          {store.translations.objectives}
                        </div>
                        <div
                          className="paragraphs"
                          dangerouslySetInnerHTML={objectiveHtml}
                        ></div>
                        <hr className="inner-space" />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {platform.PLATFORMS_PROJECTS !== "NULL" &&
                  platform.PLATFORMS_PROJECTS.length > 0 ? (
                    <div id="test-5">
                      <div id="item-5">
                        <div className="pt-3 h5 mb-4 dark-blue-text font-serif font-weight-normal">
                          {store.translations.tabs_projects} {platform.name}
                        </div>
                        <div className="page projects">
                          <Container className="mt-5">
                            <Row>{displayProjects && displayProjects}</Row>
                          </Container>
                        </div>
                        <hr className="inner-space" />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="ext-links mt-3">
                    {cookies.get("Counter") < 3 &&
                      platform.demo_btn.length > 0 && (
                        <button
                          className="btn-tab dark-blue-bg text-white text-uppercase font-weight-light py-2 mb-4"
                          onClick={() => handleScroll()}
                        >
                          {platform.demo_btn}
                        </button>
                      )}

                    {platform.owner !== "NULL" && platform.owner.length > 0 ? (
                      <div id="test-6">
                        <small className="text-uppercase mt-4 ">
                          {store.translations.owner}
                        </small>
                        <div id="item-6">
                          <div className="pt-3">
                            {platform.owner === "SAP" ? sapLogo : novartoLogo}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {platform.EXT_LINK !== "NULL" &&
                    platform.EXT_LINK.length > 0 ? (
                      <div id="test-7">
                        <hr className="inner-space mb-2 mt-4" />
                        <small className="text-uppercase mt-4">
                          {store.translations.external_link}
                        </small>
                        <div id="item-7">
                          <div
                            className="pt-3"
                            dangerouslySetInnerHTML={extlinkHtml}
                          ></div>
                          {/*<hr className="inner-space show-mobile" />*/}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {platform.videos && (
                      <div>
                        <hr className="inner-space mb-2 mt-4" />
                        <small className={zoom ? "d-none" : "mt-4 mb-3 d-flex"}>
                          <span className="text-uppercase">
                            {store.translations.digital_library}
                          </span>
                          <span className="ml-auto">
                            {activeIndex + 1} of{" "}
                            {platform.videos &&
                              platform.videos.split(", ").length}
                          </span>
                        </small>

                        <div
                          className={zoom ? "videos-background" : ""}
                          onClick={() => setZoom(false)}
                        ></div>
                        <div className="slider slider-videos">
                          <div className="slider-items">

                            <FontAwesomeIcon icon={faChevronLeft} onClick={() => goToPrevSlide(platform)} className={zoom ? "left-arrow" : "left-arrow-full"}/>
                            <FontAwesomeIcon
                              icon={faTimes}
                              className={
                                zoom ? "closing-videos-icon" : "d-none"
                              }
                              onClick={() => setZoom(false)}
                            />

                            <div className="slider-text">
                              {videos.map((video, index) => (
                                <div
                                  className={
                                    index === activeIndex
                                      ? "carousel-active"
                                      : "carousel-inactive"
                                  }
                                  key={index}
                                >
                                  <ReactPlayer
                                    url={video}
                                    height={zoom ? "60%" : "100%"}
                                    width={zoom ? "60%" : "100%"}
                                    style={zoom ? iFrameStyles : {}}
                                    playing={
                                      index === activeIndex && zoom && paused
                                    }
                                    controls
                                    onPlay={() => {
                                      setZoom(true);
                                      setPaused(true);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} onClick={() => goToNextSlide(platform)} className={zoom ? "right-arrow" : "right-arrow-full"}/>
                          </div>
                        </div>
                        <div className="mt-3"></div>
                      </div>
                    )}

                    {platform.contact_name && platform.contact_name.length > 0 && (
                      <div>
                        <hr
                          className={zoom ? "d-none" : "inner-space mb-2 mt-4"}
                        />
                        <small className="text-uppercase mt-4">
                          {store.translations.footer_contact}
                        </small>
                        <div className="overflow-hidden">
                          <img
                            src={store.API_PATH + platform.contact_image}
                            alt={`${platform.contact_name}`}
                            title={`${platform.contact_name}`}
                            className="float-right mt-3"
                            width="50"
                          />
                          <div className="font-weight-bold mt-3 mb-2">
                            {platform.contact_name}
                          </div>
                          <small className="d-block mb-2">
                            {platform.contact_spec}
                          </small>
                          <small className="d-block mb-1">
                            <a
                              href={`tel:${platform.contact_phone}`}
                              className=""
                            >
                              {platform.contact_phone}
                            </a>
                          </small>
                          <small className="d-block mb-1">
                            <a
                              href={`mailto:${platform.contact_mail}`}
                              className=""
                            >
                              {platform.contact_mail}
                            </a>
                          </small>
                          <div className="d-block">
                            <a
                              href={`${platform.contact_linkedin}`}
                              target="_blank"
                              className=""
                            >
                              <FontAwesomeIcon
                                icon={["fab", "linkedin"]}
                                className="icon mr-1"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Scrollspy>
              </div>
            </div>
          </Container>
          {cookies.get("Counter") < 3 && platform.demo_btn.length > 0 && (
            <div className="light-blue-bg py-5 request-demo">
              <Container>
                <p className="h4 text-white mb-2">
                  {store.translations.request_demo}
                </p>
                <ValidationForm
                  onSubmit={(e, formData, inputs) => {
                    e.preventDefault();
                    //console.log(e, formData, inputs);
                  }}
                >
                  <div className="d-flex align-content-between">
                    <div className="form-row input-animation mr-4 ml-0 w-50">
                      <TextInput
                        className="form-control mb-1"
                        id="contact-form-name"
                        name="contact-form-name"
                        required
                        errorMessage=" Please, provide your name."
                        onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                        value={name}
                      />
                      <label htmlFor="contact-form-name">
                        <span>{store.translations.your_name}*</span>
                      </label>
                    </div>
                    <div className="form-row input-animation mr-4 ml-0 w-50">
                      <TextInput
                        className="form-control mb-1"
                        id="contact-form-email"
                        name="contact-form-email"
                        type="email"
                        value={email}
                        validator={validator.isEmail}
                        errorMessage={{
                          validator: "Please enter a valid email",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={50}
                      />
                      <label htmlFor="contact-form-email">
                        <span>{store.translations.email_address}*</span>
                      </label>
                    </div>
                    <div className="form-row ml-0">
                      <div className="mt-1">
                        <button
                          className="btn-tab dark-blue-bg btn-send mt-4 text-uppercase"
                          type="submit"
                          onClick={() => {
                            email.length > 0 && name.length > 0
                              ? setCaptcha(true)
                              : "";
                          }}
                        >
                          {store.translations.send}
                        </button>
                        {showCaptcha && (
                          <ReCAPTCHA
                            style={{
                              position: "absolute",
                              right: 10,
                              bottom: 35,
                              zIndex: 5,
                            }}
                            sitekey="6LefjCAaAAAAAF8nYBHU4Cr1HCo-cnbgs4afiJGR"
                            onChange={handleSubmit}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </ValidationForm>
              </Container>
            </div>
          )}
          <BookPageModal
            modal={openModal}
            modalClass="successModal"
            toggle={toggle}
            message={store.translations.successmodal_message}
            title={store.translations.thank_you}
            backToHomepage={store.translations.back_homepage}
          />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default observer(PlatformPage);
