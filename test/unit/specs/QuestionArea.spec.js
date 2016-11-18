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

    it('should return right when isReversed is false', () => {
      vm.isReversed = false;

      const question = vm.getQuestion(questionPair);
      const answer = vm.getAnswer(questionPair);

      expect(question).to.equal('question');
      expect(answer).to.equal('answer');
    });

    it('should return reversed result when isReversed is true', () => {
      vm.isReversed = true;

      const question = vm.getQuestion(questionPair);
      const answer = vm.getAnswer(questionPair);

      expect(question).to.equal('answer');
      expect(answer).to.equal('question');
    });
  });
});
