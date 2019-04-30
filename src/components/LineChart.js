import {Line} from 'vue-chartjs'

export default {
    extends: Line,
    props: ['data'],
    watch: {
        data: function (newValue, defValue) {
            this.data.labels = newValue.label;

            newValue.datasets.forEach((ele) => {
                ele.backgroundColor = this.getRandomColor(),
                    ele.pointRadius = 8,
                    ele.fill = true,
                    ele.borderWidth = 5
            })

            // console.log(newValue);
            this.render();
        }
    },
    mounted() {

        // this.render();
    },
    updated() {
        this.render()
    },
    methods: {
        getRandomColor() {
            let r = Math.floor(Math.random() * 255)
            let g = Math.floor(Math.random() * 255)
            let b = Math.floor(Math.random() * 255)
            let a = 0.5
            return `rgba(${r},${g},${b},${a})`
        },
        render: function () {
            this.renderChart(this.data,
                {

                    elements: {
                        line: {
                            backgroundColor: 'red'
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'top',
                        labels: {
                            fontSize: 16
                        }
                    },
                    tooltips: {
                        mode: 'index',
                        position: 'nearest',
                        titleFontSize: 20,
                        bodyFontSize: 18,
                        bodySpacing: 20
                    },
                    scales: {
                        yAxes: [{
                            labels: {
                                fontSize: 16
                            },
                            ticks: {
                                fontColor: 'rgba(0,0,0,0.5)',
                                fontStyle: 'bold',
                                beginAtZero: true,
                                maxTicksLimit: 5,
                                padding: 10
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'rgba(0,0,0,0.5)',
                                fontStyle: 'bold',
                                fontSize: 15,
                                padding: 10,
                                maxRotation: 0,
                                minRotation: 45
                            }
                        }]
                    }
                })
        }
    }
}
