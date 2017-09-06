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

var $body = $('body');

function startGame () {
    textMatches.forEach(function () {
        var $newValue = $("<p class='new-value'>");
        $newValue.text(textMatches[randomSquare(24)]);
        // while random square has content
            // find another random square
        var randomIndex = randomSquare(50)       
        console.log(randomIndex, $squares.eq(randomIndex))
        while($squares.eq(randomIndex).text() != '') {
            randomIndex = randomSquare(50)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "p.new-value" ).hide(); 
    })
}; 

// startGame(); 

var $play = $('#play'); 

$play.on('click', function () {
    if ($squares.text() == '') {
        startGame(); 
    }
    // Will add more functionality as I continue
});

function checkMatch () {

}

$squares.on('click', function () {
    $(this).find('p').show(); 
})





// var $items = $('.new-value');
// $items = $items.text(); 
// $items.css({display: 'none'}); 

// Need to set the dsiplay for all those randomize squares to hidden
// So the user can then click on the squares and see if two squares match

// Just do it with text today... Worry about setting div background to the
// random color tomorrow 
