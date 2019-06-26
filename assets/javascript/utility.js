var utility = {

    alphabet : 'abcdefghijklmnopqrstuvwxyz',

    isAlphabet : function(key) {
        if (this.alphabet.indexOf(key.toLowerCase()) >= 0) {
            return true;
        }
        return false;
    },

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
    },

    updateElementText: function(id, text) {
        if (document.getElementById(id)) {
            document.getElementById(id).textContent = text;
        }
    },

    getElementText: function(id) {
        return document.getElementById(id).textContent;
    },

    playSound: function(src) {
        var audio = new Audio(src);
        audio.play();
    }
}

window.onresize = function(event) {
    console.log(window.innerWidth + 'x' + window.innerHeight);
}