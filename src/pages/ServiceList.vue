<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="سرویس‌ها" subTitle="لیست سرویس‌ها">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success">
                                    <router-link :to="{name: 'service-detail'}" class="text-white">
                                        افزودن سرویس
                                    </router-link>
                                </p-button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :columns="columns" :data="data" :options="options">
                                        <div slot="image" slot-scope="props">
                                            <img v-if="props.row.image === null" :src="$store.state.placeholderImage" class="mr-thumb" alt="">
                                            <img v-else :src="`${$http.defaults.mediaUrl}${props.row.image}`" class="mr-thumb" alt="">
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                            <router-link :to="{name: 'service-detail', params: {id: props.row.id}}">
                                                <span class="ti-pencil-alt text-primary pr-3"></span>
                                            </router-link>
                                            <span class="ti-trash text-danger"
                                                  @click="deleteService(props.row)"></span>
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


    export default {
        name: "service-list",

        components: {
            ClientTable
        },

        data() {
            return {
                columns: ['id','name','image', 'category_id.name','price', 'actions'],
                data: [],
                options: {
                    headings: {
                        name: 'نام',
                        'category_id.name': 'گروه',
                        id: 'ردیف',
                        image: 'تصویر',
                        price: 'قیمت',
                        actions: 'اقدامات'
                    },
                    sortable: ['id','price','category_id.name'],
                    filterable: ['name','category_id.name'],
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

                        price: function (ascending) {
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
            this.fetchServiceList();
        },

        methods: {

            deleteService(service) {
                let data = {
                    servise_id: service.id
                };
                this.askBeforeDelete(()=> {
                    this.$http.delete('/services/service/', {data: data}).then((res) => {
                        console.log(res);
                        this.fetchServiceList();
                    }).catch((err) => {
                        console.log(err);
                        this.fetchServiceList();
                    })
                });
            },

            fetchServiceList() {
                this.$http.get('/services/service/all/').then((res)=> {
                    this.data = res.data.result;
                }).catch((err)=> {
                    console.log(err);
                })
            }
        },

    }
</script>

<style scoped>

</style>