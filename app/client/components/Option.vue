<template lang="jade">
button(@click="checkResult(option)") {{ getAnswer(option) | symbolFilter }}
</template>

<script>
export default {
  name: 'question-area',
}
</script>

<style lang="stylus" scoped>

</style>