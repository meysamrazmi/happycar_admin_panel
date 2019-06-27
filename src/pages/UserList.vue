<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="کاربرها" subTitle="لیست مشتریان">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns" :data="data" :options="options">
                                        <div slot="date_joined" slot-scope="props">
                                            {{chengeTime(props.row.date_joined)}}
                                        </div>
                                        <div slot="last_login" slot-scope="props">
                                            {{props.row.last_login ? chengeLoginTime(props.row.last_login) : ''}}
                                        </div>
                                        <div slot="active"
                                             slot-scope="props"
                                             @click="changeUserStatus(props.row)"
                                        >
                                            <toggle-button :value="props.row.active"
                                            >
                                            </toggle-button>
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                            <router-link :to="{name: 'user-profile', params:{id: props.row.id}}" class="text-white">
                                                <a class="ti-eye text-primary">
                                                </a>
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
    import {ClientTable} from 'vue-tables-2'
    import moment from 'jalali-moment';

    export default {
        name: "user-list",

        components: {
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'name', 'phone', 'date_joined', 'active', 'last_login', 'actions'],
                data: [],
                options: {
                    headings: {
                        name: 'نام',
                        phone: 'شماره',
                        active:  'وضعیت',
                        id: 'ردیف',
                        date_joined: 'تاریخ ثبت‌نام',
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
            this.fetchUsersList()
        },

        methods: {
            fetchUsersList() {
                this.$http.get('/admin/customer/').then((res)=> {
                    this.data = res.data;
                }).catch((err)=> {
                    console.log(err);
                })
            },

            chengeTime(time) {
                return moment(time).format('jYYYY/jMM/jDD')
            },

            chengeLoginTime(time) {
                return moment(time).format('jYYYY/jMM/jDD, h:mm a')
            },

            changeUserStatus(user) {
                this.$http.patch(`/admin/customer/${user.id}/`).then((res)=> {
                    console.log(res);
                    this.fetchUsersList();
                }).catch((err)=> {
                    console.log(err);
                    this.fetchUsersList();
                })
            }
        }


    }
</script>

<style scoped>

</style>