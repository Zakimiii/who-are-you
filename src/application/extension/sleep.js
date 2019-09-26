export function sleep(waitSec, callbackFunc) {
    if (waitSec == 0) {
        callbackFunc();
        return;
    }
    var spanedSec = 0;
    var id = setInterval(function() {
        spanedSec++;
        if (spanedSec >= waitSec) {
            clearInterval(id);
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
}
