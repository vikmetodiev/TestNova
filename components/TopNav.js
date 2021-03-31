import React, { Component, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import {
  Navbar,
  NavbarBrand,
  NavLink,
  NavItem,
  Nav,
  Collapse,
  Row,
  Col,
} from "reactstrap";
import Hamburger from "react-hamburgers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "next/router";
import { useRootStore } from "../provider";
import Link from "next/link";
const TopNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkMobile, setCheckMobile] = useState();
  const store = useRootStore();
  useEffect(() => {
    setCheckMobile(window.innerWidth <= 760);
  }, [checkMobile]);

  let activeClass = "";
  if (process.browser) {
    if (
      window.location.href.indexOf("/Services") > -1 ||
      window.location.href.indexOf("/PhasesPage") > -1
    ) {
      activeClass = "active";
    }
  }
  return (
    <div className="container top-nav">
      <Row>
        <Col sm="12" md="12" lg="12" className="py-4">
          <Navbar
            className={`navbar-inverse ${
              props.router.pathname === "/" || props.router.pathname === "/Home"
                ? "homepage-logo navbar-expand-sm"
                : "navbar-expand-sm"
            }`}
            toggleable="true"
          >
            <Link href="/" onClick={() => setIsOpen(false)}>
              <a className="logo-btn d-inline-block m-0">
                {props.router.pathname === "/" ||
                props.router.pathname === "/Home" ? (
                  <img
                    src="/images/novarto-logo-blue.png"
                    alt="Novarto Ltd. Logo"
                    title="Novarto / HomePage"
                    className="logo"
                  />
                ) : checkMobile ? (
                  <img
                    src="/images/novarto-a-logo.svg"
                    alt="Novarto Ltd. Logo"
                    title="Novarto / HomePage"
                    className="logo"
                  />
                ) : (
                  <img
                    src="/images/novarto-logo-blue.png"
                    alt="Novarto Ltd. Logo"
                    title="Novarto / HomePage"
                    className="logo"
                  />
                )}
              </a>
            </Link>
            {/*<NavbarToggler onClick={this.toggle} right={"true"} />*/}
            <Hamburger
              onClick={() => setIsOpen(!isOpen)}
              active={isOpen}
              type="slider"
            />
            <Collapse
              isOpen={isOpen}
              navbar
              className="justify-content-end"
              onClick={() => setIsOpen(false)}
            >
              <div className="d-flex justify-content-end">
                <Nav navbar>
                  <NavItem>
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                        store.activateTab("1");
                      }}
                      href="/Services"
                    >
                      <a
                        className={
                          "float-right d-inline-block nav-link " + activeClass
                        }
                      >
                        {store.translations.nav_services}
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link onClick={() => setIsOpen(false)} href="/Projects">
                      <a
                        className={
                          props.router.pathname.indexOf("/Projects") > -1
                            ? "float-right d-inline-block nav-link active"
                            : "float-right d-inline-block nav-link"
                        }
                      >
                        {store.translations.nav_projects}
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link onClick={() => setIsOpen(false)} href="/Careers">
                      <a
                        className={
                          props.router.pathname.indexOf("/Careers") > -1
                            ? "float-right d-inline-block nav-link active"
                            : "float-right d-inline-block nav-link"
                        }
                      >
                        {store.translations.careers_title}
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link activeclassname="active" href="/About">
                      <a
                        className={
                          props.router.pathname.indexOf("/About") > -1
                            ? "float-right d-inline-block nav-link active"
                            : "float-right d-inline-block nav-link"
                        }
                      >
                        {store.translations.nav_about}
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link onClick={() => setIsOpen(false)} href="/Location">
                      <a
                        className={
                          props.router.pathname.indexOf("/Location") > -1
                            ? "float-right d-inline-block nav-link active"
                            : "float-right d-inline-block nav-link"
                        }
                      >
                        {store.translations.nav_location}
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <a
                      href={`${store.translations.topnav_newslink}`}
                      rel="noopener"
                      target="_blank"
                      className="nav-link float-right d-inline-block"
                    >
                      {store.translations.topnav_news}
                    </a>
                  </NavItem>
                  <NavItem>
                    <a
                      href={`${store.translations.topnav_locationlink}`}
                      rel="noopener"
                      target="_blank"
                      className="nav-link float-right d-inline-block"
                    >
                      <FontAwesomeIcon
                        icon={"globe-europe"}
                        className="icon mr-1"
                      />
                      {store.translations.topnav_locationcode}
                    </a>
                  </NavItem>
                </Nav>
              </div>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(observer(TopNav));
