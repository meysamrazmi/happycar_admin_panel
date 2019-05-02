<template>
    <card class="card-user">
        <div slot="image">
            <img :src="profileBack" alt="">
        </div>
        <div>
            <div class="author">
                <img class="avatar border-white" :src="$store.state.placeholderImage" alt="...">
                <h4 class="title">
                    محمدرضا ابراهیمی
                    <br>
                    <a href="#">
                        <small>mr.ebrahimi@gmail.com</small>
                    </a>
                </h4>
            </div>
        </div>
        <hr>
        <div class="text-center">
            <div class="row my-4">
                <div class="col-12">
                    09393273599
                </div>
            </div>
        </div>
    </card>
</template>
<script>
    import profileBack from '@/assets/img/profileBack.jpg'
    export default {
        data() {
            return {
                profileBack,
            };
        },
        methods: {

        }
    };
</script>
<style>
</style>