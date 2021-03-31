import React, { Component } from "react";
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
import PageMainHeader from "../public/PageMainHeader";
import Head from "next/head";
import Link from "next/link";
import { useRootStore } from "../provider";

const Projects = () => {
  const store = useRootStore();

  let projects = store.pages.find((platform) => {
    return platform.id === "PROJECTS";
  });

  let metatag = store.metatags.find((item) => {
    return item.name === "Projects";
  });

  if (projects) {
    projects = projects.children;

    projects = projects.map((project, i) => {
      return (
        <Col key={i} md={3} sm={4} xs={6} className="mb-4 d-flex">
          <Link
            href={{
              pathname: "/Projects/[slug]",
              query: { slug: project.id },
            }}
          >
            <a className="card-item project-card">
              <Card className="">
                <div className="image-holder">
                  <CardImg
                    alt={project.title}
                    top
                    width="100"
                    src={store.API_PATH + project.ICON}
                  ></CardImg>
                </div>
                <CardBody>
                  <CardTitle className="text-center">{project.title}</CardTitle>
                </CardBody>
              </Card>
            </a>
          </Link>
        </Col>
      );
    });

    return (
      <div className="page projects">
        <Head>
          <title>{metatag.title}</title>
          <meta name="description" content={metatag.description} />
          <meta name="keywords" content={metatag.keywords} />
        </Head>
        <PageMainHeader
          bgcolor={"light-blue-bg"}
          header={store.translations.project_title}
          title={store.translations.project_subtitle}
          imageleft={
            <img
              src="/images/illustrations/projects-left.png"
              alt="image-left"
              className="image image-left"
            />
          }
          imageright={
            <img
              src="/images/illustrations/projects-right.png"
              alt="image-right"
              className="image image-right"
            />
          }
        />
        <Container className="mt-5">
          <Row>{projects}</Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(Projects);
