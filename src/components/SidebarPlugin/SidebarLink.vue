<template>
    <component :is="tag"
               @click.native="hideSidebar"
               class="nav-item"
               v-bind="$attrs"
               tag="li">
        <a class="nav-link">
            <slot>
                <i v-if="icon" :class="icon"></i>
                <p>{{name}}</p>
            </slot>
        </a>
    </component>
</template>
<script>
    export default {
        name: "sidebar-link",
        inheritAttrs: false,
        inject: {
            autoClose: {
                default: true
            },
            addLink: {
                default: () => {
                }
            },
            removeLink: {
                default: () => {
                }
            }
        },
        props: {
            name: String,
            icon: String,
            tag: {
                type: String,
                default: "router-link"
            }
        },
        methods: {
            hideSidebar() {
                if (this.autoClose) {
                    this.$sidebar.displaySidebar(false);
                }
            },
            isActive() {
                return this.$el.classList.contains("active");
            }
        },
        mounted() {
            if (this.addLink) {
                this.addLink(this);
            }
        },
        beforeDestroy() {
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el)
            }
            if (this.removeLink) {
                this.removeLink(this);
            }
        }
    };
</script>
<style>
    li.nav-item.router-link-exact-active.active::before {
        border-left: 17px solid #f4f3ef;
        border-top: 17px solid transparent;
        border-bottom: 17px solid transparent;
        content: "";
        display: inline-block;
        position: absolute;
        opacity: 1;
        top: 7px;
        left: 0px;
        transition: opacity .15s ease-in;

        display: none;
    }

    .nav-item {
        width: 100%;
        margin-left: 0px;
        position: relative;
    }

    .wrapper .sidebar .nav .nav-item .nav-link {
        padding: 10px 25px;
        margin: 0px;
        opacity: .7;
    }

    @media screen and (max-width: 991px) {
        li.nav-item.router-link-exact-active.active::before {
            display: none;
        }
    }
</style>
