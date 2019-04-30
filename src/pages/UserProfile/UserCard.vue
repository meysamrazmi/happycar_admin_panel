<template>
  <card class="card-user">
    <div slot="image">
      <img :src="this.$store.state.client.avatar" alt="...">
    </div>
    <div>
      <div class="author">
        <img class="avatar border-white" :src="this.$store.state.client.avatar" alt="...">
        <h4 class="title"> {{ this.$store.state.client.fname + " " + this.$store.state.client.lname}}
          <br>
          <a href="#">
            <small>{{this.$store.state.client.name}}</small>
          </a>
        </h4>
      </div>
    </div>
    <hr>
  </card>
</template>
<script>
  export default {}
</script>
<style scoped>
  .mk-smaller-font h5{
    font-size: 13px;
    font-weight: 100;
  }
</style>
