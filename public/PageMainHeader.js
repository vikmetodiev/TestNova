import React, { Component } from "react";
import { Col } from "reactstrap";
import { Container, Row } from "reactstrap";

const PageMainHeader = (props) => {
  return (
    <div className={`page-main-section ${props.bgcolor} position-relative`}>
      {/*<Link to={`/teamNovartian/${member.id}`} className="member p-3">*/}
      <Container>
        {props.stars}
        {props.imageleft}
        <Row className="">
          <Col md={{ size: 6 }} sm={{ size: 12 }} className="mx-auto my-5">
            <h1 className="text-white mb-4 pt-2 text-uppercase font-weight-bolder">
              {props.header}
            </h1>
            <p className="h4 text-white font-weight-light">{props.title}</p>
          </Col>
        </Row>
        {props.imageright}
      </Container>
    </div>
  );
};

export default PageMainHeader;
