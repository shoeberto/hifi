var lastTic = Date.now();
var buzzes = {};

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
                if (!(file in buzzes)) {
                    buzzes[file] = new buzz.sound("sfx/" + file + ".ogg", {preload: true});
                }
                buzzes[file].play();
            }
        } else {
            alert('There was a problem with the request.');
        }
    }
}
