<template>
    <card>
        <tabs>
            <tab name="تراکنش‌ها">
                <div class="transaction-wrapper">
                    <div v-for="transaction in transactions"
                         :key="transaction.id"
                         :class="{'green-devider-border': transaction.type === 'in', 'red-devider-border': transaction.type === 'out'}"
                         class="d-flex justify-content-around divider-border py-2 my-3">
                        <span>
                            {{ transaction.id }}
                        </span>
                        <span>
                            {{ transaction.amount }}
                        </span>
                        <span>
                            {{ transaction.time }}
                        </span>
                        <span>
                            <span v-if="transaction.type === 'in'" class="ti-stats-up text-success"></span>
                            <span v-if="transaction.type === 'out'" class="ti-stats-down text-danger"></span>
                        </span>
                    </div>
                </div>
            </tab>
            <tab name="سفارش‌ها">
                <div class="order-wrapper">
                    orders
                </div>
            </tab>
        </tabs>
    </card>
</template>

<script>
  import {Tabs, Tab} from 'vue-tabs-component';
let transactions = [
  {
    id: 1,
    type: "in",
    amount: 1200000000,
    time: "1398/12/4"
  },
  {
    id: 2,
    type: "out",
    amount: 2300,
    time: "1398/12/4"
  },
  {
    id: 4,
    type: "out",
    amount: 2300,
    time: "1398/12/4"
  },
  {
    id: 6,
    type: "out",
    amount: 2300,
    time: "1398/12/4"
  },
  {
    id: 5,
    type: "in",
    amount: 12000,
    time: "1398/12/4"
  },
  {
    id: 3,
    type: "in",
    amount: 12000,
    time: "1398/12/4"
  }
];
export default {
  name: "expert-transactions",

  components: {
    Tab,
    Tabs
  },

  data() {
    return {
      transactions: transactions
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
