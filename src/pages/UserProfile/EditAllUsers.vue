<template>
    <card title="تغییر اطلاعات سایر کاربران">
    <div class="row">
        <div class="col-sm-6">
            <label class="d-inline-block">کاربر:</label>
            <select class="d-inline-block w-auto px-3" v-model="selectedId">
                <option value="" disabled selected>انتخاب کنید</option>
                <option v-for="user in users" :value="user._id">{{ user.name }}</option>
            </select>
        </div>
        <div class="col-sm-6"></div>

    </div>
        <div class="row" v-if="selectedId">

            <div class="col-md-6">
                <card title="اطلاعات شخصی">
                    <div class="row">
                        <div class="col-sm-12">
                            <strong>نام:</strong>
                            <span class="pr-4">{{selectedUser.name}}</span>
                        </div>
                        <div class="col-sm-12 mt-3">
                            <strong>ایمیل:</strong>
                            <span class="pr-4">{{selectedUser.email}}</span>
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
                                                  data-vv-scope="form-2"
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
                                                  data-vv-scope="form-2"
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

            <div class="col-md-6">
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
                                           data-vv-scope="form-1"
                                           v-model="config.callback_type"/>
                                    <span class="pr-2">sms</span><br>
                                    <input type="radio"
                                           name="type"
                                           value="1"
                                           data-vv-scope="form-1"
                                           v-model="config.callback_type"/>
                                    <span class="pr-2">data</span><br>
                                    <span class="err-box pt-1 pb-1">{{ errors.first('type') }}</span>
                                </div>
                                <div class="col-md-12">
                                    <fg-input type="url"
                                              name="url"
                                              label="آدرس"
                                              placeholder="آدرس"
                                              data-vv-scope="form-1"
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

        </div>
        <div v-else class="row mt-5">
            <div class="col-12">
                <div class="alert alert-warning text-dark">
                    لطفا کاربر مورد نظر را انتخاب کنید.
                </div>
            </div>
        </div>
    </card>
</template>

<script>
    export default {
        name: "EditAllUsers",
        data() {
            return {
                config: {
                    callback_type: '',
                    callback_url: ''
                },
                pass_confirmation: '',
                clnt: {
                    new_password: '',
                    confirm_new_password: ''
                },

                users: [],
                selectedId:'',
                selectedUser: []
            }
        },
        mounted() {
          if(JSON.parse(localStorage.getItem('user')).role === "admin") {
              this.getUserData();
          }
        },

        methods: {
            getUserData() {
                this.$http.post('/user/userlist')
                    .then((response) => {
                        this.users = response.data.result;


                    })
                    .catch((err) => {


                    })
            },

            submitConfig() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let data = {
                            id: this.selectedId,
                            config: JSON.stringify(this.config)
                        };
                        this.$http.post('/user/userConfig', data).then((res) => {
                            this.getUserData();
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

            submitResetPass() {

                this.$validator.validateAll().then((result) => {
                    //consoel.log(result);
                    if (result && this.pass_confirmation === '') {
                        let data = {
                            email: this.selectedUser.email,
                            name: this.selectedUser.name,
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
        },
        
        watch: {
            selectedId: function (val) {
                this.users.forEach((item)=> {
                    if(item._id === val) {
                        this.selectedUser = item;
                        this.config.callback_type = JSON.parse(item.config).callback_type;
                        this.config.callback_url = JSON.parse(item.config).callback_url
                    }
                })
            },

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
        }
    }
</script>

<style scoped>

</style>