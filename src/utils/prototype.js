if(!String.prototype.hasOwnProperty('showDots')) {
    String.prototype.showDots = function(len) {
        return this.slice(0,len) + '...'
    }
}