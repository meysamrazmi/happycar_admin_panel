import FormGroupInput from "./Inputs/formGroupInput.vue";
import InputTypeFile from "./Inputs/InputTypeFile.vue";
import Timeinput from "./Inputs/Timeinput.vue";
import MultiSelect from "./Inputs/MultiSelect";
import CheckboxultiSelect from "./Inputs/CheckboxMultiSelect";

import DropDown from "./Dropdown.vue";
import PaperTable from "./PaperTable.vue";
import CustomTable from "./CustomTable.vue";
import Button from "./Button";
import PageInation from "./PageInation.vue";

import MModal from "./MModal.vue";
import SModal from "./SModal.vue";

import Card from "./Cards/Card.vue";
import ChartCard from "./Cards/ChartCard.vue";
import StatsCard from "./Cards/StatsCard.vue";

import SidebarPlugin from "./SidebarPlugin/index";

import ToggleButton from "./ToggleButton.vue";


let components = {
    FormGroupInput,
    Card,
    ChartCard,
    StatsCard,
    PaperTable,
    DropDown,
    SidebarPlugin,

    InputTypeFile,
    Timeinput,
    MModal,
    CustomTable,
    MultiSelect,
    ToggleButton,
    CheckboxultiSelect
};

export default components;

export {
    FormGroupInput,
    Card,
    ChartCard,
    StatsCard,
    PaperTable,
    DropDown,
    Button,
    SidebarPlugin,
    PageInation,

    InputTypeFile,
    Timeinput,
    MModal,
    SModal,
    CustomTable,
    MultiSelect,
    ToggleButton,
    CheckboxultiSelect

};
