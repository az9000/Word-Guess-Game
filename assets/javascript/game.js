var ready = true;

var game = { 
    score: 0,
    attempts: 0,
    maxAttempts: 10,
    word: '',
    randomNumber: -1,
    lastRandomNumber: -1,
    lettersUsed: [],
    started: false,
    currentWord: '',
    gamesPlayed: 0,

    /**
     * Start a new game and init
     */
    newGame: function() {
        if (!ready) {
            return;
        }
        this.started = true;
        this.attempts = 0;        
        this.updateGuesses(this.maxAttempts);
        this.randomNumber = Math.floor(Math.random() * footballDictionary.length);
        if (this.lastRandomNumber === this.randomNumber) {
            // try one more time
            this.randomNumber = Math.floor(Math.random() * footballDictionary.length);
        }
        this.lastRandomNumber = this.randomNumber;
        this.word = footballDictionary[this.randomNumber];
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
            ready = false;
            setTimeout(function() {
                ready = true;
            }, 4000);
            utility.playSound('/assets/sounds/sad.mp3');
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
        this.updateScore();
        ready = false;
        setTimeout(function() {
           ready = true;
        }, 4000);
        utility.playSound('/assets/sounds/cheer.mp3');
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
        if (utility.isAlphabet(evt.key)) {
            var letterIndex = game.word.toLowerCase().indexOf(evt.key.toLowerCase());
            game.currentWord = document.getElementById('current-word').textContent;
            if (letterIndex >= 0) {
                for (var i=0; i < game.word.length; i++) {
                    if (game.word[i].toLowerCase() === evt.key.toLowerCase()) {
                        document.getElementById('current-word').textContent = utility.replaceAt(document.getElementById('current-word').textContent, i, evt.key);                        
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


