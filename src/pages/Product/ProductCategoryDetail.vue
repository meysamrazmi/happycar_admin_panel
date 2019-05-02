<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="گروه کالا" :subTitle="subTitle">
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
                    <div class="row mt-5 justify-content-center">
                        <div class="col-sm-6">
                            <fg-input type="text"
                                      name="name"
                                      label="نام"
                                      placeholder="نام"
                                      rules="required"
                                      v-model="category.name"
                                      data-vv-as="نام"
                                      v-validate="'required'"
                                      :err="errors.first('name')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-12 text-center mt-3 ">
                            <button class="btn btn-success" @click="sendCategory">
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
        name: "product-category-detail",
        components: {},
        data() {
            return {
                id: '',
                create: true,
                fetchedCategory: {},
                category: {
                    name: '',
                    image: ''
                },
                imageFile: undefined
            }
        },
        computed: {
            subTitle() {
                if (this.create) {
                    return 'اضافه کردن گروه کالا جدید'
                } else {
                    return `بروز رسانی گروه کالا ${this.fetchedCategory.name}`
                }
            },

            imagePreview() {
                if (this.create || this.category.image === undefined) {
                    return ''
                } else {
                    return `${this.$http.defaults.mediaUrl}${this.category.image}`
                }
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            if (this.$route.params.id) {
                this.create = false;
                this.fetchCategory()
            }
        },

        methods: {
            fetchCategory() {
                this.$http.get(`/products/category/`).then((res) => {
                    let temp = undefined;
                    if (res.data.result.length !== 0) {
                        res.data.result.forEach((category)=> {
                            console.log('cat id', category.id);
                            if(category.id === this.id) {
                                temp = category
                            }
                        });

                        console.log('temp  ', temp);
                        if(temp) {
                            this.fetchedCategory = Object.assign({}, temp);
                            this.category = temp;
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

            sendCategory() {
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
                                const slideFormData = new FormData();
                                slideFormData.set('name', this.category.name);
                                slideFormData.append('image', this.imageFile);
                                this.$http.post('/products/category/', slideFormData).then((res) => {
                                    this.$swal({
                                        type: 'success',
                                        title: 'موفق',
                                        text: 'عملیات با موفقیت انجام شد'
                                    });
                                    this.$router.push({name: 'product-category-list'});
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
                    const categoryFormData = new FormData();
                    categoryFormData.set('category_id', this.id);
                    if (this.category.name !== this.fetchedCategory.name) {
                        categoryFormData.set('name', this.category.name);
                    }
                    if(this.imageFile !== undefined) {
                        categoryFormData.append('image', this.imageFile);
                    }

                    this.$http.patch('/products/category/', categoryFormData).then((res)=> {
                        this.$swal({
                            type: 'success',
                            title: 'موفق',
                            text: 'عملیات با موفقیت انجام شد'
                        });
                        this.$router.push({name: 'product-category-list'});
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