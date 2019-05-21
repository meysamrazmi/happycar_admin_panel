<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="انبار" subTitle="لیست انبارها">
            <div class="col-12">
                <div class="row">
                    <div class="col-6"></div>
                    <div class="col-6">
                        <p-button class="pull-left" type="success">
                            <router-link :to="{name: 'store-detail'}" class="text-white">
                                افزودن انبار
                            </router-link>
                        </p-button>
                    </div>
                </div>
            </div>
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <v-client-table :columns="columns" :data="data" :options="options">
                      <div slot="image" slot-scope="props">
                          <img v-if="props.row.image === null" :src="$store.state.placeholderImage" class="mr-thumb" alt="">
                          <img v-else :src="`${$http.defaults.mediaUrl}${props.row.image}`" class="mr-thumb" alt="">
                      </div>
                      <div slot="actions" slot-scope="props">
                          <router-link :to="{name: 'store-detail', params: {id: props.row.id}}">
                              <span class="ti-pencil-alt text-primary pr-3"></span>
                          </router-link>
                          <span class="ti-trash text-danger"
                                @click="deleteStore(props.row)"></span>
                      </div>
                  </v-client-table>
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
    import { ClientTable } from 'vue-tables-2'

    function getData() {
        return [];
    }


    export default {
        name: "store-list",

        components:{
            ClientTable
        },

        data() {
            return {
                columns: ['id', 'name', 'image', 'actions'],
                data: [],
                options: {
                    headings: {
                        name: 'نام',
                        image: 'تصویر',
                        actions: 'اقدامات',
                        id: 'ردیف'
                    },
                    sortable: ['id','name'],
                    filterable: ['name'],
                    pagination: { chunk:10 },
                    sortIcon: this.$store.state.tebleConfig.sortIcon,
                    texts: this.$store.state.tebleConfig.texts,
                    skin: this.$store.state.tebleConfig.skin,
                    customSorting: {
                        id: function (ascending) {
                            return function (a, b) {
                                if (ascending){
                                    return a.id >= b.id ? 1 : -1;
                                }
                                return a.id <= b.id ? 1 : -1;
                            }
                        },
                    }
                }
            }
        },

        mounted() {
            this.fetchStoreList()
        },

        methods: {
            fetchStoreList() {
                this.$http.get("/products/store/").then((res)=> {
                    console.log(res.data.result);
                    this.data = res.data.result;
                }).catch((err)=> {
                    console.log(err)
                })
            },

            deleteStore(store) {
                let data = {
                    store_id: store.id
                };
                this.askBeforeDelete(() => {
                    this.$http.delete('/products/store/', {data: data}).then((res)=> {
                        this.fetchStoreList();
                    }).catch((err)=> {
                        this.fetchStoreList()
                    })
                });
            }
        }


    }
</script>

<style scoped>

</style>