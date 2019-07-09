<template>
    <m-modal v-show="showMe" @close="closeModal">
        <template slot="header">
        <span v-if="type === 'create'">
            اضافه کردن توضیحات
        </span>
            <span v-else>
            به‌روز رسانی توضیحات
        </span>
        </template>
        <template slot="body">
            <form @submit.prevent @keyup.enter="sendRequest">
                <div class="row">
                    <div class="col-md-12">
                        <fg-input type="text"
                                  name="name"
                                  label="نام"
                                  placeholder="نام"
                                  rules="required"
                                  v-model="description.name"
                                  data-vv-as="نام"
                                  v-validate="'required'"
                                  :err="errors.first('name')"
                        >
                        </fg-input>
                    </div>
                    <div class="col-12">
                        <label class="d-block">
                            توضیحات
                        </label>
                        <textarea name="description"
                                  id="description"
                                  data-vv-as="توضیحات"
                                  v-validate="'required'"
                                  placeholder="توضیحات"
                                  :class="{ errorInput : errors.first('description') }"
                                  class="form-control d-block w-100"
                                  v-model="description.description">
                            </textarea>
                        <span class="error-loger">
                              {{ errors.first('description') }}
                            </span>
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
    export default {
        name: "DescriptionDetail",

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

        data() {
            return {
                showMe: false,
                description: {
                    name: '',
                    description: '',
                    activeted: true
                }
            }
        },

        methods: {
            closeModal() {
                this.$emit('close');
                this.showMe = false;
                setTimeout(()=>{
                    this.description = {
                        name: '',
                        description: '',
                        activeted: true
                    };
                }, 400)
            },

            sendRequest() {
                this.$validator.validateAll().then((res)=>{
                    if(res){
                        if (this.type === "create") {
                            this.$http.post('/about_us/admin/description/', this.description).then((res) => {
                                console.log(res);
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err);
                            })
                        } else if (this.type === "update") {
                            this.description.description_id = this.description.id;
                            delete  this.description.id;
                            this.$http.patch('/about_us/admin/description/', this.description).then((res) => {
                                this.$emit('updateParent');
                                this.closeModal();
                            }).catch((err) => {
                                console.log(err)
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
            modalData(val) {
                if(val.name) {
                    this.description = val;
                }
            }
        }
    }
</script>

<style scoped>

</style>