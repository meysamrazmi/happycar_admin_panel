<template>
    <div>
        <div class="mk-login-back">
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-4 mt-5">
                            <router-link to="/login" class="mk-color-router">ورود</router-link>
                        </div>
                        <div class="col-4 text-center mt-4">
                            <img :src="register" class="register-img"/>
                        </div>
                        <div class="col-4 text-left mt-5">
                            <router-link to="/" class="mk-color-router">مدیا همراه</router-link>
                        </div>
                    </div>
                    <div class="mt-5 row justify-content-center">
                        <div class="col-lg-4 col-md-6 col-sm-8 col-xs-10">
                            <form class="mk-white" @submit.prevent>
                                <div class="row">

                                    <div class="col-md-12">
                                        <fg-input type="text"
                                                  name="name"
                                                  label="نام"
                                                  placeholder="نام"
                                                  v-model="user.name"
                                                  rules="required">
                                        </fg-input>
                                    </div>
                                    <div class="col-md-12">
                                        <fg-input type="email"
                                                  name="email"
                                                  label="ایمیل"
                                                  placeholder="ایمیل"
                                                  v-model="user.email"
                                                  rules="email|required"
                                        >
                                        </fg-input>
                                    </div>
                                    <div class="col-md-12">
                                        <fg-input type="password"
                                                  name="password"
                                                  label="رمز عبور"
                                                  placeholder="رمز عبور"
                                                  v-model="user.password"
                                                  rules="required"
                                        >
                                        </fg-input>
                                    </div>
                                    <div class="col-md-12">
                                        <fg-input type="password"
                                                  name="confirm_password"
                                                  label="تایید رمز عبور"
                                                  placeholder="تایید رمز عبور"
                                                  v-model="user.confirm_password"
                                                  rules="required"
                                                  :err="pass_confirmation"
                                        >
                                        </fg-input>
                                    </div>

                                    <div class="col-md-12 text-center">
                                        <p-button type="submit"
                                                  class="btn-block"
                                                  @click.native.prevent="submitRegister">
                                            ثبت
                                        </p-button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import register from '../assets/img/register.svg'

    export default {
        data() {
            return {
                pass_confirmation: '',
                user: {
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                },

                register: register

            }
        },

        computed: {},
        watch: {
            'user.confirm_password': function (val) {
                if (this.user.password !== "") {
                    if (val === this.user.password) {
                        this.pass_confirmation = "";
                    } else {
                        this.pass_confirmation = "کلمه‌ی عبور با تکرار آن مطابقت ندارد."
                    }
                }
            },
            'user.password': function (val) {
                if (this.user.confirm_password !== "") {
                    if (val === this.user.confirm_password) {
                        this.pass_confirmation = "";
                    } else {
                        this.pass_confirmation = "کلمه‌ی عبور با تکرار آن مطابقت ندارد."
                    }
                }
            }
        },
        methods: {

            submitRegister() {
                this.$validator.validateAll().then((result) => {
                    //consoel.log(result);
                    if (result && this.pass_confirmation === '') {

                        this.$store.dispatch('userRegister', this.user);
                        return;
                    }

                    this.$swal({
                        title: 'خطا',
                        text: 'لطفا خطاهای فرم را تصحیح کنید.',
                        type: 'error',
                        confirmButtonText: 'باشه',
                    })
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .mk-login-back {
        background: #de6161;
        background: -webkit-linear-gradient(to bottom, #8a1818, #2e364e);
        background: linear-gradient(to bottom, #8a1818, #2e364e);
        min-height: 100vh;
        padding-bottom: 100px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom;
        background-attachment: fixed;
    }

    .mk-white {
        background: #ffffffc9;
        border-radius: 20px;
        padding: 20px;
    }

    .mk-color-router {
        color: #fff;
    }
    .register-img{
        width: 50px;
    }
</style>
