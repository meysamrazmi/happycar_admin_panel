<template>
    <card>
        <tabs>
            <tab name="تراکنش‌ها">
                <div class="transaction-wrapper">
                    <transactions userId="1"></transactions>
                </div>
            </tab>
            <tab name="سفارش‌ها">
                <div class="order-wrapper">
                    <expert-orders userId="1"></expert-orders>
                </div>
            </tab>
        </tabs>
    </card>
</template>

<script>
  import {Tabs, Tab} from 'vue-tabs-component';
  import ExpertOrders from './ExpertOrders';
  import Transactions from './Transactions';

export default {
  name: "expert-transactions",

  components: {
    Tab,
    Tabs,
    ExpertOrders,
    Transactions
  },

  props: {
    userId: {
      type: String | Number
    }
  },

  data() {
    return {
    };
  }
};
</script>

<style scoped>
    .green-devider-border {
    background-color: #d0ffd89e;
}

.red-devider-border {
    background-color: #ffc2c27d;
}
</style>
