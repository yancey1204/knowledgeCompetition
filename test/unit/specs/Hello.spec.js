import Vue from 'vue';
// import QuestionArea from '../../app/client/components/QuestionArea';

describe('QuestionArea.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Hello),
    });
    expect(vm.$el.querySelector('h2').textContent)
      .to.equal('test');
  });
});
