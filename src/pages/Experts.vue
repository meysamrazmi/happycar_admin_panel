<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="متخصصین" subTitle="لیست متخصصین سیار">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns" :data="data" :options="options">
                                        <div slot="date_joined" slot-scope="props">
                                            {{chengeTime(props.row.date_joined)}}
                                        </div>
                                        <div slot="last_login" slot-scope="props">

                                            {{props.row.last_login ? chengeTime(props.row.last_login) : ''}}
                                        </div>
                                        <div slot="active"
                                             slot-scope="props"
                                             @click="changeExpertStatus(props.row)"
                                        >
                                            <toggle-button :value="props.row.active"
                                            >
                                            </toggle-button>
                                        </div>
                                        <div slot="image" slot-scope="props">
                                            <img  :src="$store.state.placeholderImage"
                                                 class="mr-thumb profile" alt="">
                                            <!--<img  :src="`${$http.defaults.mediaUrl}${props.row.image}`"-->
                                                 <!--class="mr-thumb" alt="">-->
                                        </div>
                                        <div slot="actions">
                                            <router-link :to="{name: 'user-profile', id: '1'}">
                                                <span class="ti-eye text-primary"></span>
                                            </router-link>
                                        </div>
                                    </v-client-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>

        </div>
    </div>
</template>

<script>
    import { ClientTable } from 'vue-tables-2'
    import moment from 'jalali-moment';

    export default {
        name: "experts",

        components:{
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'name', 'image', 'phone', 'date_joined', 'last_login', 'active', 'actions'],
                data: [],
                options: {
                    headings: {
                        name: 'نام',
                        phone: 'شماره',
                        active:  'وضعیت',
                        id: 'ردیف',
                        image: 'تصویر',
                        date_joined: 'تاریخ ورود',
                        last_login: 'آخرین ورود',
                        actions: 'اقدامات'
                    },
                    sortable: ['id', 'name', 'active', 'date_joined', 'last_login'],
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
            this.fetchExpertsList()
        },

        methods: {
            fetchExpertsList() {
                this.$http.get('/admin/expert/').then((res)=> {
                    this.data = res.data;
                }).catch((err)=> {
                    console.log(err);
                })
            },

            chengeTime(time) {
                return moment(time).format('jYYYY/jMM/jDD')
            },

            changeExpertStatus(user) {
                this.$http.patch(`/admin/expert/${user.id}`).then((res)=> {
                    console.log(res);
                    this.fetchExpertsList();
                }).catch((err)=> {
                    console.log(err);
                    this.fetchExpertsList();
                })
            }
        }

    }
</script>

<style scoped>
    .profile {
        border-radius: 50%;
    }
</style>