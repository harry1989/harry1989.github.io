/**
 * Initializer
 */

import {debounce} from './util.js'
import Autocomplete from './autocomplete.js'
import {getSuggestions} from './Suggestion.js'

window.onload = function(){
    var autoComplete;

    // debounce it for 100ms
    $('#searchBox').on('keyup', debounce(function(event, ui){

        var selStart = event.target.selectionStart;
        var selEnd = event.target.selectionEnd;
        var value = $(event.target).val();
        
        var wordToGetSuggestion;
        if (selStart == selEnd && selEnd == value.length){
            //cursor is at the last position
            //get the last word.
            wordToGetSuggestion = value.split(' ').pop();
        } else {
            //if selection has multiple words, then we get the
            //first word
            wordToGetSuggestion = value.substr(0, selStart).split(' ').pop();
        };

        // set the cursor starting position.
        $(event.target).data('cursor', selStart);

        getSuggestions(wordToGetSuggestion).done(function(matches){
            autoComplete.render(matches);
        });
        

    }, 100));

    var autoCompletSelector = function(ele, selectedItem){
        var existingValue = ele.val();
        var values = existingValue.split(' ');
        var selectedValue = selectedItem;

        // store the last cursor position, 
        var cursorPosition = ele.data('cursor');
        var to_set = '';
        if(cursorPosition == existingValue.length) {
            values.pop();
            values.push(selectedItem);
            to_set = values.join(' ');
        } else {
            var before = existingValue.substr(0,cursorPosition).lastIndexOf(' ');
            var after = existingValue.substr(cursorPosition).indexOf(' ');
            if(before != -1){
                to_set = existingValue.substr(0, before) + ' '
            }
            to_set += selectedItem;
            if(after != -1){
                to_set += existingValue.substr(cursorPosition + after)
            }
        }
        ele.val(to_set);
        // after selecting it close it.
        autoComplete.close();
    }

    autoComplete = new Autocomplete('#searchBox', {
        select: autoCompletSelector
    });
}

