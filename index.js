'use strict';

$(function () {
  beginQuiz();
  handleAnswerFeedback();
  handleAnswerSubmits();
  renderQuestionCard();
});
//My questions & answers
let state = {
  questions: [
    {
      question: 'Salinity is a measurement of which property of seawater?',
      answers: ['Temperature',
                'Saltiness',
                'Density',
                'Oxygen concentration',
                'Contamination'],
      correctAnswer: 'Saltiness',
      fact: 'Salinity is the concentration of dissolved salts in water.'
    },
    {
      question: 'How much of the Earth\'s surface is covered by oceans?',
      answers: ['15%',
                '45%',
                '70%',
                '55%',
                '67%'],
      correctAnswer: '70%',
      fact:'The Earth is a 70% watery place'
    },
    {
      question: 'The bottom of the ocean isn\'t just all flat - there\'s ridges, columns and deep trenches. What is the deepest known area of the Earth\'s oceans?',
      answers: ['Mariana Trench',
                'Tonga Trench',
                'Puerto Rico Trench',
                'Kermadec Trench',
                'Philippine Trench'],
      correctAnswer: 'Mariana Trench',
      fact:'The Mariana Trench lies 10.91 km below sea level and runs for 2.5 kms. It\'s the deepest part of the ocean.'
    },
    {
      question: 'What are thermohaline currents?',
      answers: ['cold water currents from the arctic',
                'cold water currents from the Atlantic',
                'warm water currents from Africa',
                'warm water currents from the caribbean going to the Atlantic',
                'currents that move up and down in the ocean'],
      correctAnswer: 'currents that move up and down in the ocean',
      fact:'Thermohaline currents move from the surface of the water down to the ocean floor and back.'
    },
    {
      question: 'Which ocean is the saltiest?',
      answers: ['Atlantic',
                'Pacific',
                'Arctic',
                'Indian',
                'Southern Ocean'],
      correctAnswer: 'Atlantic',
      fact:'Surface waters in the Atlantic have the highest salinity, higher than 37 parts per thousand in some areas.'
    },
    {
      question: 'What are basalts?',
      answers: ['volcanic rocks on the ocean floor',
                'volcanic eruptions under the water',
                'volcanic ash found in the ocean',
                'volcanic activity',
                'rock salts'],
      correctAnswer: 'volcanic rocks on the ocean floor',
      fact:'When plates on the ocean floor move apart, magma oozes out. This magma cools and hardens forming rocks, known as basalts, on the ocean floor.'
    },
    {
      question: 'As carbon dioxide in the atmosphere has increased, how much has acidity in the oceans surface waters increased?',
      answers: ['5%',
                '10%',
                '15%',
                '20%',
                '30%'],
      correctAnswer: '30%',
      fact:'As corbon dioxide has dissolved in oceans waters, it has made them more acidic-some 30% more. That makes it harder for marine microauna, such as mollusks, to survive.'
    }, 
    {
      question: 'What percentage of life on Earth is found in the ocean?',
      answers: ['25%',
                '50%',
                '65%',
                '73%',
                '94%'],
      correctAnswer: '94%',
      fact:'It\'s 94%. That\'s a lot.'
    },
    {
      question: 'You probably know that trees produce oxygen, but did you know oceans do as well? How much of the oxygen that we breathe is produced by oceans?',
      answers: ['19%',
                '50%',
                '30%',
                '64%',
                '70%'],
      correctAnswer: '70%',
      fact:'70% of the oxygen we breathe is produced by the oceans. Good thing they\'re around!'
    },    
    {
      question: 'What did scientists discover in the waters off Ireland in 2005?',
      answers: ['A new species of seal',
                'Cold-water coral',
                'Three new crab species',
                'Massive waterfall under the sea',
                'RMS Lusitania'],
      correctAnswer: 'Cold-water coral',
      fact:'At a depth of 2000 feet (610 meters) in the cold waters off Ireland, scientists discovered coral gardens.'
    }, 
  ],
  
  currentQuestionIndex: 0,
  correctCount: 0,

};

function resetQuiz() {
  state.correctCount = 0
  state.currentQuestionIndex = 0;
}

function renderQuestionCard() {
  let currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
}
//Display question
function renderQuestionPrompt() {
  let questionText = state.questions[state.currentQuestionIndex].question;
  // let questionText = state.questions.question[state.currentQuestionIndex];
  $('.js-question-text').html(questionText);
}

function renderQuestionChoices(answers) { //array
  $('#question-form label').each(function (index, label) {
    $(this).find('input').attr('value', answers[index]);
    $(this).find('input').prop('checked', false); //render choices without previous selection.
    $(this).find('span').text(answers[index]);
  });
}

//Points
function getNumberOfCorrectAnswers() {
  let progressHTML = '<span>(' + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ')</span>'
  let questionText = state.questions[state.currentQuestionIndex].question;

  $(".status").text("Question: " + (state.currentQuestionIndex + 1) + "/" + "10");
  $(".score").text("Points: " + state.correctCount);
}

//Final page - results
function renderFinalResults() {
  $('#my-quiz').addClass('hidden');
  $('#start-quiz-over').removeClass('hidden');
  let element = $('.js-final-results');
  element.html('<h2>' + 'You got ' + state.correctCount + ' out of ' + state.questions.length + ' right!' + '</h2>');
 //Final page - images
  if (state.correctCount >= 6 ) {
      $('.imageResult').attr('src', 'http://melissarte.com/wp-content/uploads/2018/01/oceanlover.png');
  } else if (state.correctCount <= 5) {
      $('.imageResult').attr('src', 'http://melissarte.com/wp-content/uploads/2018/01/youlose.png');
 }
 
  handleQuizRestart();
}

function checkAnswer(userChoice) {
  let correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  if (userChoice == correctChoice) {
    state.correctCount++;
    renderQuestionFeedback(true);
    state.currentQuestionIndex++;
  } else if(userChoice == undefined){
    renderQuestionFeedback('unanswered');
  } else {
    renderQuestionFeedback(false);
    state.currentQuestionIndex++;
  }
  
  if (state.currentQuestionIndex == state.questions.length) {
    renderFinalResults()
  } else {
    getNumberOfCorrectAnswers();
    renderQuestionCard();
  }
}
//Answer and fact
function renderQuestionFeedback(boolean) {
  let feedback = $('.popup-inner');
  let currentFact = state.questions[state.currentQuestionIndex].fact;
  if (boolean == true){
    feedback.find('h2').text('Correct! '+ currentFact);
  } else if (boolean == false){
    feedback.find('h2').text('Sorry... '+ currentFact);
  } else if (boolean == 'unanswered'){
    feedback.find('h2').text('Select an answer');
    
  }
}

function beginQuiz() {
  $('#start-quiz').click(function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz').addClass('hidden');
  });
}

function handleQuizRestart() {
  $('#start-quiz-over').on('click', function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz-over').addClass('hidden');
    $('.js-final-results').text('');
    $('.status').text('Question: 1/10');
    $('.score').text('Points: 0');
    $('.imageResult').addClass('hidden');
    
    resetQuiz();
    renderQuestionCard();
  });
}

function handleAnswerSubmits() {
  $('#submit-answer').click(function (e) {
    e.preventDefault();
    let userChoice = $('input[name="answerChoice"]:checked').val();
    checkAnswer(userChoice);
  });
}


function handleAnswerFeedback() {
  //OPEN
  $('#submit-answer').on('click', function (e) {
    let targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(250);
    e.preventDefault();
  });
  //CLOSE
  $('#close-feedback-modal').on('click', function (e) {
    let targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(250);
    e.preventDefault();
  });
} 
