<template>
    <div>
        <div class="row">
            <div class="col-12">
                <card title="گروه خودرو" subTitle="لیست گروه‌ خودرو">
                    <div class="row">
                        <div class="col-6"></div>
                        <div class="col-6 text-left">
                            <button class="btn btn-success" @click="openModal('create', {})">
                                افزودن گروه خودرو
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <div class="table-wrapper">
                                    <v-client-table :data="data" :columns="columns" :options="options" v-if="renderTable">
                                        <div slot="actions" slot-scope="props">
                                                <a @click="openModal('update', props.row)" class="ti-eye text-primary"></a>
                                        </div>
                                    </v-client-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <car-group-modal :show="modal.show"
                             :modalData="modal.data"
                             :type="modal.type"
                             @updateParent="fetchTags"
                             @close="closeModal"
            ></car-group-modal>
        </div>
    </div>
</template>

<script>
import CarGroupModal from "./CarGroupModal";

export default {
  name: "orders",

  components: {
    CarGroupModal
  },

  data() {
    return {
      renderTable: true,
      modal: {
        show: false,
        data: {},
        type: ""
      },
      columns: ["id", "name", "actions"],
      data: [],
      options: {
        headings: {
          name: "نام",
          actions: "اقدامات",
          id: "شناسه"
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
    this.fetchTags()
  },

  methods: {
    fetchTags() {
      this.$http
        .get('/car/tags/')
        .then(res => {
          this.data = res.data
        })
        .catch(err => {});
    },
    openModal(type, data) {
      this.modal = {
        show: true,
        type: type,
        data: data
      };
    },

    closeModal() {
      this.modal = {
        show: false,
        type: '',
        data: {}
      };
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
