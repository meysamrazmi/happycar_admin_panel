<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="خودرو" :subTitle="subTitle">
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
                                      name="carModel"
                                      label="مدل خودرو"
                                      placeholder="مدل خودرو"
                                      rules="required"
                                      v-model="car.carModel"
                                      data-vv-as="مدل خودرو"
                                      v-validate="'required'"
                                      :err="errors.first('carModel')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-sm-6">
                            <label>
                                برند
                            </label>
                            <select name="brand"
                                    data-vv-as="برند"
                                    class="form-control"
                                    v-validate="'required'"
                                    :class="{ errorInput : errors.first('brand') }"
                                    v-model="car.brand"
                            >
                                <option value="" selected disabled>
                                    برند
                                </option>
                                <option v-for="brand in brands" :value="brand.id" :key="brand.id">
                                    {{ brand.brand }}
                                </option>
                            </select>
                            <span class="error-loger">
                              {{ errors.first('brand') }}
                            </span>
                        </div>
                        <div class="col-12 text-center mt-3">
                            <button class="btn btn-success" @click="sendCar">
                                ثبت
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="row mt-5">
                            <div class="col-12">
                                <h3>
                                    تیپ
                                </h3>
                            </div>
                            <div class="col-sm-6 py-1" v-for="type in types">
                                <div class="p-3 bordered">
                            <span>
                                {{ type.carType }}
                            </span>
                                    <span class="ti-trash text-danger pull-left" @click="deleteType(type.id)"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-sm-10 py-1">
                                <div class="bordered">
                                    <div class=" row">
                                        <div class="col-sm-3 my-3 d-flex justify-content-center align-items-center">
                                            افزودن تیپ
                                        </div>
                                        <div class="col-sm-6 my-3 d-flex justify-content-center align-items-center">
                                            <fg-input type="text"
                                                      name="type"
                                                      placeholder="تیپ"
                                                      v-model="newType"
                                                      class=" mb-0 pb-0 w-75"
                                                      @keyup.enter.native="addType"
                                            >
                                            </fg-input>
                                        </div>
                                        <div class="col-sm-3 my-3 d-flex justify-content-center align-items-center">
                                            <button class="btn btn-success" @click="addType">
                                                افزودن
                                            </button>
                                        </div>
                                    </div>
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
    export default {
        name: "car-detail-edit",
        data() {
            return {
                id: '',
                value: null,
                brands: [],
                fetchedCar: {},
                types: [],
                car: {
                    brand: '',
                    carModel: '',
                    image: ''
                },
                imageFile: null,
                newType: ''
            }
        },
        computed: {
            subTitle() {
                return `بروز رسانی خودرو ${this.fetchedCar.carModel}`
            },

            imagePreview() {
                if ( this.fetchedCar.image === undefined || this.fetchedCar.image === null) {
                    return ''
                } else {
                    return `${this.$http.defaults.mediaUrl}${this.fetchedCar.image}`
                }
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.fetchCar(this.id);
            this.fetchTypes(this.id);
            this.fetchBrandList();
        },

        methods: {
            fetchCar(id) {
                this.$http.get(`/car/models/get/${id}`).then((res) => {
                    if (res.data.result.length !== 0) {
                        this.fetchedCar = Object.assign({}, res.data.result[0]);
                        this.car = res.data.result[0];
                    } else {
                        this.$router.push('/404')
                    }
                }).catch((err) => {
                    // console.log(err)
                })
            },

            fetchTypes(id) {
                this.$http.get(`/car/type/${id}`).then((res)=> {
                    this.types = res.data.result;
                }).catch((err) => {

                })
            },

            addType() {
                this.$http.post('/car/type/', {
                    model_id: this.id,
                    carType: this.newType
                }).then((res)=> {
                    console.log(res);
                    this.newType = '';
                    this.fetchTypes(this.id)
                }).catch((err)=> {
                    this.$swal({
                        type: 'warning',
                        title: 'خطا',
                        text: 'دوباره تلاش کنید'
                    });
                    this.fetchTypes(this.id)
                })
            },

            deleteType(id) {
                let data = {
                    type_id: id
                };
                this.$http.delete('/car/type/', {data: data}).then((res)=> {
                    this.fetchTypes(this.id)
                }).catch((err) => {
                    this.fetchTypes(this.id)
                })
            },

            fetchBrandList() {
                this.$http.get('/car/brands/').then((res)=> {
                    if(res.status !== 204) {
                        this.brands = res.data.result;
                    }
                }).catch((err)=> {
                    console.log(err)
                })
            },

            sendCar() {
                    const carFormData = new FormData();
                    const carObjectKeys = Object.keys(this.fetchedCar);
                    carFormData.set('carModel_id', this.id);
                    carObjectKeys.forEach((key) => {
                        if (this.car[key] !== this.fetchedCar[key]) {
                            carFormData.set(key, this.car[key]);
                        }
                    });
                    carFormData.delete('image');
                    if(this.imageFile !== undefined && this.imageFile !== null) {
                        carFormData.append('image', this.imageFile);
                    }

                    this.$http.patch('/car/models/', carFormData).then((res)=> {
                        this.$swal({
                            type: 'success',
                            title: 'موفق',
                            text: 'عملیات با موفقیت انجام شد'
                        });
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

<style scoped>
    .bordered {
        border: 1px solid #deddda;
        border-radius: 10px;
    }
</style>