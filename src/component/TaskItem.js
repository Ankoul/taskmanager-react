import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import {FiTrash2} from "react-icons/fi";
import IconButton from "./IconButton";
import _ from "lodash";
import InputGroup from "react-bootstrap/InputGroup";

export default class TaskItem extends Component {

    static propTypes = {
        task: PropTypes.object,
        onChange: PropTypes.func,
        onDelete: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isTrashVisible: false,
            isEditable: false,
        }
    }

    toggleChecked = async () => {
        let task = this.props.task;
        if (task.finishDate) {
            task.finishDate = null;
        } else {
            task.finishDate = new Date();
        }
        this.props.onChange(task);
    };

    toggleTrashIcon = ()=>{
        this.setState({isTrashVisible: !this.state.isTrashVisible});
    };

    toggleEditable = (e) => {
        const description = e.target.value;
        this.setState({isEditable: !this.state.isEditable}, () => {
            if(!this.state.isEditable) this.onDescriptionChange(description);
        });
    };

    onDescriptionChange = (description) => {
        let {task} = this.props;
        if(task.description === description || task.finishDate){
            return;
        }
        task.description = description;
        this.props.onChange(task);
    };

    onDelete = () => {
        const {onDelete, task} = this.props;
        if (_.isFunction(onDelete) && !task.finishDate) {
            onDelete(task);
        }
    };

    render() {
        let {task} = this.props;

        let tittle = !task.finishDate ? `Created on ${task.createDate}` : `Finished on ${task.finishDate}`;
        return (
            <InputGroup size="sm" onMouseOver={this.toggleTrashIcon} onMouseOut={this.toggleTrashIcon}>
                <InputGroup.Prepend>
                    <InputGroup.Checkbox defaultChecked={!!task.finishDate} onClick={this.toggleChecked}/>
                </InputGroup.Prepend>
                <Form.Control onClick={this.toggleEditable}
                              onBlur={this.toggleEditable}
                              size="sm" plaintext
                              title={tittle}
                              readOnly={!this.state.isEditable || !!task.finishDate}
                              defaultValue={task.description}/>
                <InputGroup.Append>
                    <IconButton visible={this.state.isTrashVisible && !task.finishDate} onClick={this.onDelete}>
                        <FiTrash2/>
                    </IconButton>
                </InputGroup.Append>
            </InputGroup>
        );
    }

}