import React, { Component } from 'react';
import { SelectList } from '../../components/SelectList/SelectList';
import { withAdmin } from '../../hoc/withRole';
import { priorityNormalize } from '../../components/ApplicationList/ApplicationItem/formattingFunctions';


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


export const SelectListExecutersWithAdmin = ({ existExecutersList, handleSelect }) => {
    const { addOneMoreExecuter } = handleSelect;
    const NewComponent = withAdmin(SelectListContainer);

    return (
        <NewComponent
            list={existExecutersList.map(({ full_name, ID }) => {
                return {
                    title: full_name,
                    value: ID
                }
            })}
            title={'Назначить исполнителем'}
        >
            {(value) => addOneMoreExecuter(value)}
        </NewComponent>
    );
}


export const SelectListPriorityWithAdmin = ({ handleSelect }) => {
    const { setPriority } = handleSelect;
    const NewComponent = withAdmin(SelectListContainer);

    return (
        <NewComponent
            list={priorityNormalize()}
            title={'Выставить приоритет'}
        >
            {(value) => setPriority(priorityNormalize(value, true))}
        </NewComponent>
    );
}