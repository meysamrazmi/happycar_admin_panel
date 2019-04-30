<template>
    <div class="row">
        <!--<div class="col-md-12">-->
        <!--<user-card>-->

        <!--</user-card>-->
        <!--</div>-->

        <div class="col-md-3" v-if="unset"></div>
        <user-data v-if="!unset"></user-data>
        <user-config :unset="unset" :nextUrl="next"></user-config>
        <div class="col-md-3" v-if="unset"></div>

        <div class="col-12">
            <edit-all-users v-if="userRole === 'admin'"></edit-all-users>
        </div>
    </div>
</template>
<script>
    import UserData from './UserProfile/UserData';
    import UserConfig from './UserProfile/UserConfig'
    import EditAllUsers from './UserProfile/EditAllUsers'

    export default {
        name: "user-profile",
        components: {
            'user-data': UserData,
            'user-config': UserConfig,
            EditAllUsers
        },
        data() {
            return {
                unset: false,
                next: ''
            }
        },

        computed: {
          userRole() {
              return JSON.parse(localStorage.getItem('user')).role;
          }
        },

        created() {
            if (this.$route.query.config === "unset") {
                this.unset = true;
                this.next = this.$route.query.next;
            }
        },

    };
</script>
<style scoped>

</style>
