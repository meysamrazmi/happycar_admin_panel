<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <div class="table-responsive">
              <div class="table-wrapper">
                <v-server-table :url="`/orders/admin/`" :columns="columns" :options="options">
                  <div slot="buyer" slot-scope="props">
                    {{ props.row.buyer.name }} - {{ props.row.buyer.phone }}
                  </div>
                  <div slot="payment_in_place" slot-scope="props">
                                            <span v-if="props.row.payment_in_place" class="badge-info p-2 rounded">
                                                درمحل
                                            </span>
                    <span class="badge-success p-2 rounded" v-else>
                                                آنلاین
                                            </span>
                  </div>
                  <div slot="current_status" slot-scope="props">
                    {{ props.row.current_status | translateStatus }}
                  </div>
                  <div slot="total_cost" slot-scope="props">
                    {{ props.row.total_cost | currency }}
                  </div>
                  <div slot="actions" slot-scope="props">
                    <router-link :to="{name: 'order-detail', params: {id:props.row.id}}">
                      <a class="ti-eye text-primary"></a>
                    </router-link>
                  </div>
                </v-server-table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // import { ServerTable } from "vue-tables-2";

  export default {
    name: "expert-orders",

    data() {
      return {
        userId: 0,
        columns: [
          "id",
          "code",
          "buyer",
          "payment_in_place",
          "current_status",
          "preferred_date",
          "total_cost",
          "actions"
        ],
        data: [],
        options: {
          requestFunction: function (data) {
            return this.$http.get(this.url, {
              params: data
            }).catch(function (e) {
              console.log(e)
            }.bind(this));
          },
          responseAdapter: function(resp) {
            return { data: resp.data.data, count: resp.data.count };
          },
          headings: {
            buyer: "کاربر",
            payment_in_place: "نوع پرداخت",
            total_cost: "هزینه",
            actions: "اقدامات",
            id: "شناسه",
            code: "کدسفارش",
            preferred_date: "تاریخ",
            current_status: "وضعیت"
          },
          rowClassCallback: function(row) {
            return `wallet-${row.confirmed}`;
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
      this.userId = this.$route.params.id;
    },

    filters: {
      translateStatus: function (v) {
        switch (v) {
          case 'waiting':
              return 'در انتظار تخصیص'
            break
          case 'assigned':
            return  'تخصیص شده'
            break
          case 'done':
            return 'انجام شده'
            break
          case 'canceled':
            return 'لغو شده'
            break
          default:
            return v
        }
      }
    }
  };
</script>

<style scoped>
  .wallet-true {
    background-color: #71f1873d;
  }
  .wallet-false {
    background-color: #ece9e51c;
  }
</style>
