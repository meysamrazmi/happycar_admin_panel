<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card title="محصولات این انبار">
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <v-client-table
                      ref="productsList"
                      :columns="columns"
                      :data="products"
                      :options="options"
                  >
                    <div slot="index" slot-scope="props">
                      {{props.index}}
                    </div>
                    <div slot="product.image" slot-scope="props">
                      <img v-if="props.row.product.image === null" :src="$store.state.placeholderImage"
                           class="mr-thumb" alt="">
                      <img v-else :src="`${$http.defaults.mediaUrl}${props.row.product.image}`"
                           class="mr-thumb" alt="">
                    </div>
                    <div slot="product.customer_pric" slot-scope="props">
                      {{props.row.product.customer_pric | currency}}
                    </div>
                    <div slot="product.repair_price" slot-scope="props">
                      {{props.row.product.repair_price | currency}}
                    </div>
                    <div slot="stock" slot-scope="props" style="text-align: center;min-width: 60px;">
                      {{props.row.count}}
                      <fg-input type="string" name="name" v-model="count[props.index]" style="width: 50px;margin: auto;"/>
                      <button class="ti-minus btn-outline-danger btn btn-xs btn-round p-2"
                              @click="deleteProduct(props.row, props.index)"
                              :disabled="!props.row.count"/>
                      <button class="ti-plus btn-outline-success btn btn-xs btn-round p-2" @click="saveCount(props.row, props.index)"></button>
                    </div>
                    <div slot="waitingTransfers" slot-scope="props">

                    </div>
                    <div slot="transfer" slot-scope="props">
                      <p-button class="pull-left" type="success" @click.native="openModal(props.row.product.id)">
                        درخواست کالا
                      </p-button>
                    </div>
                  </v-client-table>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
      <transfer-product :show="modal.show"
                        :product_id="modal.product_id"
                        :store_id="modal.store_id"
                        @close="modal.show=false">
      </transfer-product>

    </div>
  </div>
</template>

<script>
  import {ClientTable} from 'vue-tables-2'
  import TransferProduct from "./TransferProduct";

  export default {
    name: "product-list",
    components: {TransferProduct, ClientTable},
    props:["products", "storeId"],
    data() {
      return {
        columns: ['index', 'product.id', 'product.special_name', 'product.general_name', 'product.code',
          'product.image', 'product.category_id.name', 'product.service_id.name', 'product.customer_pric',
          'product.repair_price', 'stock', 'transfer'],
        data: [],
        options: {
          headings: {
            'product.special_name': 'نام تخصصی',
            'product.general_name': 'نام عمومی',
            'product.code': 'کد',
            'product.category_id.name': 'گروه',
            index: 'ردیف',
            'product.id': 'شناسه',
            'product.service_id.name': 'سرویس',
            'product.image': 'تصویر',
            'product.customer_pric': 'قیمت مشتری',
            'product.repair_price': 'قیمت تعمیرگاه',
            stock: 'موجودی',
            actions: 'اقدامات',
            transfer: 'درخواست انتقال'
          },
          pagination: {chunk: 25},
          texts: this.$store.state.tebleConfig.texts,
          skin: this.$store.state.tebleConfig.skin,
        },
        modal: {
          show: false,
          product_id: 0,
          store_id: 0,
        },
      }
    },
    computed: {
      count(){
        return this.products.map(i => 0)
      }
    },

    mounted() {
      // this.fetchProductList();
    },

    methods: {
      deleteProduct(model, index) {
        let data = {
          product_id: model.product.id,
          count: this.count[index] > model.count ? model.count : this.count[index]
        }
        this.askBeforeDelete(()=> {
          this.$http.put(`/products/stock/${this.storeId}/`, data).then((res) => {
            this.$emit('update', model.product.id)
          }).catch((err) => {
            console.log(err);
          })
        });
      },
      saveCount(model, index){
        let data = {
          product_id: model.product.id,
          count: this.count[index]
        }
        this.$http.post(`/products/stock/${this.storeId}/`, data).then((res) => {
          this.$emit('update', model.product.id)
        }).catch((err) => {
          console.log(err);
        })
      },
      openModal(product_id) {
        console.log(this.storeId)
        this.modal.show = true;
        this.modal.store_id = this.storeId;
        this.modal.product_id = product_id;
      },
    },

  }
</script>

<style scoped>

</style>