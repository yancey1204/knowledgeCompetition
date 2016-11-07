<template lang="jade">
div.question-area
  h1 {{ questionPair.question }}
  ul
    li(v-for="(option, index) in options") 
      button(@click="checkResult(option)") {{ option.answer | symbolFilter }}
</template>

<script>
import questionList from '../services/questionList.json';
import shortcutMap from '../services/shortcutMap.json';

function shuffle(array) {
  const newArray = array.slice(0);
  let currentIndex = newArray.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

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

      this.options = shuffle(this.options);

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

      return shuffle(indexes);
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
