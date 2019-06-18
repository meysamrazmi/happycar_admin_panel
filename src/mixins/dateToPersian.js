import moment from "jalali-moment";
const dateToPersian = {
  methods: {
    changeTime: function (time) {
      return moment(time).format('jYYYY/jMM/jDD')
    },
  }
};

export default dateToPersian;