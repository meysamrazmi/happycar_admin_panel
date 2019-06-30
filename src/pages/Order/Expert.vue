<template>
    <card title="متخصصین پیشنهادی">
        <div class="row" v-if="assinged_calender !== null">
            <div class="col-12">
                <div class="alert alert-success ">
                    <h5>
                        متخصص فعلی
                    </h5>
                    <div class="d-flex justify-content-between">
                        <div>
                            <img :src="`${$http.defaults.mediaUrl}${assinged_calender.profile.image}`" class="mr-thumb profile" alt="" v-if="assinged_calender.profile.image">
                            <img :src="$store.state.placeholderImage" class="mr-thumb border-50" alt="">
                        </div>
                        <div class="text-dark d-flex flex-column justify-content-around">
                            <div>
                                نام:
                                {{ assinged_calender.profile.user.name }}
                            </div>
                            <div>
                                شماره:
                                {{ assinged_calender.profile.user.phone }}
                            </div>
                        </div>
                        <div class="text-dark d-flex flex-column justify-content-around">
                            <div>
                                ساعت شروع:‌
                                {{ changeTime(assinged_calender.occupation_start) }}
                            </div>
                            <div>
                                ساعت پایان:‌
                                {{ changeTime(assinged_calender.occupation_end) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <table class="table ">
                    <tbody>
                        <template v-for="expert in experts">
                        <tr class="expert-info">
                            <td colspan="3">
                                <div class="d-flex flex-row justify-content-between align-items-center">
                                    <div class="">
                                        <strong class="pl-2">
                                            نام متخصص:
                                        </strong>
                                        <span class="pl-4">
                                            {{ expert.user.name }}
                                        </span>
                                    </div>
                                    <div class="">
                                        <strong class="pl-2">
                                            درجه تخصص:
                                        </strong>
                                        <span>
                                        {{ expert.grade }}
                                    </span>
                                    </div>
                                    <div class="">
                                        <vue-persian-datetime-picker v-model="startTime" type="time" />
                                    </div>
                                    <button class="btn btn-success" @click="assignOrder(expert.id)">
                                        اتصال
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="occupation in expert.occupations">
                            <td>
                                {{ formatTime(occupation.occupation_start) }}
                            </td>
                            <td>
                                {{ formatTime(occupation.occupation_end) }}
                            </td>
                            <td >
                                {{ occupation.preferred_store ? occupation.preferred_store : "ندارد" }}
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <div class="col-12 text-center" v-if="experts.length < expertCount">
                <button @click="showMoreExperts">
                    مشاهده متخصصین بیشتر
                </button>
            </div>
        </div>
    </card>
</template>

<script>
import moment from "jalali-moment";
import VuePersianDatetimePicker from "vue-persian-datetime-picker/src/picker/VuePersianDatetimePicker";

const ASSIGN_ERRORS = {
  1: 'متخصص پیدا نشد.',
  2: 'محدوده زمانی نامعتبر',
  3: 'زمان انتخابی با سفارش دیگر تداخل دارد',
  4: 'سفارش وجود ندارد',
  5: 'شما قادر به اتصال مجدد نیستید',
  6: 'قبلا آپدیت شده‌است',
  7: 'خطای سرور',
};

export default {
  name: "Expert",
  components: { VuePersianDatetimePicker },
  data() {
    return {
      experts: [],
      startTime: undefined,
      expertCount: 0,
      expertPage: 1
    };
  },

  props: {
    orderId: {
      type: String | Number
    },

    time: {
      type: Number
    },

    date: {
      type: String
    },

    assinged_calender: {
      type: Object
    }
  },

  mounted() {
    this.fetchOrderExperts();
  },

  methods: {

    changeTime(time) {
      return moment(time).format('تاریخ: jYYYY/jMM/jDD ساعت: HH:mm')
    },

    showMoreExperts() {
      this.expertPage++;
      this.fetchOrderExperts();
    },

    fetchOrderExperts() {
      this.$http
        .get(`orders/admin/${this.orderId}/experts/?page=${this.expertPage}`)
        .then(res => {
          this.experts = [...this.experts, ...res.data.data];
          this.expertCount = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },

    formatTime(time) {
      return moment(time).format("jYYYY/jMM/jDD - HH:mm");
    },

    assignOrder(expertId) {
      if(this.startTime === undefined) {
        this.$swal({
          type: 'warning',
          title: 'خطا',
          text: 'زمان شروع الزامی‌است'
        })
      }else {
        let data = {
          expert_id: expertId,
          start_time: Math.round(Date.parse(
            moment(`${this.date} ${this.startTime}`).format("YYYY-MM-DD HH:mm")
          )/1000),
          end_time: Math.round(Date.parse(
            moment(`${this.date} ${this.startTime}`)
              .add(this.time, "minutes")
              .format("YYYY-MM-DD HH:mm")
          )/1000)
        };
        console.log(data);
        if(this.assinged_calender === null) {
          this.$http
            .post(`/orders/admin/${this.orderId}/`, data)
            .then(res => {
              this.startTime = "";
              this.$emit('updateParent');
              this.$swal({
                type: 'success',
                text: 'با موفقیت انجام شد.',
                title: 'موفق'
              })
            })
            .catch(err => {
              this.$emit('updateParent');
              let msg = 'خطا رخ داده دوباره تلاش کنید';
              if(err.response.data.code) {
                msg = ASSIGN_ERRORS[err.response.data.code];
              }
              this.$swal({
                type: 'warning',
                title: 'خطا',
                text: msg
              })
            });
        } else {
          this.$http
            .put(`/orders/admin/${this.orderId}/`, data)
            .then(res => {
              this.startTime = "";
              this.$emit('updateParent');
              this.$swal({
                type: 'success',
                text: 'با موفقیت انجام شد.',
                title: 'موفق'
              });

            })
            .catch(err => {
              this.$emit('updateParent');
              let msg = 'خطا رخ داده دوباره تلاش کنید';
              if(err.response.data.code) {
                msg = ASSIGN_ERRORS[err.response.data.code];
              }
              this.$swal({
                type: 'warning',
                title: 'خطا',
                text: msg
              })
            });
        }

      }
    }
  }
};
</script>

<style scoped>
.expert-info {
  background-color: #93ebff24;
}
</style>
