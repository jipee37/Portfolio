(function() {
    
 /* variables declaration*/
  
    var questions = [{
    question: "Quelle est la capitale de la Moldavie ?",
    choices: ["Bratislava", "Tachkent", "Chisinau",  "Vaduz", "Nicosie"],
    correctAnswer: 2
  }, {
    question: "Quelle est la capitae du Ghana ?",
    choices: ["Luanda", "Maseru", "Kampala", " Accra", "Porto Novo"],
    correctAnswer: 3    
  }, {
    question: "Quelle est la capitale de l'Uruguay ?",
    choices: ["Asuncion", "Sucre", "Port Stanley", " Tegucigalpa", "Montevideo"],
    correctAnswer: 4
  }, {
    question: "Quelle est la capitale du Cambodge ?",
    choices: ["Pyongyang", "Phnom Penh", "Rangoon", "Hanoi", "Oulan-Bator"],
    correctAnswer: 1
  }, {
    question: "Quelle est la capitale de la Macédoine ?",
    choices: ["Ljubljana", "Skopje", "Tirana", "Sofia", "Belgrade"],
    correctAnswer: 1
  }, {
    question: "Quelle est la capitale de la Papouasie Nouvelle-Guinée ?",
    choices: ["Port Stanley", "Canberra", "Wellington", "Port Moresby", "Suva"],
    correctAnswer: 3
 }, {
    question: "Quelle est la capitale du Burundi ?",
    choices: ["Bujumbura", "Addis-Abeba", " Kigali", "Mbabane", "Kampala"],
    correctAnswer: 0
}, {
    question: "Quelle est la capitale du Surinam ?",
    choices: ["Caracas", "Paramaribo", "Georgetown", "Cayenne", "Castries"],
    correctAnswer: 1
}, {
    question: "Quelle est la capitale du Tadjikistan ?",
    choices: ["Bichkek", "Bakou", "Achgabat", "Douchanbé", " Astana"],
    correctAnswer: 3
},  {
    question: "De quel pays Niamey est-elle la capitale ?",
    choices: ["Bénin", "Togo", "Tchad", "Niger", "Erythrée"],
    correctAnswer: 3 

}];
    

  var questionCounter = 0; //Tracks question number
  var responses = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

   /*Display initial question*/
  displayNext();

  /* Click handler for the 'next' button*/
  $('#next').on('click', function (e) {
    e.preventDefault();

     /*Suspend click listener during fade animation*/
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

     /*If no user selection, progress is stopped*/
    if (isNaN(responses[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

   /*Click handler for the 'prev' button*/
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    /*choose();*/
    questionCounter--;
      
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    responses = [];
    displayNext();
    $('#start').hide();
  });

   /*Animates buttons on hover*/
  $('.button').on('mouseover', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

   /*Creates and returns the div that contains the questions and
   the answer selections*/
  function createQuestionElement(index) {
 
      var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2 style="text-decoration: underline;">Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index); /*function to be created*/
    qElement.append(radioButtons);

    return qElement;
  }

   /*Creates a list of the answer choices as radio inputs*/
  function createRadios(index) {
    
    var radioList = $('<ul>');
    var item;
    var input = '';
    
      for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i]; /*tester dans la console: pour afficher les propos de réponses successives à la suite du radio bouton*/
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

   /*Reads the user selection and pushes the value to an array*/
  function choose() {
    responses[questionCounter] = +$('input[name="answer"]:checked').val();
  }

   /*Displays next requested element*/
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(responses[questionCounter]))) {
          $('input[value='+responses[questionCounter]+']').prop('checked', true);
        }

         /*Controls display of 'prev' button*/
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < responses.length; i++) {
      if (responses[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right !!!');
    return score;
  }
})();
