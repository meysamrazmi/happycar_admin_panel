const dateToPersian = {
  methods: {
    chengeTime(time) {
      return moment(time).format('jYYYY/jMM/jDD')
    },
  }
};

export default dateToPersian;