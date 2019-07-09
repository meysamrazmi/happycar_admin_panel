<template>
    <card title="فاکتور">
        <div class="divider-border p-2 my-2 prod-border" v-for="product in products">
            <strong>
                {{ product.product.special_name }} - {{ product.product.general_name }}
            </strong>
            <span class="pr-4 pull-left">
                {{ product.product.customer_pric | currency }} * {{ product.num_of_products }}
            </span>
        </div>
        <div class="divider-border p-2 my-2 prod-border" v-for="service in services">
            <strong>
                {{ service.name }}
            </strong>
            <span class="pr-4 pull-left ">
                {{ service.price | currency }}
            </span>
        </div>
        <div class="divider-border p-2 my-2 prod-border" v-for="service in services">
            <strong>توضیحات</strong>
            <span class="pr-4">
                {{ description }}
            </span>
        </div>

        <hr>
        <div class="divider-border p-2 my-2">
            <strong>
                جمع کل
            </strong>
            <span class="pr-4 pull-left">
                {{ total_cost | currency }}
            </span>
        </div>
        <div class="divider-border p-2 my-2 discount-border">
            <strong>
                تخفیف
            </strong>
            <span class="pr-4 pull-left">
                {{ total_cost - paid_cost | currency }}
            </span>
        </div>
        <div class="divider-border p-2 my-2">
            <strong>
                 قابل پرداخت
            </strong>
            <span class="pr-4 pull-left">
                {{ paid_cost | currency }}
            </span>
        </div>
        <div class="divider-border p-2 my-2">
            <strong>
                 زمان تخمینی
            </strong>
            <span class="pr-4 pull-left">
                {{ execution_time }}
               دقیقه
            </span>
        </div>
    </card>
</template>
<script>
export default {
  name: "factor",

  props: {
    products: {
      type: Array
    },

    services: {
      type: Array
    },

    description: {
      type: String
    },

    total_cost: {
      type: Number
    },

    paid_cost: {
      type: Number
    }
  },

  computed: {
    execution_time() {
      let sum_of_time = this.services != undefined ? this.services.reduce((sum, service) => {
        return sum + service.execution_time;
      }, 0) : 0
      console.log("sum_of_time", sum_of_time);
      return sum_of_time
    }
  },

  methods: {
    formatTime(time) {
      let hours = Math.floor(time / 60);
      let minutes = time % 60;
      return `${minutes} : ${hours}`;
    }
  }
};
</script>
<style scoped>
.prod-border {
  background-color: #71f1873d;
}
.discount-border {
  background-color: #fd37371c;
}
</style>
