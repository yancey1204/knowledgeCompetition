<template lang="jade">
div.hello
  h1 {{ questionPair.question }}
  ul
    li(v-for="(option, index) in options") 
      button(@click="checkResult") {{ option.answer }}
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      questionPair: {
        question: 'Search everywhere',
        answer: 'double shift',
      },
      options: [
        { answer: 'cmd + A' },
        { answer: 'cmd + O' },
        { answer: 'cmd + F' },
      ],
    };
  },
  created() {
    this.options.push({ answer: this.questionPair.answer });
    this.shuffle(this.options);
  },
  methods: {
    checkResult(event) {
      const Selection = event.target.textContent;
      if (Selection === this.questionPair.answer) {
        alert('correct');
      } else {
        alert('wrong');
      }
    },
    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        /* eslint-disable */
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        /* eslint-enable */
      }

      return array;
    },
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
