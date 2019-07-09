<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="تعمیرگاه ها">
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <v-server-table :columns="columns" :options="options" ref="repairShops">
                    <div slot="index" slot-scope="props">{{ props.index}}</div>
                    <div slot="date_joined" slot-scope="props">{{ changeTime(props.row.user.date_joined)}}</div>
                    <div slot="last_login" slot-scope="props">{{props.row.last_login ? changeLoginTime(props.row.last_login) : ''}}</div>
                    <div slot="available" slot-scope="props">
                      <span v-html="props.row.available? 'فعال': 'غیر فعال'"></span>
                    </div>
                    <div slot="active"
                        slot-scope="props"
                        @click="changeRepairShopsStatus(props.row.user.id)">
                      <toggle-button :value="!props.row.user.active" style="cursor: default;"/>
                    </div>
                      <div slot="actions" slot-scope="props">
                        <router-link :to="{name: 'repair-shop', params: {id:props.row.id}}">
                          <button class="ti-more-alt btn btn-xs btn-outline-info btn-round p-2"></button>
                        </router-link>
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
    name: "RepairShops",

    components: {
    },

    data() {
      return {
        columns: [
          "index",
          "id",
          "user.name",
          "user.phone",
          "address",
          "date_joined",
          "last_login",
          "available",
          "active",
          "actions",
        ],
        data: [],
        options: {
          requestFunction: function (data) {
            return this.$http.get("/profile/admin/shop/", {
              params: data
            }).catch(function (e) {
              console.log(e)
            }.bind(this));
          },
          responseAdapter: function(resp) {
            console.log(resp)
            return { data: resp.data.data, count: resp.data.count };
          },
          headings: {
            index: "ردیف",
            id: "شناسه",
            "user.phone": "تلفن",
            active: "بلاک",
            available: "فعال",
            "user.name": "نام",
            address: "آدرس",
            date_joined: "تاریخ عضویت",
            last_login: "آخرین ورود",
            actions: "اقدامات",
          },
          rowClassCallback: function(row) {
            return `assign-${row.confirmed}`;
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
      changeRepairShopsStatus(id) {
        this.$http.patch(`/admin/repair_shop/${id}/`).then((res)=> {
          this.$refs.repairShops.refresh();
        }).catch((err)=> {
          this.$refs.repairShops.refresh();
        })
      },
    }
  };
</script>

<style>
.toggle-wrapper{
  cursor: default !important;
}
</style>
