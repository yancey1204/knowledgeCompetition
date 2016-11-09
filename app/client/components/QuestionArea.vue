<template lang="jade">
div.question-area
  h1 {{ questionPair.question }}
  ul
    li(v-for="(option, index) in options") 
      button(@click="checkResult(option)") {{ option.answer | symbolFilter }}
</template>

<script>
import _ from 'lodash';
import questionList from '../services/questionList.json';
import * as utils from '../utils';

export default {
  name: 'question-area',

  data() {
    return {
      questionPair: {},
      tempIndex: 0,
      indexes: [],
      options: [],
    };
  },

  created() {
    this.getNewQuestionIndex();
    this.getNextQuestion();
  },

  methods: {
    checkResult(option) {
      if (option.answer === this.questionPair.answer) {
        this.getNextQuestion();
      } else {
        alert('wrong');
      }
    },

    getNextQuestion() {
      const questionPosition = this.indexes[this.tempIndex];
      this.questionPair = questionList[questionPosition];
      this.options = [];
      this.options.push({ answer: this.questionPair.answer });

      for (let i = 1; i < this.indexes.length; i += 1) {
        if (this.options.length < 4 && questionPosition !== this.indexes[i]) {
          this.options.push({ answer: questionList[this.indexes[i]].answer });
        }
      }

      this.options = _.shuffle(this.options);

      if (this.tempIndex === this.indexes.length - 1) {
        this.tempIndex = 0;
        this.getNewQuestionIndex();
      } else {
        this.tempIndex += 1;
      }
    },

    getNewQuestionIndex() {
      this.indexes = this.getRandomIndexes();

      return this.indexes[0];
    },

    getRandomIndexes() {
      const indexes = [];

      for (let i = 0; i < questionList.length; i += 1) {
        indexes.push(i);
      }

      return _.shuffle(indexes);
    },
  },

  filters: {
    symbolFilter(text) {
      return utils.filters.symbolFilter(text);
    },
  },
};
</script>

<style lang="stylus" scoped>
fontSize = 16px
fullWidth = 100%
quarterWidth = 20%

h1
  font-weight: normal
  display: inline-block

ul
  list-style: none
  width: fullWidth
  padding: 0
  
  li
    display: inline-block
    margin: 0 fontSize
    width: quarterWidth

    button
      background-color: #4CAF50
      border: none
      color: white
      padding: 15px 25px
      text-align: center
      text-decoration: none
      display: inline-block
      font-size: fontSize
      width: fullWidth
      min-width: 200px
</style>
