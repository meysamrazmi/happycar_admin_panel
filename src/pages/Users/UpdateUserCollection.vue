<template>
    <m-modal v-show="showMe" @close="closeModal">
        <template slot="header">
            ویرایش نقش کاربر
            {{name}}

        </template>
        <template slot="body">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <label>نقش مورد نظر را انتخاب کنید</label>

                        <!--<option disabled selected>انتخاب کنید</option>-->
                        <checkbox-multi-select
                                :options="collections"
                                v-model="selected"
                                keyField=""
                                optionField=""
                        ></checkbox-multi-select>

                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round @click.native.prevent="updateUserCollection">
                        ویرایش
                    </p-button>
                </div>
                <div class="clearfix"></div>

            </form>
        </template>
    </m-modal>
</template>

<script>
    export default {
        name: "update-user-collection",
        props: {
            name: {
                type: String
            },
            id: {
                type: String
            },

            show: {
                type: Boolean
            }
        },
        data() {
            return {
                showMe: false,
                collections: [],
                selected: []
            }
        },

        methods: {

            closeModal() {
                this.$emit('close');
                this.showMe = false;
            },

            getCollectionsList() {
                this.$http.post('/collections-list').then((res) => {
                    //consoel.log(res);
                    this.collections = res.data.result.map((item) => item.collection_name);
                }).catch((err) => {
                    //consoel.log(err);
                })
            },

            getUserCollectionsList() {
                //consoel.log('user collection');
                this.$http.post('/user/getUserCollections', {user: this.id}).then((res) => {
                    if (res.data.result.collections !== null &&
                        res.data.result.collections !== undefined &&
                        res.data.result.collections !== []) {
                        this.selected = res.data.result.collections.map((item) => item.name);
                    }

                }).catch((err) => {
                    //consoel.log(err);
                })
            },
            updateUserCollection() {
                let collec = this.selected.map((item) =>{
                  return {name: item}
                });
                this.$http.post('/user/UpdateUserCollections', {
                    user: this.id,
                    collections: collec
                }).then((res) => {

                    //consoel.log(res);
                    this.closeModal();
                }).catch((err) => {
                    //consoel.log(err)
                })
            }
        },
        watch: {
            show(val) {
                this.showMe = val;
                if (val) {
                    this.getUserCollectionsList();
                    this.getCollectionsList();
                }
            }
        }
    }
</script>

<style scoped>

</style>
