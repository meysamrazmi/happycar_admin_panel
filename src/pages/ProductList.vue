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
                                        <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri" class="ti ti-eye"></a>
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
        return [];
    }


    export default {
        name: "product-list",

        components:{
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'name', 'code', 'uri'],
                data: getData(),
                options: {
                    headings: {
                        name: 'نام کشور',
                        code: 'کد کشور',
                        uri: 'مشاهده سوابق',
                        id: 'ردیف'
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

<style scoped>

</style>