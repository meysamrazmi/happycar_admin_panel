<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card title=" سرویس" :subTitle="subTitle">
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
                        v-model="service.name"
                        data-vv-as="نام"
                        v-validate="'required'"
                        :err="errors.first('name')"
              >
              </fg-input>
            </div>
            <div class="col-sm-6">
              <fg-input type="number"
                        name="price"
                        label="قیمت(تومان)"
                        placeholder="قیمت"
                        v-model="service.price"
                        data-vv-as="قیمت"
                        v-validate="{required: true}"
                        :err="errors.first('price')"
              >
              </fg-input>
            </div>
            <div class="col-sm-6">
              <fg-input type="number"
                        name="time"
                        label="زمان تقریبی(دقیقه)"
                        placeholder="زمان تقریبی"
                        v-model="service.execution_time"
                        data-vv-as="زمان تقریتی"
                        v-validate="{required: true}"
                        :err="errors.first('time')">
              </fg-input>
            </div>
            <div class="col-sm-6">
              <label>
                گروه سرویس
              </label>
              <model-list-select :list="serviceGroup"
                                 v-model="service.category_id"
                                 option-value="id"
                                 data-vv-as="گروه"
                                 name="category_id"
                                 option-text="name"
                                 v-validate="'required'"
                                 class="form-control-select"
                                 placeholder="گروه را انتخاب کنید">
              </model-list-select>
              <span class="error-loger">
                              {{ errors.first('category_id') }}
                            </span>
            </div>
            <div class="col-6">
              <label class="d-block">
                توضیحات
              </label>
              <textarea name="description"
                        id="description"
                        data-vv-as="توضیحات"
                        v-validate="'required'"
                        :class="{ errorInput : errors.first('description') }"
                        class="form-control d-block w-100"
                        v-model="service.description">
                            </textarea>
              <span class="error-loger">
                              {{ errors.first('description') }}
                            </span>
            </div>
            <div class="col-md-6">
              <label class="d-block">گروه خودرو</label>
              <treeselect
                :multiple="true"
                :options="groups"
                placeholder="تگ محصولات براساس گروه خودرو"
                v-model="service.related_car_groups"
                :normalizer="normalizer"
                value-consists-of="LEAF_PRIORITY"
              />
            </div>

            <div class="col-12 text-center mt-3">
              <button class="btn btn-success" @click="sendService">ثبت</button>
            </div>
          </div>
        </card>
      </div>

    </div>
  </div>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select';
  import Treeselect from '@riophae/vue-treeselect';

  export default {
    name: "service-detail",
    components: {ModelListSelect, Treeselect},
    data() {
      return {
        id: '',
        create: true,
        fetchedService: {},
        service: {
          category_id: {
            name: '',
            id: ''
          },
          name: '',
          image: '',
          description: '',
          price: undefined,
          execution_time: undefined,
          related_car_groups: [],
        },
        imageFile: undefined,
        serviceGroup: [],
        groups: [],
      }
    },
    computed: {
      subTitle() {
        if (this.create) {
          return 'اضافه کردن سرویس جدید'
        } else {
          return `بروز رسانی سرویس ${this.fetchedService.name}`
        }
      },

      imagePreview() {
        if (!this.service.image) {
          return ''
        } else {
          return `${this.$http.defaults.mediaUrl}${this.service.image}`
        }
      }
    },

    mounted() {
      this.id = this.$route.params.id;
      if (this.$route.params.id) {
        this.create = false;
        this.fetchService();
      }
      this.fetchCategoryList()
      this.fetchGroups()
    },

    methods: {
      fetchService() {
        this.$http.get(`/services/service/all/`).then((res) => {
          let temp = undefined;

          if (res.data.result.length !== 0) {
            temp = res.data.result.filter(service => service.id == this.id)[0]
            console.log(temp)
            if(temp){
              this.fetchedService = Object.assign({}, temp);
              this.service = temp;
              this.service.category_id = temp.category_id.id;
              this.fetchedService.category_id = this.service.category_id;

              //handling selected car groups
              let selected = []
              Object.keys(temp.related_car_groups).map((key, index) => {
                selected.push(temp.related_car_groups[key].id)
              })
              this.service.related_car_groups = selected
            } else {
              this.$router.push('/404')
            }
          } else {
            this.$router.push('/404')
          }
        }).catch((err) => {
          // console.log(err)
        })
      },

      fetchCategoryList() {
        this.$http.get('/services/category/').then((res) => {
          this.serviceGroup = res.data.result;
        }).catch((err) => {
          console.log(err);
        })
      },

      fetchGroups() {
        this.$http.get('/car/tags/').then(res => {
          this.groups = res.data;
        }).catch(err => {

        })
      },

      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },

      sendService() {
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
                const serviceFormData = new FormData();
                serviceFormData.set('name', this.service.name);
                serviceFormData.set('price', String(this.service.price));
                serviceFormData.set('description', this.service.description);
                serviceFormData.set('name', this.service.name);
                serviceFormData.set('category_id', this.service.category_id.id);
                serviceFormData.set('execution_time', String(this.service.execution_time));
                serviceFormData.set('related_car_groups', this.service.related_car_groups[0]);
                serviceFormData.append('image', this.imageFile);
                this.$http.post('/services/service/', serviceFormData).then((res) => {
                  console.log(res)
                  if(this.service.related_car_groups.length > 1){
                    this.$http.patch('/services/service/', {
                      servise_id: res.data.data.id,
                      related_car_groups: this.service.related_car_groups
                    }).then((res)=> {
                      this.$swal({
                        type: 'success',
                        title: 'موفق',
                        text: 'عملیات با موفقیت انجام شد'
                      });
                      this.$router.push({name: 'service-list'});
                    })
                  }
                  else{
                    this.$swal({
                      type: 'success',
                      title: 'موفق',
                      text: 'عملیات با موفقیت انجام شد'
                    });
                    this.$router.push({name: 'service-list'});
                  }
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
          const serviceFormData = new FormData();
          const serviceObjectKeys = Object.keys(this.fetchedService);
          serviceFormData.set('servise_id', this.id);
          serviceObjectKeys.forEach((key) => {
            if (this.service[key] !== this.fetchedService[key]) {
              serviceFormData.set(key, this.service[key]);
            }
          });
          serviceFormData.delete('image');
          if(this.imageFile !== undefined) {
            serviceFormData.append('image', this.imageFile);
            this.$http.patch('/services/service/', serviceFormData).then((res)=> {}).catch((err)=> {})
          }
          let data = Object.assign({servise_id: this.id}, this.service)
          delete data.image
          console.log(data)
          this.$http.patch('/services/service/', data).then((res)=> {
            this.$swal({
              type: 'success',
              title: 'موفق',
              text: 'عملیات با موفقیت انجام شد'
            });
            this.$router.push({name: 'service-list'});
          }).catch((err)=> {
            this.$swal({
              type: 'warning',
              title: 'خطا',
              text: 'دوباره تلاش کنید'
            })
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>