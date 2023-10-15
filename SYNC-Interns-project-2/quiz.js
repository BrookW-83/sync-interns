const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "Which sentence contains a subject-verb agreement error?",
    answers: [
      { text: "The dog barks loudly at night.", "correct": false },
      { text: "The dogs bark loudly at night.", "correct": false },
      { text: "The dog and cat play in the yard.", "correct": false },
      { text: "The dog barking loudly at night.", "correct": true }
    ] 
  },

  {
  question: "Which sentence demonstrates correct comma usage?",
  answers: [
    { text: "I like to eat pizza and pasta.", "correct": true },
    { text: "I like to eat pizza, and pasta.", "correct": false },
    { text: "I like to eat pizza and, pasta.", "correct": false },
    { text: "I like to eat pizza, and, pasta.", "correct": false }
  ]
},

{
  question: "Choose the correct form of the verb to complete the sentence: She ________ a book when the phone rang.",
  answers: [
    { text: "reads", "correct": false },
    { text: "read", "correct": false },
    { text: "is reading", "correct": true },
    { text: "has read", "correct": false }
  ]
},

{
  question: "Identify the sentence with correct capitalization:",
  answers: [
    { text: "i love to go for a walk in the park.", "correct": false },
    { text: "I Love to go for a walk in the park.", "correct": false },
    { text: "I love to go for a walk in the park.", "correct": true },
    { text: "I love to go for a walk In the park.", "correct": false }
  ]
},

{
  question: "Choose the correct form of the verb to complete the sentence: They ________ to the movies last night.",
  answers: [
    { text: "goes", "correct": false },
    { text: "go", "correct": true },
    { text: "is going", "correct": false },
    { text: "have went", "correct": false }
  ]
},

{
  question: "Which sentence is grammatically incorrect?",
  answers: [
    { text: "The cat jumps over the fence.", "correct": false },
    { text: "She don't like coffee.", "correct": true },
    { text: "He plays the guitar beautifully.", "correct": false },
    { text: "I have seen that movie before.", "correct": false }
  ]
}

]