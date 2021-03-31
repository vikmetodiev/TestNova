import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
    }

    toggle = (prop, val) => {
        this.setState(prevState => ({
            [prop]: val ? val : !prevState[prop]
        }));
    };

    handleInputChange = (e) => {
        let props = e.target.name;
        props = props.split(".");
        let lastProp = props[props.length-1];
        props.splice(-1, 1);
        let state = this.state;
        let element = state;
        props.forEach((prop) => {
            element = element[prop]
        });
        element[lastProp] = e.target.value;
        this.setState(state);
    };
}
