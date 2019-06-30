<template>
  <m-modal v-show="show" @close="closeModal">
    <template slot="header">
      <span>افزودن محصول</span>
    </template>
    <template slot="body">
      <form @submit.prevent @keyup.enter="sendRequest">
        <div class="row">
          <div class="col-sm-12">
            <label>محصول:</label>
            <model-list-select :list="productsList"
                               v-model="selected"
                               option-value="id"
                               data-vv-as="محصول"
                               name="product_id"
                               :custom-text="Names"
                               v-validate="'required'"
                               class="form-control-select"
                               placeholder="محصول را انتخاب کنید">
            </model-list-select>
            <span class="error-loger">{{ errors.first('product_id') }}</span>
          </div>

          <div class="col-md-12">
            <fg-input type="number"
                      name="count"
                      label="تعداد"
                      placeholder="تعداد"
                      rules="required"
                      v-model="count"
                      data-vv-as="تعداد محصول"
                      v-validate="'required'"
                      :err="errors.first('count')"/>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="sendRequest">افزودن</p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </template>

  </m-modal>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select';

  export default {
    name: "add-product",
    components: {ModelListSelect},
    props: ['show', 'selectedProducts', 'products', 'store_id'],

    data() {
      return {
        selected: {},
        count: 0,
      }
    },
    computed:{
      productsList(){
        return this.products.filter(item => {
          return this.selectedProducts.indexOf(item.id) < 0
        })
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },

      sendRequest() {
        this.$validator.validateAll().then((res)=>{
          if(res){
            let data = {
              product_id: this.selected.id,
              count: this.count
            }
            this.$http.post(`/products/stock/${this.store_id}/`, data).then((res) => {
              this.$emit('update', this.selected.id)
              this.$swal({
                type: 'success',
                title: 'موفق',
                text: 'عملیات با موفقیت انجام شد'
              })
            }).catch((err) => {
              console.log(err);
            })
          }
        }).catch((err)=> {

        });
      },

      Names(item) {
        return `${item.special_name} - ${item.general_name} ( ${item.code} )`
      }
    },

    watch: {
      show(val) {
        if(val) {
          this.$validator.pause();
          this.errors.clear();
          this.$nextTick(() => {
            this.$validator.errors.clear();
            this.$validator.fields.items.forEach(field => field.reset());
            this.$validator.fields.items.forEach(field => this.errors.remove(field));
            this.$validator.resume();
          });
        }
      },
    }

  }
</script>

<style scoped>
  .backendError {
    padding-top: 10px;
    color: red;
  }

</style>
