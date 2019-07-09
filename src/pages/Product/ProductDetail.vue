<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card title="محصول" :subTitle="subTitle">
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
            <div class="col-sm-4">
              <fg-input type="text"
                        name="special_name"
                        label="نام تخصصی"
                        placeholder="نام تخصصی"
                        rules="required"
                        v-model="product.special_name"
                        data-vv-as="نام تخصصی"
                        v-validate="'required'"
                        :err="errors.first('special_name')"
              >
              </fg-input>
            </div>
            <div class="col-sm-4">
              <fg-input type="text"
                        name="general_name"
                        label="نام عمومی"
                        placeholder="نام عمومی"
                        rules="required"
                        v-model="product.general_name"
                        data-vv-as="نام عمومی"
                        v-validate="'required'"
                        :err="errors.first('general_name')"
              >
              </fg-input>
            </div>
            <div class="col-sm-4">
              <fg-input type="text"
                        name="code"
                        label="کد محصول"
                        placeholder="code"
                        rules="required"
                        v-model="product.code"
                        data-vv-as="کد محصول"
                        :err="errors.first('code')"
                        style="direction: ltr;"
              >
              </fg-input>
            </div>
            <div class="col-sm-6">
              <label>
                گروه کالا
              </label>

              <model-list-select :list="productGroup"
                                 v-model="product.category_id"
                                 option-value="id"
                                 data-vv-as="گروه"
                                 name="category_id"
                                 option-text="name"
                                 v-validate="'required'"
                                 class="form-control-select"
                                 placeholder="گروه کالا را انتخاب کنید">
              </model-list-select>
              <span class="error-loger">
                              {{ errors.first('category_id') }}
                            </span>
            </div>

            <div class="col-sm-6">
              <label>
                سرویس
              </label>
              <model-list-select :list="serviceGroup"
                                 v-model="product.service_id"
                                 option-value="id"
                                 data-vv-as=" سرویس"
                                 name="service_id"
                                 option-text="name"
                                 v-validate="'required'"
                                 class="form-control-select"
                                 placeholder=" سرویس را انتخاب کنید">
              </model-list-select>
              <span class="error-loger">
                              {{ errors.first('service_id') }}
                            </span>
            </div>
            <div class="col-sm-6">
              <fg-input type="number"
                        name="customer_pric"
                        label="قیمت مشتری"
                        placeholder="قیمت مشتری"
                        v-model="product.customer_pric"
                        data-vv-as="قیمت مشتری"
                        v-validate="{required: true}"
                        :err="errors.first('customer_pric')"
              >
              </fg-input>
            </div>
            <div class="col-sm-6">
              <fg-input type="number"
                        name="repair_price"
                        label="قیمت تعمیرکار"
                        placeholder="قیمت تعمیرکار"
                        v-model="product.repair_price"
                        data-vv-as="قیمت تعمیرکار"
                        v-validate="{required: true}"
                        :err="errors.first('repair_price')"
              >
              </fg-input>
            </div>
            <div class="col-md-6">
              <div>
                <treeselect
                  :multiple="true"
                  :options="allCars"
                  placeholder="تگ محصولات براساس خودرو"
                  v-model="car_type_ids"
                  :normalizer="normalizer"
                  value-consists-of="LEAF_PRIORITY"
                >
                  <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
                </treeselect>
              </div>
            </div>
            <div class="col-md-6">
              <div>
                <treeselect
                  :multiple="true"
                  :options="groups"
                  placeholder="تگ محصولات براساس گروه خودرو"
                  v-model="car_group_ids"
                  :normalizer="normalizer"
                  value-consists-of="LEAF_PRIORITY"
                >
                </treeselect>
              </div>
            </div>
            <div class="col-12 text-center mt-3">
              <button class="btn btn-success" @click="sendProduct">
                ثبت
              </button>
            </div>
          </div>
        </card>
      </div>

    </div>
  </div>
</template>

<script>
  import { ModelListSelect } from "vue-search-select";
  import Treeselect from '@riophae/vue-treeselect';

  export default {
    name: "product-detail",
    components: {
      ModelListSelect,
      Treeselect
    },

    data() {
      return {
        cars: [],
        allCars: [],
        car_type_ids: [],
        car_group_ids: [],
        id: "",
        create: true,
        fetchedProduct: {},
        product: {
          category_id: "",
          service_id: "",
          special_name: "",
          general_name: "",
          code: "",
          image: "",
          description: "",
          customer_pric: undefined,
          repair_price: ""
        },
        imageFile: undefined,
        serviceGroup: [],
        productGroup: [],
        tags: [],
        groups: []
      };
    },
    computed: {
      subTitle() {
        if (this.create) {
          return "اضافه کردن محصول جدید";
        } else {
          return `بروز رسانی محصول ${this.fetchedProduct.special_name}`;
        }
      },

      imagePreview() {
        if (!this.product.image) {
          return "";
        } else {
          return `${this.$http.defaults.mediaUrl}${this.product.image}`;
        }
      },
    },

    watch: {
      cars: {
        handler: function(newValue) {
          let arr = newValue.filter(item => item.children.length)
          this.allCars = [{
            customLabel: "همه",
            id: "all",
            name: "انتخاب همه",
            children: arr
          }]
        },
        deep: true
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      if (this.$route.params.id) {
        this.create = false;
        this.fetchProduct();
      }
      this.fetchServiceList();
      this.fetchProductCategoryList();
      this.fetchCarsList();
      this.fetchGroups();
    },

    methods: {

      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },

      fetchProduct() {
        this.$http
          .get(`/products/${this.id}/`)
          .then(res => {
            console.log(res);
            this.product = res.data;
            this.fetchedProduct = Object.assign({}, res.data);
            this.car_type_ids = [ ...res.data.related_car_types ];
            this.car_group_ids = [ ...res.data.related_car_groups ]
          })
          .catch(err => {
            // console.log(err)
          });
      },

      fetchServiceList() {
        this.$http
          .get("/services/service/all/")
          .then(res => {
            this.serviceGroup = res.data.result;
          })
          .catch(err => {
            console.log(err);
          });
      },

      fetchGroups() {
        this.$http.get('/car/tags/').then(res => {
          this.groups = res.data;
        }).catch(err => {

        })
      },

      fetchProductCategoryList() {
        this.$http
          .get("/products/category/")
          .then(res => {
            this.productGroup = res.data.result;
          })
          .catch(err => {
            console.log(err);
          });
      },

      fetchCarsList() {
        this.$http.get("/car/").then(res => {
            this.cars = res.data;
            this.cars.forEach((brand) => {
              brand.id = `brand-${brand.id}`;
              brand.customLabel = `${brand.name}`;
              brand.children.forEach((model) => {
                model.id = `model-${model.id}`;
                model.customLabel = `${brand.name} / ${model.name}`;
                model.children.forEach((type) => {
                  type.customLabel = `${brand.name} / ${model.name} / ${type.name}`;
                })
              })
            })
          })
          .catch(err => console.log(err));
      },

      sendProduct() {
        if (this.create) {
          this.$validator.validateAll().then(res => {
            if (res) {
              if (this.imageFile === undefined) {
                this.$swal({
                  type: "warning",
                  title: "خطا",
                  text: "انتخاب عکس الزامی است"
                });
              } else {
                const productFormData = new FormData();
                productFormData.set("special_name", this.product.special_name);
                productFormData.set("general_name", this.product.general_name);
                productFormData.set("code", this.product.code);
                productFormData.set("customer_pric", String(this.product.customer_pric));
                productFormData.set("repair_price", String(this.product.repair_price));
                productFormData.set("category_id", this.product.category_id);
                productFormData.set("service_id", this.product.service_id);
                productFormData.append("image", this.imageFile);
                this.$http.post("/products/", productFormData).then(res => {
                    let data = {
                      product_id: res.data.result.id,
                      car_type_ids: this.car_type_ids,
                      car_group_ids: this.car_group_ids,
                    };
                    this.$http.post('/car/', data).then(res => {
                        this.$swal({
                          type: "success",
                          title: "موفق",
                          text: "عملیات با موفقیت انجام شد"
                        });
                        this.$router.push({ name: "product-list" });
                      })
                      .catch(err => {
                        this.$swal({
                          type: "warning",
                          title: "خطا",
                          text: "تگ محصولات آپدیت نشد.دوباره تلاش کنید"
                        });
                      });
                    this.$router.push({ name: "product-list" });
                  })
                  .catch(err => {
                    this.$swal({
                      type: "warning",
                      title: "خطا",
                      text: "دوباره تلاش کنید"
                    });
                  });
              }
            }
          });
        } else {
          const productFormData = new FormData();
          const productObjectKeys = Object.keys(this.fetchedProduct);
          productFormData.set("product_id", this.id);
          productObjectKeys.forEach(key => {
            if (this.product[key] !== this.fetchedProduct[key]) {
              productFormData.set(key, this.product[key]);
            }
          });
          productFormData.delete("image");
          if (this.imageFile !== undefined) {
            productFormData.append("image", this.imageFile);
          }

          this.$http.patch("/products/", productFormData).then(res => {
            let data = {
              product_id: this.id,
              car_type_ids: this.car_type_ids,
              car_group_ids: this.car_group_ids
            };
            this.$http.post('/car/', data).then(res => {
              this.$swal({
                type: "success",
                title: "موفق",
                text: "عملیات با موفقیت انجام شد"
              });
              this.fetchProduct();
            })
              .catch(err => {
                console.log(err)
                this.$swal({
                  type: "warning",
                  title: "خطا",
                  text: "تگ محصولات آپدیت نشد.دوباره تلاش کنید"
                });
              })
          })
          .catch(err => {
            console.log(err.response)
            let text= "دوباره تلاش کنید"
            if(err.response.status == 400 && err.response.data.code != undefined)
              text = "کد محصول تکراری است"
            this.$swal({
              type: "warning",
              title: "خطا",
              text: text
            });
          });
        }
      }
    }
  };
</script>

<style scoped>
</style>
