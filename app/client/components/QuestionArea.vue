<template lang="pug">
div.question-area
  router-link(to="/home") 
    icon(name="home", class="home-icon")
  h1 {{ getQuestion(questionPair) | symbolFilter }}
  ul#question-list
    li(v-for="(option, index) in options") 
      button(@click="checkResult(option)",:class="getClass(option)") {{ getAnswer(option) | symbolFilter }}
  div.footer
    button(@click="getNextQuestion") next
</template>

<script>
import Icon from 'vue-icon';
import 'whatwg-fetch';
import _ from 'lodash';
import * as utils from '../utils';

export default {
  name: 'question-area',

  components: {
    Icon,
  },

  data() {
    return {
      questionList: [],
      questionPair: {},
      currentOption: null,
      tempIndex: 0,
      indexes: [],
      options: [],
      isReversed: false,
    };
  },

  watch: {
    $route: 'fetchData',
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const catalog = this.$route.path;
      const DATA_PATH = `data/${catalog}.json`;

      fetch(DATA_PATH, { method: 'GET' })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              this.questionList = data;
              this.indexes = this.getRandomIndexes();
              this.getNextQuestion();
            });
          }
        });
    },
    getQuestion(questionPair) {
      return this.isReversed ? questionPair.answer : questionPair.question;
    },
    getAnswer(questionPair) {
      return this.isReversed ? questionPair.question : questionPair.answer;
    },
    getClass(option) {
      if (option !== this.currentOption) return 'option';

      const isCorrect = this.getAnswer(option) === this.getAnswer(this.questionPair);

      return isCorrect ? 'correct' : 'wrong';
    },
    checkResult(option) {
      this.currentOption = option;
    },
    getNextQuestion() {
      this.currentOption = null;
      this.isReversed = Math.random() < 0.5;
      const questionPosition = this.indexes[this.tempIndex];
      this.questionPair = this.questionList[questionPosition];
      this.options = [];
      this.options.push(this.questionPair);

      for (let i = 0; i < this.indexes.length; i += 1) {
        if (this.options.length < 4 && questionPosition !== this.indexes[i]) {
          this.options.push(this.questionList[this.indexes[i]]);
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

      for (let i = 0; i < this.questionList.length; i += 1) {
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

button
  border: none
  padding: 15px 25px
  text-decoration: none
  text-align: left
  display: inline-block
  font-size: fontSize
  font-weight: bolder
  cursor: pointer

.home-icon
  width: 32px
  fill: #666

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
      border-radius: 5px
      border: 1px solid rgba(50,50,93,0.3);
      font-size: fontSize * 1.5
      transition: all 0.5s ease

.footer
  position: relative;
  top: 150px;

  button
    background-color: #2c3e50
    color: white

button.correct
  background: #27ae60
  color: white

button.wrong
  background: #c0392b
  color: white
</style>
