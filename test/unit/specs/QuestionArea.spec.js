import Vue from 'vue';
import QuestionArea from '../../../app/client/components/QuestionArea';

describe('QuestionArea.vue', () => {
  let vm = null;

  beforeEach(() => {
    vm = new Vue(QuestionArea).$mount();
  });

  it('has a created hook', () => {
    expect(vm.getQuestion).to.be.a('function');
  });

  it('should fail for async function', () => {
    const testPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello!');
      }, 200);
    });

    return testPromise.then((result) => {
      expect(result).to.equal('Hello!');
    });
  });

  describe('should return Q&A correctly for the flag isReversed', () => {
    const questionPair = {
      question: 'question',
      answer: 'answer',
    };

    it('should return question when isReversed is false', () => {
      vm.isReversed = false;

      const result = vm.getQuestion(questionPair);

      expect(result).to.equal('question');
    });

    it('should return answer when isReversed is true', () => {
      vm.isReversed = true;

      const result = vm.getQuestion(questionPair);

      expect(result).to.equal('answer');
    });
  });
});
