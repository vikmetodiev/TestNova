import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Footer from "./Footer";
import TopNav from "./TopNav";
import "@material/react-checkbox/dist/checkbox.css";
import { Container, Col, Row } from "reactstrap";
import { useRootStore } from "../provider";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../public/allPages"
const Layout = (props) => {
  const store = useRootStore();

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window?.location.pathname.split("/"));
  }, []);

  if (!store.loaded) {
    return null;
  }

  let classNames = ["wrapper"];
  if (store.loading) {
    classNames.push("locked");
  }
  let metatag = store.metatags.find((item) => {
    let url = path;
    if (path) {
      url = path[path.length - 1];
    }
    if (
      url.toLocaleLowerCase().indexOf(item.meta_id.toLocaleLowerCase()) > -1
    ) {
      return item;
    }
  });
  const { children } = props;
  return (
    <div className={classNames.join(" ")}>
      <Head>
        <title>{metatag && metatag.title}</title>
        <meta name="description" content={metatag && metatag.description} />
        <meta name="keywords" content={metatag && metatag.keywords} />
        <meta
          property="og:title"
          content={metatag ? metatag.title : "Novarto"}
        />
        <meta
          property="og:description"
          content={
            metatag
              ? metatag.description
              : "Novarto is a software consulting company with proven expertise in providing businesses with quality solutions for customer engagement and commerce."
          }
        />
        <meta
          property="og:url"
          content={metatag ? metatag.page_url : "https://novarto.com/"}
        />
        <meta
          property="og:image"
          content={
            metatag && metatag.Image_meta
              ? store.API_PATH + metatag.Image_meta
              : "https://api.novarto.com/api/images/novarto-oglogo.jpg"
          }
        />
        <meta
          property="twitter:description"
          content={
            metatag
              ? metatag.description
              : "Novarto is a software consulting company with proven expertise in providing businesses with quality solutions for customer engagement and commerce."
          }
        />
      </Head>
      {store.loadedData ? <TopNav /> : ""}
      {!store.loadedData ? (
        <Container class="page text-center mt-5">
          <Row>
            <Col md={5} sm={12} className="mx-auto">
              <img
                className="my-5"
                src="/images/Something-went-wrong.png"
                alt="Error 500"
                width="90%"
              />
            </Col>
          </Row>
          <div className="h3 dark-blue-text text-center">
            Ooops... Something went wrong.
          </div>
          <div className="dark-blue-text text-center">
            Sorry for the inconvenience, we're working on it. Please, try again
            later.
          </div>
        </Container>
      ) : (
        ""
      )}
      {children}
      {store.loadedData ? <Footer /> : ""}
    </div>
  );
};

export default observer(Layout);


export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}