<template>
    <div class="form-group" :class="{'input-group': hasIcon}">
        <slot name="label">
            <label v-if="label" class="control-label">
                {{label}}
            </label>
        </slot>
        <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-prepend">
        <i :class="addonLeftIcon" class="input-group-text"></i>
      </span>
        </slot>
        <input
                v-validate="rules"
                :value="value"
                :name="name"
                @input="$emit('input',$event.target.value)"
                v-bind="$attrs"
                class="form-control"
                aria-describedby="addon-right addon-left"
                :ref="reference"
                :class="{ errorInput : err }"
        >
        <span class="error-loger">
          {{ err }}
        </span>
        <slot></slot>
        <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-append">
        <i :class="addonRightIcon" class="input-group-text"></i>
      </span>
        </slot>
    </div>
</template>
<script>
    export default {
        inject: ['$validator'],
        inheritAttrs: false,
        name: "fg-input",
        props: {
            label: String,
            value: [String, Number],
            addonRightIcon: String,
            addonLeftIcon: String,
            rules: String,
            name: String,
            reference: String,
            err: String

        },
        computed: {
            hasIcon() {
                const {addonRight, addonLeft} = this.$slots;
                return addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined;
            }
        },


    }
</script>
<style>
    /*.errorInput {*/
        /*border: 1px solid red !important;*/
    /*}*/

    .error-loger {
        display: block;
        color: red;
        padding-top: 8px;
    }

</style>
