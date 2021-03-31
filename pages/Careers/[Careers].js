import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Benefits from "../../public/careers/Benefits";
import { useRootStore } from "../../provider";
import Head from "next/head";
import Link from "next/link"
const OpenPosition = () => {
  const store = useRootStore();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window?.location.pathname.split("/"));
  }, []);

  let careerId = path[path.length - 2];
  let careers = store.pages.find((career) => {
    return career.id === "CAREERS";
  });

  if (path.length > 0) {
    if (careers) {
      careers = careers.children;
      let career = careers.find((career) => career.id === careerId);
      let descrHtml = { __html: career.LONGDESCR };
      return (
        <div className="page careers">
          <Head>
            <title>Novarto Careers - {career.title}</title>
            <meta name="description" content={career.description} />
            <meta name="keywords" content={career.title} />
            <meta
              property="og:title"
              content={("Novarto Careers - ", career.title)}
            />
          </Head>

          <Container className="py-5 open-position">
            <Row className="row job-position">
              <Col md={{ size: 3 }} sm={{ size: 3 }} xs={12}>
                <img
                  src="/images/illustrations/careers-left.png"
                  alt=""
                  className="float-right"
                  width="140"
                />
              </Col>
              <Col md={{ size: 6 }} sm={{ size: 9 }} xs={12} className="col">
                <div className="breadcrumbs mb-5">
                  <Link href="/Careers">{store.translations.back_previous}</Link>
                </div>

                <h3 className="dark-blue-text text-uppercase mb-3 mt-4">
                  {career.title}
                </h3>

                <small className="d-block mb-1">
                  <FontAwesomeIcon
                    icon={"cogs"}
                    className="light-grey-text icon fa-fw"
                  />
                  {career.SKILLS}
                </small>
                <small className="font-weight-bold d-block mb-1">
                  <FontAwesomeIcon
                    icon={"laptop-code"}
                    className="icon fa-fw"
                  />
                  {career.TYPE}
                </small>
                <small className="d-block">
                  <FontAwesomeIcon
                    icon={"map-marker-alt"}
                    className="light-grey-text icon fa-fw"
                  />
                  {career.LOCATION}
                </small>
              </Col>
            </Row>
            <Row className="job-position-info">
              <Col md={{ size: 3 }} sm={{ size: 3 }} xs={12}></Col>
              <Col md={{ size: 6 }} sm={{ size: 9 }} xs={12} className="col">
                <hr className="mb-4" />
                <p
                  dangerouslySetInnerHTML={descrHtml}
                  className="paragraphs"
                ></p>
              </Col>
            </Row>
          </Container>
          <Benefits />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default observer(OpenPosition);
