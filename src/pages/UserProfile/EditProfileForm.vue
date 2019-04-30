<template>
  <card class="card" title="ویرایش پروفایل شرکت">
    <div class="row">
      <form class="col-sm-12" @submit.prevent>


          <div class="row">
            <div class="col-md-6 pl-1">
              <fg-input type="text"
                        label="نام"
                        placeholder="نام" v-model="newform.fname">
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="text"
                        label="نام خانوادگی"
                        placeholder="نام خانوادگی" v-model="newform.lname">
              </fg-input>
            </div>
          </div>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="نام کاربری"
                      placeholder="نام کاربری" v-model="newform.username">
            </fg-input>
          </div>
          <div class="col-md-3">

            <fg-input type="text"
                      label="رمز عبور"
                      placeholder="رمز عبور" v-model="newform.password">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="android ID"
                      placeholder="android ID" v-model="newform.android_id">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="IMEI"
                      placeholder="IMEI" v-model="newform.IMEI">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-file-input type="text"
                           label="عکس پروفایل"
                           placeholder="عکس پروفایل"
                           @input="setAvatar">
            </fg-file-input>
          </div>
          <div class="col-md-4">
            <label>تاریخ تولد</label>
            <date-picker color="dimgray" format="YYYY-MM-DD" v-model="newform.birthday"></date-picker>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="نام شرکت"
                      placeholder="نام شرکت" v-model="newform.name">
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-file-input type="text"
                           label="لوگو"
                           placeholder="لوگو" @input="setLogo">
            </fg-file-input>
          </div>
          <div class="col-md-4">
            <label>تاریخ تاسیس</label>
            <date-picker color="dimgray" format="YYYY-MM-DD" v-model="newform.establishment_date"></date-picker>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>درباره ی شرکت</label>
              <textarea rows="5" class="form-control border-input"
                        placeholder="درباره ی شرکت" v-model="newform.description">

              </textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info"
                    round @click.native.prevent="updateProfile()">
            به روز رسانی
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
  import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
  import {HTTP} from '@/common/http-common.js';
export default {
  components: {
    datePicker: VuePersianDatetimePicker
  },
  data() {
    return {
      newform: {
        username: '',
        password: '',
        fname: '',
        lname: '',
        IMEI: '',
        android_id: '',
        avatar: 'salam',
        birthday: '',
        name: '',
        logo: 'logo',
        establishment_date: '',
        description: '',
        _method: 'patch'
      }
    }

  },
  methods: {
    updateProfile () {
      HTTP.post(`/company/update`, this.newform).then(e => {
        this.newform = []
    }).catch(e => {
        this.errors.push(e)
    });
    },
    setLogo(image){
      this.newform.logo=image;
    },
    setAvatar(image){
      this.newform.avatar=image;
    }
  }
};
</script>
<style scoped>

</style>
