<template>
    <s-modal v-show="showMe" @close="closeModal">
        <template slot="header">
        <span v-if="type === 'created'">
            اضافه کردن برند جدید
        </span>
            <span v-else>
            به‌روز رسانی برند
        </span>
        </template>
        <template slot="body">
            <form @submit.prevent @keyup.enter="sendRequest">
                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="text"
                                  name="brand"
                                  label="برند"
                                  placeholder="برند"
                                  rules="required"
                                  v-model="brand"
                                  data-vv-as="برند"
                                  v-validate="'required'"
                                  :err="errors.first('brand')"
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

    </s-modal>
</template>

<script>


    export default {
        name: "brand-modal",
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
                brand: '',
            }
        },


        methods: {
            closeModal() {
                this.$emit('close');
                this.showMe = false;
                setTimeout(()=>{
                    this.brand = null;
                }, 200)
            },

            sendRequest() {
                this.$validator.validateAll().then((res)=>{
                    if(res){
                        if (this.type === "create") {
                            let data = {
                                brand: this.brand,
                            };
                            this.$http.post('/car/brands/', data).then((res) => {
                                console.log(res);
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else if (this.type === "update") {
                            let data = {
                                brand_id: this.modalData.id,
                                brand: this.brand,
                            };
                            this.$http.patch('/car/brands/', data).then((res) => {
                                console.log(res);
                                this.brand = '';
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
                if(!!val.brand){
                    this.brand = val.brand;
                }else {
                    this.brand = ""
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
