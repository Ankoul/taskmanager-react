import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import taskService from "../service/TaskService";
import {FiTrash2} from "react-icons/fi";
import Button from "react-bootstrap/Button";


export default class IconButton extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        visible: true
    };

    render() {
        let visibility = this.props.visible ? "visible" : "hidden";
        return (
            <span  style={{visibility, cursor: "pointer"}}
                  onClick={this.props.onClick} className={this.props.className}>{this.props.children}</span>
        );
    }

}