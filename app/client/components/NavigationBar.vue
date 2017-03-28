<template lang="pug">
div#navigation
    router-link(to="/hiragana") ひらがな
    router-link(to="/shortcuts") ShortCuts
</template>

<script>
export default {
  name: 'navigation-bar',
};
</script>

<style lang="stylus" scoped>
#navigation
  margin-top: 50px

a
  cursor: pointer
  text-decoration: none
  color: #333
  padding: 15px 25px
  border: solid 1px #666
  border-radius: 5px
  margin-right: 10px
</style>