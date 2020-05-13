import React, { Component } from 'react';
import { SelectList } from '../../components/SelectList/SelectList';


class SelectListContainer extends Component {
    
    handleSelect = (e) => {
        const { value } = e.target;
        this.props.children(value);
    }

    render() {
        const { list, defaultValue } = this.props;

        return (
            <SelectList
                defaultValue={defaultValue}
                list={list}
                handleSelect={this.handleSelect}
            />
        );
    }
}



export default SelectListContainer;