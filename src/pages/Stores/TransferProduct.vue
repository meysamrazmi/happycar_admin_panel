<template>
  <m-modal v-show="showMe" @close="closeModal">
    <template slot="header">
      <span>درخواست کالا از انبار های دیگر</span>
    </template>
    <template slot="body">
      <form @submit.prevent @keyup.enter="sendRequest">
        <div class="row">
          <div class="col-sm-12">
            <label>از انبار:</label>
            <model-list-select :list="stores"
                               v-model="selected"
                               option-value="id"
                               data-vv-as="انبار"
                               name="store_id"
                               :custom-text="Names"
                               v-validate="'required'"
                               class="form-control-select"
                               placeholder="انبار را انتخاب کنید">
            </model-list-select>
            <span class="error-loger">{{ errors.first('store_id') }}</span>
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
          <p-button type="info" round @click.native.prevent="sendRequest">ارسال</p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </template>

  </m-modal>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select';

  export default {
    name: "transfer-product",
    components: {
      ModelListSelect
    },
    props: ['show', 'product_id', 'store_id'],
    data() {
      return {
        showMe: false,
        stores: [],
        selected: '',
        count: 0
      }
    },

    methods: {
      closeModal() {
        this.$emit('close');
        this.showMe = false;
      },

      sendRequest() {
        this.$validator.validateAll().then((res)=>{
          if(res){
            let data = {
              product_id: this.product_id,
              store_id: this.selected,
              count: this.count
            };
            this.$http.post(`/products/stock_transfers/${this.store_id}/`, data).then((res) => {
              this.closeModal();
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
        return `${item.name} - ${item.count}`
      }
    },
    watch: {
      show(val) {
        this.showMe = val;
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

      product_id(val){
        this.$http.get(`/products/stock/products/${val}/`).then((res)=> {
          let arr = res.data.map(item => {
           return {
             id: item.store_id.id,
             name: item.store_id.name,
             count: item.count
           }
          })
          arr = arr.filter(item => item.id != this.store_id)
          this.stores = arr
        }).catch((err) => {
          console.log(err)
        })
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
