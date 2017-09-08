var $grid = $('#game-grid'); 
// $grid.hide(); 

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

var player1 = {
    score: 0
};

var player2 = {
    score: 0
};

var currentPlayer = player1; 
var $currentPlayerScore = $('#p1score');

function switchPlayer () {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        $currentPlayerScore = $('#p2score');
        seconds = 60
        $counter.text('Time: ' + seconds + ' seconds')
    }
    else {
        currentPlayer = player1;
        $currentPlayerScore = $('#p1score');
        seconds = 60
        $counter.text('Time: ' + seconds + ' seconds')
    }
};


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
// May not end up needing this function

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
            if ($currentPlayerScore[0] == $('#p1score')[0]) {
                $currentPlayerScore.text('Player 1 Score: ' + (currentPlayer.score - 2));
                currentPlayer.score = currentPlayer.score - 2;
            }
            else {
                $currentPlayerScore.text('Player 2 Score: ' + (currentPlayer.score - 2));
                currentPlayer.score = currentPlayer.score - 2;
            }
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

var $play = $('#start-game'); 

$play.on('click', function () {
    // $grid.show(); 
    if ($squares.text() == '') {
        startGame(selectedCategory); 
        theIntervalId = setInterval(timer, 1000);
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
                if ($currentPlayerScore[0] == $('#p1score')[0]) {
                    $currentPlayerScore.text('Player 1 Score: ' + (currentPlayer.score + 10));
                    currentPlayer.score = currentPlayer.score + 10;
                }
                else {
                    $currentPlayerScore.text('Player 2 Score: ' + (currentPlayer.score + 10));
                    currentPlayer.score = currentPlayer.score + 10;
                }
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

function gridReset () {
    $squares.html('');
    $counter.css({color: 'black'}); 
    $squares.css({background: 'none'}); 
};

function checkWinner () {
    if (player1.score > player2.score) {
        alert('Player 1 wins');
    }
    else {
        alert('Player 2 wins'); 
    }
};

// Bonus points/timing stops if all matches uncovered before time limit

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

var theIntervalId;
var $counter = $('#time');
var seconds = 60
$counter.text('Time: ' + seconds + ' seconds'); 

function timer () {
    seconds = seconds - 1;
    $counter.text('Time: '+ seconds + ' seconds');
    if (seconds < 6) {
        $counter.css({color: 'red'}); 
    }
    if (seconds < 0) {
        clearInterval( theIntervalId )
        alert("Time's Up!");
        $counter.text('Time: 0')
        gridReset(); 
        switchPlayer();
        if (player2.score !== 0) {
            checkWinner(); 
        }
    }
};

// $squares.on(); 
// $squares.off();
// Need to figure out how to have dvi event listeners off until game is started

// Ask about how I can avoid the bug where if someone clicks a div while it is slowly hiding, it doesnt work
// Check out misc category (and others) the event listeners seem messed up

// Bugs/Questions:
// Current bug in matched divs... 
// Sometimes, one of the two matched divs will be stuck on hide()... 
// Happens when you click the matched div as it is slowly returning to hide
// Bug in that matching bombs deducts like 25 points (keep it?)

// bug where if someone clicks play while the timer is already running, page freezes
// Bug where sometimes the click to start the game counts as the first click I think
// so it automatically considers the first click on the board not a match

