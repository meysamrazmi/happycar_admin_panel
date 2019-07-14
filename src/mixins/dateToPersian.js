import moment from "jalali-moment";
const dateToPersian = {
  methods: {
    changeTime: function (time) {
      return moment(time).format('jYYYY/jMM/jDD - HH:mm')
    },
    changeLoginTime(time) {
      return moment(time).format('jYYYY/jMM/jDD, h:mm a')
    },
  }
};

export default dateToPersian;