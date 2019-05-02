<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="انبار" :subTitle="subTitle">
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
                                      name="name"
                                      label="نام"
                                      placeholder="نام"
                                      rules="required"
                                      v-model="store.name"
                                      data-vv-as="نام"
                                      v-validate="'required'"
                                      :err="errors.first('name')"
                            >
                            </fg-input>
                        </div>
                        <div class="col-12">
                            <label class="d-block">
                                آدرس
                            </label>
                            <textarea name="address"
                                      id="address"
                                      data-vv-as="آدرس"
                                      v-validate="'required'"
                                      :class="{ errorInput : errors.first('address') }"
                                      class="form-control d-block w-100"
                                      v-model="store.address">
                            </textarea>
                            <span class="error-loger">
                              {{ errors.first('address') }}
                            </span>
                        </div>
                        <div class="col-12 map-wrapper my-5">
                            <label>
                                موقعیت مکانی
                            </label>
                            <l-map :zoom="zoom" :center="center">
                                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                                <l-marker :draggable="true" :lat-lng="marker" @update:latLng="setLocation"></l-marker>
                            </l-map>
                        </div>
                        <div class="col-12 text-center mt-3">
                            <button class="btn btn-success" @click="sendStore">
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
    import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

    export default {
        name: "store-detail",
        components: {
            LMap,
            LTileLayer,
            LMarker
        },
        data() {
            return {
                zoom:16,
                center:  L.latLng(35.6892, 51.3890),
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker:  L.latLng(35.6892, 51.3890),
                id: '',
                create: true,
                fetchedStore: {},
                store: {
                    name: '',
                    address: '',
                    image: undefined,
                    longitude: '',
                    latitude: ''
                },
                imageFile: undefined,
            }
        },
        computed: {
            subTitle() {
                if (this.create) {
                    return 'اضافه کردن اسلاید جدید'
                } else {
                    return `بروز رسانی اسلاید ${this.fetchedStore.name}`
                }
            },

            imagePreview() {
                if (this.create || this.store.image === undefined) {
                    return ''
                } else {
                    return `${this.$http.defaults.mediaUrl}${this.store.image}`
                }
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            if (this.id) {
                this.create = false;
                this.fetchSlide()
            }
        },

        methods: {
            fetchSlide() {
                this.$http.get(`/products/store/`).then((res) => {
                    let temp = undefined;
                    console.log(res);
                    if (res.data.result.length !== 0) {
                        res.data.result.forEach((store)=> {
                            console.log(store.id, this.id);
                            if( parseInt(store.id) === parseInt(this.id)) {
                                console.log("in i,if");
                                temp = store;
                            }
                        });
                        console.log(temp);
                        if(temp) {
                            this.fetchedStore = Object.assign({}, temp);
                            this.store = temp;
                            this.center =  L.latLng(temp.latitude, temp.longitude);
                            this.marker =  L.latLng(temp.latitude, temp.longitude);
                        }else {
                            this.$router.push('/404')
                        }
                    } else {
                        this.$router.push('/404')
                    }
                }).catch((err) => {
                    // console.log(err)
                })
            },

            sendStore() {
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
                                const storeFormData = new FormData();
                                storeFormData.set('name', this.store.name);
                                storeFormData.set('longitude', this.store.longitude);
                                storeFormData.set('latitude', this.store.latitude);
                                storeFormData.set('address', this.store.address);
                                storeFormData.append('image', this.imageFile);
                                this.$http.post('/products/store/', storeFormData).then((res) => {
                                    this.$swal({
                                        type: 'success',
                                        title: 'موفق',
                                        text: 'عملیات با موفقیت انجام شد'
                                    });
                                    this.$router.push({name: 'store-list'});
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
                    const storeFormData = new FormData();
                    const storeObjectKeys = Object.keys(this.fetchedStore);
                    storeFormData.set('store_id', this.$route.params.id);
                    storeObjectKeys.forEach((key) => {
                        if (this.store[key] !== this.fetchedStore[key]) {
                            storeFormData.set(key, this.store[key]);
                        }
                    });
                    storeFormData.delete('image');
                    if(this.imageFile !== undefined) {
                        storeFormData.append('image', this.imageFile);
                    }

                    this.$http.patch('/products/store/', storeFormData).then((res)=> {
                        this.$swal({
                            type: 'success',
                            title: 'موفق',
                            text: 'عملیات با موفقیت انجام شد'
                        });
                        this.$router.push({name: 'store-list'});
                    }).catch((err)=> {
                        this.$swal({
                            type: 'warning',
                            title: 'خطا',
                            text: 'دوباره تلاش کنید'
                        })
                    })
                }
            },

            setLocation(location) {
                console.log(location);
                this.store.latitude = location.lat;
                this.store.longitude = location.lng;
            },

        }
    }
</script>

<style scoped>
    .map-wrapper {
        height: 400px;
    }
</style>