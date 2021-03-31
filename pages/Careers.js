import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PageMainHeader from "../public/PageMainHeader";
import Benefits from "../public/careers/Benefits";
import QuotesEmployees from "../public/careers/QuotesEmployees";
import WeValue from "../public/careers/WeValue";
import JobPositions from "../public/careers/JobPositions";
import CareersWelcome from "../public/careers/CareersWelcome";
import { useRootStore } from "../provider";
const Careers = () => {
  const store = useRootStore();
  return (
    <div className="page careers">
      <PageMainHeader
        bgcolor={"light-blue-bg"}
        header={store.translations.careers_title}
        title={store.translations.careers_subtitle}
        imageleft={
          <img
            src="/images/illustrations/careers-left.png"
            alt=""
            className="image image-left"
          />
        }
        imageright={
          <img
            src="/images/illustrations/careers-right.png"
            alt=""
            className="image image-right"
          />
        }
      />

      <CareersWelcome />
      <JobPositions />
      <Benefits />
      <WeValue />
      <QuotesEmployees />
    </div>
  );
};

export default observer(Careers);
