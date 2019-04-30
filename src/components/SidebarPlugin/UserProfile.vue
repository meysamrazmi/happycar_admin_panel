<template>
  <div class="user-profile-block">
    <div @click="togglePanel">
      <div class="photo">
        <img :src="avatar"/>
      </div>
      <div class="info">
            <span>
                {{ this.$store.state.users.client.name }}
            </span>

      </div>
      <b class="caret"></b>
    </div>
    <transition name="fadeHeight">
      <div class="user-profile-panel" v-show="showPanel">
        <ul>
          <sidebar-link to="/user-profile" name="پروفایل" icon="ti-user"></sidebar-link>
          <!--<sidebar-link to="" name="خروج" icon="fa fa-sign-out" @click="logout()"></sidebar-link>-->
          <li class="nav-item">
          <a class="nav-link" @click="logout()">

              <i class="fa fa-sign-out"></i>
              <p>خروج</p>

          </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
  import avatar from '../../assets/img/avatar-placeholder.png'

  export default {
    name: "user-profile",
    data() {
      return {
        showPanel: false,
        avatar,
      }
    },
    methods: {
      togglePanel() {
        this.showPanel = this.showPanel ? false : true;
      },
      logout() {
          this.$store.dispatch('users/logout');
      },
    }
  }
</script>
<style>
  .user-profile-block {
    text-align: right;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 0px 20px;
    padding: 13px 0px;
    cursor: pointer;
    /*width: 240px;*/
    margin-bottom: 10px;
  }

  .photo {
    width: 40px;
    height: 40px;
    overflow: hidden;
    margin-right: 5px;
    z-index: 5;
    border-radius: 50%;
    display: inline-block;
    margin-left: 15px;
  }

  .photo img {
    width: 100%;
  }

  .info {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.733);
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  .info:hover {
    color: #fff;
  }

  .info:hover ~ .caret {
    color: #fff;
  }

  .info span {
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  .user-profile-panel {
    width: 100%;
    overflow: hidden;

  }

  .user-profile-toggle-icon {
    float: left;
    padding-top: 19px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.753);
  }

  .user-profile-panel ul {
    color: rgba(255, 255, 255, 0.753);
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 0px;
  }

  .user-profile-panel ul li {
    list-style-type: none;
    padding: 10px 25px;
    font-weight: 100;
  }

  .user-profile-panel ul li:hover {
    color: #fff;
  }

  .user-profile-panel ul li span:first-child {
    display: inline-block;
    /*margin-left: 20px;*/
    font-size: 24px;
  }

  .user-profile-panel ul li span:nth-child(2) {
    font-size: 12px;
  }

  .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    position: absolute;
    top: 34px;
    left: 15px;
    color: rgba(255, 255, 255, 0.753);
  }

  .fadeHeight-enter-active,
  .fadeHeight-leave-active {
    transition: all 0.8s;
    max-height: 400px;
  }

  .fadeHeight-enter,
  .fadeHeight-leave-to {
    opacity: 1;
    max-height: 0px;
  }
  a.nav-link{
    color: rgba(255, 255, 255, 0.72);
  }
  a.nav-link:hover{
    color: #fff;
  }
  a.nav-link p {
    display: inline-block;
    margin-bottom: 0px;
    font-size: 12px;
    font-weight: 600;
  }

  a.nav-link i {
    float: right;
    margin-left: 15px;
    margin-right: 0px;
    font-size: 24px;
  }
  .nav-item.active > .nav-link {
    color: #41B883;
    opacity: 1;
  }

</style>
