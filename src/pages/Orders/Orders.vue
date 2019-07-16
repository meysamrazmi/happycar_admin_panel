<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card title="سفارش‌ها">
          <tabs>
            <tab name="در محل">
              <InPlaceOrders></InPlaceOrders>
            </tab>
            <tab name="در تعمیرگاه">
              <InRepairShops></InRepairShops>
            </tab>
          </tabs>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import {Tabs, Tab} from 'vue-tabs-component';
import InPlaceOrders from './InPlaceOrders.vue';
import InRepairShops from './InRepairShops.vue';

export default {
  name: "orders",
  components: {Tab, Tabs, InPlaceOrders, InRepairShops},
};
</script>

