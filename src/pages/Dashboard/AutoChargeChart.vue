<template>
    <highcharts :options="chartOptions"></highcharts>
</template>

<script>
    import {Chart} from 'highcharts-vue'


    export default {
        comments: {
            Chart
        },
        props: {
            chartData: {}
        },
        data() {
            return {
                chartLabel: {
                    failed_autocharge: 'اتوشارژ ناموفق',
                    success_autocharge: 'اتوشارژ موفق'
                },
                chartOptions: {

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    enabled: true
                                }
                            }
                        }]
                    },
                    tooltip: {

                        useHTML: true,
                        shared: true,
                        split: true,
                        distance: 0,
                        headerFormat: '<span style="font-size: 16px; font-weight: 600;">{point.key}</span><br/>',
                        pointFormat: '<bdo><b>{point.y:.f}</b></bdo> :  {series.name}  <br/>',
                        style: {
                            fontSize: "13px"
                        }
                    },
                    chart: {
                        type: 'column',
                        height:'500px',
                        style: {
                            fontFamily: 'font-bmi'
                        }
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: 'تعداد'
                        },
                        labels: {
                            style: {
                                fontSize: "16px"
                            }
                        }

                    },
                    xAxis: {
                        labels: {
                            style: {
                                fontSize: "16px"
                            }
                        },
                        categories: []
                    },
                    series: []
                },
                title: ''
            }
        },
        mounted() {
            if (!(Object.keys(this.chartData).length === 0 && this.chartData.constructor === Object)) {
                this.chartOptions.xAxis.categories = Object.values(this.chartLabel);
                let dataset = [];

                if (this.chartData.datasets !== undefined && this.chartData.datasets.length !== 0) {
                    this.chartData.datasets.forEach((item) => {
                        let sortArr = Object.keys(this.chartLabel);
                        let data = [];
                        item.data.forEach((el, index) => {

                            data[sortArr.indexOf(this.chartData.label[index])] = el;

                        });
                        dataset.push({name: item.label, data})
                    });
                    this.chartOptions.series = dataset
                }

            }
        },
        methods: {

        },
        watch: {
            chartData: function (val) {

                if (!(Object.keys(val).length === 0 && val.constructor === Object)) {
                    this.chartOptions.xAxis.categories = Object.values(this.chartLabel);
                    let dataset = [];

                    if (val.datasets !== undefined && val.datasets.length !== 0) {
                        val.datasets.forEach((item) => {
                            let sortArr = Object.keys(this.chartLabel);
                            let data = [];
                            item.data.forEach((el, index) => {

                                data[sortArr.indexOf(val.label[index])] = el;

                            });
                            dataset.push({name: item.label, data})
                        });
                        this.chartOptions.series = dataset
                    }

                }
            },

            'chartOptions.xAxis.categories': function (val) {
                this.chartOptions.tooltip.split = (this.chartOptions.series.length < 6);
            }
        }
    }

</script>

<style scoped>


</style>