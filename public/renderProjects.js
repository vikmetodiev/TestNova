import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, Col } from "reactstrap";
import { useRootStore } from "../provider";

const renderProjectLinks = (link) => {
  const store = useRootStore();
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
        <Col key={i} md={4} sm={4} xs={6} className="d-flex">
          <Link
            href={{
              pathname: "/Projects/[slug]",
              query: {
                slug: found.split(" ").join("-").split("/").join("-"),
              },
            }}
            key={item}
          >
            <a className="card-item project-card similar">
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
          </Link>
        </Col>
      );
    }
  });
};

export default renderProjectLinks;
