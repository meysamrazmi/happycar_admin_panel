<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title=" پیام‌ها" subTitle="لیست پیام‌ها">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns"
                                                    :data="tableData"
                                                    :options="options">
                                        <div slot="seen" slot-scope="props">
                                            <span v-if="props.row.seen" class="ti-check text-success">
                                            </span>
                                            <span v-else class="ti-close text-danger"></span>
                                        </div>
                                        <a slot="see" slot-scope="props" href="#">
                                            <router-link :to="{ name: 'single-message', params: { id: props.row.id }}">
                                                <span class="ti-eye"></span>
                                            </router-link>
                                        </a>
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

    export default {
        name: "messages",

        components: {
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'category.category', 'title', 'user.name', 'seen', 'see'],
                options: {
                    headings: {
                        id: 'ردیف',
                        'category.category': 'دسته',
                        title: 'عنوان',
                        'user.name': 'کاربر',
                        seen: 'مشاهده شده',
                        see: 'مشاهده'
                    },
                    sortable: ['id', 'seen', 'user', 'category'],
                    filterable: ['category', 'user', 'title'],
                    pagination: {chunk: 10},
                    sortIcon: this.$store.state.tebleConfig.sortIcon,
                    texts: this.$store.state.tebleConfig.texts,
                    skin: this.$store.state.tebleConfig.skin,
                    rowClassCallback: function (row) {
                        return `seen-${row.seen}`
                    },
                    descOrderColumns: ['id',],
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

        computed:{
            tableData() {
                return this.$store.state.messages.messages;
            }
        },

        mounted() {
            this.$store.dispatch('messages/getMessages')
        },

        methods: {

        }


    }
</script>

<style>
    .seen-false {
        background-color: #71f1873d;
    }
    .seen-true {
        background-color: #ece9e51c;
    }
</style>