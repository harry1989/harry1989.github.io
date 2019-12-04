export default class Autocomplete {

    constructor(selector, options){
        this.eleselector = selector;
        this.options = $.extend(defaultOptions, options, {})
        this.containerSelector = this.eleselector + '-container';
        this.items = options.items || [];

        _initialize();
    }

    /**
     * Initializes the DOM for the autocomplete. Does thhis
     * eagerly instead of on-demand/on the fly.
     */
    _initialize(){
        if ($(this.containerSelector).length == 0){
            $('body').append('<div id="' + this.containerSelector + '"></div>')
        }

        _attachEvents();
    }

    /**
     * handles only the click/select event. However we can
     * handle keyboard naviagtion to move up/down.
     */
    _attachEvents(){
        $(this.containerSelector).on('click', 'a', function(){
            var targetEle = event.target;
            var selectedValue = targetEle.dataset.name;
            this.options.select($(this.eleselector), selectedValue)
        });
    };

    /**
     *  Opens the autocomplete list
     */
    open(){
        $(this.containerSelector).show();
    }

    /**
     * Close the autocomplete list.
     */
    close(){
        $(this.containerSelector).hide();
    }

    setItems(items){
        this.items = items;
        this.generateList();
    }

    generateList(){
        var html = "<ul><li>" + this.items.map(function(item) {
            return "<a href='' data-name='" + item + "'>" + item + "</a>"
        }).reduce((a, b) => a + "</li><li>" + b) + "</li><ul>"

        this.containerSelector.html(html)
    }

    render(items){
        this.setItems(items);
        this.open();
    }
}
