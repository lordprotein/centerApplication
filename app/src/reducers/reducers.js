import {combineReducers} from 'redux';
import applications from './applications';
import load from './load';


export default combineReducers({
    applications,
    load
});