<template>
    <div class="cms-wrapper">
        <div class="cms-search-wrapper w-100">
            <input type="text" v-model="search" placeholder="جستجو کنید ..." class="w-100 p-2 d-block cms-search">
        </div>
        <div class="cms-items-list-wrapper py-2 px-3">
            <div class="c-poiner py-2" @click="selectAll()">انتخاب همه</div>
            <div class="custom-control custom-checkbox py-1"
                 v-for="option in searchedOptions"
                 :key="option[keyField] || option"
            >
                <input :checked="(checkOption(option))" type="checkbox" :id="option[keyField] || option"
                       @click="addOrRemoveElement(option)">
                <label :for="option[keyField] || option">{{ option[optionField] || option }}</label>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import vClickOutside from 'v-click-outside';

    export default {
        name: "checkbox-multi-select",
        data() {
            return {
                search: '',
            }
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        props: {
            options: {
                type: Array,
                default: () => []
            },
            value: {
                type: Array,
                default: () => []
            },
            keyField: {
                type: String,
                default: 'id'
            },
            optionField: {
                type: String,
                default: 'name'
            }
        },
        computed: {
            searchedOptions() {
                if (this.optionField !== '' && this.optionField !== undefined) {
                    return this.options.filter((option) => option[this.optionField].includes(this.search));
                } else {
                    let data = [];
                    this.options.forEach((option) => {
                        if (option.includes(this.search) === true) {
                            data.push(option);
                        }
                    });
                    return data;
                }
            },
            selectedOptions() {
                return _.intersection(this.options, this.value);
            },
        },

        watch: {
            showChoicePanel(val) {
                this.search = "";
            }
        },

        methods: {

            addOrRemoveElement(option) {
                //consoel.log(option);
                if (this.value.includes(option)) {
                    this.removeValuesElement(option);
                } else {
                    this.value.push(option);
                }
            },
            removeValuesElement(option) {
                let index = this.value.indexOf(option);
                if (index > -1) {
                    this.value.splice(index, 1);
                }
            },
            checkOption(option) {
                return this.selectedOptions.includes(option)
            },
            // closePanel(e) {
            //     this.showChoicePanel = false;
            // },
            // selectTheFirst() {
            //     if (this.search !== '') {
            //         this.addOrRemoveElement(this.searchedOptions[0]);
            //     }
            // }

            selectAll() {
                for(let i=0; i< this.options.length; i++){
                    let option = this.options[i];
                    if (this.value.includes(option)) {

                    } else {
                        this.value.push(option);
                    }
                }

            }
        }
    }
</script>

<style scoped>
    .cms-items-list-wrapper {
        height: 300px;
        overflow-y: auto;
        border: 1px solid rgba(94, 94, 94, 0.34);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        text-align: right;
    }

    .cms-search {
        border: 1px solid rgba(94, 94, 94, 0.34);
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }

    .c-poiner {
        cursor: pointer;
    }
</style>
