<template>
    <div class="col-md-6">
        <card title="اطلاعات شخصی">
            <div class="row">
                <div class="col-sm-12">
                    <strong>نام:</strong>
                    <span class="pr-4">{{$store.state.client.name}}</span>
                </div>
                <div class="col-sm-12 mt-3">
                    <strong>ایمیل:</strong>
                    <span class="pr-4">{{$store.state.client.email}}</span>
                </div>
            </div>
            <card title="تغییر رمزعبور" class="mt-3">
                <div class="row">
                    <div class="col-sm-12">
                        <form class="" @submit.prevent>
                            <div class="col-md-12"></div>
                            <div class="col-md-12">
                                <fg-input type="password"
                                          name="new_password"
                                          label="رمز عبور جدید"
                                          placeholder="رمز عبور جدید"
                                          v-model="clnt.new_password"
                                          v-validate="'required'"
                                          :err="errors.first('new_password')"
                                          data-vv-as="رمز عبور"
                                >
                                </fg-input>

                            </div>
                            <div class="col-md-12">
                                <fg-input type="password"
                                          name="confirm_new_password"
                                          label="تایید رمز عبور جدید"
                                          placeholder="تایید رمز عبور جدید"
                                          v-model="clnt.confirm_new_password"
                                          :err="errors.first('confirm_new_password')  || pass_confirmation"
                                          data-vv-as="تایید رمز عبور"
                                          v-validate="'required'"
                                >
                                </fg-input>
                            </div>
                            <div class="col-md-12 text-center">
                                <p-button type="submit"
                                          round
                                          round @click.native.prevent="submitResetPass">
                                    ثبت
                                </p-button>
                            </div>
                        </form>
                    </div>
                </div>
            </card>
        </card>
    </div>
</template>

<script>
    export default {
        name: "user-data",
        data() {
            return {
                pass_confirmation: '',
                clnt: {
                    new_password: '',
                    confirm_new_password: ''
                },
            }
        },

        watch: {
            'clnt.confirm_new_password': function (val) {
                if (this.clnt.new_password !== "") {
                    if (val === this.clnt.new_password) {
                        this.pass_confirmation = "";
                    } else {
                        this.pass_confirmation = "کلمه‌ی عبور با تکرار آن مطابقت ندارد."
                    }
                }
            },
            'clnt.new_password': function (val) {
                if (this.clnt.confirm_new_password !== "") {
                    if (val === this.clnt.confirm_new_password) {
                        this.pass_confirmation = "";
                    } else {
                        this.pass_confirmation = "کلمه‌ی عبور با تکرار آن مطابقت ندارد."
                    }
                }
            }
        },

        methods: {
            submitResetPass() {

                this.$validator.validateAll().then((result) => {
                    //consoel.log(result);
                    if (result && this.pass_confirmation === '') {
                        let user = JSON.parse(localStorage.getItem("user"));
                        let data = {
                            email: user.email,
                            name: user.name,
                            password: this.clnt.new_password,
                            confirm_password: this.clnt.confirm_new_password
                        };
                        //consoel.log(data);
                        this.$http.post('/user/userEdit', data).then((res) => {
                            //consoel.log(res);
                            this.clnt = {
                                new_password: '',
                                confirm_new_password: ''
                            };
                            this.$nextTick(() => {
                                this.$validator.reset();
                            });
                            this.$swal({
                                title: 'موفق',
                                text: "عملیات با موفقیت انجام شد.",
                                type: 'success',
                                confirmButtonText: 'باشه',
                            });


                        }).catch((err) => {
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
                });
            },
        }
    }
</script>

<style scoped>

</style>
