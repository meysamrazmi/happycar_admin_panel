<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="لیست آی‌پی‌ها" subTitle="دسترسی به اطلاعات آی‌پی‌ها">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-server-table :url="`${$http.defaults.baseURL}/orders/admin/`" :columns="columns" :options="options">
                                        <div slot="price" slot-scope="props">
                                        {{ props.row.price | currency }}
                                        </div>
                                        <div slot="actions" slot-scope="props">
                                        <router-link :to="{name: 'order-detail', params: {id:props.row.id}}">
                                            <a class="ti-eye text-primary"></a>
                                        </router-link>
                                        </div>
                                    </v-server-table>
                                    <!--<v-server-table url="/orders/admin/" :columns="columns" :data="data" :options="options">-->
                                        <!--<div slot="price" slot-scope="props">-->
                                            <!--{{ props.row.price | currency }}-->
                                        <!--</div>-->
                                        <!--<div slot="payment_type" slot-scope="props">-->
                                            <!--<span v-if="props.row.payment_type === 'cash'" class="badge-info p-2 rounded">-->
                                                <!--نقدی-->
                                            <!--</span>-->
                                            <!--<span v-else class="badge-success p-2 rounded">-->
                                                <!--آنلاین-->
                                            <!--</span>-->
                                        <!--</div>-->
                                        <!--<div slot="services" slot-scope="props">-->
                                            <!--<vue-input-tag :tags="props.row.services" :read-only="true" :allow-duplicates="true">-->
                                            <!--</vue-input-tag>-->
                                        <!--</div>-->
                                        <!--<div slot="actions" slot-scope="props">-->
                                            <!--<router-link :to="{name: 'order-detail'}">-->
                                                <!--<a class="ti-eye text-primary"></a>-->
                                            <!--</router-link>-->
                                        <!--</div>-->
                                    <!--</v-server-table>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>

        </div>
    </div>
</template>

<script>
// import { ServerTable } from "vue-tables-2";

function getData() {
  return [
    {
      id: 1,
      user: "محمدرضا ابراهیمی",
      code: "1234",
      services: ["تعویض روغن", "کارواش"],
      price: 1200,
      status: "در انتظار تایید",
      payment_type: "online",
      assign: false,
      carModel: "پژو ۲۰۶ تیپ ۶",
      date: "12/4/54"
    },
    {
      id: 2,
      user: "حسن",
      code: "232435",
      status: "تایید شده",
      services: ["تعویض فیلتر", "پنچری"],
      price: 120000,
      payment_type: "cash",
      assign: true,
      carModel: "پراید",
      date: "12/4/54"
    }
  ];
}

export default {
  name: "orders",

  components: {
    // 'v-server-table': ServerTable
  },

  data() {
    return {
      columns: [
        "id",
        "code",
        "user",
        "carModel",
        "payment_type",
        "status",
        "date",
        "price",
        "actions"
      ],
      data: getData(),
      options: {
        requestFunction: function (data) {
          return this.$http.get("/orders/admin/", {
            params: data
          }).catch(function (e) {
            console.log(e)
          }.bind(this));
        },
        responseAdapter: function(resp) {
          return { data: resp.data.data, count: 10 };
        },
        headings: {
          user: "کاربر",
          carModel: "نوع خودرو",
          payment_type: "نوع پرداخت",
          price: "هزینه",
          actions: "اقدامات",
          id: "ردیف",
          code: "کدسفارش",
          date: "تاریخ",
          status: "وضعیت"
        },
        rowClassCallback: function(row) {
          return `assign-${row.assign}`;
        },
        sortable: ["id", "name", "code"],
        filterable: ["name", "code"],
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
    this.fetchOrders();
  },

  methods: {
    fetchOrders() {}
  }
};
</script>

<style>
.assign-false {
  background-color: #71f1873d;
}
.assign-true {
  background-color: #ece9e51c;
}
</style>
