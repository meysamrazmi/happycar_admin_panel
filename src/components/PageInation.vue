<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-if="pagination.current_page > 1">
                    <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click.prevent="changePage(pagination.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pagesNumber" :class="{'active': page == pagination.current_page}"><a class="page-link" href="javascript:void(0)" @click.prevent="changePage(page)">{{ page }}</a></li>
                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                    <a class="page-link" href="javascript:void(0)" aria-label="Next" @click.prevent="changePage(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    export default{
        props: {
            pagination: {
                type: Object,
                required: true
            },
            per_page: {
                type: Number,
                default: 4
            }
        },
        computed: {
            pagesNumber() {
                if (!this.pagination.to) {
                    return [];
                }
                let from = this.pagination.current_page - this.per_page;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.per_page * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page);
                }
                return pagesArray;
            }
        },
        methods : {
            changePage(page) {
                this.pagination.current_page = page;
                this.$emit('paginate');
            }
        }
    }
</script>
<style scoped>
    .page-item:first-child .page-link{
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        border-top-left-radius: 0rem;
        border-bottom-left-radius: 0rem;
    }
    .page-item:last-child .page-link {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0rem;
        border-bottom-right-radius: 0rem;
    }
    .page-link{
        color: #000000;
        border:0px;
    }
    .page-item.active .page-link{
        background-color: #5f5f5f;
        border-radius: 50%;
    }
    .page-item{
        margin: 0pc 5px;
    }
    .page-link:hover{
        border-radius: 50%;
    }
</style>