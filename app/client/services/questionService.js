export function getQuestionList() {
  fetch('http://localhost:8080/#/app/client/data/questionList.json')
  .then((res) => {
    /*eslint-disable*/
    console.log(res.body);
    /*eslint-enable*/
    return res;
  });
}

export function createNewQuestion() {

}
