import {combineReducers} from 'redux';
import applications from './applications';
import load from './load';
import user from './user';


export default combineReducers({
    applications,
    load,
    user
});