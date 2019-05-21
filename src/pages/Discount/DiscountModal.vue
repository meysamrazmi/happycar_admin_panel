<template>
    <m-modal v-show="showMe" @close="closeModal">
        <template slot="header">
        <span v-if="type === 'created'">
            اضافه کردن گروه جدید
        </span>
            <span v-else>
            به‌روز رسانی گروه
        </span>
        </template>
        <template slot="body">
            <form @submit.prevent @keyup.enter="sendRequest">
                <div class="row">

                    <div class="col-sm-6">
                        <fg-input type="text"
                                  name="code"
                                  label="کد"
                                  placeholder="کد"
                                  rules="required"
                                  v-model="redeem.code"
                                  data-vv-as="کد"
                                  v-validate="'required'"
                                  :err="errors.first('code')"
                        >
                        </fg-input>
                    </div>

                    <div class="col-sm-6">
                        <fg-input type="number"
                                  name="inventory"
                                  label="تعداد"
                                  placeholder="تعداد قابل استفاده"
                                  rules="required"
                                  v-model="redeem.inventory"
                                  data-vv-as="تعداد"
                                  v-validate="'required'"
                                  :err="errors.first('inventory')"
                        >
                        </fg-input>
                    </div>


                    <div class="col-sm-6">
                        <fg-input type="number"
                                  name="percentage"
                                  label="درصد"
                                  placeholder="درصد تخفیف"
                                  rules="required"
                                  v-model="redeem.percentage"
                                  data-vv-as="درصد"
                                  v-validate="'required'"
                                  :err="errors.first('percentage')"
                        >
                        </fg-input>
                    </div>

                    <div class="col-sm-6">
                        <fg-input type="number"
                                  name="maximum_expendable_value"
                                  label="سقف تخفیف"
                                  placeholder="سقف تخفیف"
                                  rules="required"
                                  v-model="redeem.maximum_expendable_value"
                                  data-vv-as="سقف تخفیف"
                                  v-validate="'required'"
                                  :err="errors.first('maximum_expendable_value')"
                        >
                        </fg-input>
                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round @click.native.prevent="sendRequest">
                        ارسال
                    </p-button>
                </div>
                <div class="clearfix"></div>
            </form>
        </template>

    </m-modal>
</template>

<script>
import { ModelListSelect } from "vue-search-select";

export default {
  name: "discount-modal",
  components: {
    ModelListSelect
  },
  props: {
    show: {
      type: Boolean
    },
    modalData: {
      type: Object,
      required: false
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      showMe: false,
      redeem: {
        code: "",
        inventory: undefined,
        percentage: undefined,
        maximum_expendable_value: undefined
      }
    };
  },

  mounted() {},

  methods: {
    closeModal() {
      this.$emit("close");
      this.showMe = false;
      setTimeout(() => {
        this.redeem = {
          code: "",
          inventory: undefined,
          percentage: undefined,
          maximum_expendable_value: undefined
        }
      }, 200);
    },

    sendRequest() {
      this.$validator
        .validateAll()
        .then(res => {
          if (res) {
            if (this.type === "create") {
              this.$http
                .post("/wallet/admin/redeem/", this.redeem)
                .then(res => {
                  console.log(res);
                  this.$emit("updateParent");
                  this.closeModal();
                })
                .catch(err => {
                  console.log(err);
                });
            } else if (this.type === "update") {
            }
          }
        })
        .catch(err => {});
    }
  },
  watch: {
    show(val) {
      this.showMe = val;

    },
    modalData(val) {
    }
  }
};
</script>

<style scoped>
.backendError {
  padding-top: 10px;
  color: red;
}
</style>
