<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card title="انبار" :subTitle="subTitle">
          <div class="row mt-5 justify-content-center">
            <div class="col-md-6 m-2">
              <img-inputer
                v-model="imageFile"
                :img-src="imagePreview"
                placeholder="عکس را در این ناحیه قرار دهید یا کلیک کنید."
                theme="light"
                size="large"/>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-sm-6">
              <fg-input type="text"
                        name="name"
                        label="نام"
                        placeholder="نام"
                        rules="required"
                        v-model="store.name"
                        data-vv-as="نام"
                        v-validate="'required'"
                        :err="errors.first('name')"
              >
              </fg-input>
            </div>
            <div class="col-12">
              <label class="d-block">آدرس</label>
              <textarea name="address"
                        id="address"
                        data-vv-as="آدرس"
                        v-validate="'required'"
                        :class="{ errorInput : errors.first('address') }"
                        class="form-control d-block w-100"
                        v-model="store.address">
                            </textarea>
              <span class="error-loger">{{ errors.first('address')}}</span>
            </div>
            <div class="col-12 map-wrapper my-5">
              <label>موقعیت مکانی</label>
              <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :draggable="true" :lat-lng="marker" @update:latLng="setLocation"></l-marker>
              </l-map>
            </div>

            <div class="col-12 text-center mt-3">
              <button class="btn btn-success" @click="sendStore"> ثبت</button>
            </div>
          </div>
        </card>

        <div class="col-md-12">
          <card>
            <p-button class="mr-auto d-block mt-3"
                      type="success"
                      @click.native="modal.show = true"
                      style="margin-bottom: -50px;z-index: 10;position: relative;">افزودن کالا</p-button>
            <ProductList :products="selected" :storeId="id" @update="updateRow(id)"/>
          </card>
        </div>

        <div class="col-md-12">
          <card title="محصولات در انتظار انتقال">
            <v-client-table
              ref="pendingInventory"
              :columns="columns"
              :data="pendings"
              :options="options"
            >
              <div slot="new_inventory.product_id.image" slot-scope="props">
                <img v-if="props.row.new_inventory.product_id.image === null" :src="$store.state.placeholderImage" class="mr-thumb" alt="">
                <img v-else :src="`${$http.defaults.mediaUrl}${props.row.new_inventory.product_id.image}`" class="mr-thumb" alt="">
              </div>
              <div slot="actions" slot-scope="props">
                <button class="btn btn-success" @click="acceptTransfer(props.row.id)">تایید</button>
              </div>
            </v-client-table>
          </card>
        </div>

      </div>

      <add-product :show="modal.show"
                   :store_id="id"
                   :products="products"
                   :selectedProducts="selectedProducts"
                   @close="modal.show=false"
                   @update="updateRow(id)"/>

    </div>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  import Treeselect from '@riophae/vue-treeselect';
  import ProductList from '@/pages/Stores/ProductList.vue';
  import AddProduct from '@/pages/Stores/AddProduct.vue';

  export default {
    name: "store-detail",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      Treeselect,
      ProductList,
      AddProduct,
    },
    data() {
      return {
        zoom:16,
        center:  L.latLng(35.6892, 51.3890),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker:  L.latLng(35.6892, 51.3890),
        id: '',
        create: true,
        fetchedStore: {},
        store: {
          name: '',
          address: '',
          image: undefined,
          longitude: '',
          latitude: ''
        },
        imageFile: undefined,
        products: [],
        selectedProducts: [],
        storeProducts: [],
        modal: {
          show: false,
        },

        pendings: [],
        columns: ['id', 'new_inventory.product_id.id',
          'new_inventory.product_id.special_name',
          'new_inventory.product_id.general_name',
          'new_inventory.product_id.code',
          'new_inventory.product_id.image',
          'new_inventory.count', 'count', 'actions'],
        options: {
          headings: {
            'new_inventory.product_id.id': 'شناسه محصول',
            'new_inventory.product_id.special_name': 'نام تخصصی',
            'new_inventory.product_id.general_name': 'نام عمومی',
            'new_inventory.product_id.code': 'کد',
            'new_inventory.product_id.image': 'تصویر',
            'new_inventory.count': 'موجودی انبار مقصد',
            index: 'ردیف',
            'count': 'تعداد درخواستی',
            actions: 'اقدامات',
          },
          pagination: {chunk: 25},
          texts: this.$store.state.tebleConfig.texts,
          skin: this.$store.state.tebleConfig.skin,
        },
      }
    },
    computed: {
      subTitle() {
        if (this.create) {
          return 'اضافه کردن اسلاید جدید'
        } else {
          return `بروز رسانی اسلاید ${this.fetchedStore.name}`
        }
      },

      imagePreview() {
        if (this.create || this.store.image === undefined) {
          return ''
        } else {
          return `${this.$http.defaults.mediaUrl}${this.store.image}`
        }
      },

      selected(){
        return this.products
          .filter(item => this.selectedProducts.indexOf(item.id) > -1)
          .map(item => {return {product: item, count: this.filterCount(item.id)}});
      },

    },

    mounted() {
      this.id = this.$route.params.id;
      if (this.id) {
        this.create = false;
        this.fetchSlide()
      }
      this.fetchProductList()
      this.fetchStoreProducts()
      this.pendingRequests()
    },

    methods: {
      fetchSlide() {
        this.$http.get(`/products/store/`).then((res) => {
          let temp = undefined;
          if (res.data.result.length !== 0) {
            res.data.result.forEach((store)=> {
              if( parseInt(store.id) === parseInt(this.id))
                temp = store;
            });
            if(temp) {
              this.fetchedStore = Object.assign({}, temp);
              this.store = temp;
              this.center =  L.latLng(temp.latitude, temp.longitude);
              this.marker =  L.latLng(temp.latitude, temp.longitude);
            }else {
              this.$router.push('/404')
            }
          } else {
            this.$router.push('/404')
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      sendStore() {
        if (this.create) {
          this.$validator.validateAll().then((res)=> {
            if(res) {
              if(this.imageFile === undefined) {
                this.$swal({
                  type: 'warning',
                  title: 'خطا',
                  text: 'انتخاب عکس الزامی است'
                })
              }else {
                const storeFormData = new FormData();
                storeFormData.set('name', this.store.name);
                storeFormData.set('longitude', this.store.longitude);
                storeFormData.set('latitude', this.store.latitude);
                storeFormData.set('address', this.store.address);
                storeFormData.append('image', this.imageFile);
                this.$http.post('/products/store/', storeFormData).then((res) => {
                  this.$swal({
                    type: 'success',
                    title: 'موفق',
                    text: 'عملیات با موفقیت انجام شد'
                  });
                  this.$router.push({name: 'store-list'});
                }).catch((err) => {
                  this.$swal({
                    type: 'warning',
                    title: 'خطا',
                    text: 'دوباره تلاش کنید'
                  })
                })
              }
            }
          });


        } else {
          const storeFormData = new FormData();
          const storeObjectKeys = Object.keys(this.fetchedStore);
          storeFormData.set('store_id', this.$route.params.id);
          storeObjectKeys.forEach((key) => {
            if (this.store[key] !== this.fetchedStore[key]) {
              storeFormData.set(key, this.store[key]);
            }
          });
          storeFormData.delete('image');
          if(this.imageFile !== undefined) {
            storeFormData.append('image', this.imageFile);
          }

          this.$http.patch('/products/store/', storeFormData).then((res)=> {
            this.$swal({
              type: 'success',
              title: 'موفق',
              text: 'عملیات با موفقیت انجام شد'
            });
            this.$router.push({name: 'store-list'});
          }).catch((err)=> {
            this.$swal({
              type: 'warning',
              title: 'خطا',
              text: 'دوباره تلاش کنید'
            })
          })
        }
      },

      setLocation(location) {
        console.log(location);
        this.store.latitude = location.lat;
        this.store.longitude = location.lng;
      },

      fetchProductList() {
        this.$http.get('/products/all/').then((res) => {
          this.products = res.data.result;
        }).catch((err) => {
          console.log(err);
        })
      },

      fetchStoreProducts() {
        this.$http.get(`/products/stock/${this.id}/`).then((res) => {
          this.storeProducts = res.data
          this.selectedProducts = res.data.map(item => item.product_id.id);
        }).catch((err) => {
          console.log(err);
        })
      },

      normalizer(node) {
        return {
          id: node.id,
          label: node.special_name + " - " + node.general_name + " ( " + node.code + " )" ,
        }
      },

      filterCount(id){
        let product = this.storeProducts.filter(item => item.product_id.id == id)
        return product.length ? product[0].count : 0
      },

      updateRow(id){
        this.fetchStoreProducts()
      },

      pendingRequests(){
        this.$http.get(`/products/stock_transfers/${this.id}/`).then((res) => {
          this.pendings = res.data.data
        }).catch(error => {console.log(error)})
      },

      acceptTransfer(id){
        this.$http.put(`/products/stock_transfer/${id}/`).then((res) => {
          this.$swal({
            type: 'success',
            title: 'موفق',
            text: 'عملیات با موفقیت انجام شد'
          })
          this.pendingRequests()
        }).catch(error => {console.log(error)})
      }
    }
  }
</script>

<style scoped>
  .map-wrapper {
    height: 400px;
  }
</style>