<template>
    <div>
        <div class="row">
            <div class="col-sm-6">
                <detail-card></detail-card>
            </div>

            <div class="col-sm-6">
                <factor></factor>
            </div>
            <div class="col-12">
                <card class="location-height">
                    <l-map :zoom="zoom" :center="center">
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-marker :lat-lng="marker"></l-marker>
                    </l-map>
                </card>
            </div>

            <div class="col-sm-6">
                <card title="اطلاع به مشتری">
                    <textarea class="form-control mb-3"></textarea>
                    <div class="text-center">
                        <button class="btn btn-warning mx-1">
                            پیامک
                        </button>
                        <button class="btn btn-success mx-1">
                            نوتیفیکیشن
                        </button>
                    </div>
                </card>
            </div>
            <div class="col-sm-6">
                <card title="اطلاع به تعمیرکار">
                    <textarea class="form-control mb-3"></textarea>
                    <div class="text-center">
                        <button class="btn btn-warning mx-1">
                            پیامک
                        </button>
                        <button class="btn btn-success mx-1">
                            نوتیفیکیشن
                        </button>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script>
    import { ClientTable } from 'vue-tables-2';
    import Factor from './Order/Factor';
    import DetailCard from './Order/DetailCard';
    import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
    function getData() {
        return [];
    }


    export default {
        name: "order-detail",

        components:{
            ClientTable,
            Factor,
            DetailCard,
            LMap,
            LTileLayer,
            LMarker
        },

        data() {
            return {
                zoom:16,
                center:  L.latLng(35.6892, 51.3890),
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker:  L.latLng(35.6892, 51.3890),
            }
        },

        mounted() {
        },

        methods: {
        }


    }
</script>

<style scoped>
    .location-height {
        height: 500px;
    }
</style>