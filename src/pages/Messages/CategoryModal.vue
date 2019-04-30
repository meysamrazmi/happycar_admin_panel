<template>
    <s-modal v-show="showMe" @close="closeModal">
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
                    <div class="col-md-12">
                        <fg-input type="text"
                                  name="category"
                                  label="گروه پیام"
                                  placeholder="نام"
                                  rules="required"
                                  v-model="category"
                                  data-vv-as="گروه پیام"
                                  v-validate="'required'"
                                  :err="errors.first('category')"
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
        name: "category-modal",
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
            }
        },


        methods: {
            closeModal() {
                this.$emit('close');
                this.showMe = false;
                setTimeout(()=>{
                    this.category = null;
                }, 200)
            },

            sendRequest() {
                this.$validator.validateAll().then((res)=>{
                    if(res){
                        if (this.type === "create") {
                            let data = {
                                category_name: this.category,
                                status: 'true'
                            };
                            this.$http.post('/contact_us/category/', data).then((res) => {
                                console.log(res);
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else if (this.type === "update") {
                            let data = {
                                category_id: this.modalData.id,
                                category_name: this.category,
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
