<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="اسلاید" :subTitle="subTitle">
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
                                      name="title"
                                      label="عنوان"
                                      placeholder="عنوان"
                                      rules="required"
                                      v-model="slide.title"
                                      data-vv-as="عنوان"
                                      v-validate="'required'"
                                      :err="errors.first('title')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-4">
                            <fg-input type="text"
                                      name="url"
                                      label="لینک"
                                      placeholder="لینک"
                                      v-model="slide.url"
                                      data-vv-as="url"
                                      v-validate="{required: true, url: {require_protocol: true }}"
                                      :err="errors.first('url')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-4">
                            <label>
                                نوع اسلاید
                            </label>
                            <select name="slider_type"
                                    data-vv-as="نوع اسلاید"
                                    class="form-control"
                                    v-validate="'required'"
                                    :class="{ errorInput : errors.first('slider_type') }"
                                    v-model="slide.slider_type"
                            >
                                <option value="" selected disabled>
                                    نوع اسلاید
                                </option>
                                <option v-for="(value, key) in sliderTypes" :value="key" :key="key">
                                    {{ value }}
                                </option>
                            </select>
                            <span class="error-loger">
                              {{ errors.first('slider_type') }}
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
                                          v-model="slide.description">
                            </textarea>
                                <span class="error-loger">
                              {{ errors.first('description') }}
                            </span>
                        </div>
                        <div class="col-12 text-center mt-3">
                            <button class="btn btn-success" @click="sendSlide">
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
        name: "slide",
        components: {},
        data() {
            return {
                create: true,
                fetchedSlide: {},
                sliderTypes: {
                    about: 'درباره‌ی ما',
                    customer: 'مشتری',
                    repair_shop: 'تعمیرگاه'
                },
                slide: {
                    title: '',
                    description: '',
                    url: '',
                    image: undefined,
                    activated: false,
                    slider_type: ''
                },
                imageFile: undefined
            }
        },
        computed: {
            subTitle() {
                if (this.create) {
                    return 'اضافه کردن اسلاید جدید'
                } else {
                    return `بروز رسانی اسلاید ${this.fetchedSlide.title}`
                }
            },

            imagePreview() {
                if (this.create || this.slide.image === undefined) {
                    return ''
                } else {
                    return `${this.$http.defaults.mediaUrl}${this.slide.image}`
                }
            }
        },
        mounted() {
            // console.log(this.$route.params.id);
            if (this.$route.params.id) {
                this.create = false;
                this.fetchSlide(this.$route.params.id)
            }
        },

        methods: {
            fetchSlide(id) {
                this.$http.get(`/slider/manager/${id}/`).then((res) => {
                    if (res.data.result.length !== 0) {
                        this.fetchedSlide = Object.assign({}, res.data.result[0]);
                        this.slide = res.data.result[0];
                    } else {
                        this.$router.push('/404')
                    }
                }).catch((err) => {
                    // console.log(err)
                })
            },

            sendSlide() {
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
                                slideFormData.set('title', this.slide.title);
                                slideFormData.set('url', this.slide.url);
                                slideFormData.set('activated', 'false');
                                slideFormData.set('slider_type', this.slide.slider_type);
                                slideFormData.set('description', this.slide.description);
                                slideFormData.append('image', this.imageFile);
                                this.$http.post('/slider/manager/', slideFormData).then((res) => {
                                    this.$swal({
                                        type: 'success',
                                        title: 'موفق',
                                        text: 'عملیات با موفقیت انجام شد'
                                    });
                                    this.$router.push('/slider');
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
                    const sliderFormData = new FormData();
                    const sliderObjectKeys = Object.keys(this.fetchedSlide);
                    sliderFormData.set('slide_id', this.$route.params.id);
                    sliderObjectKeys.forEach((key) => {
                        if (this.slide[key] !== this.fetchedSlide[key]) {
                            sliderFormData.set(key, this.slide[key]);
                        }
                    });
                    sliderFormData.delete('image');
                    if(this.imageFile !== undefined) {
                        sliderFormData.append('image', this.imageFile);
                    }

                    this.$http.patch('/slider/manager/', sliderFormData).then((res)=> {
                        this.$swal({
                            type: 'success',
                            title: 'موفق',
                            text: 'عملیات با موفقیت انجام شد'
                        });
                        this.$router.push('/slider');
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