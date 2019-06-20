<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="radio-group" @click="refreshTable">
          <span>نمایش:</span>
          <input type="radio" id="all1" value="all" v-model="dateFiltered">
          <label for="all1">همه</label>
          <input type="radio" id="today1" value="today" v-model="dateFiltered">
          <label for="today1">امروز</label>
        </div>

        <div class="table-responsive">
          <div class="table-wrapper">
            <v-server-table ref="orders" :columns="columns" :options="options">
              <div slot="index" slot-scope="props">
                {{props.index}}
              </div>
              <div slot="buyer" slot-scope="props">
                {{ props.row.buyer.name }} - {{ props.row.buyer.phone }}
              </div>
              <div slot="payment_in_place" slot-scope="props">
                <span v-if="props.row.payment_in_place" class="badge-info p-2 rounded">درمحل</span>
                <span class="badge-success p-2 rounded" v-else>آنلاین</span>
              </div>
              <div slot="current_status" slot-scope="props">
                {{ props.row.current_status | translateStatus }}
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
</template>

<script>
  export default {
    name: "InPlaceOrders",
    data() {
      return {
        dateFiltered: 'all',
        columns: [
          "index",
          "id",
          "code",
          "buyer",
          "payment_in_place",
          "current_status",
          "preferred_date",
          "total_cost",
          "created_at",
          "actions"
        ],
        data: [],
        options: {
          requestFunction: this.reqFunc,
          responseAdapter: function(resp) {
            return { data: resp.data.data, count: resp.data.count };
          },
          headings: {
            index: 'ردیف',
            buyer: "کاربر",
            payment_in_place: "نوع پرداخت",
            total_cost: "هزینه",
            actions: "اقدامات",
            id: "شناسه",
            code: "کدسفارش",
            preferred_date: "تاریخ انتخابی کاربر",
            current_status: "وضعیت",
            created_at: "تاریخ ایجاد"
          },
          rowClassCallback: function(row) {
            return `assign-${row.confirmed}`;
          },
          sortable: [],
          filterable: [],
          perPage: 25,
          perPageValues: [25],
          // pagination: { chunk: 10 },
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
        return this.$http.get("/orders/admin/", {
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

<style>
  .assign-false {
    background-color: #71f1873d;
  }
  .assign-true {
    background-color: #ece9e51c;
  }
</style>
