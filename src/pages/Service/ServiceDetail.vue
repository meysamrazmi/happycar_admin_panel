<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="گروه سرویس" :subTitle="subTitle">
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
                        <div class="col-sm-4">
                            <fg-input type="text"
                                      name="name"
                                      label="نام"
                                      placeholder="نام"
                                      rules="required"
                                      v-model="service.name"
                                      data-vv-as="نام"
                                      v-validate="'required'"
                                      :err="errors.first('name')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-4">
                            <fg-input type="number"
                                      name="price"
                                      label="قیمت"
                                      placeholder="قیمت"
                                      v-model="service.price"
                                      data-vv-as="قیمت"
                                      v-validate="{required: true}"
                                      :err="errors.first('price')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-4">
                            <label>
                                نوع اسلاید
                            </label>
                            <select name="category_id"
                                    data-vv-as="گروه"
                                    class="form-control"
                                    v-validate="'required'"
                                    :class="{ errorInput : errors.first('category_id') }"
                                    v-model="service.category_id.id"
                            >
                                <option value="" selected disabled>
                                    گروه
                                </option>
                                <option v-for="group in serviceGroup" :value="group.id" :key="group.id">
                                    {{ group.name }}
                                </option>
                            </select>
                            <span class="error-loger">
                              {{ errors.first('category_id') }}
                            </span>
                        </div>
                        <div class="col-12">
                            <label class="d-block">
                                توضیحات
                            </label>
                            <textarea name="description"
                                      id="description"
                                      data-vv-as="توضیحات"
                                      v-validate="'required'"
                                      :class="{ errorInput : errors.first('description') }"
                                      class="form-control d-block w-100"
                                      v-model="service.description">
                            </textarea>
                            <span class="error-loger">
                              {{ errors.first('description') }}
                            </span>
                        </div>
                        <div class="col-12 text-center mt-3">
                            <button class="btn btn-success" @click="sendService">
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
        name: "service-category-detail",
        components: {},
        data() {
            return {
                id: '',
                create: true,
                fetchedService: {},
                service: {
                    category_id: {
                        name: '',
                        id: ''
                    },
                    name: '',
                    image: '',
                    description: '',
                    price: undefined
                },
                imageFile: undefined,
                serviceGroup: []
            }
        },
        computed: {
            subTitle() {
                if (this.create) {
                    return 'اضافه کردن گروه سرویس جدید'
                } else {
                    return `بروز رسانی گروه سرویس ${this.fetchedService.name}`
                }
            },

            imagePreview() {
                if (!this.service.image) {
                    return ''
                } else {
                    return `${this.$http.defaults.mediaUrl}${this.service.image}`
                }
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            if (this.$route.params.id) {
                this.create = false;
                this.fetchService();
            }
            this.fetchCategoryList()
        },

        methods: {
            fetchService() {
                this.$http.get(`/services/service/all/`).then((res) => {
                    let temp = undefined;

                    if (res.data.result.length !== 0) {
                        res.data.result.forEach((service)=> {
                            if(service.id === this.id) {
                                temp = service;
                            }
                        });
                        console.log(temp);
                        if(temp) {
                            this.fetchedService = Object.assign({}, temp);
                            this.service = temp;
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

            fetchCategoryList() {
                this.$http.get('/services/category/').then((res) => {
                    this.serviceGroup = res.data.result;
                }).catch((err) => {
                    console.log(err);
                })
            },

            sendService() {
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
                                const serviceFormData = new FormData();
                                serviceFormData.set('name', this.service.name);
                                serviceFormData.set('price', String(this.service.price));
                                serviceFormData.set('description', this.service.description);
                                serviceFormData.set('name', this.service.name);
                                serviceFormData.set('category_id', this.service.category_id.id);
                                serviceFormData.append('image', this.imageFile);
                                this.$http.post('/services/service/', serviceFormData).then((res) => {
                                    this.$swal({
                                        type: 'success',
                                        title: 'موفق',
                                        text: 'عملیات با موفقیت انجام شد'
                                    });
                                    this.$router.push({name: 'service-list'});
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
                    const serviceFormData = new FormData();
                    const serviceObjectKeys = Object.keys(this.fetchedService);
                    serviceFormData.set('servise_id', this.id);
                    serviceObjectKeys.forEach((key) => {
                        if (this.service[key] !== this.fetchedService[key]) {
                            serviceFormData.set(key, this.service[key]);
                        }
                    });
                    serviceFormData.delete('image');
                    if(this.imageFile !== undefined) {
                        serviceFormData.append('image', this.imageFile);
                    }

                    this.$http.patch('/services/service/', serviceFormData).then((res)=> {
                        this.$swal({
                            type: 'success',
                            title: 'موفق',
                            text: 'عملیات با موفقیت انجام شد'
                        });
                        this.$router.push({name: 'service-list'});
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