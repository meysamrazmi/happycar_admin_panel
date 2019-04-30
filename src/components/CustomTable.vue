<template>
    <div>
    <table class="table" :class="tableClass">
        <thead>
        <th>ردیف</th>
        <slot name="columns">
            <th v-for="(columnName, column, index) in columns" :key="column">{{columnName}}</th>
        </slot>

        </thead>
        <tbody>
        <tr v-for="(item, index) in data" :key="index">
            <td>{{index+1}}</td>
            <slot :row="item">
                <td v-for="(columnName ,column , index) in columns"
                    :key="index"
                    v-if="hasValue(item, column)">
                    {{itemValue(item, column)}}
                </td>
            </slot>
        </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
    export default {
        name: 'custom-table',
        props: {
            columns: Object,
            data: Array,
            type: {
                type: String, // striped | hover
                default: "striped"
            },
            title: {
                type: String,
                default: ""
            },
            subTitle: {
                type: String,
                default: ""
            }
        },
        computed: {
            tableClass() {
                return `table-${this.type}`;
            }
        },
        methods: {
            hasValue(item, column) {
                return item[column.toLowerCase()] !== "undefined";
            },
            itemValue(item, column) {
                return item[column.toLowerCase()];
            }
        }
    };
</script>
<style scoped>
.mk-flex{
    display: flex;
}
.mk-actions a{
    margin-right: 12px;
    width: 15%;
}
.mk-actions a i{
    font-size: 16px;
}
.mk-green{
    color: #3fca3f;
}
.mk-red{
    color: #fb404b;
}
.mk-actions a:hover i{
    color: #000 !important;
}
</style>

