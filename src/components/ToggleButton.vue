<template>
        <span class="toggle-wrapper" @click="toggle" role="checkbox" :aria-checked="value.toString()" tabindex="0" @keydown.space.prevent="toggle">
      <span class="toggle-background" :style="backgroundStyles"></span>
      <span class="toggle-indicator" :style="indicatorStyles"></span>
    </span>
</template>

<script>
    export default {
        name: "toggle-button",
        props: ['value'],
        methods: {
            toggle() {
                this.$emit('change');
                this.$emit('input', !this.value);
            }
        },
        computed: {
            backgroundStyles() {
                return {
                    backgroundColor: this.value ? '#0edc69' : '#dae1e7'
                }
            },
            indicatorStyles() {
                return { transform: this.value ? 'translateX(1rem)' : 'translateX(0)' }
            }
        }
    }
</script>

<style scoped>
    * { box-sizing: border-box }
    .toggle-wrapper {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 1rem;
        width: 2rem;
        border-radius: 9999px;
    }
    .toggle-wrapper:focus {
        outline: 0;
        box-shadow: 0 0 0 2px rgba(46, 255, 137, 1);
    }

    .toggle-background {
        display: inline-block;
        border-radius: 9999px;
        height: 100%;
        width: 100%;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        transition: background-color .2s ease;
    }

    .toggle-indicator {
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        height: 0.75rem;
        width: 0.75rem;
        background-color: #fff;
        border-radius: 9999px;
        box-shadow:  0 1px 2px rgba(0,0,0,0.1);
        transition: transform .2s ease;
    }
</style>