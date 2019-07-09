<template>
    <m-modal v-show="showMe" @close="closeModal">
        <template slot="header">
        <span v-if="type === 'create'">
            اضافه کردن شبکه اجتماعی
        </span>
            <span v-else>
            به‌روز رسانی شبکه اجتماعی
        </span>
        </template>
        <template slot="body">
            <form @submit.prevent @keyup.enter="sendRequest">
                <div class="row">
                    <div class="col-md-6">
                        <fg-input type="text"
                                  name="name"
                                  label="نام"
                                  placeholder="نام"
                                  rules="required"
                                  v-model="social.name"
                                  data-vv-as="نام"
                                  v-validate="'required'"
                                  :err="errors.first('name')"
                        >
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input type="text"
                                  name="url"
                                  label="آدرس"
                                  placeholder="آدرس"
                                  v-model="social.url"
                                  data-vv-as="آدرس"
                                  v-validate="{required: true, url: {require_protocol: true }}"
                                  :err="errors.first('url')"
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

    </m-modal>
</template>

<script>
    export default {
        name: "SocialDetail",

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
                social: {
                    name: '',
                    url: ''
                }
            }
        },

        methods: {
            closeModal() {
                this.$emit('close');
                this.showMe = false;
                setTimeout(()=>{
                    this.social = {
                        name: '',
                        url: ''
                    };
                }, 400)
            },

            sendRequest() {
                this.$validator.validateAll().then((res)=>{
                    if(res){
                        if (this.type === "create") {
                            let data = {
                                name: this.social.name,
                                url: this.social.url,
                                activeted: 'true'
                            };
                            this.$http.post('/about_us/admin/social/', data).then((res) => {
                                console.log(res);
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else if (this.type === "update") {
                            this.social.social_id  = this.social.id;
                            delete  this.social.id;
                            this.$http.patch('/about_us/admin/social/', this.social).then((res) => {
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
                if(val.name) {
                    this.social = val;
                }
            }
        }
    }
</script>

<style scoped>

</style>