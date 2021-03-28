
$(document).ready(function(){
    var magic8Ball = {};
    magic8Ball.listOfAnswers = ["It is certain", "yes", "no", "Don't count on it", "not a chance!", "maybe"];
    $("#answer").hide();
    magic8Ball.askQuestion = function(question){
      setTimeout(
        function(){
        $("#8ball").attr("src", "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/answerside.png");
      },500);
      $("#8ball").effect("shake");
        var randomNumber = Math.random();
        var randomNumberFromListOfAnswers = randomNumber * this.listOfAnswers.length;
        var randomIndex = Math.floor(randomNumberFromListOfAnswers);
        var answer = this.listOfAnswers[randomIndex];
        $("#answer").text(answer);
    
        $("#answer").fadeIn(4000);
        console.log(question);
        console.log( answer );
        
    };
        var onClick = function(){
        $("#answer").hide();
      $("#8ball").attr("src", "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/8side.png");
        setTimeout(
          function(){
          }, 500);
            var question = prompt("Ask me anything");
            
    magic8Ball.askQuestion (question);
        };
        
        $("#questionButton").click(onClick);
        
    });
    