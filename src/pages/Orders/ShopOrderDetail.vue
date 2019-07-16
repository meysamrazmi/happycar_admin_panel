<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <detail-card v-if="order.buyer"
                     :buyer="order.buyer"
                     :code="order.code"
                     :date="order.preferred_date"
                     :buyer_car="order.buyer_car"
                     :time="order.preferred_time_frame"
                     :address="order.customer_location"
                     :payment_in_place="order.payment_in_place"
                     :total_cost="order.total_cost"
        ></detail-card>
      </div>

      <div class="col-sm-6">
        <factor :services="order.services"
                :products="order.products"
                :total_cost="order.total_cost"
                :paid_cost="order.paid_cost"
        />

        <RepairShop v-if="order.assigned_shop && order.assigned_shop.user"
                    :shop="order.assigned_shop"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { ClientTable } from "vue-tables-2";
  import Factor from "../Order/Factor";
  import DetailCard from "../Order/DetailCard";
  import RepairShop from "./RepairShop";

  export default {
    name: "shop-order-detail",
    components: {
      ClientTable,
      Factor,
      DetailCard,
      RepairShop,
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
          .get(`/orders/shop/admin/${this.orderId}/`)
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
