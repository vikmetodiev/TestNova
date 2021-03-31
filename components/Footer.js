import React, { Component } from "react";
import { observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRootStore } from "../provider";

const Footer = () => {
  const store = useRootStore();

  return (
    <div>
      <footer className="dark-blue-bg">
        <Container>
          <Row>
            <Col className="py-4">
              <div className="socials float-md-right text-center d-flex align-items-center">
                <div className="d-flex align-items-center mobile-alignment">
                  <small className="text-white">
                    {store.translations.footer_find}
                  </small>
                  <div className="">
                    <a
                      href={`${store.translations.social_linkedin}`}
                      aria-label="LinkedIn Link"
                      rel="LinkedIn noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={["fab", "linkedin"]}
                        className="icon mx-2"
                      />
                    </a>
                    <a
                      href={`${store.translations.social_facebook}`}
                      aria-label="Facebook Link"
                      rel="Facebook noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={["fab", "facebook"]}
                        className="icon mx-2"
                      />
                    </a>
                    <a
                      href={`${store.translations.social_instagram}`}
                      aria-label="Instagram Link"
                      rel="Instagram noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={["fab", "instagram"]}
                        className="icon mx-2"
                      />
                    </a>
                    <a
                      href={`${store.translations.social_twitter}`}
                      aria-label="Twitter Link"
                      rel="Twitter noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={["fab", "twitter"]}
                        className="icon mx-2"
                      />
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center mobile-alignment">
                  <small className="text-white ml-3">
                    {store.translations.footer_contact}
                  </small>
                  <a
                    href={`mailto:${store.translations.footer_email}`}
                    target="_blank"
                    className="d-flex align-items-center underline"
                  >
                    <FontAwesomeIcon icon={"envelope"} className="icon mx-2" />
                    <small>{store.translations.footer_email}</small>
                  </a>
                </div>

                {/*<a href="http://www.slideshare.net/Novarto" target="_blank">*/}
                {/*    <FontAwesomeIcon icon={['fab', 'slideshare']} className="icon mx-2" />*/}
                {/*</a>*/}
                {/*<a href="https://www.xing.com/companies/novartoltd." target="_blank">*/}
                {/*    <FontAwesomeIcon icon={['fab', 'xing']} className="icon mx-2" />*/}
                {/*</a>*/}
                {/*<a href="https://www.flickr.com/photos/novarto" target="_blank">*/}
                {/*    <FontAwesomeIcon icon={['fab', 'flickr']} className="icon mx-2" />*/}
                {/*</a>*/}
              </div>

              <p className="float-md-left text-center">
                <a href={"/"} className="float-md-left mr-2">
                  <img
                    alt="Novarto"
                    className="logo"
                    src="/images/novarto-logo-icon-white.png"
                    width="20"
                  />
                </a>
                <small className="text-white">
                  {store.translations.copyright} © {new Date().getFullYear()}{" "}
                  Novarto. {store.translations.rights}
                  <a href={"/PrivacyPage"} className="ml-1 underline">
                    {store.translations.privacy_policy}
                  </a>
                </small>
              </p>

              <small className="version">v 5.6</small>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default observer(Footer);
