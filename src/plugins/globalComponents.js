import {
    FormGroupInput,
    Card,
    DropDown,
    Button,
    PageInation,
    MultiSelect,
    InputTypeFile,
    Timeinput,
    MModal,
    SModal,
    ToggleButton,
    CheckboxultiSelect
} from "../components/index";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import VueInputTag from 'vue-input-tag';
import Paginate from 'vuejs-paginate';


const GlobalComponents = {
    install(Vue) {
        Vue.component("fg-input", FormGroupInput);
        Vue.component("drop-down", DropDown);
        Vue.component("card", Card);
        Vue.component("p-button", Button);
        Vue.component("page-ination", PageInation);
        Vue.component("fg-file-input", InputTypeFile);
        Vue.component("persian-date", VuePersianDatetimePicker);
        Vue.component("fg-time-input", Timeinput);
        Vue.component("m-modal", MModal);
        Vue.component("s-modal", SModal);
        Vue.component("multi-select", MultiSelect);
        Vue.component("toggle-button", ToggleButton);
        Vue.component("vue-input-tag", VueInputTag);
        Vue.component('paginate', Paginate);
        Vue.component('checkbox-multi-select', CheckboxultiSelect);
    }
};

export default GlobalComponents;
