<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{routeName}}</a>
            <button class="navbar-toggler navbar-burger"
                    type="button"
                    @click="toggleSidebar"
                    :aria-expanded="$sidebar.showSidebar"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
            </button>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="ti-shopping-cart"></i>
                            <p>سفارش</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="ti-comment"></i>
                            <p class="mr-badge">
                                {{ $store.state.messages.unreadMessages }}
                            </p>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" @click="logout">
                            <i class="fa fa-sign-out"></i>
                            <p>
                                خروج
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        computed: {
            routeName() {
                const {name} = this.$route;
                return this.capitalizeFirstLetter(name);
            }
        },
        data() {
            return {
                activeNotifications: false,
                messageInterval: ''
            };
        },

        mounted() {
            this.getMessages()
        },


        beforeDestroy () {
            clearInterval(this.messageInterval)
        },

        methods: {
            getMessages: function() {
                let dispatchGetMessage = ()=>{
                    this.$store.dispatch("messages/getMessages")
                };
                dispatchGetMessage();
                this.messageInterval = setInterval(dispatchGetMessage, 15000)
            },
            logout() {
                this.$store.dispatch('users/logout');
            },
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            toggleNotificationDropDown() {
                this.activeNotifications = !this.activeNotifications;
            },
            closeDropDown() {
                this.activeNotifications = false;
            },
            toggleSidebar() {
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
            },
            hideSidebar() {
                this.$sidebar.displaySidebar(false);
            }
        }
    };
</script>
<style scoped>
    .mr-badge {
        background-color: #4CD964;
        color: #fff;
        padding: 0 1rem;
        border-radius: 40px;
    }
</style>
