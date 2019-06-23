var footballDictionary = [
    'backfield',
    'blitz',
    'bootleg',
    'bowl',
    'carry',
    'center',
    'coach',
    'deflection',
    'end',
    'football',
    'fullback',
    'goalpost',
    'gridiron',    
    'guard',    
    'halfback', 
    'heisman',
    'huddle',
    'interception',
    'kicker',
    'linebacker',
    'lineman',
    'scrimmage',
    'punt',
    'punter',
    'QB',
    'Quarterback',
    'receiver',
    'referee',
    'rush',
    'sack',
    'safety',
    'scrimmage',
    'spiral',
    'superbowl',
    'tackle',
    'tailback',
    'tailgate',
    'touchdown',
    'turnover',
    'umpire',
    'downfield',
    'facemask',
    'helmet',
    'pads',
    'cleats',
    'fumble',
    'pass',
    'juke',
    'midfield',
    'pigskin',    
    'catch',
    'down',
    'defense',
    'offense',
    'uprights',
    'cornerback'
];

var game = {
    dictionary: footballDictionary,
    score: 0,
    attempts: 0,
    maxAttempts: 10,
    word: '',
    randomNumber: -1,
    lettersUsed: [],
    started: false,
    currentWord: '',
    gamesPlayed: 0,

    /**
     * Start a new game and init
     */
    newGame: function() {
        this.started = true;
        this.attempts = 0;        
        this.updateGuesses(this.maxAttempts);
        this.randomNumber = Math.floor(Math.random() * this.dictionary.length);
        this.word = this.dictionary[this.randomNumber];
        //console.log('looking for ' + this.word);
        document.getElementById('current-word').textContent = '';
        for (var i=0; i < this.word.length; i++) {
            document.getElementById('current-word').textContent += '-';
        }
        this.currentWord = document.getElementById('current-word').textContent;
        document.getElementById("status-image").src = "";
        document.getElementById("status-image").style.display = "none";
        this.updateGameStatus('Started');
        this.lettersUsed = [];
        document.getElementById('looking-for-word').style.display = 'none';
        document.getElementById('word').style.display = 'none';
        document.getElementById('word').textContent = '';''
        document.getElementById('letters-guessed').textContent = this.lettersUsed;
        if (this.gamesPlayed !== 0) {
            document.getElementById('num-of-wins').textContent = this.score + '/' + this.gamesPlayed;
        } else {
            document.getElementById('num-of-wins').textContent = this.score;
        }
        this.gamesPlayed++;
        
    },


    updateGameStatus: function(status) {
        document.getElementById('game-status').textContent = status;
    },

    updateGuesses: function() {
        document.getElementById('guesses').textContent = this.maxAttempts;
    },

    updateScore: function() {
        this.score++;
    },

    updateAttempts: function(key) {
        this.attempts++;
        if ((this.maxAttempts - game.attempts) === 0) {
            this.started = false;
            document.getElementById('looking-for-word').style.display = 'block';
            document.getElementById('word').style.display = 'block';
            document.getElementById('word').innerHTML = this.word.toUpperCase();
            document.getElementById("status-image").style.display = "block";
            document.getElementById("status-image").src = "/assets/images/silent_tears.gif";
            this.updateGameStatus('Finished');
            this.updateGuesses(0);
            return;
        }
        if (this.lettersUsed.indexOf(key) == -1) {
            this.lettersUsed.push(key);
        }                
        document.getElementById('letters-guessed').textContent = this.lettersUsed;
    },

    winner: function() {
        this.playSound("/assets/sounds/TOUCHDOWN.mp3");
        this.updateScore();
        document.getElementById('num-of-wins').textContent = this.score + '/' + this.gamesPlayed;
        document.getElementById("status-image").style.display = "block";
        document.getElementById("status-image").src = "/assets/images/good-job.gif";
        this.updateGameStatus('Finished');
        this.started = false;
        this.attempts = 0;
    },

    playSound: function(src) {
        // TODO
    },

    /**
     * This is from Google Fu (https://gist.github.com/efenacigiray/9367920)
     * @param {*} text  : original string
     * @param {*} index   : index of letter to replace
     * @param {*} ch : replacement letter
     */
    replaceAt: function (text, index, ch) {
        // text.substr(0, index) = returns left characters up to index
        // ch = character to use
        // text.substring(index + 1) returns rightmost characters in text
        // Example: text = 'hello'
        // replace 'l' with 'x' (index = 1)
        // text.substr(0, 1) = 'he'
        // text.substring(2) = 'lo'
        // 'he' + 'x' + 'lo' => 'hexlo'
        // Next round index = 2:
        // text.substr(0, 2) = 'hex'
        // text.substring(3) = 'o'
        // 'hex' + 'x' + 'o' => 'hexxo'
        return text.substring(0, index) + ch + text.substring(index + 1);
    }
    

}

/**
 * Just started!
 */
window.onload = function() {
    game.newGame(0);
}

/**
 * Capture keyboard press
 */
window.onkeyup = function (evt) {
    if (!game.started) {
        game.newGame();
    } else {
        if (isAlphabet(evt.key)) {
            var letterIndex = game.word.toLowerCase().indexOf(evt.key.toLowerCase());
            console.log(letterIndex);            
            if (letterIndex >= 0) {
                for (var i=0; i < game.word.length; i++) {
                    if (game.word[i].toLowerCase() === evt.key.toLowerCase()) {
                        document.getElementById('current-word').textContent = game.replaceAt(document.getElementById('current-word').textContent, i, evt.key);                        
                    }
                }

                // did I win?
                if (document.getElementById('current-word').textContent === game.word) {
                    game.winner();
                }
            } else {
                game.updateAttempts(evt.key);
            }
        }
        document.getElementById('guesses').textContent = game.maxAttempts - game.attempts;                
    }
}

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

function isAlphabet(key) {
    if (alphabet.indexOf(key.toLowerCase()) >= 0) {
        return true;
    }
    return false;
}

