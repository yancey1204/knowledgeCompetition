<template lang="jade">
div.question-area
  h1 {{ getQuestion(questionPair) | symbolFilter }}
  ul
    li(v-for="(option, index) in options") 
      button(@click="checkResult(option)") {{ getAnswer(option) | symbolFilter }}
  div.footer
    button(@click="getNextQuestion") next
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
      isReversed: false,
    };
  },

  created() {
    this.indexes = this.getRandomIndexes();
    this.getNextQuestion();
  },

  methods: {
    getQuestion(questionPair) {
      return this.isReversed ? questionPair.answer : questionPair.question;
    },

    getAnswer(questionPair) {
      return this.isReversed ? questionPair.question : questionPair.answer;
    },

    checkResult(option) {
      if (this.getAnswer(option) === this.getAnswer(this.questionPair)) {
        alert('correct');
      } else {
        alert('wrong');
      }
    },

    getNextQuestion() {
      this.isReversed = Math.random() < 0.5;
      const questionPosition = this.indexes[this.tempIndex];
      this.questionPair = questionList[questionPosition];
      this.options = [];
      this.options.push(this.questionPair);

      for (let i = 0; i < this.indexes.length; i += 1) {
        if (this.options.length < 4 && questionPosition !== this.indexes[i]) {
          this.options.push(questionList[this.indexes[i]]);
        }
      }

      this.options = _.shuffle(this.options);
      this.getNextTempIndex();
    },

    getNextTempIndex() {
      if (this.tempIndex === this.indexes.length - 1) {
        this.tempIndex = 0;
        this.indexes = this.getRandomIndexes();
      } else {
        this.tempIndex += 1;
      }
    },

    getNewQuestionIndex() {
      this.indexes = this.getRandomIndexes();

      return _.head(this.indexes);
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
halfWidth = 500px

h1
  font-weight: normal
  display: inline-block

button
  border: none
  padding: 15px 25px
  text-decoration: none
  text-align: left
  display: inline-block
  font-size: fontSize
  font-weight: bolder

ul
  list-style: none
  width: fullWidth
  padding: 0
  
  li
    display: block
    margin-right: fontSize
    margin-bottom: 2 * fontSize
    width: halfWidth

    button
      background-color: #FFF
      width: fullWidth
      min-width: 200px
      box-shadow: 0 4px 6px rgba(50,50,93,.11),0 1px 3px rgba(0,0,0,.08)
      border-radius: 5px
      font-size: fontSize * 1.5

.footer
  position: relative;
  top: 150px;

  button
    background-color: #2c3e50
    color: white
</style>
