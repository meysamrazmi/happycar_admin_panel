<template>
    <div class="contact-us full-screen">
        <nav class="navbar navbar-ct-default" role="navigation-demo">
            <div class="container">
                <div class="navbar-header">
                    <router-link :to="{path:'/'}" class="navbar-brand">بازگشت به پنل</router-link>
                </div>
                <div class="collapse navbar-collapse" id="navigation-example-2">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <router-link :to="{path:'/'}">Home</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="wrapper wrapper-full-page section content">
            <div class="">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">

                            <div class="text-center">

                                <div class="m-auto">
                                    <img :src="image403" class="w-100 image mt-1"/>
                                    <h3>
                                        متاسفانه شما دسترسی مشاهده این قسمت را ندارید.
                                    </h3>
                                    <p>
                                        درصورت وجود مشکل با پشتیبانی تماس بگیرید
                                    </p>
                                    <router-link :to="{path:'/'}" class="navbar-brand btn btn-default">بازگشت به پنل</router-link>
                                </div>


                            </div>
                        </div>
                        <div class="col-sm-3"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>










</template>

<script>
    import image403 from "../assets/img/403.png"
    export default {
        name: "AccessDenied",
        data() {
            return {
                image403,
            }
        }
    }
</script>

<style scoped>

</style>