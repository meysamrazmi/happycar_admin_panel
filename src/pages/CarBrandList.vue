<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="برند خودرو" subTitle="لیست برندهای خودرو">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success" @click.native="showModal('create', {})">
                                    افزودن برند
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
                                            <span class="ti-pencil-alt text-primary pr-3"
                                                  @click="showModal('update', props.row)"></span>
                                            <span class="ti-trash text-danger"
                                                  @click="deleteBrand(props.row)"></span>
                                        </div>
                                    </v-client-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <brand-modal
                    :show="modal.show"
                    :modalData="modal.data"
                    :type="modal.type"
                    @close="modal.show=false"
                    @updateParent="fetchCarBrands"
            >
            </brand-modal>
        </div>
    </div>
</template>

<script>
    import { ClientTable } from 'vue-tables-2'
    import BrandModal from './Car/BrandModal';
    export default {
        name: "car-brand-list",

        components:{
            ClientTable,
            BrandModal
        },

        data() {
            return {
                modal: {
                    show: false,
                    type: '',
                    data: {}
                },
                columns: ['id', 'brand', 'actions'],
                data: [],
                options: {
                    headings: {
                        brand: 'برند',
                        id: 'ردیف',
                        actions: 'اقدامات'
                    },
                    sortable: ['id', 'brand'],
                    filterable: ['brand'],
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
            this.fetchCarBrands();
        },

        methods: {
            fetchCarBrands() {
                this.$http.get('/car/brands/').then((res)=> {
                    if(res.status !== 204){
                        this.data = res.data.result;
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            },

            deleteBrand(brand) {
                let data = {
                    brand_id: brand.id
                };
                this.$http.delete('/car/brands/', {data: data}).then((res) => {
                    console.log(res);
                    this.fetchCarBrands()
                }).catch((err) => {
                    console.log(err);
                    this.fetchCarBrands()
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