<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="محصول‌ها" subTitle="لیست محصول‌ها">
          <div class="col-12">
            <div class="row">
              <div class="col-6"></div>
              <div class="col-6">
                <p-button class="pull-left" type="success">
                  <router-link :to="{name: 'product-detail'}" class="text-white">
                    افزودن محصول
                  </router-link>
                </p-button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <v-client-table
                      ref="productsList"
                      :columns="columns"
                      :data="data"
                      :options="options"
                      @pagination="setPage"
                  >
                    <div slot="index" slot-scope="props">
                      {{props.index}}
                    </div>
                    <div slot="image" slot-scope="props">
                      <img v-if="props.row.image === null" :src="$store.state.placeholderImage"
                           class="mr-thumb" alt="">
                      <img v-else :src="`${$http.defaults.mediaUrl}${props.row.image}`"
                           class="mr-thumb" alt="">
                    </div>
                    <div slot="customer_pric" slot-scope="props">
                      {{props.row.customer_pric | currency}}
                    </div>
                    <div slot="repair_price" slot-scope="props">
                      {{props.row.repair_price | currency}}
                    </div>
                    <div slot="actions" slot-scope="props">
                      <router-link :to="{name: 'product-detail', params: {id: props.row.id}}">
                        <span class="ti-pencil-alt text-primary pr-3"></span>
                      </router-link>
                      <span class="ti-trash text-danger"
                            @click="deleteProduct(props.row)"></span>
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
  import {ClientTable} from 'vue-tables-2'

  export default {
    name: "product-list",
    components: {
      ClientTable
    },

    data() {
      return {
        columns: ['index', 'id', 'special_name', 'general_name', 'code', 'image', 'category_id.name', 'service_id.name', 'customer_pric', 'repair_price', 'actions'],
        data: [],
        options: {
          headings: {
            special_name: 'نام تخصصی',
            general_name: 'نام عمومی',
            code: 'کد محصول',
            'category_id.name': 'گروه',
            index: 'ردیف',
            id: 'شناسه',
            'service_id.name': 'سرویس',
            image: 'تصویر',
            customer_pric: 'قیمت مشتری',
            repair_price: 'قیمت تعمیرگاه',
            actions: 'اقدامات'
          },
          sortable: ['id', 'special_name', 'general_name', 'category_id.name','service_id.name', 'customer_pric', 'repair_price'],
          filterable: ['special_name', 'general_name', 'category_id.name', 'service_id.name', 'customer_pric', 'repair_price'],
          pagination: {chunk: 10},
          initialPage: this.$route.query != undefined && this.$route.query.page != undefined && this.$route.query.page > 0 ? this.$route.query.page : 1,
          sortIcon: this.$store.state.tebleConfig.sortIcon,
          texts: this.$store.state.tebleConfig.texts,
          skin: this.$store.state.tebleConfig.skin,
          customSorting: {
            id: function (ascending) {
              return function (a, b) {
                if (ascending) {
                  return a.id >= b.id ? 1 : -1;
                }
                return a.id <= b.id ? 1 : -1;
              }
            },

            customer_pric: function (ascending) {
              return function (a, b) {
                if (ascending) {
                  return a.id >= b.id ? 1 : -1;
                }
                return a.id <= b.id ? 1 : -1;
              }
            },

            repair_price: function (ascending) {
              return function (a, b) {
                if (ascending) {
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
      this.fetchProductList();
    },

    methods: {
      deleteProduct(product) {
        let data = {
          product_id: product.id
        };
        this.askBeforeDelete(()=> {
          this.$http.delete('/products/', {data: data}).then((res) => {
            console.log(res);
            this.fetchProductList();
          }).catch((err) => {
            console.log(err);
            this.fetchProductList();
          })
        });

      },

      fetchProductList() {
        this.$http.get('/products/all/').then((res) => {
          this.data = res.data.result;
        }).catch((err) => {
          console.log(err);
        })
      },

      setPage(){
        this.$router.replace({ name: "product-list", query : {page: this.$refs.productsList.Page} })
      }
    },

  }
</script>

<style scoped>

</style>