<template lang="jade">
div.hello
  h1 {{ questionPair.question }}
  ul
    li(v-for="(option, index) in options") 
      button(@click="checkResult") {{ option.answer | symbolFilter }}
</template>

<script>
import questionList from '../services/questionList.json';
import shortcutMap from '../services/shortcutMap.json';

export default {
  name: 'hello',

  data() {
    return {
      questionPair: {},
      questionPosition: 0,
      tempIndex: 1,
      indexes: [],
      history: [],
      options: [],
    };
  },

  created() {
    this.indexes = this.getRandomIndexes();
    this.questionPosition = this.indexes[0];
    this.questionPair = questionList[this.questionPosition];
    this.options.push({ answer: this.questionPair.answer });

    for (let i = 1; i < 4; i += 1) {
      this.options.push({ answer: questionList[this.indexes[i]].answer });
    }

    this.shuffle(this.options);
  },

  methods: {
    checkResult(event) {
      const Selection = event.target.textContent;
      if (Selection === this.questionPair.answer) {
        alert('correct');
        this.history.push(this.questionPosition);
        this.getNextQuestion();
      } else {
        alert('wrong');
      }
    },

    getNextQuestion() {
      this.questionPosition = this.indexes[this.tempIndex];
      this.questionPair = questionList[this.questionPosition];
      this.options = [];
      this.options.push({ answer: this.questionPair.answer });

      for (let i = 1; i < this.indexes.length; i += 1) {
        if (this.options.length < 4 && this.questionPosition !== this.indexes[i]) {
          this.options.push({ answer: questionList[this.indexes[i]].answer });
        }
      }

      this.shuffle(this.options);

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

    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        /*eslint-disable*/
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        /*eslint-enable*/
      }

      return array;
    },

    getRandomIndexes() {
      this.indexes = [];

      for (let i = 0; i < questionList.length; i += 1) {
        this.indexes.push(i);
      }

      return this.shuffle(this.indexes);
    },
  },

  filters: {
    symbolFilter(text) {
      const textArray = text.split(' ');
      const returnArray = [];
      let tempText;

      textArray.forEach((aText) => {
        tempText = shortcutMap[aText] || aText;
        returnArray.push(tempText);
      });

      return returnArray.join(' ');
    },
  },
};
</script>

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
