import React, {Component} from "react";
import { observer} from "mobx-react";
import { Col, Row} from "reactstrap";
import Link from "next/link";
import { useRootStore } from "../provider";

 const PhasesList = () => {
    const store = useRootStore();

        let phaseList = store.pages.find((item) => {

            return item.id === "PROJECT PHASES"
        });

        if (phaseList) {
            phaseList = phaseList.children;
            let html = {__html: phaseList[0].main_text};

            phaseList = phaseList.map((phaseList, i) => {
                const tabId = i + 1;
                let thirdTitle;
                if (i === 0) {
                    thirdTitle = phaseList.third_title.substring(0, 2);
                } else {
                    thirdTitle = phaseList.third_title;
                }
                return <Link key={i} href={{pathname: "/PhasesPage"}}>
                    <a className="phase">
                    <div onClick={() => {
                        store.activatePhase(`${tabId}`);
                    }} style={{cursor: "pointer"}}>
                        <p className="h4 mb-4 ">{phaseList.phase_title}</p>

                        <ul className="blue-bullet-list ">
                            {phaseList.first_title !== "NULL" && phaseList.first_title.length > 0 ?
                                <li>{phaseList.first_title}
                                    <div className="arrow">
                                        <div className="curve"></div>
                                        <div className="point"></div>
                                    </div>
                                </li> : ""}

                            {phaseList.second_title !== "NULL" && phaseList.second_title.length > 0 ?
                                <li>{phaseList.second_title}
                                    <div className="arrow">
                                        <div className="curve"></div>
                                        <div className="point"></div>
                                    </div>
                                </li> : ""}

                            {phaseList.third_title !== "NULL" && phaseList.third_title.length > 0 ?
                                <li>{thirdTitle}
                                    <div className="arrow">
                                        <div className="curve"></div>
                                        <div className="point"></div>
                                    </div>
                                </li> : ""}

                            {phaseList.fourth_title !== "NULL" && phaseList.fourth_title.length > 0 ?
                                <li>{phaseList.fourth_title}
                                    <div className="arrow">
                                        <div className="curve"></div>
                                        <div className="point"></div>
                                    </div>
                                </li> : ""}
                        </ul>

                        <img className="" src={store.API_PATH + phaseList.main_image}
                             alt="Tab image" width="120"/>
                        <div className="List-image-hover">
                        </div>
                        <span className="implementation-phase-list">Repeats in every <strong> 2 WEEKS </strong></span>
                    </div>
                    </a>
                </Link>
            });


            return (
                <div>

                    <Row className="phases-col mb-5">
                        <Col className="mx-auto col-sm-12 col-md-6 phase-list-info">
                            <h2 className="light-blue-text text-left mb-2 mt-3">{store.translations.project_phases}</h2>
                            <div className="pt-2 h5 mb-5 dark-blue-text text-left font-serif font-weight-normal">{store.translations.phases_info_text}</div>
                        </Col>
                        <Col md={9} sm={12} xs={12} className="mx-auto">
                            <div className="phase-circle mt-3">
                                {phaseList}
                            </div>
                        </Col>
                        {/*<Col md={{size: 2, offset: 3}} sm={6} xs={12} className="mt-4 ">*/}
                        {/*    <p className="h5 text-uppercase dark-blue-text mb-4 text-center ">{this.store.translations.project_phases}</p>*/}
                        {/*</Col>*/}
                        {/*<Col md={6} sm={6} xs={12} className="mt-4 text-center">*/}
                        {/*    <span className="mr-3 h5 text-uppercase dark-blue-text font-weight">{this.store.translations.text_by}</span>*/}
                        {/*    <img alt="Novarto Ltd. Logo" title="Novarto / HomePage" className="logo-phase" width="150px" src={require('../images/novarto-logo-blue.png')}/>*/}
                        {/*</Col>*/}
                    </Row>
                    <Row className="pt-3">
                        <Col className="mx-auto col-sm-12 col-md-6 phase-list-info">
                            <h2 className="light-blue-text text-left mb-3 ">{store.translations.phase_main_title} </h2>
                            <div className="paragraphs text-left mt-2"
                                 dangerouslySetInnerHTML={html}>
                            </div>
                        </Col>
                    </Row>

                </div>
            );
        } else {
            return <div></div>
        }
}

export default observer(PhasesList);
