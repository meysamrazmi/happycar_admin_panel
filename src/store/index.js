import Vue from 'vue';
import Vuex from 'vuex';
import users from './users';
import messages from './messages';
import services from './services';
import placeholderImage from '../assets/img/image-placeholder-square.png';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        messages,
        services
    },
    state: {
        placeholderImage: placeholderImage,
        tebleConfig: {
            sortIcon: {
                base:'ti',
                up:'ti-angle-up text-success p-1',
                down:'ti-angle-down text-warning p-1',
                is:'ti-arrows-vertical text-primary p-1',
            },
            texts:{
                count:"نمایش  {from} تا {to} از  {count}  رکورد|{count} رکورد| یک رکورد",
                first:'اولین',
                last:'آخرین',
                filter:"فیلتر:",
                filterPlaceholder:"جستجو..",
                limit:"تعداد رکورد در صفحه:",
                page:"صفحه:",
                noResults:"هیج آیتمی یافت نشد",
                filterBy:"فیلتر با {column}",
                loading:'بارگزاری...',
                defaultOption:'انتخاب {column}',
                columns:'ستون‌ها'
            },
            skin: 'table table-bordered table-hover'
        },
        companyName: {
            name: 'کارفیکس',
            link: 'carfix.com'
        }
    }
})
