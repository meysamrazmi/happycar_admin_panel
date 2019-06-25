<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="تعمیرگاه">
          <div class="row">
            <div class="col-12">
              <label>کاربر</label>
              <div v-for="(value, name) in shop.user" class="m-1">
                <div v-if="['name', 'phone'].indexOf(name) > -1">
                  <label class="text-center p-1" style="width: 90px;background: #eee;border-radius: 3px;">{{name}}</label> :
                  <span>{{value}}</span>
                </div>
              </div>
            </div>

            <div class="col-12">
              <label style="vertical-align: bottom;margin: 5px 0 5px 20px;">فعال</label>
              <!--<textarea name="available"-->
                        <!--id="available"-->
                        <!--data-vv-as="فعال"-->
                        <!--v-validate="'required'"-->
                        <!--:class="{ errorInput : errors.first('available') }"-->
                        <!--class="form-control d-block w-100"-->
                        <!--v-model="shop.available" />-->
              <toggle-button :value="shop.available"
                             @change="shop.available = !shop.available"/>
              <span class="error-loger">{{ errors.first('available')}}</span>
            </div>

            <div class="col-12">
              <label class="d-block">آدرس</label>
              <textarea name="address"
                        id="address"
                        data-vv-as="آدرس"
                        v-validate="'required'"
                        :class="{ errorInput : errors.first('address') }"
                        class="form-control d-block w-100"
                        v-model="shop.address" />
              <span class="error-loger">{{ errors.first('address')}}</span>
            </div>
            <div class="col-12 map-wrapper my-5">
              <label>موقعیت مکانی</label>
              <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :draggable="true" :lat-lng="marker" @update:latLng="setLocation"></l-marker>
              </l-map>
            </div>

            <div class="col-12 text-center mt-3">
              <button class="btn btn-success" @click="saveShop"> ثبت</button>
            </div>

          </div>
        </card>
      </div>

    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: "RepairShop",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data(){
    return{
      id: '',
      shop: {
        address: '',
        longitude: '',
        latitude: '',
        available: false,
        user: {},
      },

      zoom:16,
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center:  L.latLng(35.6892, 51.3890),
      marker:  L.latLng(35.6892, 51.3890),

      originalShop: {},
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.loadShop()
  },

  methods:{
    loadShop() {
      this.$http.get(`/profile/admin/shop/?id=${this.id}`).then((res)=> {
        this.originalShop = Object.assign({}, res.data.data[0]);
        this.shop = res.data.data[0]
        this.center =  L.latLng(this.shop.latitude, this.shop.longitude);
        this.marker =  L.latLng(this.shop.latitude, this.shop.longitude);
      }).catch((err)=> {
        console.log(err)
      })
    },

    setLocation(location) {
      console.log(location);
      this.shop.latitude = location.lat;
      this.shop.longitude = location.lng;
    },

    saveShop(){
      const shopFormData = new FormData();
      shopFormData.set('id', this.id);
      Object.keys(this.shop).forEach((key) => {
        shopFormData.set(key, this.shop[key]);
      });

      console.log(shopFormData)
      this.$http.put(`/profile/admin/shop/?id=${this.id}`, shopFormData).then((res)=> {
        this.$swal({
          type: 'success',
          title: 'موفق',
          text: 'عملیات با موفقیت انجام شد'
        });
      }).catch((err)=> {
        console.log(err)
        this.$swal({
          type: 'warning',
          title: 'خطا',
          text: 'دوباره تلاش کنید'
        })
      })

    },
  },
};
</script>

<style scoped>
  .map-wrapper {
    height: 400px;
  }
</style>