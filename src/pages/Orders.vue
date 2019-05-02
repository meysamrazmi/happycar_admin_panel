<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="لیست آی‌پی‌ها" subTitle="دسترسی به اطلاعات آی‌پی‌ها">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns" :data="data" :options="options">
                                        <div slot="payment_type" slot-scope="props">
                                            <span v-if="props.row.payment_type === 'cash'" class="badge-info p-2 rounded">
                                                نقدی
                                            </span>
                                            <span v-else class="badge-success p-2 rounded">
                                                آنلاین
                                            </span>
                                        </div>
                                        <div slot="services" slot-scope="props">
                                            <vue-input-tag :tags="props.row.services" :read-only="true" :allow-duplicates="true">
                                            </vue-input-tag>
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                            <router-link :to="{name: 'order-detail'}">
                                                <a class="ti-eye text-primary"></a>
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

    function getData() {
        return [
            {
                id: 1,
                user: 'محمد',
                services: [
                    'تعویض روغن',
                    'کارواش'
                ],
                price: 1200,
                payment_type: 'online',
                assign: false,
            },
            {
                id: 2,
                user: 'حسن',
                services: [
                    'تعویض فیلتر',
                    'پنچری'
                ],
                price: 120000,
                payment_type: 'cash',
                assign: true,
            }
        ];
    }


    export default {
        name: "orders",

        components:{
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'user', 'services', 'payment_type', 'price', 'actions'],
                data: getData(),
                options: {
                    headings: {
                        user: 'کاربر',
                        services: 'سرویس‌ها',
                        payment_type: 'نوع پرداخت',
                        price: 'هزینه',
                        actions: 'اقدامات',
                        id: 'ردیف'
                    },
                    rowClassCallback: function (row) {
                        return `assign-${row.assign}`
                    },
                    sortable: ['id','name', 'code'],
                    filterable: ['name', 'code'],
                    pagination: { chunk:10 },
                    sortIcon: this.$store.state.tebleConfig.sortIcon,
                    texts: this.$store.state.tebleConfig.texts,
                    skin: this.$store.state.tebleConfig.skin,
                    customSorting: {
                        id: function (ascending) {
                            return function (a, b) {
                                if (ascending){
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
        }


    }
</script>

<style>
    .assign-false {
        background-color: #71f1873d;
    }
    .assign-true {
        background-color: #ece9e51c;
    }
</style>