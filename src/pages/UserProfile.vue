<template>
    <div class="row">
        <div class="col-md-6">
            <user-card></user-card>
        </div>
        <div class="col-md-6">
            <card title="ویرایش پروفایل">
                <fg-input type="text"
                          label="نام کاربری"
                          placeholder="نام کاربری"
                          >
                </fg-input>
                <fg-input type="text"
                          label="ایمیل"
                          placeholder="ایمیل"
                          >
                </fg-input>
                <fg-input type="text"
                          label="تلفن"
                          placeholder="تلفن"
                          >
                </fg-input>
                <div class="text-center">
                    <button class="btn-success btn">
                        ثبت
                    </button>
                </div>
            </card>
        </div>
        <div class="col-12">
            <card title="تراکنش‌ها">
                <div class="transaction-wrapper">
                    <!--<div class="d-flex justify-content-around divider-border py-2 my-3">-->
                        <!--<span>-->
                            <!--ردیف-->
                        <!--</span>-->
                        <!--<span>-->
                            <!--مقدار تراکنش-->
                        <!--</span>-->
                        <!--<span>-->
                            <!--زمان-->
                        <!--</span>-->
                        <!--<span>-->
                            <!--نوع-->
                        <!--</span>-->
                    <!--</div>-->
                    <div v-for="transaction in transactions"
                         :key="transaction.id"
                         :class="{'green-devider-border': transaction.type === 'in', 'red-devider-border': transaction.type === 'out'}"
                         class="d-flex justify-content-around divider-border py-2 my-3">
                        <span>
                            {{ transaction.id }}
                        </span>
                        <span>
                            {{ transaction.amount }}
                        </span>
                        <span>
                            {{ transaction.time }}
                        </span>
                        <span>
                            <span v-if="transaction.type === 'in'" class="ti-stats-up text-success"></span>
                            <span v-if="transaction.type === 'out'" class="ti-stats-down text-danger"></span>
                        </span>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>
<script>
    import UserCard from './Users/UserCard';

    let transactions = [
        {
            id: 1,
            type: 'in',
            amount: 1200000000,
            time: '1398/12/4'
        },
        {
            id: 2,
            type: 'out',
            amount: 2300,
            time: '1398/12/4'
        },
        {
            id: 4,
            type: 'out',
            amount: 2300,
            time: '1398/12/4'
        },
        {
            id: 6,
            type: 'out',
            amount: 2300,
            time: '1398/12/4'
        },
        {
            id: 5,
            type: 'in',
            amount: 12000,
            time: '1398/12/4'
        },
        {
            id: 3,
            type: 'in',
            amount: 12000,
            time: '1398/12/4'
        },

    ];

    export default {
        name: "user-profile",

        components: {
          UserCard
        },

        data() {
            return {
                transactions: transactions,
            }
        },

        computed: {
        },

        created() {

        },

    };
</script>
<style scoped>
    .green-devider-border {
        background-color: #d0ffd89e;
    }

    .red-devider-border {
        background-color: #ffc2c27d;
    }
</style>
