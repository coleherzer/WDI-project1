var $grid = $('#game-grid'); 

var $squares = $('.square');

var textMatches = [
    'blue', 'blue', 'red', 'red', 'green', 'green', 'yellow', 'yellow', 'black', 'black', 'gray', 'gray', 'orange', 'orange', 'purple', 'purple', 'white', 'white', 'gold', 'gold', 'brown', 'brown', 'pink', 'pink'
];

function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
};

shuffle(textMatches); 

function randomSquare (n) {
    return Math.floor(Math.random() * n);
};

function startGame () {
    for (var i = 0; i < textMatches.length; i++) {
        var $value = $squares[randomSquare(80)].innerHTML = textMatches[randomSquare(24)];
        // $value.css('background', $value); 
        // Left off here in changing background color
    }
};

// $winner.css({display: 'block'}); 

startGame(); 

// Need to set the dsiplay for all those randomize squares to hidden
// So the user can then click on the squares and see if two squares match

// Just do it with text today... Worry about setting div background to the
// random color tomorrow 
