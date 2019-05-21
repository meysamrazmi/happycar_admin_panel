<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <detail-card :buyer="order.buyer"
                             :date="order.preferred_date"
                             :time="order.preferred_time_frame"
                             :store="order.preferred_store"
                             :address="order.delivering_address"
                ></detail-card>
            </div>

            <div class="col-sm-6">
                <factor :services="order.services" :products="order.products"></factor>
            </div>
            <div class="col-12">
                <card title="متخصصین پیشنهادی">
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <table class="table ">
                                <thead>
                                <tr>
                                    <th>
                                        نام
                                    </th>
                                    <th>
                                        سفارش قبل
                                    </th>
                                    <th>
                                        سفارش بعد
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        حسن شریعت
                                    </td>
                                    <td>
                                        ۸-۹ انبار شرق
                                    </td>
                                    <td>
                                        ۱۲-۱۴ انبار شمال
                                    </td>
                                    <td>
                                        <button class="btn btn-success">
                                            اتصال
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </card>
            </div>

            <div class="col-sm-6">
                <card title="اطلاع به مشتری">
                    <textarea class="form-control mb-3"></textarea>
                    <div class="text-center">
                        <button class="btn btn-warning mx-1">
                            پیامک
                        </button>
                        <button class="btn btn-success mx-1">
                            نوتیفیکیشن
                        </button>
                    </div>
                </card>
            </div>
            <div class="col-sm-6">
                <card title="اطلاع به تعمیرکار">
                    <textarea class="form-control mb-3"></textarea>
                    <div class="text-center">
                        <button class="btn btn-warning mx-1">
                            پیامک
                        </button>
                        <button class="btn btn-success mx-1">
                            نوتیفیکیشن
                        </button>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
import { ClientTable } from "vue-tables-2";
import Factor from "./Order/Factor";
import DetailCard from "./Order/DetailCard";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
function getData() {
  return [];
}

export default {
  name: "order-detail",

  components: {
    ClientTable,
    Factor,
    DetailCard
  },

  data() {
    return {
      orderId: 0,
      order:{}
    };
  },

  created() {
    this.orderId = this.$route.params.id;
  },

  mounted() {
    this.fetchOrder();
    this.fetchOrderExperts();
  },

  methods: {
    fetchOrder() {
      this.$http
        .get(`/orders/admin/${this.orderId}/`)
        .then(res => {
          this.order = res.data
        })
        .catch(err => {
          console.log(err);
        });
    },

    fetchOrderExperts() {
      this.$http
        .get(`orders/admin/${this.orderId}/experts/`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>

<style scoped>
.location-height {
  height: 500px;
}
</style>
