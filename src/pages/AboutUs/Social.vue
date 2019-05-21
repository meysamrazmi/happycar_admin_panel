<template>
    <div class="col-sm-12">
        <card title="شبکه اجتماعی">
            <div class="row mb-5">
                <div class="col-6"></div>
                <div class="col-6">
                    <p-button class="pull-left" type="success" @click.native="showModal('create', {})">
                        افزودن شبکه اجتماعی
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
                    </v-client-table>
                </div>
            </div>
        </card>
        <social-detail
                :show="modal.show"
                :modalData="modal.data"
                :type="modal.type"
                @close="modal.show=false"
                @updateParent="fetchSocialList"
        >
        </social-detail>
    </div>
</template>

<script>
    import {ClientTable} from 'vue-tables-2';
    import SocialDetail from './SocialDetail.vue'

    export default {
        name: "Social",

        components: {
            ClientTable,
            SocialDetail
        },

        data() {
            return {
                columns: ['id', 'name', 'url', 'activeted', 'actions'],
                data: [],
                options: {
                    headings: {
                        id:'شناسه',
                        name: 'نام',
                        url: 'آدرس',
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
            this.fetchSocialList()
        },

        methods: {
            fetchSocialList() {
                this.$http.get('/about_us/admin/social/').then((res) => {
                    this.data = res.data.result;
                }).catch((err) => {
                })
            },

            changeStatus(social) {
                let data = {
                    social_id : social.id,
                    activeted: !social.activeted
                };

                this.$http.patch('/about_us/admin/social/', data).then((res) => {
                    this.fetchSocialList()
                }).catch((err) => {
                    this.fetchSocialList()
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