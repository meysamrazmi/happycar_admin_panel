<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="گروه پیام" subTitle="لیست گروه‌های پیام‌ها">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success" @click.native="showModal('create', {})">
                                    افزودن گروه
                                </p-button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns" :data="data" :options="options">
                                        <div slot="status"
                                             slot-scope="props"
                                             @click="changeStatus(props.row)"
                                        >
                                            <toggle-button
                                                    :value="props.row.status">
                                            </toggle-button>
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                            <span class="ti-pencil-alt text-primary pr-3"
                                                  @click="showModal('update', props.row)"></span>
                                            <span class="ti-trash text-danger"
                                                  @click="deleteCategory(props.row)"></span>
                                        </div>
                                    </v-client-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <category-modal
                    :show="modal.show"
                    :modalData="modal.data"
                    :type="modal.type"
                    @close="modal.show=false"
                    @updateParent="updateData"
            >
            </category-modal>
        </div>
    </div>
</template>

<script>
    import {ClientTable} from 'vue-tables-2';
    import {Button as PButton} from '@/components';
    import CategoryModal from './Messages/CategoryModal';

    export default {
        name: "messages",

        components: {
            ClientTable,
            PButton,
            CategoryModal
        },

        data() {
            return {
                modal: {
                    show: false,
                    type: '',
                    data: {}
                },
                columns: ['id', 'category', 'status', 'actions'],
                data: [],
                options: {
                    headings: {
                        status: 'وضعیت',
                        category: 'گروه',
                        id: 'ردیف',
                        actions: 'اقدامات'
                    },
                    sortable: ['id', 'status', 'category'],
                    filterable: ['category'],
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
            this.fetchMessageCategory();
        },

        methods: {
            test() {
              alert("click")
            },
            updateData() {
                this.fetchMessageCategory()
            },

            fetchMessageCategory() {
                this.$http('/contact_us/admin_category/').then((res) => {
                    if(res.status !== 204) {
                        this.data = res.data.result;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },

            editCategory(data) {
                this.$http.patch('/contact_us/category/', data).then((res) => {
                    this.fetchMessageCategory();
                }).catch((err) => {
                    this.fetchMessageCategory();
                })
            },

            changeStatus(data) {
                console.log(data);
                let updatedData = {
                    category_id: data.id,
                    status: String(!data.status)
                };
                this.editCategory(updatedData);
            },

            deleteCategory(category) {
                let data = {
                    category_id: category.id
                };
                this.$http.delete('/contact_us/category/', {data: data}).then((res) => {
                    console.log(res);
                    this.fetchMessageCategory()
                }).catch((err) => {
                    console.log(err);
                    this.fetchMessageCategory()
                })
            },

            showModal(type, data) {
                this.modal = {
                    show: true,
                    type: type,
                    data: data
                }
            }
        }


    }
</script>

<style scoped>

</style>