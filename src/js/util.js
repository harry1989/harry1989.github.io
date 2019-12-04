/**
 * Generic debounce utility
 * 
 * @param {Function} fn 
 * @param {Int} timeout 
 */
function debounce(fn, timeout){
    const timerInterval = timeout;
    let timer;
    
    return function(...args){
        if(!timer){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            fn.apply(null, args);     
        }, timerInterval)
    }
}

export {
    debounce
}