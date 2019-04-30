<template>
    <div class="ms-wrapper" v-click-outside="closePanel">
        <div class="value-holder" @click="showChoicePanel = !showChoicePanel">
            <span v-if="!(value.length > 0) && !showChoicePanel"
                  class="choice-panel-placeholder">برای انتخاب کلیک کنید</span>
            <span v-if="!(value.length > 0) && showChoicePanel"
                  class="choice-panel-placeholder">برای بستن پنل کلیک کنید</span>
            <span v-for="val in value" :key="val[keyField]" class="ms-items">
        {{val[optionField] || val}}
        <span><i class="ti-close" @click="removeValuesElement(val)"></i></span>
      </span>
        </div>
        <div v-show="showChoicePanel" class="choice-panel">
            <input class="search-place"
                   type="text"
                   placeholder="جستجو کنید..."
                   v-model="search"
                   @keyup.enter="selectTheFirst"
            />
            <ul class="list-group choice-list">
                <li
                        class="list-group-item choice-list-item"
                        v-for="option in searchedOptions"
                        :key="option[keyField] || option"
                        @click="addOrRemoveElement(option)"
                        :class="{selectedOptions : (checkOption(option))}">
                    {{ option[optionField] || option }}
                </li>
                <li v-if="!(searchedOptions.length > 0)" class="list-group-item">موردی یافت نشد.</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import vClickOutside from 'v-click-outside';

    export default {
        name: "multi-select",
        data() {
            return {
                showChoicePanel: false,
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
                if(this.optionField !== '' && this.optionField !== undefined){
                    return this.options.filter((option) => option[this.optionField].includes(this.search));
                }else {
                    let data = this.options.map((option) => {
                        if(option.includes(this.search) === true){
                            return option;
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
                this.showChoicePanel = false;
            },
            removeValuesElement(option) {
                this.showChoicePanel = false;
                let index = this.value.indexOf(option);
                if (index > -1) {
                    this.value.splice(index, 1);
                }
            },
            checkOption(option) {
                return this.selectedOptions.includes(option)
            },
            closePanel(e) {
                this.showChoicePanel = false;
            },
            selectTheFirst() {
                if (this.search !== '') {
                    this.addOrRemoveElement(this.searchedOptions[0]);
                }
            }
        }
    }
</script>

<style scoped>
    .value-holder {
        border: 1px solid #bdbdbd;
        width: 100%;
        border-radius: 5px;
    }

    .search-place {
        padding: 11px;
        width: 100%;
    }

    .choice-panel ul {
        margin-left: 0px;
        max-height: 200px;
        overflow: scroll;
    }

    .choice-panel {
        position: absolute;
        width: 100%;
    }

    .selectedOptions {
        background: rgb(21, 167, 137);
        color: #fff;
    }

    .ms-wrapper {
        position: relative;
    }

    .ms-items {
        border-radius: 8px;
        margin: 3px 3px;
        font-size: 12px;
        display: inline-block;
        background: #212120;
        position: relative;
        color: #fff;
        padding: 5px 22px 2px 7px;
    }

    .ms-items span {
        font-size: 10px;
        position: absolute;
        top: 3px;
        padding-top: 4px;
        padding-right: 3px;
        right: 4px;
        color: #f1f1f1;
        padding-left: 3px;
    }

    .ms-items span:hover {
        background-color: #000;
        color: #ff8774;
    }

    .choice-panel-placeholder {
        padding: 5px 7px 2px 7px;
        margin: 3px 3px;
        display: inline-block;
    }

    .choice-list-item:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }

    .selectedOptions:hover {
        background: rgb(16, 158, 167);
    }

</style>
