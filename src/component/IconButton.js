import React, {Component} from 'react';
import PropTypes from "prop-types";


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