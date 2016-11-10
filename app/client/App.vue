<template lang="jade">
  div#app
    h1 shortcuts
    question-area
</template>

<script>
import QuestionArea from './components/QuestionArea';

export default {
  name: 'app',
  components: {
    QuestionArea,
  },
};
</script>

<style lang="stylus" scope>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: 90%
  margin: 0 auto
</style>
