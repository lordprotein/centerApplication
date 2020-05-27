import React, { Component } from 'react';
import { SelectList } from '../../components/SelectList/SelectList';


class SelectListContainer extends Component {

    handleSelect = (e) => {
        const { value } = e.target;
        this.props.children(value);
    }

    render() {

        return (
            <SelectList
                {...this.props}
                handleSelect={this.handleSelect}
            />
        );
    }
}


export default SelectListContainer;