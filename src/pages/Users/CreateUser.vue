<template>
    <card class="card" title="ایجاد کاربر" subTitle="ایجاد کاربر جدید شرکت داده پردازان راستین">
        <div>
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="text"
                                  label="نام کاربری"
                                  placeholder="نام کاربری"
                                  v-model="user.username">
                        </fg-input>
                    </div>
                    <div class="col-md-4">

                        <fg-input type="text"
                                  label="رمز عبور"
                                  placeholder="رمز عبور"
                                  v-model="user.password">
                        </fg-input>
                    </div>
                    <div class="col-md-4">
                        <fg-input type="text"
                                  label="IMEI"
                                  placeholder="IMEI"  v-model="user.IMEI">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 pl-1">
                        <fg-input type="text"
                                  label="نام"
                                  placeholder="نام" v-model="user.fname">
                        </fg-input>
                    </div>
                    <div class="col-md-6">
                        <fg-input type="text"
                                  label="نام خانوادگی"
                                  placeholder="نام خانوادگی" v-model="user.lname">
                        </fg-input>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <fg-input type="text"
                                  label="اندروید IP"
                                  placeholder="اندروید IP" v-model="user.android_id">
                        </fg-input>
                    </div>
                    <div class="col-md-4">
                        <label>تاریخ تولد</label>
                        <date-picker color="dimgray" format="YYYY-MM-DD" v-model="user.birthday"></date-picker>
                    </div>
                    <div class="col-md-4">
                        <fg-file-input type="text"
                                       label="عکس پروفایل"
                                       placeholder="عکس پروفایل"
                                       @input="setAvatar">
                        </fg-file-input>
                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round  @click.native.prevent="createUser()">
                        ایجاد کاربر
                    </p-button>
                </div>
                <div class="clearfix"></div>
            </form>
        </div>
    </card>
</template>
<script>
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
    import {HTTP} from "@/common/http-common";
    export default {
        components: {
            datePicker: VuePersianDatetimePicker
        },
        data() {
            return {
                user: {
                    username:'',
                    password: '',
                    fname: '',
                    lname: '',
                    IMEI: '',
                    android_id: '',
                    avatar: 'salam',
                    birthday: ''
                }
            }
        },
        methods: {
            setAvatar(image){
                this.user.avatar=image;
            },
            createUser() {
                HTTP.post(`/company/create-user`, this.user).then(e => {
                    this.user = []
                })
                        .catch(e => {
                            this.errors.push(e)
                        })
            }
        }
    }
</script>
<style scoped>

</style>