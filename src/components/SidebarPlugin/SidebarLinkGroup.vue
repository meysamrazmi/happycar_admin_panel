<template>
    <div class="link-group-wrapper">
        <div class="title" @click="togglePanel">
            <i :class="icon"></i>
            <p>
                {{ title }}
            </p>
            <b class="caret"></b>
        </div>
        <transition name="fadeHeight">
            <div class="sub-links" v-show="open">
                <ul>
                    <slot name="subLink"></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SidebarLinkGroup",
        props: {
            title: String,
            icon: String
        },

        data() {
            return {
                open: false,
            }
        },

        methods: {
            togglePanel() {
                this.open = this.open ? false : true;
            }
        }
    }
</script>

<style scoped>
    .link-group-wrapper {
        width: 100%;

    }

    .title {
        display: inline-block;
        color: rgba(255, 255, 255, 0.75);
        padding: 10px 25px;
        width: 100%;
        position: relative;
        cursor: pointer;

    }

    .title:hover {
        color: #fff;
    }

    .title p {
        display: inline-block;
    }

    .sub-links {
        background-color: rgba(0, 0, 0, 0.34);
        /*box-shadow: inset 1px 0px 0px 0px #DDDDDD;*/
        width: 100%;

        overflow: hidden;
    }

    .sub-links > ul {
        width: 100%;
        margin: 0px;
    }

    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.8s;
        max-height: 900px;
    }

    .fadeHeight-enter,
    .fadeHeight-leave-to {
        opacity: 1;
        max-height: 0px;
    }

    .caret {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 4px dashed;
        border-top: 4px solid \9;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        position: absolute;
        top: 23px;
        left: 15px;
        color: rgba(255, 255, 255, 0.753);
    }



</style>
