<template>
  <card title="تعمیرگاه تخصیص یافته" :subTitle="shop.available? 'فعال': 'غیر فعال'">
    <div class="row">

      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>نام</strong>
          <span class="pull-left">{{ shop.user.name }}</span>
        </div>
      </div>

      <div class="col-6">
        <div class="divider-border p-2 my-2">
          <strong>شماره</strong>
          <span class="pull-left">{{ shop.user.phone }}</span>
        </div>
      </div>

      <div class="col-12" v-if="shop.location" style="height: 200px;">
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :draggable="true" :lat-lng="marker"></l-marker>
        </l-map>
      </div>

    </div>
  </card>
</template>
<script>
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
  export default {
    name: "repair-shop",
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },

    props: {
      shop: {
        type: Object
      },
    },
    data(){
      return{
        zoom:14,
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      }
    },
    computed: {
      center() {
        return L.latLng(this.shop.location.latitude, this.shop.location.longitude)
      },
      marker() {
        return L.latLng(this.shop.location.latitude, this.shop.location.longitude)
      }
    },

  };
</script>
