function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

var max = 9;
var min = 0;
function aleatorio(){
 return Math.floor(Math.random()*(max-min+1))+min;
}

var numeros = [];
var paso;

do {
  //i += 1;
  var paso=aleatorio();
  if (numeros.indexOf(paso)>=0){
	  
  } else {
	numeros.push(paso);	  
  }
} while (numeros.length < 10);

//alert (numeros);

var url = 'json/'+lang+'.json';

fetchJSONFile(url, function(data){
    console.log(data);
	var questions = [];


	for (var i = 0; i < 10; i++) 
		questions.push([data[numeros[i]].pregunta,data[numeros[i]].opc0,data[numeros[i]].opc1,data[numeros[i]].opc2,data[numeros[i]].opc3,data[numeros[i]].resp]);    
    
	//for(var i in data)
	//	questions.push([data[i].pregunta,data[i].opc0,data[i].opc1,data[i].opc2,data[i].opc3,data[i].resp]);

// 2
var questionTemplate = _.template(" \
	<div class='card question'><span class='question'><%= question %></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1' style=\"color:white\"><%= a %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2' style=\"color:white\"><%= b %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3' style=\"color:white\"><%= c %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4' style=\"color:white\"><%= d %></label> \
        </li> \
      </ul> \
    </div> \
    ");


// 3
var points,
	pointsPerQuestion,
	currentQuestion,
	questionTimer,
	timeForQuestion = 10, // seconds
	timeLeftForQuestion;

// 4
$(function() {

	//
	$('button.start').click(start);
	$('.play_again button').click(restart);

	function restart() {
		points = 0;
		pointsPerQuestion = 10;
		currentQuestion = 0;
		timeLeftForQuestion = timeForQuestion;

		$('.finish.card').hide();
		$('div.start').show();
		$('.times_up').hide();

		generateCards();
		updateTime();
		updatePoints();
	}

	//
	function start() {
		$('div.start').fadeOut(200, function() {
			moveToNextQuestion();
		});
	}

	//
	function generateCards() {
		$('.questions').html('');
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			var html = questionTemplate({
				question: q[0],
				index: i,
				a: q[1],
				b: q[2],
				c: q[3],
				d: q[4]
			});
			$('.questions').append(html);
		};
		$('.question.card input').change(optionSelected);
	}

	//
	function moveToNextQuestion() {
		currentQuestion += 1;
		if (currentQuestion > 1) {
			$('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
		}
		showQuestionCardAtIndex(currentQuestion);
		setupQuestionTimer();
	}

	//
	function setupQuestionTimer() {
		if (currentQuestion > 1) {
			clearTimeout(questionTimer);
		}
		timeLeftForQuestion = timeForQuestion;
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function showQuestionCardAtIndex(index) { // staring at 1
		var $card = $('.question.card:nth-child(' + index + ')').show();
	}

	//
	function countdownTick() {
		timeLeftForQuestion -= 1;
		updateTime();
		if (timeLeftForQuestion == 0) {
			return finish();
		}
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function updateTime() {
		$('.countdown .time_left').html(timeLeftForQuestion + 's');
	}

	//
	function updatePoints() {
		$('.points span.points').html(points + puntos);
	}

	//
	function optionSelected() {
		var selected = parseInt(this.value);
		var correct = questions[currentQuestion-1][5];

		if (selected == correct) {
			points += pointsPerQuestion;
			updatePoints();
			correctAnimation();
		} else {
			wrongAnimation();
		}

		if (currentQuestion == questions.length) {
			clearTimeout(questionTimer);
			return finish();
		}
		moveToNextQuestion();
	}

	function correctAnimation() {
		animatePoints('right');
	}

	//
	function wrongAnimation() {
		animatePoints('wrong');
	}

	//
	function animatePoints(cls) {
		$('header .points').addClass('animate ' + cls);
		setTimeout(function() {
			$('header .points').removeClass('animate ' + cls);
		}, 500);
	}

	//
	function finish() {
		if (timeLeftForQuestion == 0) {
			$('.times_up').show();
		}
		$('p.final_points').html(points + puntos);

		if (points>90) {
			$('p.final_points').html(points + puntos + '</br><img src="img/first-place-medal.png" width="1000" height="80" />');
		} else if (points>80 && points<=90) {
			$('p.final_points').html(points + puntos + '</br><img src="img/second-place-medal.png" width="160" height="80" />');
		} else if (points>70 && points<=80) {
			$('p.final_points').html(points + puntos + '</br><img src="img/third-place-medal.png" width="160" height="80" />');
		} else {
			$('p.final_points').html(points + puntos);
		}

		$('.question.card:visible').hide();
		$('.finish.card').show();
	}

	//
	restart();

});






	
});


