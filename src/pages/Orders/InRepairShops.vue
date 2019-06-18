<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="radio-group" @click="refreshTable">
          <span>نمایش:</span>
          <input type="radio" id="all" value="all" v-model="dateFiltered">
          <label for="all">همه</label>
          <input type="radio" id="today" value="today" v-model="dateFiltered">
          <label for="today">امروز</label>
        </div>

        <div class="table-responsive">
          <div class="table-wrapper">
            <v-server-table ref="orders" :columns="columns" :options="options">
              <div slot="index" slot-scope="props">
                {{ props.index }}
              </div>
              <div slot="buyer" slot-scope="props">
                {{ props.row.buyer.name }} - {{ props.row.buyer.phone }}
              </div>
              <div slot="payment_in_place" slot-scope="props">
                <span v-if="props.row.payment_in_place" class="badge-info p-2 rounded">درمحل</span>
                <span class="badge-success p-2 rounded" v-else>آنلاین</span>
              </div>
              <div slot="total_cost" slot-scope="props">
                {{ props.row.total_cost | currency }}
              </div>
              <div slot="preferred_date" slot-scope="props">
                {{ changeTime(props.row.preferred_date)}}
              </div>
              <div slot="created_at" slot-scope="props">
                {{ changeTime(props.row.created_at)}}
              </div>
            </v-server-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InRepairShops",

    components: {
    },

    data() {
      return {
        dateFiltered: 'all',
        columns: [
          "index",
          "code",
          "id",
          "buyer",
          "payment_in_place",
          "preferred_date",
          "total_cost",
          "created_at",
        ],
        data: [],
        options: {
          requestFunction: this.reqFunc,
          responseAdapter: function(resp) {
            return { data: resp.data.data, count: resp.data.count };
          },
          headings: {
            index: "ردیف",
            buyer: "کاربر",
            payment_in_place: "نوع پرداخت",
            total_cost: "هزینه",
            id: "شناسه",
            code: "کدسفارش",
            preferred_date: "تاریخ انتخابی کاربر",
            created_at  : "تاریخ ایجاد",
          },
          rowClassCallback: function(row) {
            return `assign-${row.confirmed}`;
          },
          initFilters: {},
          sortable: ["preferred_date", "total_cost"],
          perPage: 25,
          perPageValues: [25],
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

    methods:{
      reqFunc: function (data) {
        var a = data
        if(this.dateFiltered == 'today'){
          a = Object.assign({date: Math.floor(Date.now() / 1000)}, data)
        }
        return this.$http.get("/orders/shop/admin/", {
          params: a
        }).catch(function (e) {
          console.log(e)
        }.bind(this));
      },
      refreshTable: function(){
        setTimeout(()=>{
          this.$refs.orders.refresh()
        },10);
      }
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
.radio-group label {
  margin: 0;
  vertical-align: middle;
  padding: 0px 5px 2px 20px;
}
.radio-group {
  border-right: 3px solid #03A9F4;
  padding: 3px 15px 0;
}
  .radio-group span {
    margin-left: 15px;
  }
</style>
