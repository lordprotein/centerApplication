import React, { Component } from 'react';
import { SelectList } from '../../components/SelectList/SelectList';
import { withAdmin } from '../../hoc/withRole';
import { priorityNormalize } from '../../components/ApplicationList/ApplicationItem/formattingFunctions';
import { selectorsUser } from '../../selectors/user';
import { store } from '../../stores/stores';


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


export const SelectListExecuters = ({ existExecutersList, title = '', children }) => {
    let executersList = [];

    
    
    if (existExecutersList) {
        executersList = existExecutersList.map(({ full_name, ID }) => {
            return {
                title: full_name,
                value: ID
            }
        })
    }
    else {
        executersList = selectorsUser.existExecuters(store.getState()).map(({ full_name, ID }) => {
            return {
                title: full_name,
                value: ID
            }
        });
    }

    return (
        <SelectListContainer
            list={executersList}
            title={title}
        >
            {children}
        </SelectListContainer>
    );
}


export const SelectListPriority = ({ handleSelect }) => {
    const { setPriority } = handleSelect;

    return (
        <SelectListContainer
            list={priorityNormalize()}
            title={'Выставить приоритет'}
        >
            {(value) => setPriority(priorityNormalize(value, true))}
        </SelectListContainer>
    );
}

export const SelectListExecutersWithAdmin = withAdmin(SelectListExecuters);
export const SelectListPriorityWithAdmin = withAdmin(SelectListPriority);