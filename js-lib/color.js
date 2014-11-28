var wordNumber = module.exports.wordNumber = function (word) {
    // multiplying by 1..n means that anagrams will yield distinct
    // sums
    var s = word.split('').reduce(function(s, c, i) {
        return s + c.charCodeAt(0) * (i + 2);
    }, 0);
    return (s < 256) ? ((s * 3) + 128) : s;
};

var numberColor = module.exports.numberColor = function(num, s, l) {
    var h = num % 256;
    s = s || 90;
    l = l || 20;
    return 'hsl(' + [h,s+'%',l+'%'].join(',') + ')';
};

module.exports.wordColor = function(x, s, l) { return numberColor(wordNumber(x), s, l); };
