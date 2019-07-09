<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="تراکنش ها">
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <v-server-table :columns="columns" :options="options" ref="transactions">
                    <div slot="index" slot-scope="props">
                      {{ props.index }}
                    </div>
                    <div slot="user" slot-scope="props">
                      {{ props.row.user.name}}
                    </div>
                    <div slot="create_at" slot-scope="props">
                      {{ changeTime(props.row.create_at)}}
                    </div>
                    <div slot="amount" slot-scope="props">
                      {{ props.row.amount | currency}}
                    </div>
                    <div slot="status" slot-scope="props">
                      <span :class="{'ti-stats-up text-success': props.row.amount > 0, 'ti-stats-down text-danger': props.row.amount < 0}"></span>
                    </div>
                  </v-server-table>
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
  export default {
    name: "Transactions",

    components: {
    },

    data() {
      return {
        columns: [
          "index",
          "user",
          "amount",
          "create_at",
          "status",
        ],
        data: [],
        options: {
          requestFunction: function (data) {
            return this.$http.get("/wallet/admin/transactions/", {
              params: data
            }).catch(function (e) {
              console.log(e)
            }.bind(this));
          },
          responseAdapter: function(resp) {
            return { data: resp.data.data, count: resp.data.count };
          },
          rowClassCallback: function(row) {
            if(row.amount > 0) return 'green-devider-border'
            if(row.amount < 0) return 'red-devider-border'
          },
          headings: {
            index: "ردیف",
            user: "کاربر",
            amount: "مقدار",
            create_at: "تاریخ",
            status: 'نوع',
          },
          sortable: [],
          perPage: 25,
          perPageValues: [25],
          filterable: [],
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
  };
</script>

