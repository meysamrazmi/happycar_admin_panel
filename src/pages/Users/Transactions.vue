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
    name: "transactions",
    data() {
      return {
        userId: 0,
        columns: [
          "id",
          "amount",
          "created_at"
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
            created_at: "تاریخ"
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

    methods: {
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
