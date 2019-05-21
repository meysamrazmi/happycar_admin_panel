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
                {{ "12000" | currency }}
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
    }
  },

  data() {
    return {
      timeFrames: ["9 - 12", "12 - 15", "15 - 18", "18 - 21"]
    };
  }
};
</script>

<style scoped>
</style>
