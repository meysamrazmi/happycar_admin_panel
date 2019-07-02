<template>
    <card class="card-user">
        <div slot="image">
            <img :src="profileBack" alt="">
        </div>
        <div>
            <div class="author">
                <img :src="`$http.defaults.mediaUrl + user.image`" alt="" v-if="user.image !== null">
                <img class="avatar border-white" :src="$store.state.placeholderImage" alt="..." v-else>
                <h4 class="title" v-if="user.user != undefined">
                    {{ user.user.name }}
                    <br>
                    <a>
                        <small class="text-black-50">{{ user.user.phone }}</small>
                    </a>
                </h4>
            </div>
        </div>
        <hr>
        <div class="text-center">
            <div class="row my-4">
                <div class="col-4">
                    <div>
                        امتیاز
                    </div>
                    <div>
                        {{ user.score }}
                    </div>
                </div>
                <div class="col-4">
                    <div>
                        س. انجام شده
                    </div>
                    <div>
                        {{ user.num_of_completed_services }}
                    </div>
                </div>
                <div class="col-4">
                    <div>
                        مرتبه
                    </div>
                    <div>
                        {{ user.grade }}
                    </div>
                </div>
            </div>
        </div>
    </card>
</template>
<script>
  import profileBack from '@/assets/img/profileBack.jpg';

  export default {
    components: {
    },
    props: {
      user: {
        type: Object,
        default: function () {
          return {
            grade: '',
            user: {
              name: 'name',
              phone: 'phone'
            }
          }
        }
      }
    },

    data() {
      return {
        profileBack,
        expertGrade: 0,
        grades: []
      };
    },

    mounted() {
    },

    methods: {

    }
  };
</script>
<style>
</style>