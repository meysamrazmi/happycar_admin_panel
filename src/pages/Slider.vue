<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="اسلایدر" subTitle="لیست اسلایدها">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6"></div>
                            <div class="col-6">
                                <p-button class="pull-left" type="success">
                                    <router-link :to="{name: 'slide'}" class="text-white">
                                            افزودن اسلایدر
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
                                        <div slot="thumbnail" slot-scope="props">
                                            <img class="mr-thumb" :src="`${$http.defaults.mediaUrl}${props.row.image}`" alt="">
                                        </div>
                                        <div slot="slider_type" slot-scope="props">
                                            {{ sliderTypes[props.row.slider_type]}}
                                        </div>
                                        <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri" class="ti ti-eye"></a>
                                        <div slot="status"
                                             slot-scope="props"
                                             @click="changeSliderStatus(props.row)"
                                        >
                                            <toggle-button :value="props.row.status"
                                                           >
                                            </toggle-button>
                                        </div>
                                        <div slot="child_row" slot-scope="props">
                                            <div class="row divider-border m-2 p-2">
                                                <div class="col-sm-3">
                                                    <h6>آدرس ارجاع:</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                    <p dir="ltr">
                                                        {{props.row.url}}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row divider-border m-2 p-2">
                                                <div class="col-sm-3">
                                                    <h6>توضیحات:</h6>
                                                </div>
                                                <div class="col-sm-9">
                                                    <p>
                                                        {{props.row.description}}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                            <router-link :to="{ name: 'slide', params: { id: props.row.id }}">
                                            <a class="ti-pencil-alt text-primary pr-3"></a>
                                            </router-link>
                                            <span class="ti-trash text-danger"
                                                  @click="deleteSlide(props.row)"></span>
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
    import { ClientTable } from 'vue-tables-2';

    export default {
        name: "slider",

        components:{
            ClientTable,
        },

        data() {
            return {
                sliderTypes: {
                    about: 'درباره‌ی ما',
                    customer: 'مشتری',
                    repair_shop: 'تعمیرگاه'
                },
                columns: ['id', 'thumbnail', 'title','slider_type','status', 'actions'],
                data: [],
                options: {
                    headings: {
                        thumbnail: 'پیشنمایش',
                        title: 'عنوان',
                        id: 'ردیف',
                        slider_type: 'نوع',
                        status: 'وضعیت',
                        actions: 'اقدامات'

                    },
                    sortable: ['id','slider_type', 'status'],
                    filterable: ['slider_type', 'title'],
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
            this.fetchSlides();
        },

        methods: {
            fetchSlides() {
                this.$http.get('/slider/manager/').then((res)=> {
                    if(res.status === 200) {
                        this.data = res.data.result;
                    }
                }).catch((err)=> {
                    // console.log(err)
                })
            },

            deleteSlide(slide) {
                let data = {
                    slide_id: slide.id
                };
                this.$http.delete('/slider/manager/', {data: data}).then((res)=> {
                    // console.log(res);
                    this.fetchSlides();
                }).catch((err)=> {
                    // console.log(err);
                })
            },

            changeSliderStatus(slide) {
                // console.log(slide);
                const slideFormData = new FormData();
                slideFormData.set('slide_id', slide.id);
                slideFormData.set('status', String(!slide.status));
                this.$http.patch('/slider/manager/', slideFormData).then((res)=> {
                    this.fetchSlides();
                }).catch((err)=> {
                    this.fetchSlides();
                })
            }
        }


    }
</script>

<style>
    .mr-thumb {
        width: auto;
        height: 75px;
    }
</style>