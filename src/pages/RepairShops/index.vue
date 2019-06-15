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
                    <div slot="date_joined" slot-scope="props">
                      {{ changeTime(props.row.date_joined)}}
                    </div>
                    <div slot="active"
                        slot-scope="props"
                        @click="RepairShops(props.row.id)">
                      <toggle-button :value="props.row.active"/>
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
  import moment from "jalali-moment";

  export default {
    name: "RepairShops",

    components: {
    },

    data() {
      return {
        columns: [
          "name",
          "phone",
          "date_joined",
          "active",
          "actions",
        ],
        data: [],
        options: {
          requestFunction: function (data) {
            return this.$http.get("/admin/repair_shop/", {
              params: data
            }).catch(function (e) {
              console.log(e)
            }.bind(this));
          },
          responseAdapter: function(resp) {
            return { data: resp.data, count: resp.data.length };
          },
          headings: {
            phone: "تلفن",
            active: "فعال",
            name: "نام",
            date_joined: "تاریخ عضویت",
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
      changeTime(time) {
        return moment(time).format('jYYYY/jMM/jDD')
      },
      changeRepairShopsStatus(id) {
        this.$http.patch(`/admin/repair_shop/${id}`).then((res)=> {
          this.$refs.repairShops.refresh();
        }).catch((err)=> {
          this.$refs.repairShops.refresh();
        })
      },
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
