$(document).ready(function(){
    lowLag.init({
        'urlPrefix': 'sfx/',
        'audioTagTimeToLive': 30000
    });
});

var lastTic = Date.now();
var loadedSounds = [];

window.setInterval(checkQueue, 500);

function checkQueue() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener("load", queueResponse);
    httpRequest.open('POST', 'php/queue.php', true);
    var tic = Date.now();
    var range = "start=" + lastTic + "&end=" + tic;

    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.setRequestHeader('Content-Length', range.length);
    httpRequest.send(range);
    lastTic = tic;
}

function queueResponse() {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            var files = JSON.parse(this.responseText);
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                if (-1 == loadedSounds.indexOf(file)) {
                    lowLag.load([file + ".ogg"], file);
                    loadedSounds.push(file);
                }
                lowLag.play(file);
            }
        } else {
            alert('There was a problem with the request.');
        }
    }
}
