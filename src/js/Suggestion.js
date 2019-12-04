/**
 * @param word to get the suggestion from
 * @returns Promise 
 */
var lastWord, lastWordPromise;

function wordSuggestions(word){  
    var defer = $.Deferred();
    var matches = ['_pre_$', '_pre_$_post', '$_post'];
    var to_return = {
        word: word,
        matches: matches.map(a => a.replace('$', word)).concat([word])
    }

    //random timeout
    setTimeout(function(){
        defer.resolve(to_return)
    }, Math.floor(Math.random * 1000));

    return defer.promise();
}


/**
 * hanldes the out of order suggestions properly.
 */
function getSuggestions(word){
    
    if(lastWordPromise) {
        getWords(word);
        return lastWordPromise;
    }

    let defer = new $.Deferred();
    lastWordPromise = defer.promise();
    lastWord = word;

    function getWords(wrd){
        wordSuggestions(wrd).done(function(res){
            if(res && res.word == lastWord){
                defer.resolve(res.matches)
            }

            lastWordPromise = null;
            lastWord = null;
        });
    }

    getWords(word);
    return lastWordPromise;
}

export {
    getSuggestions
}