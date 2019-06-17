import {mapState} from "vuex";

/** map a unnamespaced module state */
export function mapModuleState(module, statePropKeys) {
    let stateMap = {};
    statePropKeys.forEach(propKey =>{
        stateMap[propKey] = state => state[module][propKey];
    });
    return mapState(stateMap);
}