<template>
    <div class="sidebar"
         :data-background-color="backgroundColor"
         :data-active-color="activeColor">
        <!--
                Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
                Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
            -->
        <!-- -->

        <div class="logo">
            <a href="/" class="simple-text">
                <div class="logo-img">
                    <img :src="icon" alt="">
                </div>
                <div class="sidebar-appname-wrapper">
                    {{ $store.state.companyName.name }}
                </div>

            </a>
        </div>


        <div class="sidebar-wrapper" id="style-3">

            <user-profile></user-profile>
            <!--<slot>-->

            <!--</slot>-->
            <ul class="nav desktop-nav">
                <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
                <slot name="links">
                    <sidebar-link v-for="(link,index) in sidebarLinks"
                                  :key="index"
                                  :to="link.path"
                                  :name="link.name"
                                  :icon="link.icon">
                    </sidebar-link>
                </slot>
            </ul>
            <!-- <moving-arrow :move-y="arrowMovePx">

            </moving-arrow> -->
        </div>
    </div>
</template>
<script>
    import MovingArrow from "./MovingArrow.vue";
    import SidebarLink from "./SidebarLink";

    import icon from "../../assets/img/icon.png";

    export default {
        props: {
            title: {
                type: String,
                default: "شرکت مدیا همراه ارتباطات"
            },
            backgroundColor: {
                type: String,
                default: "black",
                validator: value => {
                    let acceptedValues = ["white", "black", "darkblue"];
                    return acceptedValues.indexOf(value) !== -1;
                }
            },
            activeColor: {
                type: String,
                default: "success",
                validator: value => {
                    let acceptedValues = [
                        "primary",
                        "info",
                        "success",
                        "warning",
                        "danger"
                    ];
                    return acceptedValues.indexOf(value) !== -1;
                }
            },
            sidebarLinks: {
                type: Array,
                default: () => []
            },
            autoClose: {
                type: Boolean,
                default: true
            }
        },
        provide() {
            return {
                autoClose: this.autoClose,
                addLink: this.addLink,
                removeLink: this.removeLink
            };
        },
        components: {
            MovingArrow,
            SidebarLink
        },
        computed: {
            /**
             * Styles to animate the arrow near the current active sidebar link
             * @returns {{transform: string}}
             */
            arrowMovePx() {
                return this.linkHeight * this.activeLinkIndex;
            }
        },
        data() {
            return {
                linkHeight: 65,
                activeLinkIndex: 0,
                windowWidth: 0,
                isWindows: false,
                hasAutoHeight: false,
                links: [],
                icon: icon,
            };
        },
        methods: {
            findActiveLink() {
                this.links.forEach((link, index) => {
                    if (link.isActive()) {
                        this.activeLinkIndex = index;
                    }
                });
            },
            addLink(link) {
                const index = this.$slots.links.indexOf(link.$vnode);
                this.links.splice(index, 0, link);
            },
            removeLink(link) {
                const index = this.links.indexOf(link);
                if (index > -1) {
                    this.links.splice(index, 1);
                }
            }
        },
        mounted() {
            this.$watch("$route", this.findActiveLink, {
                immediate: true
            });
        }
    };
</script>
<style scoped>
    .logo {
        z-index: 5;
        position: relative;
        box-shadow: inset 1px 0px 0px 0px #DDDDDD;
        width: 260px;
        margin: 0px !important;
        padding: 13px 20px !important;
        white-space: nowrap;
        overflow: hidden;
    }

    .nav-item {
        width: 100%;
        margin-left: 0px;
        position: relative;
    }

    .logo-img {
        margin-right: 5px !important;
        margin-left: 15px !important;
    }

    .logo-img img {
        max-width: 100% !important;
        border-radius: 40px;
    }

    /*li.nav-item.router-link-exact-active.active::before {*/
    /*border-left: 17px solid #f4f3ef;*/
    /*border-top: 17px solid transparent;*/
    /*border-bottom: 17px solid transparent;*/
    /*content: "";*/
    /*display: inline-block;*/
    /*position: absolute;*/
    /*opacity: 1;*/
    /*top: 15px;*/
    /*left: 0px;*/
    /*transition: opacity .15s ease-in;*/
    /*}*/
    .sidebar-wrapper ul.desktop-nav {
        padding-right: 0px;
        margin-left: 0px;
        width: 100%;
    }

    .sidebar-appname-wrapper {
        display: inline-block;
        /* white-space: nowrap;
        overflow: hidden; */
    }

    @media screen and (max-width: 991px) {
        li.nav-item.router-link-exact-active.active::before {
            display: none;
        }

        .logo {
            width: 230px;
        }
    }

</style>
