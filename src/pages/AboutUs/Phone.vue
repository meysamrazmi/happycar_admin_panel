<template>
    <div class="col-sm-12">
        <card title="تلفن">
            <div class="row mb-5">
                <div class="col-6"></div>
                <div class="col-6">
                    <p-button class="pull-left" type="success" @click.native="showModal('create', {})">
                        افزودن شماره
                    </p-button>
                </div>
            </div>
            <div class="row">
            <div class="col-12">
                <v-client-table :columns="columns" :data="phones" :options="options">
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
                </v-client-table>
            </div>
            </div>
        </card>
        <phone-detail
                :show="modal.show"
                :modalData="modal.data"
                :type="modal.type"
                @close="modal.show=false"
                @updateParent="fetchPhoneList"
        >
        </phone-detail>
    </div>
</template>

<script>
    import {ClientTable} from 'vue-tables-2';
    import PhoneDetail from './PhoneDetail.vue'

    export default {
        name: "Phone",

        components: {
            ClientTable,
            PhoneDetail
        },

        data() {
            return {
                columns: ['id', 'name', 'phoneNumber', 'activeted', 'actions'],
                phones: [],
                options: {
                    headings: {
                        id:'شناسه',
                        name: 'نام',
                        phoneNumber: 'شماره',
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
            this.fetchPhoneList()
        },

        methods: {
            fetchPhoneList() {
                this.$http.get('/about_us/admin/phone/').then((res) => {
                    this.phones = res.data.result;
                }).catch((err) => {
                })
            },

            changeStatus(phone) {
                let data = {
                    phone_id: phone.id,
                    activeted: !phone.activeted
                };

                this.$http.patch('/about_us/admin/phone/', data).then((res) => {
                    this.fetchPhoneList()
                }).catch((err) => {
                    this.fetchPhoneList()
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