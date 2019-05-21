<template>
    <div class="row ">
        <div class="col-md-6">
            <expert-card :user="user"></expert-card>
        </div>
        <div class="col-md-6">
            <card title="ویرایش متخصص">
                <label>
                    توانمندی‌ها
                </label>
                <div class="abilities mb-4">
                    <div class="row">
                        <div v-for="skill in skills" :key="skill.id" class="col-6">
                            <label :for="skill.id" class="checkbox-inline">
                                <input type="checkbox" :id="skill.id" :value="skill.id" v-model="expertSkills" />
                                {{ skill.name }}
                            </label>
                        </div>
                    </div>
                </div>
                <label>
                    مرتبه
                </label>
                <model-list-select :list="grades"
                                   v-model="expertGrade"
                                   option-value="title"
                                   data-vv-as="مرتبه"
                                   name="grade"
                                   option-text="title"
                                   v-validate="'required'"
                                   class="form-control-select mb-4"
                                   placeholder="مرتبه">
                </model-list-select>

                <div class="text-center">
                    <button class="btn-success btn">
                        ثبت
                    </button>
                </div>
            </card>
        </div>
        <div class="col-12">
            <expert-transactions></expert-transactions>
        </div>
    </div>
</template>
<script>
import ExpertCard from "./Users/ExpertCard";
import ExpertTransactions from "./Users/ExpertTransactions"
import { ModelListSelect } from 'vue-search-select';


export default {
  name: "user-profile",

  components: {
    ExpertCard,
    ExpertTransactions,
    ModelListSelect
  },

  data() {
    return {
      userId: "",
      user: {},
      grades: [],
      expertGrade: '',
      expertSkills: [],
      skills: []
    };
  },

  computed: {},

  mounted() {
    this.userId = this.$route.params.id;
    this.fetchExpertDetail();
    this.fetchGrade();
    this.fetchSkills();
  },

  methods: {
    fetchExpertDetail() {
      this.$http
        .get(`/profile/admin/expert/${this.userId}`)
        .then(res => {
          this.user = res.data;
          this.expertGrade = this.user.grade;
        })
        .catch(err => {
          console.log(err);
        });
    },

    fetchGrade() {
      this.$http.get('/profile/admin/grade/').then((res) => {
        this.grades = res.data
      }).catch((err) => {
        console.log(err)
      })
    },

    fetchSkills() {
      this.$http.get('/services/category/').then((res) => {
        this.skills = res.data.result
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>
<style scoped>


</style>
