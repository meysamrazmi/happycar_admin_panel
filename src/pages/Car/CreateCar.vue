<template>
    <div>
        <div class="row">
            <div class="col-12">
                    <card title="خودرو" subTitle="اضافه کردن خودرو جدید">
                    <div class="row mt-5 justify-content-center">
                        <div class="col-md-6 m-2">
                            <img-inputer
                                    v-model="imageFile"
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
                </card>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "create-car",
        data() {
            return {
                value: null,
                brands: [],
                fetchedCar: {},
                car: {
                    brand: '',
                    carModel: '',
                    image: ''
                },
                imageFile: null,
            }
        },

        mounted() {
            this.fetchBrandList();
        },

        methods: {

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
                this.$validator.validateAll().then((res)=> {
                    if(res) {
                        let carFormData = new FormData();
                        carFormData.set('carModel', this.car.carModel);
                        carFormData.set('brand_id', this.car.brand);
                        carFormData.delete('image');
                        if(this.imageFile !== null && this.imageFile !== undefined){
                            carFormData.append('image', this.imageFile);
                        }
                        this.$http.post('/car/models/', carFormData).then((res) => {
                            this.$router.push('/car');
                            this.$swal({
                                type: 'success',
                                title: 'موفق',
                                text: 'عملیات با موفقیت انجام شد'
                            });
                            this.$router.push({ name: 'edit-car', params: { id: res.data.result.data.id } });
                        }).catch((err) => {
                            this.$swal({
                                type: 'warning',
                                title: 'خطا',
                                text: 'دوباره تلاش کنید'
                            })
                        })
                    }
                });
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