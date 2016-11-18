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

  describe('getQuestion and getAnswer should return Q&A correctly for the flag isReversed', () => {
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

  describe('getClass should return correct class name with different state', () => {
    it('should return option if current answer is not the selected', () => {
      vm.currentOption = 1;

      const className = vm.getClass(0);

      expect(className).to.equal('option');
    });
  });
});
