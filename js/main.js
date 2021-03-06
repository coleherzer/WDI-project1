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

var cards = {
    food: [
        '🍎', '🍎', '🍒', '🍒', '🍌', '🍌', '🍕', '🍕', '🥕', '🥕', '🍟', '🍟', '🌮', '🌮', '🍤', '🍤', '🍔', '🍔', '🌭', '🌭', '🍣', '🍣', '🍪', '🍪', '🍫', '🍫', '🥑', '🥑', '🥓', '🥓', '🥐', '🥐', '🍦', '🍦', '🍋', '🍋', '🍩', '🍩', '🍭', '🍭', '🍗', '🍗', '🌽', '🌽' 
    ],
    activity: [
        '⚽️', '⚽️', '🏀', '🏀', '🏈', '🏈', '⚾️', '⚾️', '🎾', '🎾', '🏐', '🏐', '🎱', '🎱', '🏓', '🏓', '🏒', '🏒', '⛳️', '⛳️', '🎣', '🎣', '🏂', '🏂', '🏄', '🏄', '🚴‍♀️', '🚴‍♀️', '🎮', '🎮', '🏇', '🏇', '🎸', '🎸', '🎲', '🎲', '🎳', '🎳', '🎨', '🎨', '🏏', '🏏', '🎯', '🎯' 
    ],
    smileys: [
        '😀', '😀', '😆', '😆', '😅', '😅', '🤣', '🤣', '😊', '😊', '😇', '😇', '🙃', '🙃', '😉', '😉', '😍', '😍', '😘', '😘', '🤓', '🤓', '😎', '😎', '🤡', '🤡', '🤠', '🤠', '😜', '😜', '😡', '😡', '😩', '😩', '☹️', '☹️', '😱', '😱', '😳', '😳', '😴', '😴', '🤢', '🤢' 
    ],
    objects: [
        '⌚️', '⌚️', '💻', '💻', '🖨', '🖨', '💾', '💾', '📀', '📀', '🎥', '🎥', '📞', '📞', '📺', '📺', '⌛️', '⌛️', '💡', '💡', '💰', '💰', '💎', '💎', '🔨', '🔨', '🔫', '🔫', '⚔️', '⚔️', '🔮', '🔮', '💊', '💊', '🗝', '🗝', '🎁', '🎁', '✉️', '✉️', '📕', '📕', '✏️', '✏️'
    ],
    animals: [
        '🐶', '🐶', '🐱', '🐱', '🐭', '🐭', '🦊', '🦊', '🐻', '🐻', '🐼', '🐼', '🐨', '🐨', '🐯', '🐯', '🐮', '🐮', '🐸', '🐸', '🐵', '🐵', '🐔', '🐔', '🐧', '🐧', '🦆', '🦆', '🦉', '🦉', '🦋', '🦋', '🐍', '🐍', '🐠', '🐠', '🐢', '🐢', '🐝', '🐝', '🐬', '🐬', '🐙', '🐙'
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





// Backlog

// Need to fix scoring bug if two bombs are matched

// Need to turn off category event listeners while a game is in progress
// OR need to clear the board and reset the clock if a category is clicked during a game

// Think about adding animations

// Update Readme.md


