<template>
    <m-modal v-show="showMe" @close="closeModal">
        <template slot="header">
        <span v-if="type === 'created'">
            اضافه کردن گروه جدید
        </span>
            <span v-else>
            به‌روز رسانی گروه
        </span>
        </template>
        <template slot="body">
            <form @submit.prevent @keyup.enter="sendRequest">
                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="text"
                                  name="name"
                                  label="نام گروه"
                                  placeholder="نام"
                                  rules="required"
                                  v-model="group.name"
                                  data-vv-as="نام گروه"
                                  v-validate="'required'"
                                  :err="errors.first('name')"
                        >
                        </fg-input>
                    </div>
                    <div class="col-12 mb-3">
                        <div>
                            <treeselect
                                    :multiple="true"
                                    :options="cars"
                                    placeholder="تگ محصولات براساس خودرو"
                                    v-model="group.cars"
                                    :normalizer="normalizer"
                                    value-consists-of="LEAF_PRIORITY"
                                    class=""
                                    v-validate="'required'"
                                    name="cars"
                                    data-vv-as="لیست خودرو"
                            >
                                <div slot="value-label" slot-scope="{ node }">{{ node.raw.customLabel }}</div>
                            </treeselect>
                            <span class="error-loger">{{errors.first('cars')}}</span>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round @click.native.prevent="sendRequest">
                        ارسال
                    </p-button>
                </div>
                <div class="clearfix"></div>
            </form>
        </template>

    </m-modal>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect';

  export default {
    name: "car-group-modal",

    props: {
      show: {
        type: Boolean
      },
      modalData: {
        type: Object,
        required: false,
      },
      type: {
        type: String
      }
    },

    components: {
      Treeselect
    },

    data() {
      return {
        showMe: false,
        cars: [],
        group: {
          name: '',
          cars: []
        }
      }
    },

    mounted() {
      this.fetchCarsList();
    },

    methods: {
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.children
        }
      },

      closeModal() {
        this.$emit('close');
        this.showMe = false;
        setTimeout(()=>{
          this.group = {
            name: '',
            cars: []
          }
        }, 300)
      },

      fetchCarsList() {
        this.$http
          .get("/car/")
          .then(res => {
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

      sendRequest() {
        this.$validator.validateAll().then((res)=>{
          if(res){
            if (this.type === "create") {
              this.$http.post('/car/tags/', this.group).then((res) => {
                this.$emit('updateParent');
                this.closeModal();
              }).catch((err) => {
                console.log(err);
              })
            } else if (this.type === "update") {
              this.$http.put(`/car/tags/${this.group.id}/`, this.group).then((res) => {
                this.$emit('updateParent');
                this.closeModal();
              }).catch((err) => {
                this.$swal({
                  type: 'warning',
                  title: 'خطا',
                  text: 'خطا دوباره تلاش کنید.'
                })
              })
            }
          }
        }).catch((err)=> {

        });
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
      type(val) {
        if(val === 'update'){
          this.group = Object.assign({}, this.modalData)
        }
      }
    }

  }
</script>

<style scoped>
    .backendError {
        padding-top: 10px;
        color: red;
    }
</style>
