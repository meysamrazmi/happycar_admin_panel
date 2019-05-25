<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <detail-card :buyer="order.buyer"
                             :date="order.preferred_date"
                             :time="order.preferred_time_frame"
                             :store="order.preferred_store"
                             :address="order.delivering_address"
                             :payment_in_place="order.payment_in_place"
                ></detail-card>
            </div>

            <div class="col-sm-6">
                <factor :services="order.services"
                        :products="order.products"
                        :total_cost="order.total_cost"
                        :paid_cost="order.paid_cost"
                ></factor>
            </div>
            <div class="col-12">
                <expert :orderId="orderId"
                        :date="order.preferred_date"
                        :time="execution_time"
                        :assinged_calender="order.assigned_calendar"
                        @updateParent="fetchOrder"
                ></expert>
            </div>

            <!--<div class="col-sm-6">-->
                <!--<card title="اطلاع به مشتری">-->
                    <!--<textarea class="form-control mb-3"></textarea>-->
                    <!--<div class="text-center">-->
                        <!--<button class="btn btn-warning mx-1">-->
                            <!--پیامک-->
                        <!--</button>-->
                        <!--<button class="btn btn-success mx-1">-->
                            <!--نوتیفیکیشن-->
                        <!--</button>-->
                    <!--</div>-->
                <!--</card>-->
            <!--</div>-->
            <!--<div class="col-sm-6">-->
                <!--<card title="اطلاع به تعمیرکار">-->
                    <!--<textarea class="form-control mb-3"></textarea>-->
                    <!--<div class="text-center">-->
                        <!--<button class="btn btn-warning mx-1">-->
                            <!--پیامک-->
                        <!--</button>-->
                        <!--<button class="btn btn-success mx-1">-->
                            <!--نوتیفیکیشن-->
                        <!--</button>-->
                    <!--</div>-->
                <!--</card>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
import { ClientTable } from "vue-tables-2";
import Factor from "./Order/Factor";
import DetailCard from "./Order/DetailCard";
import Expert from './Order/Expert';

export default {
  name: "order-detail",

  components: {
    ClientTable,
    Factor,
    DetailCard,
    Expert
  },

  computed: {
    execution_time() {
      let sum_of_time = this.order.services.reduce((sum, service) => {
        return sum + service.execution_time;
      }, 0);
      return sum_of_time
    }
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

  }
};
</script>

<style scoped>
.location-height {
  height: 500px;
}
</style>
