<template>
    <s-modal v-show="showMe" @close="closeModal">
        <template slot="header">
            ویرایش نقش کاربر
            {{name}}
        </template>
        <template slot="body">
            <form @submit.prevent>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <label>نقش مورد نظر را انتخاب کنید</label>
                        <select class=" mb-4 mt-2" v-model="selectedRole">
                            <!--<option disabled selected>انتخاب کنید</option>-->
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{role.id}}</option>
                        </select>
                    </div>
                </div>
                <div class="text-center">
                    <p-button type="info"
                              round @click.native.prevent="updateUserRole">
                        ویرایش
                    </p-button>
                </div>
                <div class="clearfix"></div>

            </form>
        </template>
    </s-modal>
</template>

<script>
    export default {
        name: "update-user-role",
        props: {
            name: {
                type: String
            },
            email: {
                type: String
            },
            preRole: {
                type: String
            },
            show: {
                type: Boolean
            }
        },
        data() {
            return {
                showMe: false,
                roles: [],
                selectedRole: this.preRole
            }
        },

        created() {
            this.getRolesList();
        },

        methods: {
            closeModal() {
                this.$emit('close');
                this.showMe = false;
            },
            getRolesList() {
                this.$http.post('/role/list').then((res) => {
                    //consoel.log(res);
                    this.roles = res.data.result;
                }).catch((err) => {
                    //consoel.log(err);
                })
            },
            updateUserRole() {
                this.$http.post('/role/update-role', {
                    email: this.email,
                    user_role: this.selectedRole
                }).then((res) => {
                    //consoel.log(res);
                    this.$emit('updateParent');
                    this.closeModal();
                }).catch((err) => {
                    //consoel.log(err)
                })
            }
        },
        watch: {
            show(val) {
                this.showMe = val;
            },
            preRole(val) {
                this.selectedRole = val;
            }
        }
    }
</script>

<style scoped>

</style>
