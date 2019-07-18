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
              <div slot="current_status" slot-scope="props">
                {{ props.row.current_status | translateStatus }}
              </div>
              <div slot="total_cost" slot-scope="props">
                {{ props.row.total_cost | currency }}
              </div>
              <div slot="paid_cost" slot-scope="props">
                <span v-if="props.row.paid_cost && props.row.paid_cost != props.row.total_cost" class="badge badge-warning mb-1 p-2">
                  {{(((props.row.paid_cost / props.row.total_cost) - 1) * 100).toFixed(0) }} %
                </span>
                {{ props.row.paid_cost | currency }}
              </div>
              <div slot="preferred_date" slot-scope="props">
                {{ preferedTime(props.row.preferred_date)}}
                <span class="d-block text-center" style="border-top: 1px solid #eee;">{{props.row.preferred_time_frame | translateTimeFrame}}</span>
              </div>
              <div slot="created_at" slot-scope="props">
                {{ changeTime(props.row.created_at)}}
              </div>
              <div slot="assigned_shop" slot-scope="props" style="white-space: nowrap;">
                <router-link :to="{name: 'shop-order-detail', params: {id:props.row.id}}" class="ml-1">
                  <span class="ti-more-alt btn btn-xs btn-outline-info btn-round p-2"></span>
                </router-link>
                <p-button v-if="props.row.assigned_shop == null"
                          type="success"
                          @click.native="openModal(props.row.id)">تخصیص</p-button>
                <a v-else :href="`/repair-shop/${props.row.assigned_shop.id}`" class="btn btn-xs btn-outline-info btn-round">{{props.row.assigned_shop.user.name}}</a>
              </div>
            </v-server-table>
          </div>
        </div>

        <m-modal v-show="modal.show" @close="closeModal">
          <template slot="header">تخصیص به تعمیرگاه</template>
          <template slot="body">
            <form @submit.prevent @keyup.enter="assignRepairShop">
              <div class="row">
                <div class="col-sm-12 pl-3">
                  <label>از انبار:</label>
                  <model-list-select :list="repairShops"
                                     v-model="modal.selectedRepairShop"
                                     option-value="id"
                                     :custom-text="Names"
                                     class="form-control-select"
                                     placeholder="تعمیرگاه را انتخاب کنید" />
                </div>
                <div class="col-sm-12 pr-3">
                  <fg-input type="number"
                            v-model="modal.percent"
                            label="ضریب تعمیرگاه:"
                            placeholder="ضریب تعمیرگاه"/>
                </div>
              </div>
              <div class="text-center">
                <p-button type="info" round @click.native.prevent="assignRepairShop">ارسال</p-button>
              </div>
            </form>
          </template>
        </m-modal>

      </div>
    </div>
  </div>
</template>

<script>
  import moment from "jalali-moment";
  import { ModelListSelect } from 'vue-search-select';
  export default {
    name: "InRepairShops",
    components: {ModelListSelect},
    data() {
      return {
        dateFiltered: 'all',
        columns: [
          "index",
          "code",
          "id",
          "buyer",
          "payment_in_place",
          "current_status",
          "preferred_date",
          "total_cost",
          "paid_cost",
          "created_at",
          "assigned_shop",
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
            current_status: "وضعیت",
            paid_cost: "پرداختی",
            total_cost: "هزینه",
            id: "شناسه",
            code: "کدسفارش",
            preferred_date: "تاریخ انتخابی کاربر",
            created_at  : "تاریخ ایجاد",
            assigned_shop: "تخصیص شده",
          },
          rowClassCallback: function(row) {
            return `assign-${row.confirmed}`;
          },
          initFilters: {},
          sortable: [],//["preferred_date", "total_cost"],
          perPage: 10,
          perPageValues: [10,25,50],
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
        },
        modal: {
          show: false,
          selectedRepairShop: 0,
          orderId: 0,
          percent: 0,
        },
        repairShops: [],
      };
    },
    mounted(){
      this.getRepairShops()
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
      },

      getRepairShops: function(){
        this.$http.get("/profile/admin/shop/").then((res)=>{
          this.repairShops = res.data.data
        }).catch(function (e) {
          console.log(e)
        })
      },

      Names(item) {
        return `${item.id} - ${item.user.name} (${item.available? 'فعال': '-'})`
      },

      closeModal() {
        this.modal.show = false
      },

      openModal(id){
        this.modal.show = true
        this.modal.orderId = id
        this.modal.selectedRepairShop = 0
        this.modal.percent = 0
      },

      assignRepairShop(){
        let percent = this.modal.percent
        if(this.modal.percent >= 100) percent = 99
        else if(this.modal.percent <= -100) percent = -99

        let data = {
          shop_id: this.modal.selectedRepairShop,
          percent: percent
        }
        this.$http.post(`/orders/shop/admin/${this.modal.orderId}/`, data).then((res)=>{
          this.$swal({ type: 'success', title: 'موفق', text: 'عملیات با موفقیت انجام شد'})
          this.modal.show = false
          this.refreshTable()
        }).catch(function (e) {
          console.log(e)
        })
      },

      preferedTime(time) {
        return moment(time).format('jYYYY/jMM/jDD')
      },
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
          case 'accepted':
            return 'قبول شده'
            break
          default:
            return v
        }
      },

      translateTimeFrame: function(v){
        switch (v) {
          case 0:
            return '9-12'
            break
          case 1:
            return '12-3'
            break
          case 2:
            return '3-6'
            break
          case 3:
            return '6-9'
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
