<template>
  <card title="متخصصین پیشنهادی">
    <div class="row" v-if="assinged_calender">
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
        <v-server-table :columns="columns" :data="data" :options="options">
          <div slot="index" slot-scope="props">
            {{ props.index }}
          </div>

          <div slot="actions" slot-scope="props" class="d-flex align-items-center">
            <span class="ml-3">ساعت شروع:</span>
            <vue-persian-datetime-picker v-model="startTime" type="time" />
            <button class="btn btn-success btn-sm mr-1" @click="assignOrder(props.row.id)">اتصال</button>
          </div>

          <div slot="occupations" slot-scope="props">
            <div v-for="occupation in props.row.occupations" class="d-flex justify-content-around flex-column">
              <div>
                <span>شروع: </span>
                {{ formatTime(occupation.occupation_start) }}
              </div>
              <div>
                <span>پایان: </span>
                {{ formatTime(occupation.occupation_end) }}
              </div>
              <div>
                <span>انبار انتخابی: </span>
                {{ occupation.preferred_store ? occupation.preferred_store : "ندارد" }}
              </div>
              <hr style="margin: 5px 0;">
            </div>
          </div>

        </v-server-table>
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
        startTime: undefined,

        columns: ['index', 'user.name', 'grade', 'actions', 'occupations'],
        data: [],
        options: {
          headings: {
            index: 'ردیف',
            'user.name': 'نام',
            grade: 'درجه تخصص',
            actions: 'اقدامات',
            occupations: 'برنامه زمانی متخصص',
          },
          requestFunction: this.reqFunc,
          responseAdapter: function(resp) {
            return { data: resp.data.data, count: resp.data.count };
          },
          perPage: 5,
          filterable: [],
          sortIcon: this.$store.state.tebleConfig.sortIcon,
          texts: this.$store.state.tebleConfig.texts,
          skin: this.$store.state.tebleConfig.skin,
        }
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

    methods: {
      changeTime(time) {
        return moment(time).format('تاریخ: jYYYY/jMM/jDD ساعت: HH:mm')
      },

      reqFunc : function (data) {
        return this.$http.get(`orders/admin/${this.orderId}/experts/`, {
          params: data
        }).catch((e) => {
          console.log(e)
        })
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
          console.log(this.time)
          let data = {
            expert_id: expertId,
            start_time: Math.round(Date.parse(
              moment(`${this.date} ${this.startTime}`).format("YYYY-MM-DD HH:mm")
            )/1000),
            end_time: Math.round(Date.parse(
              moment(`${this.date} ${this.startTime}`)
                .add(this.time > 0 ? this.time : 120, "minutes")
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
