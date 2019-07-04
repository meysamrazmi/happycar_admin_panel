<template>
    <div>

        <!--Stats cards-->
        <div class="row">
            <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
                <stats-card>
                    <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
                        <i :class="stats.icon"></i>
                    </div>
                    <div class="numbers" slot="content">
                        <p>{{stats.title}}</p>
                        <span class="statcard-subtitle">{{stats.subtitle}}</span>
                        {{stats.value}}
                    </div>
                    <div class="stats" slot="footer" style="font-size: 12px">
                        <i :class="stats.footerIcon"></i> {{stats.footerText}}
                    </div>
                </stats-card>
            </div>
        </div>

        <!--Charts-->
        <div class="row">

            <div class="col-12" style="width: 100%">
                <card title="اطلاعات نموداری امروز" :subTitle="chartSubTitle" style="position: relative;">
                    <!--<line-chart :data="chartData" style="position: relative;min-height: 600px;width: 100%" class="m-2"></line-chart>-->
                    <!--<chart-card  :chartData="chartData" style="direction: ltr"></chart-card>-->
                    <div class="row">
                        <div class="col-md-6">
                            <high-chart :chartData="chartData"></high-chart>

                        </div>
                        <div class="col-md-6">
                            <auto-charge-chart :chartData="chartData"></auto-charge-chart>
                        </div>
                    </div>

                </card>
            </div>

        </div>

        <div class="row">
            <div class="col-12">
                <card title="آخرین نوتیفیکیشن‌های ارسال شده">

                    <div class="row">
                        <div class="col-6">
                            <label>انتخاب سرویس</label>
                            <select v-model="collection" @change="fetchReports()">
                                <option v-for="collec in userCollections" :value="collec.name" :key="collec.name">
                                    {{ collec.show_name }} - {{ collec.sid }}
                                </option>
                            </select>
                        </div>
                        <div class="col-6 pt-3">
                            <router-link to="/log-reports" class="btn btn-primary pull-left text-white ">
                                <a class="text-white ">مشاهده‌ی کامل گزارش‌ها</a>
                            </router-link>
                        </div>
                        <div></div>
                    </div>
                    <div class="table-responsive my-1">
                        <div class="table-wrapper">
                            <table class="table table-bordered table-hover  report-table" >
                                <thead>
                                <tr>
                                    <th
                                            v-for="(columnName, column, index) in columns"
                                            :key="index">
                                        {{ columnName }}
                                    </th>
                                </tr>
                                </thead>
                                <tbody v-if="reports.length !== 0">
                                <tr v-for="(report, index) in reports" :key="report._id">
                                    <td>
                                        {{(index + 1) }}
                                    </td>
                                    <td>
                                        {{ report.msisdn }}
                                    </td>
                                    <td>
                                        {{report.channel}}
                                    </td>
                                    <td>
                                        {{ report.eventType }}
                                    </td>
                                    <!--<td>-->
                                    <!--{{ report.dateTime }}-->
                                    <!--</td>-->
                                    <td>
                                        {{ report.dateTime | moment("dddd,jDD jMMMM jYYYY HH:mm:ss") }}
                                    </td>
                                    <td>
                                        {{report.status}}
                                    </td>
                                    <td style="max-width: 200px">
                                        {{report.keyword}}
                                    </td>
                                </tr>
                                </tbody>
                                <tbody v-else>
                                <tr>
                                    <td colspan="8">
                                        <div class="alert alert-warning m-auto text-center">
                                            <strong>
                                                موردی یافت نشد
                                            </strong>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </card>
            </div>
        </div>

    </div>
</template>
<script>
    import {StatsCard,} from "@/components/index";
    import moment from 'jalali-moment';
    import HighChart from './Dashboard/HighChart';
    import AutoChargeChart from './Dashboard/AutoChargeChart'
    import Pushe from 'pushe-webpush'

    export default {
        components: {
            StatsCard,
            HighChart,
            AutoChargeChart
        },
        data() {
            return {
                statsCards: [
                    {
                        type: "success",
                        icon: "ti-check-box",
                        title: "عضویت",
                        subtitle: "امروز",
                        value: "0",
                        footerText: "به روز رسانی در :‌" + moment().locale('fa').format('jDD jMMMM jYYYY HH:mm'),
                        footerIcon: "ti-timer"
                    },
                    {
                        type: "danger",
                        icon: "ti-close",
                        title: "لغو عضویت",
                        subtitle: "امروز",
                        value: "0",
                        footerText: "به روز رسانی در :‌" + moment().locale('fa').format('jDD jMMMM jYYYY HH:mm'),
                        footerIcon: "ti-timer"
                    },
                    {
                        type: "info",
                        icon: "ti-target",
                        title: "اتوشارژ موفق",
                        subtitle: "امروز",
                        value: "0",
                        footerText: "به روز رسانی در :‌" + moment().locale('fa').format('jDD jMMMM jYYYY HH:mm'),
                        footerIcon: "ti-timer"
                    },
                    {
                        type: "warning",
                        icon: "ti-na",
                        title: "اتوشارژ ناموفق",
                        subtitle: "امروز",
                        value: "0",
                        footerText: "به روز رسانی در :‌" + moment().locale('fa').format('jDD jMMMM jYYYY HH:mm'),
                        footerIcon: "ti-timer"
                    }
                ],


                chartData: [],

                columns: {
                    index: 'ردیف',
                    phone: 'شماره',
                    channel: 'کانال',
                    eventType: 'نوع رویداد',
                    // time: 'زمان',
                    persianTime: 'تاریخ',
                    status: 'وضعیت',
                    keyword: 'کلمه کلیدی'

                },
                reports: [],
                userCollections: [],
                collection: ''
            };
        },

        mounted() {
          let options = {
            title: 'عضویت در وب پوش هپی کار',
            content: 'دریافت نوتیفیکیشن از سفارش های جدید',
          }
          Pushe.subscribe(options);
          Pushe.getDeviceId()
            .then((deviceId) => {
              console.log(`deviceId is: ${deviceId}`);
            });
          // this.getUserCollection();

        },
        computed: {
            chartSubTitle: function () {
                return this.chartData.datasets ? `اطلاعات نموداری برای ${this.chartData.datasets.length} سرویس فعال` : "هیچ سرویس فعالی وجود ندارد";
            }
        },

        created() {
            // this.fetchDashData();
        },

        methods: {
            getUserCollection() {
                this.$http.post("/user/getUserCollections", {user: JSON.parse(localStorage.getItem("user"))._id})
                    .then((res) => {
                        // alert("here")
                        this.userCollections = res.data.result.collections;
                        this.collection = this.userCollections[0].name;
                        this.fetchReports();
                    })
                    .catch((err) => {
                        //consoel.log(err);
                    })
            },

            fetchReports() {
                let data = {
                    sid: this.collection,
                    page: 1,
                    limit: 10,

                };

                this.$http.post('/report/log', data).then((res) => {
                    this.reports = res.data.result.data;

                    // console.log(res)
                }).catch((err) => {
                    // console.log(err)
                })
            },
            fetchDashData() {
                this.$http.post("/report/dashboard/chart", {user: JSON.parse(localStorage.getItem('user'))._id})
                    .then((res) => {
                        this.statsCards[0].value = res.data.result.result_count.sub;
                        this.statsCards[1].value = res.data.result.result_count.unsub;
                        this.statsCards[2].value = res.data.result.result_count.success_autocharge;
                        this.statsCards[3].value = res.data.result.result_count.failed_autocharge;

                        this.chartData = res.data.result.charts;
                        // console.log("Chart Data ",this.chartData);

                    })
                    .catch((err) => {
                    })
            }
        }
    };
</script>
<style>
    .statcard-subtitle {
        font-size: 12px;
        color: #5e5e5e;
        display: block;
    }
</style>
