<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="محصول" :subTitle="subTitle">
                    <div class="row mt-5 justify-content-center">
                        <div class="col-md-6 m-2">
                            <img-inputer
                                    v-model="imageFile"
                                    :img-src="imagePreview"
                                    placeholder="عکس را در این ناحیه قرار دهید یا کلیک کنید."
                                    theme="light"
                                    size="large"/>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-6">
                            <fg-input type="text"
                                      name="special_name"
                                      label="نام خاص"
                                      placeholder="نام خاص"
                                      rules="required"
                                      v-model="product.special_name"
                                      data-vv-as="نام خاص"
                                      v-validate="'required'"
                                      :err="errors.first('special_name')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-6">
                            <fg-input type="text"
                                      name="general_name"
                                      label="نام عمومی"
                                      placeholder="نام عمومی"
                                      rules="required"
                                      v-model="product.general_name"
                                      data-vv-as="نام عمومی"
                                      v-validate="'required'"
                                      :err="errors.first('general_name')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-6">
                            <label>
                                گروه کالا
                            </label>
                            <select name="category_id"
                                    data-vv-as="گروه"
                                    class="form-control"
                                    v-validate="'required'"
                                    :class="{ errorInput : errors.first('category_id') }"
                                    v-model="product.category_id.id"
                            >
                                <option value="" selected disabled>
                                    گروه
                                </option>
                                <option v-for="group in productGroup" :value="group.id" :key="group.id">
                                    {{ group.name }}
                                </option>
                            </select>
                            <span class="error-loger">
                              {{ errors.first('category_id') }}
                            </span>
                        </div>

                        <div class="col-sm-6">
                            <label>
                                گروه سرویس
                            </label>
                            <select name="service_id"
                                    data-vv-as="گروه"
                                    class="form-control"
                                    v-validate="'required'"
                                    :class="{ errorInput : errors.first('service_id') }"
                                    v-model="product.service_id.id"
                            >
                                <option value="" selected disabled>
                                    گروه
                                </option>
                                <option v-for="group in serviceGroup" :value="group.id" :key="group.id">
                                    {{ group.name }}
                                </option>
                            </select>
                            <span class="error-loger">
                              {{ errors.first('service_id') }}
                            </span>
                        </div>
                        <div class="col-sm-6">
                            <fg-input type="number"
                                      name="customer_pric"
                                      label="قیمت مشتری"
                                      placeholder="قیمت مشتری"
                                      v-model="product.customer_pric"
                                      data-vv-as="قیمت مشتری"
                                      v-validate="{required: true}"
                                      :err="errors.first('customer_pric')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-6">
                            <fg-input type="number"
                                      name="repair_price"
                                      label="قیمت تعمیرکار"
                                      placeholder="قیمت تعمیرکار"
                                      v-model="product.repair_price"
                                      data-vv-as="قیمت تعمیرکار"
                                      v-validate="{required: true}"
                                      :err="errors.first('repair_price')"
                            >
                            </fg-input>
                        </div>


                        <div class="col-12 text-center mt-3">
                            <button class="btn btn-success" @click="sendProduct">
                                ثبت
                            </button>
                        </div>
                    </div>
                </card>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name: "product-detail",
        components: {},
        data() {
            return {
                id: '',
                create: true,
                fetchedProduct: {},
                product: {
                    category_id: {
                        name: '',
                        id: ''
                    },
                    service_id: {
                        name: '',
                        id: ''
                    },
                    special_name: '',
                    general_name: '',
                    image: '',
                    description: '',
                    customer_pric: undefined,
                    repair_price: ''
                },
                imageFile: undefined,
                serviceGroup: [],
                productGroup: []
            }
        },
        computed: {
            subTitle() {
                if (this.create) {
                    return 'اضافه کردن محصول جدید'
                } else {
                    return `بروز رسانی محصول ${this.fetchedProduct.name}`
                }
            },

            imagePreview() {
                if (!this.product.image) {
                    return ''
                } else {
                    return `${this.$http.defaults.mediaUrl}${this.product.image}`
                }
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            if (this.$route.params.id) {
                this.create = false;
                this.fetchProduct();
            }
            this.fetchServiceCategoryList();
            this.fetchProductCategoryList();
        },

        methods: {
            fetchProduct() {
                this.$http.get(`/products/all/`).then((res) => {
                    let temp = undefined;
                    if (res.data.result.length !== 0) {
                        res.data.result.forEach((product)=> {
                            if(product.id === this.id) {
                                temp = product;
                            }
                        });
                        console.log(temp);
                        if(temp) {
                            this.fetchedProduct = Object.assign({}, temp);
                            this.product = temp;
                        } else {
                            this.$router.push('/404')
                        }
                    } else {
                        this.$router.push('/404')
                    }
                }).catch((err) => {
                    // console.log(err)
                })
            },

            fetchServiceCategoryList() {
                this.$http.get('/services/category/').then((res) => {
                    this.serviceGroup = res.data.result;
                }).catch((err) => {
                    console.log(err);
                })
            },

            fetchProductCategoryList() {
                this.$http.get('/products/category/').then((res) => {
                    this.productGroup = res.data.result;
                }).catch((err) => {
                    console.log(err);
                })
            },
            sendProduct() {
                if (this.create) {
                    this.$validator.validateAll().then((res)=> {
                        if(res) {
                            if(this.imageFile === undefined) {
                                this.$swal({
                                    type: 'warning',
                                    title: 'خطا',
                                    text: 'انتخاب عکس الزامی است'
                                })
                            }else {
                                const productFormData = new FormData();
                                productFormData.set('special_name', this.product.special_name);
                                productFormData.set('general_name', this.product.general_name);
                                productFormData.set('customer_pric', String(this.product.customer_pric));
                                productFormData.set('repair_price', String(this.product.repair_price));
                                productFormData.set('category_id', this.product.category_id.id);
                                productFormData.set('service_id', this.product.service_id.id);
                                productFormData.append('image', this.imageFile);
                                this.$http.post('/products/', productFormData).then((res) => {
                                    this.$swal({
                                        type: 'success',
                                        title: 'موفق',
                                        text: 'عملیات با موفقیت انجام شد'
                                    });
                                    this.$router.push({name: 'product-list'});
                                }).catch((err) => {
                                    this.$swal({
                                        type: 'warning',
                                        title: 'خطا',
                                        text: 'دوباره تلاش کنید'
                                    })
                                })
                            }
                        }
                    });
                } else {
                    const productFormData = new FormData();
                    const productObjectKeys = Object.keys(this.fetchedProduct);
                    productFormData.set('product_id', this.id);
                    productObjectKeys.forEach((key) => {
                        if (this.product[key] !== this.fetchedProduct[key]) {
                            productFormData.set(key, this.product[key]);
                        }
                    });
                    productFormData.delete('image');
                    if(this.imageFile !== undefined) {
                        productFormData.append('image', this.imageFile);
                    }

                    this.$http.patch('/products/', productFormData).then((res)=> {
                        this.$swal({
                            type: 'success',
                            title: 'موفق',
                            text: 'عملیات با موفقیت انجام شد'
                        });
                        this.$router.push({name: 'product-list'});
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
    }
</script>

<style scoped>

</style>