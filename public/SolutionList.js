import React from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardTitle, Col, Row, CardText } from "reactstrap";
import Link from "next/link";
import { useRootStore } from "../provider";
import { useRouter } from "next/router";
const SolutionList = () => {
  const router = useRouter();
  const store = useRootStore();

  let solutions = store.pages.find((solution) => {
    return solution.id === "SOLUTIONS";
  });

  if (solutions) {
    solutions = solutions.children;

    solutions = solutions.map((solution, i) => {
      // let automotive = solution.iconname;
      return (
        <Col key={i} md={4} sm={6} xs={12} className="mb-4 d-flex">
          <Link
            href={{
              pathname: "/ServicesBySolution/[slug]",
              query: { slug: solution.id },
            }}
          >
            <a className="card-item">
              <Card className="gradient-border spec-mobile">
                <div className="image-holder services-cards">
                  <img
                    className="icon"
                    src={store.API_PATH + solution.icon}
                    alt={solution.title}
                    width="130"
                  />
                </div>
                <CardBody>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardText>{solution.SUBTITLE}</CardText>
                </CardBody>
              </Card>
            </a>
          </Link>
        </Col>
      );
    });

    return (
      <div>
        <Row>{solutions}</Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(SolutionList);
