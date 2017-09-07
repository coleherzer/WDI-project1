var $grid = $('#game-grid'); 
$grid.hide(); 

var $squares = $('.square');

var selectedCategory = null

var cards = {
    food: [
        'pizza', 'pizza', 'fries', 'fries', 'ice cream', 'ice cream', 'sushi', 'sushi', 'taco', 'taco', 'salad', 'salad', 'apple', 'apple', 'burger', 'burger', 'cookie', 'cookie', 'hot dog', 'hot dog', 'donut', 'donut'
    ],
    sports: [
        'baseball', 'baseball', 'basketball', 'basketball', 'hockey stick', 'hockey stick', 'tennis ball', 'tennis ball', 'soccer ball', 'soccer ball', 'golf club', 'golf club', 'racket', 'racket', '8 ball', '8 ball', 'football', 'football'
    ],
    colors: [
        'blue', 'blue', 'red', 'red', 'green', 'green', 'yellow', 'yellow', 'black', 'black', 'gray', 'gray', 'orange', 'orange', 'purple', 'purple', 'white', 'white', 'gold', 'gold', 'brown', 'brown', 'pink', 'pink'
    ],
    items: [
        'book', 'book', 'tree', 'tree', 'cloud', 'cloud', 'house', 'house', 'boat', 'boat', 'person', 'person', 'pyramid', 'pyramid', 'plane', 'plane', 'light bulb', 'light bulb', 'shoe', 'shoe', 'map', 'map', 'gold coin', 'gold coin'
    ], 
    animals: [
        'dog', 'dog', 'cat', 'cat', 'sheep', 'sheep', 'cow', 'cow', 'horse', 'horse', 'elephant', 'elephant', 'bunny', 'bunny', 'bird', 'bird', 'snake', 'snake', 'chicken', 'chicken', 'turtle', 'turtle', 'fish', 'fish', 'bear', 'bear'
    ]
};

var bombs = [
    'bomb', 'bomb', 'bomb'
];
// Would then need a button or something to ask the user what category they would like

// var player1 = {};
// var player2 = {}; 

var $currentScore = $('#score');

var $score = 0;


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

function randomSquare (n) {
    return Math.floor(Math.random() * n);
};

var $body = $('body');

function startGame (category) {
    for (var i = 0; i < bombs.length; i++) {
        var $newValue = $("<p class='bomb'>");
        $newValue.text(bombs[i]);
        var randomIndex = randomSquare(50)       
        while($squares.eq(randomIndex).text() != '') {
            randomIndex = randomSquare(50)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "p.bomb" ).hide(); 
        $('p.bomb').parent().on('click', function () {
            $currentScore.text('Score: ' + ($score - 2));
            $score = $score - 2;
        })
    }
    for (var i = 0; i < cards[category].length; i++) {
        var $newValue = $("<p class='new-value'>");
        $newValue.text(cards[category][i]);
        // while random square has content
            // find another random square
        var randomIndex = randomSquare(50)       
        while($squares.eq(randomIndex).text() != '') {
            randomIndex = randomSquare(50)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "p.new-value" ).hide(); 
    }
}; 

var $play = $('#play'); 

$play.on('click', function () {
    $grid.show(); 
    if ($squares.text() == '') {
        startGame(selectedCategory); 
        // startGame(); 
    }
    // add a reset function to the play button
    // Will add more functionality
});

function checkMatch () {
    if ($click1.text() == $click2.text() && ($click1.text() !== '' && $click2.text() !== '')) {
        $click1.off()
        $click2.off()
        for (i = 0; i < 1; i ++ ) {
            if ($click1.text() == $click2.text() && $click1.text() !== 'Empty' && $click2.text() !== 'Empty' && $click1.text() !== 'bomb' && $click2.text() !== 'bomb') {
                $currentScore.text('Score: ' + ($score + 10));
                $score = $score + 10;
                $click1.show();
                $click2.show(); 
            }
        } 
        //  Add points to the active player?
    }
    else {
        //  Re-hide those two divs that were checked (slowly rehide them)
        $click1.find('p').hide(3000); 
        $click2.find('p').hide(3000); 
    }

    $click1 = null;
    $click2 = null;
};

var $click1; 
var $click2; 

$squares.on('click', function () {
    $(this).find('p').show(); 
    if ($click1 == undefined) {
        $click1 = $(this); 
        if ($click1.text() == '') {
            $click1.css({background: 'white'});
            $click1.text('Empty');
            $click1.off();
        }
    }
    else if ($click1 !== undefined && $click1[0] !== $(this)[0]) {
        $click2 = $(this); 
        if ($click2.text() == '') {
            $click2.css({background: 'white'});
            $click2.text('Empty');
            $click2.off();
        }
        checkMatch();    
    }
});

// Need a scoring system between the two players

// Need a timing mechanism that counts down each players turn 
// Bonus points/timing stops if all matches uncovered before time limit

// Need to declare the winner either based on # of matches or points or whatever

// Add a bomb icon to two or three random divs when the game starts
// A player that clicks on the bomb will be deducted points

// Make sure the game looks really nice
// Give the grid some special styles such as making the borders look like wood beams or w/e
// Maybe add a background hero type image if it looks nice
// Maybe change the name?
// Make cool animations?
// Style buttons

// Need to add more items to each category array so there arent so many empty squares

// If you have time, add the ability for the user to play single player



$('li').on('click', function() {
    $grid.show(); 
    selectedCategory = $(this).data('category')
})



// Current bug in matched divs... 
// Sometimes, one of the two matched divs will be stuck on hide()... 
// Happens when you click the matched div as it is slowly returning to hide
// Bug in that matching bombs deducts like 25 points (keep it?)
