<template>
    <div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="col-12">
                <card title="پیام‌ها" subTitle="جزییات پیام">
                    <div class="px-4">
                    <div class="row py-3 my-3 divider-border">
                        <div class=" col-sm-3">
                            <strong>
                            کاربر
                            </strong>
                        </div>
                        <div class=" col-sm-9">
                            {{ comment.user.name }}
                        </div>
                    </div>
                    <div class="row py-3 my-3 divider-border">
                        <div class=" col-sm-3">
                            <strong>
                                دسته
                            </strong>
                        </div>
                        <div class=" col-sm-9">
                            {{ comment.category.category }}
                        </div>
                    </div>
                    <div class="row py-3 my-3 divider-border">
                        <div class="col-sm-3">
                            <strong>
                            عنوان
                            </strong>
                        </div>
                        <div class="col-sm-9">
                            {{ comment.title}}
                        </div>
                    </div>
                    <div class="row py-3 my-3 divider-border">
                        <div class="col-sm-3">
                            <strong>
                                توضیحات
                            </strong>
                        </div>
                        <div class="col-sm-9">
                            {{ comment.description}}
                        </div>
                    </div>
                    </div>
                </card>
            </div>

        </div>
    </div>
</template>

<script>
    import { RHTTP } from '../../common/realTime-http';
    export default {
        name: "message",

        components: {

        },

        data() {
            return {
                comment: {}
            }
        },

        computed:{

        },

        mounted() {
            this.setMessageSeen();
            this.getMessageDetail();
            this.$store.dispatch('messages/getMessages');
        },

        methods: {
            setMessageSeen() {
                this.$http.patch('/contact_us/seen_message/', {message_id: this.$route.params.id}).then((res)=> {
                    console.log(res);
                }).catch((err)=> {
                    console.log(err);
                })
            },

            getMessageDetail() {
                this.$http.get(`/contact_us/message/${this.$route.params.id}/`).then((res)=> {
                    this.comment = res.data.result[0];
                }).catch((err)=> {
                    console.log(err)
                })
            }
        },

    }
</script>

<style>
    .divider-border {
        border-radius: 7px;
        background: #e2e2e0;
    }
</style>