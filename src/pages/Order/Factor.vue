<template>
    <card title="فاکتور">
        <div class="divider-border p-2 my-2 prod-border" v-for="product in products">
            <strong>
                {{ product.product.special_name }} - {{ product.product.general_name }}
            </strong>
            <span class="pr-4 pull-left">
                {{ product.product.price | currency }} * {{ product.num_of_products }}
            </span>
        </div>
        <div class="divider-border p-2 my-2 prod-border" v-for="service in services">
            <strong>
                {{ service.name }}
            </strong>
            <span class="pr-4 pull-left ">
                {{ service.price | currency }}
            </span>
        </div>
        <div class="divider-border p-2 my-2 discount-border">
            <strong>
                تخفیف
            </strong>
            <span class="pr-4 pull-left">
                            ۱۲۰۰-
                        </span>
        </div>
        <hr>
        <div class="divider-border p-2 my-2">
            <strong>
                جمع کل
            </strong>
            <span class="pr-4 pull-left">
                ۳۴۰۰۰
            </span>
        </div>
        <div class="divider-border p-2 my-2">
            <strong>
                 زمان تخمینی
            </strong>
            <span class="pr-4 pull-left">
                ۲: ۳۴‍
            </span>
        </div>
    </card>
</template>
<script>
    export default {
        name: 'factor',

        props: {
          products: {
            type: Array
          },

          services: {
            type: Array
          }
        }
    }
</script>
<style scoped>
    .prod-border {
        background-color: #71f1873d;
    }
    .discount-border {
        background-color: #fd37371c;
    }
</style>