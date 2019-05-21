<template>
    <m-modal v-show="showMe" @close="closeModal">
        <template slot="header">
        <span v-if="type === 'created'">
            اضافه کردن گروه جدید
        </span>
            <span v-else>
            به‌روز رسانی گروه
        </span>
        </template>
        <template slot="body">
            <form @submit.prevent @keyup.enter="sendRequest">
                <div class="row">
                    <div class="col-sm-12">
                        <label>
                            انبار
                        </label>
                        <model-list-select :list="stores"
                                           v-model="productInStore.store_id.id"
                                           option-value="id"
                                           data-vv-as="انبار"
                                           name="store_id"
                                           option-text="name"
                                           v-validate="'required'"
                                           class="form-control-select"
                                           placeholder="انبار را انتخاب کنید">
                        </model-list-select>
                        <span class="error-loger">
                              {{ errors.first('store_id') }}
                            </span>
                    </div>

                    <div class="col-sm-12">
                        <label>
                            محصول
                        </label>
                        <model-list-select :list="products"
                                           v-model="productInStore.product_id.id"
                                           option-value="id"
                                           data-vv-as="محصول"
                                           name="product_id"
                                           option-text="special_name"
                                           :custom-text="productName"
                                           v-validate="'required'"
                                           class="form-control-select"
                                           placeholder="محصول را انتخاب کنید">
                        </model-list-select>
                        <span class="error-loger">
                              {{ errors.first('product_id') }}
                            </span>
                    </div>
                    <div class="col-md-12">
                        <fg-input type="number"
                                  name="count"
                                  label="تعداد"
                                  placeholder="تعداد"
                                  rules="required"
                                  v-model="productInStore.count"
                                  data-vv-as="تعداد محصول"
                                  v-validate="'required'"
                                  :err="errors.first('count')"
                        >
                        </fg-input>
                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round @click.native.prevent="sendRequest">
                        ارسال
                    </p-button>
                </div>
                <div class="clearfix"></div>
            </form>
        </template>

    </m-modal>
</template>

<script>
    import { ModelListSelect } from 'vue-search-select';

    export default {
        name: "add-product",
        components: {
            ModelListSelect
        },
        props: {
            show: {
                type: Boolean
            },
            modalData: {
                type: Object,
                required: false,
            },
            type: {
                type: String
            }
        },
        data() {
            return {
                showMe: false,
                category: '',
                products: [],
                stores: [],
                item: {},
                productInStore: {
                    product_id: {
                        name: '',
                        id: ''
                    },
                    store_id: {
                        name: '',
                        id: ''
                    },
                    count: ''
                }
            }
        },

        mounted() {
            this.getProductList();
            this.getStores();
        },


        methods: {

            closeModal() {
                this.$emit('close');
                this.showMe = false;
                this.productInStore = {
                    product_id: {
                        name: '',
                        id: ''
                    },
                    store_id: {
                        name: '',
                        id: ''
                    },
                    count: ''
                };
                setTimeout(()=>{
                    this.category = null;
                }, 200)
            },

            sendRequest() {
                this.$validator.validateAll().then((res)=>{
                    if(res){
                        if (this.type === "create") {
                            let data = {
                                product_id: this.productInStore.product_id.id,
                                store_id: this.productInStore.store_id.id,
                                count: this.productInStore.count
                            };
                            this.$http.post('/products/add_to_store/', data).then((res) => {
                                console.log(res);
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else if (this.type === "update") {
                            let data = {
                                category_id: this.modalData.id,
                                category: this.category,
                                status: String(this.modalData.status)
                            };
                            this.$http.patch('/contact_us/category/', data).then((res) => {
                                console.log(res);
                                this.category = '';
                                // this.errors.clear();
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    }
                }).catch((err)=> {

                });
            },

            getProductList() {
                this.$http.get('/products/').then((res)=> {
                    console.log('prod', res.data.result);
                    this.products = res.data.result
                }).catch((err) => {
                    console.log(err)
                })
            },

            getStores() {
                this.$http.get('/products/store/').then((res)=> {
                    console.log('store', res.data.result);
                    this.stores = res.data.result;
                }).catch((err) => {
                    console.log(err)
                })
            },

            productName(item) {
                return `${item.general_name} - ${item.special_name}`
            }
        },
        watch: {
            show(val) {
                this.showMe = val;
                if(val) {
                    this.$validator.pause();
                    this.errors.clear();
                    this.$nextTick(() => {
                        this.$validator.errors.clear();
                        this.$validator.fields.items.forEach(field => field.reset());
                        this.$validator.fields.items.forEach(field => this.errors.remove(field));
                        this.$validator.resume();
                    });
                }
            },
            modalData(val) {
                if(!!val.category){
                    this.category = val.category;
                }else {
                    this.category = ""
                }
            }
        }

    }
</script>

<style scoped>
    .backendError {
        padding-top: 10px;
        color: red;
    }

</style>
