<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="کد تخفیف" subTitle="لیست کدهای تخفیف">
                    <div class="row">
                        <div class="col-6"></div>
                        <div class="col-6">
                            <p-button class="pull-left" type="success" @click.native="openModal('create', {})">
                                    افزودن کد تخفیف
                            </p-button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-server-table  :columns="columns" :options="options" v-if="renderTable">
                                        <div slot="maximum_expendable_value" slot-scope="props">
                                            {{ props.row.maximum_expendable_value | currency }}
                                        </div>
                                        <div slot="percentage" slot-scope="props">
                                            {{ props.row.percentage }} %
                                        </div>
                                    </v-server-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <discount-modal :show="modal.show"
                            :modal-data="modal.data"
                            :type="modal.type"
                            @updateParent="update()"
            ></discount-modal>
        </div>
    </div>
</template>

<script>
import DiscountModal from "./Discount/DiscountModal";


export default {
  name: "discount",

  components: {
    DiscountModal
  },

  data() {
    return {
      modal: {
        show: false,
        data: {},
        type: ''
      },
      renderTable: true,
      columns: ["id","code", "inventory", "percentage", "maximum_expendable_value", "num_of_used"],
      options: {
        requestFunction: function (data) {
          return this.$http.get("/wallet/admin/redeem/", {
            params: data
          }).catch(function (e) {
            // console.log(e)
          }.bind(this));
        },
        responseAdapter: function(resp) {
          return { data: resp.data.data, count: 10 };
        },
        headings: {
          id: "شناسه",
          code: "کد",
          inventory: "تعداد",
          percentage: "درصد تخفیف",
          maximum_expendable_value: "سقف تخفیف",
          num_of_used: "تعداد استفاده"
        },
        sortable: [],
        filterable: [],
        pagination: { chunk: 10 },
        sortIcon: this.$store.state.tebleConfig.sortIcon,
        texts: this.$store.state.tebleConfig.texts,
        skin: this.$store.state.tebleConfig.skin,
        customSorting: {
          id: function(ascending) {
            return function(a, b) {
              if (ascending) {
                return a.id >= b.id ? 1 : -1;
              }
              return a.id <= b.id ? 1 : -1;
            };
          }
        }
      }
    };
  },

  mounted() {

  },

  methods: {
    update() {
      this.renderTable = false;
      this.$nextTick(() => {
        this.renderTable = true;
      });
    },

    openModal(type, data) {
      this.modal = {
        type: type,
        show: true,
        data: data
      }
    }
  }
};
</script>

<style scoped>
</style>
