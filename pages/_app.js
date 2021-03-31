
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.scss";
import App from "next/app";
import React, { createContext } from "react";
import { RootStoreProvider, useRootStore } from "../provider";
import Layout from "../components/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faUsers,
  faMapMarkedAlt,
  faBuilding,
  faCouch,
  faTasks,
  faUserAstronaut,
  faNetworkWired,
  faHiking,
  faHighlighter,
  faChartLine,
  faComment,
  faEnvelope,
  faAt,
  faLink,
  faMapMarkerAlt,
  faCogs,
  faLaptopCode,
  faExternalLinkAlt,
  faGlobe,
  faGlobeEurope,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import eventService from "../events";
function MyApp({ Component, pageProps }) {
  library.add(
    faSpinner,
    faUsers,
    faMapMarkedAlt,
    faBuilding,
    faCouch,
    fab,
    faTasks,
    faUserAstronaut,
    faNetworkWired,
    faHiking,
    faHighlighter,
    faChartLine,
    faComment,
    faEnvelope,
    faAt,
    faLink,
    faMapMarkerAlt,
    faCogs,
    faLaptopCode,
    faExternalLinkAlt,
    faGlobe,
    faGlobeEurope,
    faTimes
  );
  return (
    <RootStoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RootStoreProvider>
  );
}

// MyApp.getServerSideProps = async (appContext) => {
//   const store = useRootStore(true);
//     if (!store.loaded) {
//       const resolved = await new Promise((resolve, reject) => {
//         eventService.listenEvent("Loaded", "myapp", (store) => {
//           console.log(store.translations.social_linkedin);
//           eventService.unlistenEvent("Loaded", "myapp");
//           resolve("Loaded");
//         });
//       });
//     }
//   return { props: {} };
// };

export default MyApp;
