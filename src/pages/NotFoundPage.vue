<template>
    <div class="contact-us full-screen">
        <nav class="navbar navbar-ct-default" role="navigation-demo">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <!--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">-->
                    <!--<span class="sr-only">Toggle navigation</span>-->
                    <!--<span class="icon-bar"></span>-->
                    <!--<span class="icon-bar"></span>-->
                    <!--<span class="icon-bar"></span>-->
                    <!--</button>-->
                    <router-link :to="{path:'/'}" class="navbar-brand">بازگشت به پنل</router-link>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="navigation-example-2">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <router-link :to="{path:'/'}">Home</router-link>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-->
        </nav>
        <div class="wrapper wrapper-full-page section content">
            <div class="">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6">

                            <div class="text-center">

                                <div class="m-auto">
                                    <img :src="image404" class="w-100 image mt-1"/>
                                    <h3>
                                        صفحه‌ی مورد نظر وجود ندارد.
                                    </h3>
                                    <p>
                                        درصورت وجود مشکل با پشتیبانی تماس بگیرید
                                    </p>
                                    <router-link :to="{path:'/'}" class="navbar-brand btn btn-default">بازگشت به پنل
                                    </router-link>
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
    import image404 from "../assets/img/404.png"

    export default {
        name: "AccessDenied",
        data() {
            return {
                image404,
            }
        }
    }
</script>

<style scoped>

</style>