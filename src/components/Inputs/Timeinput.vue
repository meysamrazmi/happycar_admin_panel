<template>
    <div>
      <fg-input type="text"
                :label="label"
                :placeholder="placeholder"
                :id="id"
                v-model="date">
      </fg-input>
      <persian-date
        format="jYYYY/jMM/jDD"
        v-model="date"
        :editable="false"
        :color='color'
        :element="id"
      :show="show">
      </persian-date>
    </div>
</template>

<script>
    export default {
        name: "Timeinput",
        props: ['label', 'id', 'placeholder', 'value'],
        data() {
          return {
            date: '',
            color: "dimgray",
            show: true
          }
        },
    }
</script>

<style scoped>

</style>
