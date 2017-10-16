// Need to change the other categories to have emoji content 
// Then make any other changes
// Then make sure to push up to GH-pages














// Javascript variables
var timeLimit = 60
var theIntervalId;
var seconds = timeLimit
var click1;
var click2;
var selectedCategory = null

var player1 = {
    score: 0
};

var player2 = {
    score: 0
};

// Want to go in and change the categories and their content from images
// To simply emoji font (make it look nicer)
// May need to change category names

var cards = {
    food: [
        '🍎', '🍎', '🍒', '🍒', '🍌', '🍌', '🍕', '🍕', '🥕', '🥕', '🍟', '🍟', '🌮', '🌮', '🍤', '🍤', '🍔', '🍔', '🌭', '🌭', '🍣', '🍣', '🍪', '🍪', '🍫', '🍫', '🥑', '🥑', '🥓', '🥓', '🥐', '🥐', '🍦', '🍦', '🍋', '🍋', '🍩', '🍩', '🍭', '🍭', '🍗', '🍗', '🌽', '🌽' 
    ],
    acitiviy: [
        '⚽️', '⚽️', '🏀', '🏀', '🏈', '🏈', '⚾️', '⚾️', '🎾', '🎾', '🏐', '🏐', '🎱', '🎱', '🏓', '🏓', '🏒', '🏒', '⛳️', '⛳️', '🎣', '🎣', '🏂', '🏂', '🏄', '🏄', '🚴‍♀️', '🚴‍♀️', '🎮', '🎮', '🏇', '🏇', '🎸', '🎸', '🎲', '🎲', '🎳', '🎳', '🎨', '🎨', '🏏', '🏏', '🎯', '🎯' 
    ],
    smileys: [
        'images/colors/blue.png', 'images/colors/blue.png', 'images/colors/red.png', 'images/colors/red.png', 'images/colors/green.png', 'images/colors/green.png', 'images/colors/yellow.png', 'images/colors/yellow.png', 'images/colors/black.png', 'images/colors/black.png', 'images/colors/gray.png', 'images/colors/gray.png', 'images/colors/orange.png', 'images/colors/orange.png', 'images/colors/purple.jpeg', 'images/colors/purple.jpeg', 'images/colors/white.jpeg', 'images/colors/white.jpeg', 'images/colors/gold.jpeg', 'images/colors/gold.jpeg', 'images/colors/brown.png', 'images/colors/brown.png', 'images/colors/pink.png', 'images/colors/pink.png'
    ],
    objects: [
        'images/items/book.jpeg', 'images/items/book.jpeg', 'images/items/tree.jpeg', 'images/items/tree.jpeg', 'images/items/cloud.png', 'images/items/cloud.png', 'images/items/house.png', 'images/items/house.png', 'images/items/boat.jpeg', 'images/items/boat.jpeg', 'images/items/person.jpeg', 'images/items/person.jpeg', 'images/items/pyramid.jpeg', 'images/items/pyramid.jpeg', 'images/items/plane.jpeg', 'images/items/plane.jpeg', 'images/items/light-bulb.jpeg', 'images/items/light-bulb.jpeg', 'images/items/shoe.png', 'images/items/shoe.png', 'images/items/map.png', 'images/items/map.png', 'images/items/gold-coin.jpeg', 'images/items/gold-coin.jpeg'
    ],
    animals: [
        'images/animals/dog.jpeg', 'images/animals/dog.jpeg', 'images/animals/cat.jpeg', 'images/animals/cat.jpeg', 'images/animals/sheep.jpeg', 'images/animals/sheep.jpeg', 'images/animals/cow.jpeg', 'images/animals/cow.jpeg', 'images/animals/horse.jpeg', 'images/animals/horse.jpeg', 'images/animals/elephant.png', 'images/animals/elephant.png', 'images/animals/bunny.jpeg', 'images/animals/bunny.jpeg', 'images/animals/penguin.png', 'images/animals/penguin.png', 'images/animals/snake.jpeg', 'images/animals/snake.jpeg', 'images/animals/chicken.png', 'images/animals/chicken.png', 'images/animals/turtle.jpeg', 'images/animals/turtle.jpeg', 'images/animals/fish.png', 'images/animals/fish.png', 'images/animals/bear.png', 'images/animals/bear.png'
    ]
    // Add a heroes category?
};

var bombs = [
    '💣', '💣', '💣', '💣'
];

var currentPlayer = player1;

// jQuery variables
var $counter = $('#time');
var $winner = $('<h1>').addClass('winner');
var $body = $('body');
var $grid = $('#game-grid');
// $grid.hide();
var $play = $('#start-game');
$play.hide();

var $squares = $('.square');
$counter.text(seconds + ' seconds');

var $currentPlayerScore = $('#p1score');

// Functions
function switchPlayer () {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        $currentPlayerScore = $('#p2score');
        seconds = timeLimit
        $counter.text(seconds + ' seconds')
        $squares.off();
    }
    else {
        currentPlayer = player1;
        $currentPlayerScore = $('#p1score');
        seconds = timeLimit
        $counter.text(seconds + ' seconds')
        $squares.off();
    }
};

function scoreReset () {
    player1.score = 0;
    player2.score = 0;
    $('#p1score').text(player1.score)
    $('#p2score').text(player2.score)
}

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

function startGame (category) {
    turnOnEventListeners();
    click1 = undefined;
    click2 = undefined;
    for (var i = 0; i < bombs.length; i++) {
        var $newValue = $("<p>").addClass('bomb').text(bombs[i]);
        var randomIndex = randomSquare(48)
        while($squares.eq(randomIndex).html()) {
            randomIndex = randomSquare(48)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "p.bomb" ).hide();
        $('p.bomb').parent().on('click', function () {
            if ($currentPlayerScore[0] == $('#p1score')[0]) {
                $currentPlayerScore.text(currentPlayer.score - 2);
                currentPlayer.score = currentPlayer.score - 2;
            }
            else {
                $currentPlayerScore.text(currentPlayer.score - 2);
                currentPlayer.score = currentPlayer.score - 2;
            }
        })
    }
    for (var i = 0; i < cards[category].length; i++) {
        var $newValue = $("<p>").addClass('new-value').text(cards[category][i]);
        // while random square has content
        // find another random square
        var randomIndex = randomSquare(48)       
        while($squares.eq(randomIndex).html()) {
            randomIndex = randomSquare(48)
        };
        $squares.eq(randomIndex).append($newValue);
        $( "p.new-value" ).hide();
    }
};

$play.on('click', function () {
    // $grid.show();
    if ($squares.text() == '') {
        startGame(selectedCategory);
        theIntervalId = setInterval(timer, 1000);
    }
    $play.hide()
});

function checkMatch () {
    if (click1.text() == click2.text() && (click1.text() !== '' && click2.text() !== '')) {
        click1.off()
        click2.off()
        for (i = 0; i < 1; i ++ ) {
            if (click1.text() == click2.text() && click1.text() !== 'Empty' && click2.text() !== 'Empty' && click1.text() !== '💣' && click2.text() !== '💣') {
                if ($currentPlayerScore[0] == $('#p1score')[0]) {
                    $currentPlayerScore.text(currentPlayer.score + 10);
                    currentPlayer.score = currentPlayer.score + 10;
                }
                else {
                    $currentPlayerScore.text(currentPlayer.score + 10);
                    currentPlayer.score = currentPlayer.score + 10;
                }
                click1.show();
                click2.show();
            }
        }
    }
    else {
        click1.find('p.new-value').hide(300);
        click2.find('p.new-value').hide(300);
    }
    click1 = undefined;
    click2 = undefined;
};

function turnOnEventListeners () {
    $squares.on('click', function () {
        $(this).find('p.new-value').show();
        $(this).find('p.bomb').show();
        if (click1 == undefined) {
            click1 = $(this);
            if (click1.html() == '') {
                click1.css({background: 'transparent'});
                click1.text('Empty');
                click1.off();
            }
        }
        else if (click1 !== undefined && click1[0] !== $(this)[0]) {
            click2 = $(this);
            if (click2.html() == '') {
                click2.css({background: 'transparent'});
                click2.text('Empty');
                click2.off();
            }
            checkMatch();
        }
    });
};

function gridReset () {
    $squares.html('');
    $counter.css({color: 'black'});
    $squares.css({background: 'none'});
};

function checkWinner () {
    if (player1.score > player2.score) {
        $grid.fadeOut('fast');
        $winner.fadeIn('fast');
        $winner.html('<h1>Player 1 Wins! </ br>Choose a category to play again!</h1>');
        $body.append($winner);
        $play.hide();
        scoreReset();
    }
    else {
        $grid.fadeOut('fast');
        $winner.fadeIn('fast');
        $winner.html('<h1>Player 2 Wins! </ br> Choose a category to play again!</h1>');
        $body.append($winner);
        $play.hide();
        scoreReset();
    }
};

$('li').on('click', function() {
    $grid.show();
    selectedCategory = $(this).data('category');
    $play.show();
    $winner.hide();
});

function timer () {
    seconds = seconds - 1;
    $counter.text(seconds + ' seconds');
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

// Need to fix scoring bug if two bombs are matched

// Make sure the game looks really nice
// Give the grid some special styles such as making the borders look like wood beams or w/e
// Maybe add a background hero type image if it looks nice
// Maybe change the name?
// Make cool animations?
// Style buttons

// Need to add more items to each category array so there arent so many empty squares
// Need to fix tie scoring
// Need to increase img size


