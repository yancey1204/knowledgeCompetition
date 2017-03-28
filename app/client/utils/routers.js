const questionArea = require('../components/QuestionArea.vue');
const NavigationBar = require('../components/NavigationBar.vue');

module.exports = [
  {
    path: '/',
    component: questionArea,
  },
  {
    path: '/home',
    component: NavigationBar,
  },
  {
    path: '/hiragana',
    component: questionArea,
  },
  {
    path: '/shortcuts',
    component: questionArea,
  },
];
