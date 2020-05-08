import React, { Component } from 'react';
import { Loader } from '../components/Loader/Loader';


export const withLoader = (WrappedComponent, isLoad) => {
    return class extends Component {

        render() {
            if (isLoad) {
                return <Loader />
            }
            else {
                return <WrappedComponent {...this.props} />
            }
        }
    }
}