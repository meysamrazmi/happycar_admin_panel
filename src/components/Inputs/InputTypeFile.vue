<template>
    <div class="custom-file form-group">
      <slot name="label">
        <label v-if="label" class="" for="validatedCustomFile">
          {{label}}
        </label>
      </slot>
        <input type="file" class="custom-file-input" id="validatedCustomFile" required @change="convertToBase64">
        <div class="invalid-feedback">Example invalid custom file feedback</div>
    </div>
</template>
<script>
  import getBase64 from '../../common/base64';
    export default {
        props: ['label',],
      methods: {
        convertToBase64(e) {
          let promise = getBase64(e.target.files[0]);
          let self = this;
          promise.then(function(result) {
            //consoel.log(result);
            self.$emit('input', result);
          });
        }
      }
    }
</script>
<style scoped>
    .custom-file-input {
         position: relative;
         top: 0;
        right: 0;
        left: 0;
        z-index: 1;
        height: calc(2.25rem + 2px);
        padding: 0.375rem 0.75rem;
        line-height: 1.5;
        color: #9A9A9A;
        width: 100%;
        font-size: 15px;
        background-color: #e6e6e6;
         border: 0px;
        border-radius: 0.25rem;
      opacity: 1;
    }
    .custom-file-input::-webkit-file-upload-button {
      visibility: hidden;
    }
    .custom-file-input::after {
        position: absolute;
        top: 9px;
        bottom: 0;
        font-size: 15px;
        z-index: 3;
        display: block;
        height: auto;
        padding: 0;
        line-height: 1.5;
        color: #9A9A9A;
        content: "انتخاب فایل";
        background-color: #e9ecef00;
        border-left: 0px;
        border-radius: 0;

    }
    .custom-file-input{
        height: auto;
    }
    .custom-file{
        margin-bottom: 3rem;
    }
</style>
