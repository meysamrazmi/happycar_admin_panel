<template>
    <card title="فاکتور">
        <div class="divider-border p-2 my-2 prod-border">
            <strong>
                تعویض روغن
            </strong>
            <span class="pr-4 pull-left">
                            ۱۲۰۰
                        </span>
        </div>
        <div class="divider-border p-2 my-2 prod-border">
            <strong>
                کارواش
            </strong>
            <span class="pr-4 pull-left ">
                            ۱۲۰۰
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
    </card>
</template>
<script>
    export default {
        name: 'factor'
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