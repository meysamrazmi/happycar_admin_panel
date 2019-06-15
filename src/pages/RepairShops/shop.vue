<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="تعمیرگاه">
          <div class="row">
            <div class="col-12">
              <div v-for="(value, name) in shop" class="m-1">
                <label class="text-center p-1" style="width: 90px;background: #eee;border-radius: 3px;">{{name}}</label> :
                <span>{{value}}</span>
              </div>
            </div>
          </div>
        </card>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "RepairShop",
  props: ['id'],
  data(){
    return{
      shop: null,
    }
  },
  mounted() {
    this.$http.get(`/admin/repair_shop/${this.id}`).then((res)=> {
      console.log(res)
      this.shop = res.data
    }).catch((err)=> {
    })
  },
};
</script>