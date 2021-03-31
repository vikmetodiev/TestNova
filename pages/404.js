import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { useRootStore } from "../provider";

const NotFound = () => {
  let store = useRootStore();
  return (
    <div className="page text-center mt-5">
      <img className="my-4" src="/images/not-found.png" alt="Error 404" />
      <h4 className="mb-5">{store.translations.not_found}</h4>
      <a href="/" className="btn-big d-inline-block">
        &#8592; {store.translations.back_homepage}
      </a>
    </div>
  );
};

export default observer(NotFound);
