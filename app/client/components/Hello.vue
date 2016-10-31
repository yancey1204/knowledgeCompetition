<template lang="jade">
div.hello
  span Shortcut for 
  h1 {{ question }}
  ul
    li(v-for="option in options") 
      button {{ option.text }}
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      question: 'Search everywhere',
      options: [
        { text: 'cmd + A' },
        { text: 'double shift' },
        { text: 'cmd + F' },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
fontSize = 16px

h1
  font-weight: normal
  display: inline-block

ul
  list-style: none
  
  li
    display: inline-block
    margin: 0 fontSize

    button
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 10px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: fontSize;

</style>
