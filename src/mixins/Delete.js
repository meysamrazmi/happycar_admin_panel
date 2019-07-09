const DeleteMixin = {
    methods: {
        askBeforeDelete: function (fn) {
            this.$swal({
                title: 'اطمینان دارید؟',
                text: "در صورت حذف شما قادر به بازگشت نیستید",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'بله مطمئنم',
                cancelButtonText: 'خیر'
            }).then((result) => {
                if (result.value) {
                    fn()
                }
            })
        }
    }
};

export default DeleteMixin;