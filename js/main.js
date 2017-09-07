var $grid = $('#game-grid'); 
$grid.hide(); 

var $squares = $('.square');

var selectedCategory = null

var cards = {
    food: [
        'images/food/pizza.jpeg', 'images/food/pizza.jpeg', 'images/food/fries.png', 'images/food/fries.png', 'images/food/ice-cream.png', 'images/food/ice-cream.png', 'images/food/sushi.jpeg', 'images/food/sushi.jpeg', 'images/food/taco.jpeg', 'images/food/taco.jpeg', 'images/food/salad.jpeg', 'images/food/salad.jpeg', 'images/food/apple.jpeg', 'images/food/apple.jpeg', 'images/food/burger.jpeg', 'images/food/burger.jpeg', 'images/food/cookie.jpeg', 'images/food/cookie.jpeg', 'images/food/hot-dog.png', 'images/food/hot-dog.png', 'images/food/donut.jpeg', 'images/food/donut.jpeg', 'images/food/fried-chicken.jpeg', 'images/food/fried-chicken.jpeg'
    ],
    sports: [
        'images/sports/baseball.jpeg', 'images/sports/baseball.jpeg', 'images/sports/basketball.jpeg', 'images/sports/basketball.jpeg', 'images/sports/hockey-stick.png', 'images/sports/hockey-stick.png', 'images/sports/tennis-ball.jpeg', 'images/sports/tennis-ball.jpeg', 'images/sports/soccer-ball.png', 'images/sports/soccer-ball.png', 'images/sports/golf-club.png', 'images/sports/golf-club.png', 'images/sports/racket.png', 'images/sports/racket.png', 'images/sports/8ball.jpeg', 'images/sports/8ball.jpeg', 'images/sports/football.jpeg', 'images/sports/football.jpeg', 'images/sports/ping-pong.jpeg', 'images/sports/ping-pong.jpeg', 'images/sports/bowling.png', 'images/sports/bowling.png', 'images/sports/volleyball.jpeg', 'images/sports/volleyball.jpeg'
    ],
    colors: [
        'images/colors/blue.png', 'images/colors/blue.png', 'images/colors/red.png', 'images/colors/red.png', 'images/colors/green.png', 'images/colors/green.png', 'images/colors/yellow.png', 'images/colors/yellow.png', 'images/colors/black.png', 'images/colors/black.png', 'images/colors/gray.png', 'images/colors/gray.png', 'images/colors/orange.png', 'images/colors/orange.png', 'images/colors/purple.jpeg', 'images/colors/purple.jpeg', 'images/colors/white.jpeg', 'images/colors/white.jpeg', 'images/colors/gold.jpeg', 'images/colors/gold.jpeg', 'images/colors/brown.png', 'images/colors/brown.png', 'images/colors/pink.png', 'images/colors/pink.png'
    ],
    items: [
        'images/items/book.jpeg', 'images/items/book.jpeg', 'images/items/tree.jpeg', 'images/items/tree.jpeg', 'images/items/cloud.png', 'images/items/cloud.png', 'images/items/house.png', 'images/items/house.png', 'images/items/boat.jpeg', 'images/items/boat.jpeg', 'images/items/person.jpeg', 'images/items/person.jpeg', 'images/items/pyramid.jpeg', 'images/items/pyramid.jpeg', 'images/items/plane.jpeg', 'images/items/plane.jpeg', 'images/items/light-bulb.jpeg', 'images/items/light-bulb.jpeg', 'images/items/shoe.png', 'images/items/shoe.png', 'images/items/map.png', 'images/items/map.png', 'images/items/gold-coin.jpeg', 'images/items/gold-coin.jpeg'
    ], 
    animals: [
        'images/animals/dog.jpeg', 'images/animals/dog.jpeg', 'images/animals/cat.jpeg', 'images/animals/cat.jpeg', 'images/animals/sheep.jpeg', 'images/animals/sheep.jpeg', 'images/animals/cow.jpeg', 'images/animals/cow.jpeg', 'images/animals/horse.jpeg', 'images/animals/horse.jpeg', 'images/animals/elephant.png', 'images/animals/elephant.png', 'images/animals/bunny.jpeg', 'images/animals/bunny.jpeg', 'images/animals/penguin.png', 'images/animals/penguin.png', 'images/animals/snake.jpeg', 'images/animals/snake.jpeg', 'images/animals/chicken.png', 'images/animals/chicken.png', 'images/animals/turtle.jpeg', 'images/animals/turtle.jpeg', 'images/animals/fish.png', 'images/animals/fish.png', 'images/animals/bear.png', 'images/animals/bear.png'
    ]
    // Add a heroes category?
};

var bombs = [
    'images/bombs/bomb.gif', 'images/bombs/bomb.gif', 'images/bombs/bomb.gif'
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
        var $newValue = $("<img>").addClass('bomb').attr("src", bombs[i]);
        var randomIndex = randomSquare(50)       
        while($squares.eq(randomIndex).html()) {
            randomIndex = randomSquare(50)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "img.bomb" ).hide(); 
        $('img.bomb').parent().on('click', function () {
            $currentScore.text('Score: ' + ($score - 2));
            $score = $score - 2;
        })
    }
    for (var i = 0; i < cards[category].length; i++) {
        var $newValue = $("<img>").addClass('new-value').attr("src", cards[category][i]);
        // while random square has content
            // find another random square
        var randomIndex = randomSquare(50)       
        while($squares.eq(randomIndex).html()) {
            randomIndex = randomSquare(50)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "img.new-value" ).hide(); 
    }
}; 

var $play = $('#play'); 

$play.on('click', function () {
    $grid.show(); 
    if ($squares.text() == '') {
        startGame(selectedCategory); 
    }
    // add a reset function to the play button
    // Will add more functionality
});

function checkMatch () {
    if ($click1.html() == $click2.html() && ($click1.html() !== '' && $click2.html() !== '')) {
        $click1.off()
        $click2.off()
        for (i = 0; i < 1; i ++ ) {
            if ($click1.html() == $click2.html() && $click1.text() !== 'Empty' && $click2.text() !== 'Empty' && $click1.find('img src') !== 'images/bombs/bomb.gif' && $click2.find('img src') !== 'images/bombs/bomb.gif') {
                $currentScore.text('Score: ' + ($score + 10));
                $score = $score + 10;
                $click1.show();
                $click2.show(); 
            }
        } 
        //  Add points to the active player?
    }
    else {
        $click1.find('img').hide(3000); 
        $click2.find('img').hide(3000); 
    }

    $click1 = null;
    $click2 = null;
};

var $click1; 
var $click2; 

$squares.on('click', function () {
    $(this).find('img').show(); 
    if ($click1 == undefined) {
        $click1 = $(this); 
        if ($click1.html() == '') {
            $click1.css({background: 'white'});
            $click1.text('Empty');
            $click1.off();
        }
    }
    else if ($click1 !== undefined && $click1[0] !== $(this)[0]) {
        $click2 = $(this); 
        if ($click2.html() == '') {
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




// Bugs/Questions:
// Current bug in matched divs... 
// Sometimes, one of the two matched divs will be stuck on hide()... 
// Happens when you click the matched div as it is slowly returning to hide
// Bug in that matching bombs deducts like 25 points (keep it?)

// Ask about the error message im getting that refers to my jquery file?

