<template>
  <div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-12">
        <card title="متخصصین" subTitle="لیست متخصصین سیار">
          <div class="row">
            <div class="col-12">
              <div class="table-responsive">
                <div class="table-wrapper">
                  <v-client-table :columns="columns" :data="data" :options="options">
                    <div slot="user.date_joined" slot-scope="props">
                      {{ changeTime(props.row.user.date_joined) }}
                    </div>
                    <div slot="user.last_login" slot-scope="props">
                      {{props.row.user.last_login ? changeLoginTime(props.row.user.last_login) : ''}}
                    </div>
                    <div slot="user.active"
                         slot-scope="props"
                         @click="changeExpertStatus(props.row)"
                    >
                      <toggle-button :value="props.row.user.active" />
                    </div>
                    <div slot="image" slot-scope="props">
                      <img class="mr-thumb profile"
                           :src="`${$http.defaults.mediaUrl}${props.row.image}`"
                           v-if="props.row.image" alt="">
                      <img  :src="$store.state.placeholderImage"
                            class="mr-thumb profile" alt="" v-else>
                    </div>
                    <div slot="actions" slot-scope="props">
                      <router-link :to="{name: 'expert-profile', params:{id: props.row.id}}" class="text-white">
                                                <span class="ti-eye text-primary">
                                                </span>
                      </router-link>
                    </div>
                  </v-client-table>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>

    </div>
  </div>
</template>

<script>
  import { ClientTable } from 'vue-tables-2'

  export default {
    name: "experts",

    components:{
      ClientTable
    },

    data() {
      return {
        columns: ['id', 'user.name', 'image', 'user.phone', 'user.date_joined', 'user.last_login', 'user.active', 'actions'],
        data: [],
        options: {
          headings: {
            'user.name': 'نام',
            'user.phone': 'شماره',
            'user.active':  'وضعیت',
            id: 'شناسه',
            image: 'تصویر',
            'user.date_joined': 'تاریخ ثبت‌نام',
            'user.last_login': 'آخرین ورود',
            actions: 'اقدامات'
          },
          sortable: ['id', 'user.name', 'user.active', 'user.date_joined', 'user.last_login'],
          filterable: ['user.name', 'user.code'],
          pagination: {chunk: 10},
          sortIcon: this.$store.state.tebleConfig.sortIcon,
          texts: this.$store.state.tebleConfig.texts,
          skin: this.$store.state.tebleConfig.skin,
          customSorting: {
            id: function (ascending) {
              return function (a, b) {
                if (ascending) {
                  return a.id >= b.id ? 1 : -1;
                }
                return a.id <= b.id ? 1 : -1;
              }
            },
          }
        }
      }
    },

    mounted() {
      this.fetchExpertsList()
    },

    methods: {
      fetchExpertsList() {
        this.$http.get('/profile/admin/expert/').then((res)=> {
          this.data = res.data.data;
        }).catch((err)=> {
          console.log(err);
        })
      },

      changeExpertStatus(user) {
        this.$http.patch(`/admin/expert/${user.user.id}`).then((res)=> {
          console.log(res);
          this.fetchExpertsList();
        }).catch((err)=> {
          console.log(err);
          this.fetchExpertsList();
        })
      }
    }

  }
</script>

<style scoped>
  .profile {
    border-radius: 50%;
  }
</style>