<template lang="pug">
div#app
  router-view
</template>

<script>
import NavigationBar from './components/NavigationBar';
import QuestionArea from './components/QuestionArea';

export default {
  name: 'app',
  components: {
    NavigationBar,
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
