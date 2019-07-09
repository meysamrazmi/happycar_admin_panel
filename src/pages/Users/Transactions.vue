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
                <v-server-table :url="`/wallet/admin/expert/${userId}/`" :columns="columns" :options="options">
                  <div slot="amount" slot-scope="props">
                    {{ props.row.amount | currency }}
                  </div>
                  <div slot="created_at" slot-scope="props">
                    {{ changeTime(props.row.created_at)}}
                  </div>
                  <div slot="actions" slot-scope="props">
                    <router-link :to="{name: 'order-detail', params: {id : props.row.boughtpack.id}}">
                      <button class="btn btn-xs btn-outline-info btn-round p-2">مشاهده سفارش</button>
                    </router-link>
                  </div>
                  <div slot="affected" slot-scope="props">
                    <span :class="props.row.affected? 'ti-check': 'ti-close'"></span>
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
  export default {
    name: "transactions",
    data() {
      return {
        userId: 0,
        columns: [
          "id",
          "amount",
          "affected",
          "created_at",
          "actions",
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
            id: "شناسه",
            amount: "مقدار",
            created_at: "تاریخ",
            actions: "مدیریت",
            affected: "دریافت شده",
          },
          rowClassCallback: function(row) {
            return `wallet-${row.affected}`;
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
  };
</script>

<style>
  .wallet-true {
    background-color: rgba(111, 241, 133, 0.3);
  }
</style>
