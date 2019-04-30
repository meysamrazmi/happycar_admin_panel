<template>
    <div class="ct-chart"></div>
</template>
<script>
    import Chartist from 'chartist'
    require('chartist-plugin-legend');
    require('chartist-plugin-tooltips');

    export default {
        name: 'chart-card',

        data() {
          return {
              chartLabel: {
                  sub: 'عضویت',
                  unsub: 'لغو عضویت',
                  failed_autocharge: 'اتوشارژ ناموفق',
                  success_autocharge: 'اتوشارژ موفق'
              }

          }
        },

        watch: {
            chartData: function (val) {
                // console.log("watch val", val);
                if (!(Object.keys(val).length === 0 && val.constructor === Object)) {
                    let series = [];
                    val.datasets.forEach((item) => {
                        let keys = Object.keys(this.chartLabel);

                        series.push({data: item.data, name: item.label});
                    });
                    // console.log("in chart", series, val.label);
                    this.makeChart(Object.values(this.chartLabel), series);


                }
            }
        },

        props: {
            chartData: {}
        },

        mounted() {

            if (!(Object.keys(this.chartData).length === 0 && this.chartData.constructor === Object)) {
                let series = [];
                this.chartData.datasets.forEach((item) => {
                    series.push({data: item.data, name: item.label});
                });
                // console.log("in chart", series, this.chartData.label);
                this.makeChart(Object.values(this.chartLabel), series);


            }
        },


        methods: {
            makeChart(labels, series) {
                var chart = new Chartist.Bar('.ct-chart', {
                    labels: labels,
                    series: series
                }, {
                    plugins: [
                        Chartist.plugins.legend({
                            className: 'crazyPink'
                        }),
                        Chartist.plugins.tooltip()
                    ]
                });

            }
        }
    }
</script>
<style >
    .crazyPink {
        margin: auto;
    }
    .crazyPink li {
        list-style: none;
        display: inline-block;
        padding: 0;
    }

    .ct-legend li:before {
        margin-top: 4px;
    }
    .ct-legend li {
        margin-left: 9px;
    }

    .chartist-tooltip {
        opacity: 0;
        position: absolute;
        margin: 0px;
        background: rgba(0, 0, 0, 0.8);
        color: #FFF;
        padding: 5px 10px;
        border-radius: 4px;
        z-index: 10;
    }

    .chartist-tooltip.tooltip-show {
        opacity: 1;
    }

    .ct-chart-bar .ct-label.ct-horizontal.ct-end {
        color: #000;
    }
    .ct-label.ct-vertical.ct-start {
        color: #000;
    }
</style>