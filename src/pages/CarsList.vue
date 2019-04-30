<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="خودروها" subTitle="لیست خودروها">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success">
                                    <router-link :to="{name: 'create-car'}" class="text-white">
                                        افزودن خودرو
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
                                        <div slot="actions" slot-scope="props">
                                            <router-link :to="{ name: 'edit-car', params: { id: props.row.id }}">
                                                <a class="ti-pencil-alt text-primary pr-3"></a>
                                            </router-link>
                                            <span class="ti-trash text-danger"
                                                  @click="deleteCar(props.row)"></span>
                                        </div>
                                        <div slot="types" slot-scope="props">
                                            <div>
                                                <vue-input-tag :tags="getCarTypes(props.row.id)" :read-only="true" :allow-duplicates="true">
                                                </vue-input-tag>
                                            </div>
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

    export default {
        name: "car-list",

        components:{
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'carModel', 'brand', 'types', 'actions'],
                data: [],
                carTypes: [],
                options: {
                    headings: {
                        carModel: 'مدل خودرو',
                        brand: 'برند',
                        id: 'ردیف',
                        actions: 'اقدامات',
                        types: 'تیپ‌ها'
                    },
                    sortable: ['id','carModel', 'brand'],
                    filterable: ['carModel', 'brand'],
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
            this.fetchCars();
            this.fetchCarTypes();

        },

        methods: {
            fetchCars() {
                this.$http.get('/car/models/').then((res)=> {
                    if(res.status !== 204) {
                        this.data = res.data.result;
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            },

            fetchCarTypes() {
                this.$http.get('/car/type/').then((res)=> {
                    if(res.status !== 204) {
                        this.carTypes = res.data.result;
                    }
                    console.log(this.getCarTypes(7))
                }).catch((err)=> {
                    console.log(err);
                })
            },

            getCarTypes(carId) {
                let types = this.carTypes.filter((type)=> {
                    return type.carModel === carId;
                });
                return types.map((type)=> {
                    return type.carType;
                });
            },

            deleteCar(car) {
                let data = {
                    carModel_id: car.id
                };
                this.$http.delete("/car/models/", {data: data}).then((res)=> {
                    this.fetchCars();
                    this.fetchCarTypes();
                }).catch((err)=> {
                    this.$swal({
                        type: 'warning',
                        title: 'خطا',
                        text: 'دوباره تلاش کنید'
                    })
                })
            }
        }


    }
</script>

<style>
    .vue-input-tag-wrapper.read-only {
        border: none;
        background-color: #0000;
    }
</style>