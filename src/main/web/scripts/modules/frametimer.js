/**
 * frametimer.js
 * 
 * Simple time passed comparator to determine when the next sprite image
 * should be used.
 * 
 * idea from: CodeUtopia's animation tutorial.
 * 
 */

//TODO: Change to run when document is loaded.

var FrameTimer = function() {
    this._lastTick = (new Date()).getTime();
};
 
FrameTimer.prototype = {
    getSeconds: function() {
        var seconds = this._frameSpacing / 1000;
        if(isNaN(seconds)) {
            return 0;
        }
 
        return seconds;
    },
 
    tick: function() {
        var currentTick = (new Date()).getTime();
        this._frameSpacing = currentTick - this._lastTick + 5;
        this._lastTick = currentTick;
    }
};