<template>
  <div id="navigation">
    <div v-for="catalog in catalogMap">
      <catalog-link :catalog-route=catalog.route :catalog-name=catalog.name />
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch';
import CatalogLink from './catalogLink';

export default {
  name: 'navigation-bar',

  components: {
    CatalogLink,
  },

  data() {
    return {
      catalogMap: [],
    };
  },

  created() {
    const DATA_PATH = 'data/catalogMap.json';

    fetch(DATA_PATH, { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            this.catalogMap = data;
          });
        }
      });
  },
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