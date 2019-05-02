<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="گروه کالا" subTitle="لیست گروه کالا">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success">
                                    <router-link :to="{name: 'product-category-detail'}" class="text-white">
                                        افزودن گروه کالا
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
                                            <img v-else  :src="`${$http.defaults.mediaUrl}${props.row.image}`" class="mr-thumb" alt="">
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                            <router-link :to="{name: 'product-category-detail', params: {id: props.row.id}}">
                                                <span class="ti-pencil-alt text-primary pr-3"></span>
                                            </router-link>
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

        </div>
    </div>
</template>

<script>
    import {ClientTable} from 'vue-tables-2';

    function getData() {
        return [];
    }


    export default {
        name: "product-category-list",

        components: {
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'name', 'image', 'actions'],
                data: [],
                options: {
                    headings: {
                        name: 'نام',
                        image: 'تصویر',
                        actions: 'اقدامات',
                        id: 'ردیف'
                    },
                    sortable: ['id', 'name'],
                    filterable: ['name'],
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
            this.fetchCategoryList();
        },

        methods: {
            fetchCategoryList() {
                this.$http.get('/products/category/').then((res) => {
                    this.data = res.data.result;
                }).catch((err) => {
                    console.log(err);
                })
            },

            deleteCategory(category) {
                let data = {
                    category_id: category.id
                };
                this.$http.delete('/products/category/', {data: data}).then((res) => {
                    console.log(res);
                    this.fetchCategoryList();
                }).catch((err) => {
                    console.log(err);
                    this.fetchCategoryList();
                })
            },
        }


    }
</script>

<style scoped>

</style>