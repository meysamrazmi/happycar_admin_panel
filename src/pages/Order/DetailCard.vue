<template>
  <card title="اطلاعات سفارش">
    <div class="row">
      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>
            کاربر
          </strong>
          <span class="pull-left">
                {{ buyer.name }}
            </span>
        </div>
      </div>

      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>
            شماره
          </strong>
          <span class="pull-left">
                {{ buyer.phone }}
            </span>
        </div>
      </div>

      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>
            مبلغ
          </strong>
          <span class="pull-left">
                {{ total_cost | currency }}
            </span>
        </div>
      </div>

      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>
            نوع پرداخت
          </strong>
          <span class="pull-left" v-if="payment_in_place">
                    درمحل
                </span>
          <span class="pull-left" v-else>
                    آنلاین
                </span>
        </div>
      </div>

      <div class="col-12">
        <div class="divider-border p-2 my-2">
          <strong>
            آدرس
          </strong>
          <span class="pr-4">
                    {{ address.address }}
                </span>
        </div>
      </div>

      <div class="col-6">
        <div class="divider-border p-2 my-2 ">
          <strong>
            زمان انجام
          </strong>
          <span class="pull-left">
                    {{ timeFrames[time] }}
                </span>
        </div>
      </div>

      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>
            انبار
          </strong>
          <span class="pull-left">
                        {{ store }}
                    </span>
        </div>
      </div>

      <div class="card-header col-6"><h4 class="card-title">اطلاعات خودرو</h4></div>
      <div class="col-6"></div>
      <div v-for="(val, name) in buyer_car"
           class="col-6"
           v-if="['brand', 'carModel', 'carType', 'covered_distance', 'plateNumber', 'production_year'].indexOf(name) > -1">
        <div class="divider-border p-2 my-2">
          <strong>{{name | translateNames}}</strong>
          <span class="pull-left">{{getInDepth(val, name)}}</span>
        </div>
      </div>

    </div>
  </card>
</template>

<script>
  export default {
    name: "detail-card",

    props: {
      buyer: {
        type: Object
      },
      buyer_car: {
        type: Object
      },
      date: {
        type: String
      },
      time: {
        type: Number
      },
      store: {
        type: String
      },
      address: {
        type: Object
      },
      payment_in_place: {
        type: Boolean
      },
      total_cost: {
        type: Number
      }
    },

    data() {
      return {
        timeFrames: ["9 - 12", "12 - 15", "15 - 18", "18 - 21"]
      };
    },
    filters:{
      translateNames: function (value) {
        switch (value) {
          case 'brand':
            return 'برند'
          break
          case 'carModel':
            return 'مدل'
            break
          case 'carType':
            return 'نوع خودرو'
            break
          case 'covered_distance':
            return 'مسافت تحت پوشش'
            break
          case 'plateNumber':
            return 'پلاک'
            break
          case 'production_year':
            return 'سال ساخت'
            break
          default:
            return value
        }
      }
    },
    methods:{
      getInDepth(val, name){
        switch (name) {
          case 'brand':
            return val.brand
            break
          case 'carModel':
            return val.carModel
            break
          case 'carType':
            return val.carType
            break
          case 'covered_distance':
            return val + ' Km'
          default:
            return val
        }
      },
    },
  };
</script>

<style scoped>
</style>
