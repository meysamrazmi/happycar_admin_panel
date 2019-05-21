<template>
    <div class="col-sm-12">
        <card title="توضیحات">
            <div class="row mb-5">
                <div class="col-6"></div>
                <div class="col-6">
                    <p-button class="pull-left" type="success" @click.native="showModal('create', {})">
                        افزودن توضیحات
                    </p-button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <v-client-table :columns="columns" :data="data" :options="options">
                        <div slot="activeted"
                             slot-scope="props"
                             @click="changeStatus(props.row)"
                        >
                            <toggle-button
                                    :value="props.row.activeted">
                            </toggle-button>
                        </div>
                        <div slot="actions" slot-scope="props">
                                            <span class="ti-pencil-alt text-primary pr-3"
                                                  @click="showModal('update', props.row)"></span>
                        </div>
                        <div slot="child_row" slot-scope="props">
                            <strong class="d-block">
                                توضیحات
                            </strong>
                            <span>
                                {{ props.row.description }}
                            </span>
                        </div>
                    </v-client-table>
                </div>
            </div>
        </card>
        <description-detail
                :show="modal.show"
                :modalData="modal.data"
                :type="modal.type"
                @close="modal.show=false"
                @updateParent="fetchDescriptionList"
        >
        </description-detail>
    </div>
</template>

<script>
    import {ClientTable} from 'vue-tables-2';
    import DescriptionDetail from './DescriptionDetail.vue'

    export default {
        name: "Social",

        components: {
            ClientTable,
            DescriptionDetail
        },

        data() {
            return {
                columns: ['id', 'name', 'activeted', 'actions'],
                data: [],
                options: {
                    headings: {
                        id:'شناسه',
                        name: 'نام',
                        activeted: 'وضعیت',
                        actions: 'اقدامات'
                    },
                    sortable: [],
                    filterable: [],
                    pagination: {chunk: 10},
                    sortIcon: this.$store.state.tebleConfig.sortIcon,
                    texts: this.$store.state.tebleConfig.texts,
                    skin: this.$store.state.tebleConfig.skin,
                },
                modal: {
                    show: false,
                    type: '',
                    data: {}
                },
            }
        },

        mounted() {
            this.fetchDescriptionList()
        },

        methods: {
            fetchDescriptionList() {
                this.$http.get('/about_us/admin/description/').then((res) => {
                    this.data = res.data.result;
                }).catch((err) => {
                })
            },

            changeStatus(description) {
                let data = {
                    description_id : description.id,
                    activeted: !description.activeted
                };

                this.$http.patch('/about_us/admin/description/', data).then((res) => {
                    this.fetchDescriptionList()
                }).catch((err) => {
                    this.fetchDescriptionList()
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