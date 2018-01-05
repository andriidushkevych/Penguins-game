$(document).ready( function() {
    let ids = ['penguin1', 'penguin2', 'penguin3', 'penguin4', 'penguin5', 'penguin6', 'penguin7', 'penguin8', 'yeti'];
    let score = 0;
    let highScore = 0;
    shuffle(ids);
    addClickListeners();

    function shuffle(ids) {
        let arr = randomize(ids);
        for (let i = 0; i < arr.length; i++) {
            $("#title").after('<div id= ' + arr[i] + ' class=\"penguin\"></div>');
        }
        $('#yeti').removeClass('penguin');
    }

    function randomize(arr) {
        let current = arr.length;
        let tempIndex, tempValue;
        while(current > 0) {
            tempIndex = Math.floor(Math.random() * current);
            current--;
            tempValue = arr[tempIndex];
            arr[tempIndex] = arr[current];
            arr[current] = tempValue;
        }
        return arr;
    }

    function addClickListeners() {
        $('.penguin').click(function() {
            if (!$(this).hasClass('clicked')) {
                score++;
                let penguinId = $(this).prop('id');
                let imageUrl = './images/' + penguinId + '.png';
                let soundUrl = "http://www.soundjay.com/button/beep-06.mp3";
                new Audio(soundUrl).play();
                $(this).css('background-image', 'url(' + imageUrl + ')').addClass('clicked');
                updateScore();
                if (score > highScore) {
                    highScore = score;
                    updateHighScore();
                }
            }
        });

        $("#yeti").click(function() {
            let soundUrl = "http://www.soundjay.com/button/beep-05.mp3";
            new Audio(soundUrl).play();
            $('.penguin').removeAttr('style').removeClass('clicked');
            setTimeout(function() {
                window.alert("Your score is: " + score );
                score = 0;
                updateScore();
                $('div').remove( '.penguin' );
                $('div').remove('#yeti');
                shuffle(ids);
                addClickListeners();
            }, 50);
        });
    }


    function updateScore() {
        $('#score>span').text(score);
    }

    function updateHighScore() {
        $('#highScore>span').text(highScore);
    }
});