const quizData = [
    {
      question: 'what does HTML stands for?',
      options: ['Hyper tag markup language', 'Hyper text markup language', 'Hyperlinks tag markup language', 'Hyperlinking tag markup language'],
      answer: 'Hyper text markup language',
    },
    {
      question: 'Choose the correct HTML tag for the largest heading',
      options: ['"heading/"', '"h6/"', '"head/"', '"h1/"'],
      answer: '"h1/"',
    },
    {
      question: 'What is the correct HTML tag for inserting a line break?',
      options: ['"lb/"', '"br/"', '"break/"', '"html/"'],
      answer: '"br/"',
    },
    {
      question: 'Where should a CSS file be referenced in a HTML file?',
      options: ['before any HTML code', 'after all HTML code', 'inside head section', 'inside body section'],
      answer: 'inside head section',
    },
    {
      question: 'How can you make a numbered list?',
      options: [
        '"ol/"',
        '"ul/"',
        '"dl/"',
        '"list/"',
    ],
    answer: '<ol>',
  },
  {
    question: 'What does CSS stand for?',
    options: ['Creative style sheet', 'Cascading style sheet', 'Computing style sheet', 'Colorful style sheet'],
    answer: 'Cascading style sheet',
  },
  {
    question: 'Which is the correct CSS syntax',
    options: [
      'body{color:black;}',
      '{body:color:black;}',
      'body:color:black;',
      '{body;color:black;}',
    ],
    answer: 'body{color:black;}',
  },
  {
    question: 'which symbol indicates a tag?',
    options: ['angle brackets', 'curved brackets', 'commas', 'exclamation marks'],
    answer: 'angle brackets',
  },
  {
    question: 'Which of these is a genuine tag keyword?',
    options: [
      'Header',
      'Bold',
      'Body',
      'Image',
    ],
    answer: 'Body',
  },
  {
    question: 'A CSS file can be applies to only one HTML file.',
    options: ['True', 'False'],
    answer: 'False',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();