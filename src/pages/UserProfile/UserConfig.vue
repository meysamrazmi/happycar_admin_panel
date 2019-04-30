<template>

    <div class="col-md-6">
        <div v-if="unset" class="alert alert-warning">
            <strong>
                برای ادامه‌ی کار باید تنظیمات سیستم را وارد کنید.
            </strong>
        </div>
        <card title="تنظیمات سیستم">
            <div class="row">
                <div class="col-sm-12">
                    <form @submit.prevent>
                        <div class="col-sm-12">
                            <strong class="pt-2 pb-3 d-inline-block">نوع سرویس</strong><br>
                            <input type="radio"
                                   name="type"
                                   value="0"
                                   v-validate="'required'"
                                   data-vv-as="نوع سرویس"
                                   v-model="config.callback_type"/>
                            <span class="pr-2">sms</span><br>
                            <input type="radio"
                                   name="type"
                                   value="1"
                                   v-model="config.callback_type"/>
                            <span class="pr-2">data</span><br>
                            <span class="err-box pt-1 pb-1">{{ errors.first('type') }}</span>
                        </div>
                        <div class="col-md-12">
                            <fg-input type="url"
                                      name="url"
                                      label="آدرس"
                                      placeholder="آدرس"
                                      v-model="config.callback_url"
                                      :err="errors.first('url')"
                                      data-vv-as="آدرس"
                                      v-validate="'required'"
                            >
                            </fg-input>
                        </div>
                        <div class="col-md-12 text-center">
                            <p-button type="submit"
                                      round
                                      round @click.native.prevent="submitConfig">
                                ثبت
                            </p-button>
                        </div>
                    </form>
                </div>
            </div>
        </card>
    </div>
</template>

<script>
    export default {
        name: "UserConfig",

        props: {
            unset: {
                type: Boolean
            },
            nextUrl: {
                type: String
            }
        },

        data() {
            return {
                config: {
                    callback_type: '',
                    callback_url: ''
                }
            }
        },

        mounted() {
            this.getConfig()
        },

        methods: {

            submitConfig() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let data = {
                            id: JSON.parse(localStorage.getItem("user"))._id,
                            config: JSON.stringify(this.config)
                        };
                        this.$http.post('/user/userConfig', data).then((res) => {
                            localStorage.setItem("token", res.data.result);
                            localStorage.setItem("user", JSON.stringify(res.data.info));
                            this.getConfig();
                            if(this.nextUrl !== "") this.$router.push({path: this.nextUrl});
                        }).catch((err) =>{
                            //consoel.log(err);
                        });
                        return;
                    }
                    this.$swal({
                        title: 'خطا',
                        text: 'لطفا خطاهای فرم را تصحیح کنید.',
                        type: 'error',
                        confirmButtonText: 'باشه',
                    })
                })
            },

            getConfig() {
                let user = JSON.parse(localStorage.getItem('user'));
                if(user.config !== undefined) {
                    let conf = JSON.parse(user.config);
                    this.config.callback_type = conf.callback_type;
                    this.config.callback_url = conf.callback_url;
                }
            }
        }
    }
</script>

<style scoped>
    .err-box {
        color: red;
    }
</style>
