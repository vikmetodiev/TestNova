import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { Col, Container, Row, Collapse } from "reactstrap";
import { useRootStore } from "../../provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

let skillButtonsData = [
  {
    id: 0,
    name: "JavaScript",
  },
  {
    id: 1,
    name: "HTML5",
  },
  {
    id: 2,
    name: "NodeJS",
  },
  {
    id: 3,
    name: "ReactJS",
  },
  {
    id: 4,
    name: "JAVA",
  },
  {
    id: 5,
    name: "ABAP",
  },
  {
    id: 7,
    name: "Relational DBs",
  },
  {
    id: 8,
    name: "HANA DB",
  },
  {
    id: 9,
    name: "TypeScript",
  },
  {
    id: 10,
    name: "Visual Design",
  },
  {
    id: 11,
    name: "Project management",
  },
  {
    id: 12,
    name: "DevOps",
  },
  {
    id: 13,
    name: "Network protocols",
  },
  {
    id: 14,
    name: "iOS",
  },
  {
    id: 15,
    name: "Swift",
  },
  {
    id: 16,
    name: "Xcode",
  },
];

let locationButtonData = [
  {
    id: 0,
    name: "Plovdiv",
    country: "Bulgaria",
  },
  {
    id: 1,
    name: "Sofia",
    country: "Bulgaria",
  },
  {
    id: 2,
    name: "Lidköping",
    country: "Sweden",
  },
];

let typeButtonsData = [
  {
    id: 7,
    name: "Fullstack dev",
    type: "Fullstack",
  },
  {
    id: 0,
    name: "Frontend dev",
    type: "Frontend development",
  },
  {
    id: 1,
    name: "Backend dev",
    type: "Backend development",
  },
  {
    id: 2,
    name: "System architect",
    type: "System architect",
  },
  {
    id: 3,
    name: "Back office",
    type: "Back office",
  },
  {
    id: 4,
    name: "Management",
    type: "Management",
  },
  {
    id: 5,
    name: "Design",
    type: "Design",
  },
  {
    id: 6,
    name: "System administration",
    type: "System administration",
  },
];
const JobPositions = (props) => {
  const store = useRootStore();
  const [collapse, setCollapse] = useState(false);
  const [stateSkillButtons] = useState(skillButtonsData);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true)
  }, [fade]);

  const toggle = () => {
    if (collapse) {
      setTimeout(() => {
        setCollapse(!collapse);
      }, 500);
    } else {
      setCollapse(!collapse);
    }
  };
  let email = "";
  let classClearFilter = ["view-all custom-badge", "badge", "inactive"];
  if (
    store.skillsFilter.length !== 0 ||
    store.locationFilter.length !== 0 ||
    store.typesFilter.length !== 0
  ) {
    classClearFilter = ["view-all custom-badge", "badge"];
  }
  let careers = store.pages.find((item) => {
    return item.id === "CAREERS";
  });
  let careersNum = "";
  let skillButtons = stateSkillButtons.map((item, i) => {
    let classes = ["custom-badge", "badge"];
    if (store.skillsFilter.includes(item.name)) {
      classes.push("selected");
    }
    if (
      store.jobsAvailable.children &&
      store.jobsAvailable.children.filter(
        (el) => el.SKILLS.split(", ").filter((e) => e === item.name).length > 0
      ).length > 0
    ) {
      return (
        <button
          key={i}
          className={classes.join(" ")}
          onClick={() => {
            store.filterSkills(item.name);
            setFade(false)
          }}
        >
          {item.name}/
          {store.jobsAvailable.children
            ? store.jobsAvailable.children.filter(
                (el) =>
                  el.SKILLS.split(", ").filter((e) => e === item.name).length >
                  0
              ).length
            : ""}
        </button>
      );
    }
  });
  skillButtons = skillButtons.filter((item) => {
    return item !== undefined;
  });
  let selectedArray = [];
  let notSelectedArray = [];
  let selector = skillButtons.map((itm, i) => {
    if (itm.props.className.includes("selected")) {
      selectedArray.push(itm);
    } else if (!itm.props.className.includes("selected")) {
      notSelectedArray.push(itm);
    }
  });
  skillButtons = selectedArray.concat(notSelectedArray);
  let locationButtons = locationButtonData.map((item) => {
    let classes = ["custom-badge", "badge"];
    if (store.locationFilter === item.name) {
      classes.push("selected");
    }
    if (
      store.jobsAvailable.children &&
      store.jobsAvailable.children.filter(
        (el) =>
          el.LOCATION.split(", ").filter((e) => e === item.name).length > 0
      ).length !== 0
    ) {
      return (
        <button
          key={item.id}
          className={classes.join(" ")}
          onClick={() => {
            store.filterLocation(item.name);
            setFade(false)
          }}
        >
          <span className="text-uppercase">{item.name}</span> {item.country}
          <span className="font-weight-light">
            /
            {store.jobsAvailable.children
              ? store.jobsAvailable.children.filter(
                  (el) =>
                    el.LOCATION.split(", ").filter((e) => e === item.name)
                      .length > 0
                ).length
              : ""}
          </span>
        </button>
      );
    }
  });
  let positionButtons = typeButtonsData.map((item) => {
    let classes = ["custom-badge", "badge"];
    if (store.typesFilter === item.type) {
      classes.push("selected");
    }
    if (
      store.jobsAvailable.children &&
      store.jobsAvailable.children.filter((el) => el.TYPE === item.type)
        .length !== 0
    ) {
      return (
        <button
          key={item.id}
          className={classes.join(" ")}
          onClick={() => store.filterTypes(item.type)}
        >
          {item.name}
          <span className="font-weight-light">
            /
            {store.jobsAvailable.children
              ? store.jobsAvailable.children.filter(
                  (el) => el.TYPE === item.type
                ).length
              : ""}
          </span>
        </button>
      );
    }
  });

  if (store.getFiltered) {
    if (store.jobsAvailable.children) {
      let currentEmail = store.jobsAvailable.children;
      email = currentEmail.map((item) => {
        return item.email;
      });
    }
    if (careers) {
      careersNum = careers.children;
    }
    careers = store.getFiltered.map((career) => {
      return (
        <Col
          key={career.id}
          md={{ size: 5, offset: 1 }}
          sm={{ size: 12, offset: 0 }}
          xs={{ size: 12, offset: 0 }}
          className="col pb-4 fade-in"
        >
          <Link
            href={{ pathname: "/Careers/[slug]", query: { slug: career.id } }}
            className="career-link"
          >
            <a className="career-link">
              <h3 className="dark-blue-text text-uppercase mb-2 mt-4">
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
                <FontAwesomeIcon icon={"laptop-code"} className="icon fa-fw" />
                {career.TYPE}
              </small>
              <small className="d-block mb-3">
                <FontAwesomeIcon
                  icon={"map-marker-alt"}
                  className="light-grey-text icon fa-fw"
                />
                {career.LOCATION}
              </small>
              <FontAwesomeIcon
                icon={"external-link-alt"}
                className="icon fa-fw"
              />
              <span className="link-underline">
                {store.translations.learn_more}
              </span>
            </a>
          </Link>
        </Col>
      );
    });

    return (
      <div className="open-position">
        <div className="light-grey-bg">
          <Container className="py-5">
            <Row>
              <Col md={9} sm={6} xs={12} className="text-right mb-5">
                <h2 className="font-weight-bold light-blue-text mb-0 text-uppercase">
                  {store.translations.open_positions}{" "}
                  <span className="font-weight-light">
                    / {careersNum.length}
                  </span>
                </h2>
              </Col>
              <Col>
                <button
                  className={classClearFilter.join(" ")}
                  onClick={store.clearFilter}
                >
                  {store.translations.view_all}
                </button>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <small className="d-block text-uppercase mb-3 mid-grey-text">
                  <FontAwesomeIcon
                    icon={"laptop-code"}
                    className="mid-grey-text icon"
                  />{" "}
                  {store.translations.type}:
                </small>
                {positionButtons}
              </Col>
              <Col md={5}>
                <small className="d-block text-uppercase mb-3 mid-grey-text">
                  <FontAwesomeIcon
                    icon={"cogs"}
                    className="mid-grey-text icon"
                  />{" "}
                  {store.translations.skills}:
                </small>
                {skillButtons.slice(0, 10)}
                <Collapse
                  isOpen={collapse}
                  className={
                    collapse
                      ? "career-skills-collapse fade-in"
                      : "career-skills-collapse fade-out"
                  }
                >
                  {skillButtons.slice(10, skillButtons.length)}
                </Collapse>
                {skillButtons.length > 10 && (
                  <a onClick={toggle} className="career-skills-button">
                    {!collapse ? "Show more" : "Show less"}
                  </a>
                )}
              </Col>
              <Col md={3}>
                <small className="d-block text-uppercase mb-3 mid-grey-text">
                  <FontAwesomeIcon
                    icon={"map-marker-alt"}
                    className="mid-grey-text icon"
                  />{" "}
                  {store.translations.locationpage_location}:
                </small>
                {locationButtons}
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="py-5 fade-in">
          <Row className="job-position">
            {careers.length === 0 ? (
              <Col
                md={8}
                className="mx-auto text-center d-flex align-items-center justify-content-center "
              >
                <img
                  src="http://api.novarto.com/api/images/svg/no-results.svg"
                  alt="Careers"
                  width="70"
                />
                <div>
                  {store.translations.nomatching_positions}{" "}
                  <a href={`mailto:${email[0]}`}>{email[0]}</a>
                </div>
              </Col>
            ) : (
              fade && careers
            )}
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default observer(JobPositions);
