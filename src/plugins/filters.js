import {utcStringToLocal} from '@/util/date-utils';

export default {
    install(Vue) {
        Vue.filter('localDate', utcDate => utcDate ? utcStringToLocal(utcDate).substr(0, utcDate.length) : "");
    }
}
