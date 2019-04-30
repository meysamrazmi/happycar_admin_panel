<template>
    <div>
        <div class="table-filter-wrapper">

            <div class="pb-1 pl-2 d-inline-block">
                جستجوی عبارت:
                <input class="table-search-input" type="text" v-model="search" placeholder="عبارت...">
            </div>
            <div class="d-inline-block">
                در ستون:‌
                <span>
                <select v-model="searchCol" class="table-search-select">
                    <option value="" disabled selected>انتخاب ستون</option>
                    <option v-for="(columnName, column, index) in columns"
                            :value="column"
                            v-if="!unSelectedCols.includes(column)">
                        {{columnName}}
                    </option>
                </select>
            </span>
            </div>


        </div>
    <div class="table-wrapper">
        <table class="table table-bordered table-hover  ">
            <thead>
            <tr>
                <th
                        v-for="(columnName, column, index) in columns"
                        :key="index">
                    {{ columnName }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in filteredUsersList">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user._id }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <toggle-button :value="!!user.is_active" :sync="true" :labels="true"
                                   @change="changeActivation(user._id)"/>
                </td>
                <td style="min-width: 110px">
                    <!--<a class="update-role-btn" v-if="user.role !== 'admin'"-->
                    <!--@click="showEditRoleModal(user.name, user.email, user.role)">-->
                    <!--ویرایش نقش کاربر-->
                    <!--</a>-->
                    <!--<a class="update-collection-btn" v-if="user.role !== 'admin'"-->
                    <!--@click="showEditCollectionModal(user.name, user._id)">-->
                    <!--ویرایش کالکشن‌های کاربر-->
                    <!--</a>-->
                    <drop-down class="actions"
                               title="گزینه‌ها"
                               title-classes="actions-title"
                    >
                        <a class="d-block p-2 action-options "
                           @click="showEditRoleModal(user.name, user.email, user.role)" >
                            ویرایش نقش کاربر
                        </a>
                        <a class="d-block p-2 action-options"
                           @click="showEditCollectionModal(user.name, user._id)">
                            ویرایش کالکشن‌های کاربر
                        </a>
                    </drop-down>
                </td>
            </tr>
            </tbody>
        </table>
        <update-user-role
                :show="editRoleModal.show"
                :name="editRoleModal.name"
                :preRole="editRoleModal.preRole"
                :email="editRoleModal.email"
                @close="editRoleModal = {name: '', email: '', show: false, preRole: ''}"
                @updateParent="update"
        ></update-user-role>
        <update-user-collection
                :show="editCollectionModal.show"
                :name="editCollectionModal.name"
                :id="editCollectionModal.id"
                @close="editCollectionModal = {name: '', id: '', show: false}"
        ></update-user-collection>
    </div>
    </div>
</template>

<script>
    import UpdateUserRole from './UpdateUserRole';
    import UpdateUserCollection from './UpdateUserCollection';

    export default {
        name: "user-list-table",
        components: {
            UpdateUserRole,
            UpdateUserCollection
        },
        props: {
            users: {
                type: Array
            }
        },
        data() {
            return {
                columns: {
                    index: 'ردیف',
                    name: 'نام',
                    email: 'ایمیل',
                    _id: 'آی‌دی',
                    role: 'نقش',
                    is_active: 'فعال',
                    actions: ''
                },
                editRoleModal: {
                    name: '',
                    email: '',
                    show: false,
                    preRole: ''
                },
                editCollectionModal: {
                    name: '',
                    id: '',
                    show: false,
                },
                search: '',
                searchCol: '',
                unSelectedCols: ['index', 'actions', 'is_active']
            }
        },
        computed: {
            filteredUsersList() {
                if (this.searchCol) {
                    let arr = [];
                    this.users.filter((item) => {
                        // console.log(item, item[this.searchCol].includes(this.search));
                        if (item[this.searchCol].includes(this.search)) {
                            arr.push(item)
                        }
                    });
                    return arr;
                } else {
                    return this.users
                }
            }
        },
        methods: {
            changeActivation(id) {
                this.$emit("loading");
                this.$http.post('/user/userActive', {id: id})
                    .then((response) => {
                        //consoel.log(response);
                        this.$emit("update");
                        this.$emit("endLoading");
                    }).catch((err) => {
                    //consoel.log(err);
                    this.$emit("update");
                    this.$emit("endLoading");

                })
            },
            showEditRoleModal(name, email, preRole) {
                //consoel.log(preRole);
                this.editRoleModal.name = name;
                this.editRoleModal.preRole = preRole;
                this.editRoleModal.email = email;
                this.editRoleModal.show = true;
            },
            showEditCollectionModal(name, id) {
                this.editCollectionModal.name = name;
                this.editCollectionModal.id = id;
                this.editCollectionModal.show = true;
            },
            update() {
                this.$emit('update');
            }
        }


    }
</script>

<style scoped>
    .table-wrapper {
        padding: 70px 20px;
    }

    .update-role-btn {
        padding: 8px;
        border-radius: 14px;
        background-color: #ffd700;
        display: inline-block;
    }

    .update-role-btn:hover {
        background-color: #9c8200;

    }

    .update-collection-btn {
        padding: 8px;
        border-radius: 14px;
        background-color: #ffd700;
        display: inline-block;
        margin-right: 10px;
    }

    .update-collection-btn:hover {
        background-color: #9c8200;

    }


</style>
