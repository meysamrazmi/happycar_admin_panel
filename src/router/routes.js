import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import AccessDenied from "@/pages/AccessDenied";
// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import UserList from "@/pages/UserList.vue";

import CarBrandList from "@/pages/CarBrandList.vue";
import CarsList from "@/pages/CarsList.vue";
import CreateCar from "@/pages/Car/CreateCar.vue";
import EditCar from "@/pages/Car/EditCar.vue";

import Discount from "@/pages/Discount.vue";

import Experts from "@/pages/Experts.vue";
import ExpertProfile from "@/pages/ExpertProfile.vue";

import Messages from "@/pages/Messages.vue";
import MessagesGroup from "@/pages/MessagesGroup.vue";
import Message from "@/pages/Messages/Message.vue";

import Orders from "@/pages/Orders.vue";
import OrderDetail from '@/pages/OrderDetail.vue';

import ProductCategoryList from "@/pages/ProductCategoryList.vue";
import ProductList from "@/pages/ProductList.vue";
import ProductCategoryDetail from "@/pages/Product/ProductCategoryDetail.vue"
import ProductDetail from "@/pages/Product/ProductDetail.vue"

import ServiceCategoryList from "@/pages/ServiceCategoryList.vue";
import ServiceList from "@/pages/ServiceList.vue";
import ServiceCategoryDetail from "@/pages/Service/ServiceCategoryDetail.vue";
import ServiceDetail from "@/pages/Service/ServiceDetail.vue";

import Slider from "@/pages/Slider.vue";
import Slide from "@/pages/Slider/Slide.vue";

import StoreList from "@/pages/StoreList.vue";
import StoreProduct from "@/pages/StoreProduct.vue";
import StoreDetail from "@/pages/Stores/StoreDetail.vue";

import AboutUs from "@/pages/AboutUs.vue";
// Login Register
import login from "@/pages/login.vue";

const routes = [
    {
        path: "/login",
        component: login,
        name: login
    },
    {
        path: "/access-denied",
        component: AccessDenied,
        name: "access-denied",
        meta: {requiresAuth: false}
    },
    {
        path: "/",
        component: DashboardLayout,
        redirect: "/dashboard",
        meta: {requiresAuth: true},
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
                meta: {requiresAuth: true}
            },
            {
                path: "car-brand-list",
                name: "car-brand-list",
                component: CarBrandList
            },
            {
                path: "cars-list",
                name: "cars-list",
                component: CarsList
            },
            {
                path: "car",
                name: "create-car",
                component: CreateCar
            },
            {
                path: "car/:id",
                name: "edit-car",
                component: EditCar
            },
            {
                path: "discount",
                name: "discount",
                component: Discount
            },
            {
                path: "experts",
                name: "experts",
                component: Experts
            },
            {
                path: "expert-profile/:id",
                name: "expert-profile",
                component: ExpertProfile
            },
            {
                path: "messages",
                name: "messages",
                component: Messages,
            },
            {
                path: "messages-group",
                name: "messages-group",
                component: MessagesGroup,
            },
            {
                path: "message/:id",
                name: "single-message",
                component: Message,
            },
            {
                path: "orders",
                name: "orders",
                component: Orders,
            },
            {
                path: "order-detail/:id",
                name: "order-detail",
                component: OrderDetail,
            },
            {
                path: "product-category-list",
                name: "product-category-list",
                component: ProductCategoryList,
            },
            {
                path: "product-category-detail/:id?",
                name: "product-category-detail",
                component: ProductCategoryDetail,
            },
            {
                path: "product-list",
                name: "product-list",
                component: ProductList,
            },
            {
                path: "product-detail/:id?",
                name: "product-detail",
                component: ProductDetail,
            },
            {
                path: "service-category-list",
                name: "service-category-list",
                component: ServiceCategoryList,
            },
            {
                path: "service-category-detail/:id?",
                name: "service-category-detail",
                component: ServiceCategoryDetail
            },
            {
                path: "service-list",
                name: "service-list",
                component: ServiceList,
            },
            {
                path: "service-detail/:id?",
                name: "service-detail",
                component: ServiceDetail
            },
            {
                path: "slider",
                name: "slider",
                component: Slider,
            },
            {
                path: "about-us",
                name: "about-us",
                component: AboutUs,
            },
            {
                path: 'slide/:id?',
                name: 'slide',
                component: Slide
            },
            {
                path: "store-list",
                name: "store-list",
                component: StoreList,
            },
            {
                path: "store-detail",
                name: "store-detail",
                component: StoreDetail,
            },
            {
                path: "store-product",
                name: "store-product",
                component: StoreProduct,
            },
            {
                path: "users-list",
                name: "users-list",
                component: UserList,
            },
            {
                path: "user-profile/:id",
                name: "user-profile",
                component: UserProfile,
            }
        ]
    },
    {path: "*", component: NotFound}
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
