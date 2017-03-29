<template>
  <div id="catalog-link">
    <router-link :to="catalogRoute">
      {{ catalogName }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'catalog-link',

  props: ['catalogRoute', 'catalogName'],
};
</script>

<style lang="stylus" scoped>
#catalog-link
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