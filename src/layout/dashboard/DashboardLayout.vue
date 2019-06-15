<template>
    <div class="wrapper">
        <side-bar>
            <template slot="links">
                <sidebar-link to="/dashboard" name="داشبورد" icon="ti-panel"></sidebar-link>
                <sidebar-link to="/users-list" name="لیست کاربران" icon="ti-user"></sidebar-link>
                <sidebar-link to="/experts" name="لیست متخصصین" icon="ti-medall"></sidebar-link>
                <sidebar-link to="/repair-shops" name="لیست تعمیرگاه ها" icon="ti-location-pin"></sidebar-link>
                <sidebar-link to="/slider" name="اسلایدر" icon="ti-image"></sidebar-link>
                <sidebar-link to="/about-us" name="درباره‌ی ما" icon="ti-info-alt"></sidebar-link>
                <sidebar-link to="/orders" name="سفارش‌ها" icon="ti-shopping-cart-full"></sidebar-link>
                <sidebar-link to="/discount" name="تخفیف" icon="ti-gift"></sidebar-link>
                <sidebar-link-group title="مدیربت پیام‌ها" icon="ti-comment-alt">
                    <template slot="subLink">
                        <sidebar-link to="/messages-group" name="گروه پیام‌ها" icon="ti-angle-double-left"></sidebar-link>
                        <sidebar-link to="/messages" name="پیام‌ها" icon="ti-angle-double-left"></sidebar-link>
                    </template>
                </sidebar-link-group>
                <sidebar-link-group title="مدیربت محصولات" icon="ti-package">
                    <template slot="subLink">
                        <sidebar-link to="/product-category-list" name="گروه کالایی" icon="ti-angle-double-left"></sidebar-link>
                        <sidebar-link to="/product-list" name="محصول‌ها" icon="ti-angle-double-left"></sidebar-link>
                    </template>
                </sidebar-link-group>
                <sidebar-link-group title="مدیریت سرویس‌ها" icon="ti-layers-alt" >
                    <template slot="subLink">
                        <sidebar-link to="/service-category-list" name="گروه سرویس" icon="ti-angle-double-left"></sidebar-link>
                        <sidebar-link to="/service-list" name="سرویس‌ها" icon="ti-angle-double-left"></sidebar-link>
                    </template>
                </sidebar-link-group>
                <sidebar-link-group title="مدیربت انبار" icon="ti-home">
                    <template slot="subLink">
                        <sidebar-link to="/store-list" name="انبارها" icon="ti-angle-double-left"></sidebar-link>
                        <sidebar-link to="/store-product" name="کالاهای انبار" icon="ti-angle-double-left"></sidebar-link>
                    </template>
                </sidebar-link-group>
                <sidebar-link-group title="مدیربت خودروها" icon="ti-car">
                    <template slot="subLink">
                        <sidebar-link to="/car-brand-list" name="برندها" icon="ti-angle-double-left"></sidebar-link>
                        <sidebar-link to="/cars-list" name="خودروها" icon="ti-angle-double-left"></sidebar-link>
                        <sidebar-link to="/car-group" name="گروه خودرو" icon="ti-angle-double-left"></sidebar-link>
                    </template>
                </sidebar-link-group>
            </template>
            <mobile-menu>
                <li class="nav-item">
                    <a class="nav-link">
                        <i class="ti-panel"></i>
                        <p>سفارش</p>
                    </a>
                </li>
                <drop-down class="nav-item"
                           title="5 Notifications"
                           title-classes="nav-link"
                           icon="ti-bell">
                    <a class="dropdown-item">Notification 1</a>
                    <a class="dropdown-item">Notification 2</a>
                    <a class="dropdown-item">Notification 3</a>
                    <a class="dropdown-item">Notification 4</a>
                    <a class="dropdown-item">Another notification</a>
                </drop-down>
                <li class="nav-item">
                    <a class="nav-link">
                        <i class="ti-settings"></i>
                        <p>Settings</p>
                    </a>
                </li>
                <li class="divider"></li>
            </mobile-menu>
        </side-bar>
        <div class="main-panel">
            <top-navbar></top-navbar>

            <dashboard-content @click.native="toggleSidebar">

            </dashboard-content>

            <content-footer></content-footer>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
    import TopNavbar from "./TopNavbar.vue";
    import ContentFooter from "./ContentFooter.vue";
    import DashboardContent from "./Content.vue";
    import MobileMenu from "./MobileMenu";

    export default {
        components: {
            TopNavbar,
            ContentFooter,
            DashboardContent,
            MobileMenu
        },


        data() {
          return {

          }
        },
        methods: {
            toggleSidebar() {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false);
                }
            }
        }
    };
</script>
