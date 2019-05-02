<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="کالاهای انبار" subTitle="لیست کالاهای انبار">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success" @click.native="openModal('create', {})">
                                    افزودن کالا به انبار
                                </p-button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns" :data="data" :options="options">
                                        <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri"
                                           class="ti ti-eye"></a>
                                    </v-client-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
                <add-product :show="modal.show"
                             :modalData="modal.data"
                             :type="modal.type"
                             @close="modal.show=false"
                             @updateParent="updateData">
                </add-product>
            </div>

        </div>
    </div>
</template>

<script>
    import {ClientTable} from 'vue-tables-2'
    import AddProduct from './Stores/AddProduct';

    function getData() {
        return [];
    }


    export default {
        name: "store-product",

        components: {
            ClientTable,
            AddProduct
        },

        data() {
            return {
                modal: {
                    show: false,
                    data: {},
                    type: '',
                },
                columns: ['id', 'name', 'code', 'uri'],
                data: getData(),
                options: {
                    headings: {
                        name: 'نام کشور',
                        code: 'کد کشور',
                        uri: 'مشاهده سوابق',
                        id: 'ردیف'
                    },
                    sortable: ['id', 'name', 'code'],
                    filterable: ['name', 'code'],
                    pagination: {chunk: 10},
                    sortIcon: this.$store.state.tebleConfig.sortIcon,
                    texts: this.$store.state.tebleConfig.texts,
                    skin: this.$store.state.tebleConfig.skin,
                    customSorting: {
                        id: function (ascending) {
                            return function (a, b) {
                                if (ascending) {
                                    return a.id >= b.id ? 1 : -1;
                                }
                                return a.id <= b.id ? 1 : -1;
                            }
                        },
                    }
                }
            }
        },

        mounted() {
        },

        methods: {
            openModal(type, data) {
                this.modal.show = true;
                this.modal.type = type;
                this.modal.data = data;
            },

            updateData() {

            }
        }


    }
</script>

<style scoped>

</style>