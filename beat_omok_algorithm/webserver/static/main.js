const board = new OmokBoard(15);
var socket;
const ip = "localhost";
const port = 18765;

init();


function init() {
    socket = new WebSocket("ws://"+ip+":"+port);
    socket.onopen = function(message) {
        console.log("open");
    };
    socket.onclose = function(message) {
        console.log("disconnected");
    };
    socket.onerror = function(message) {
        console.log("error");
    };
    socket.onmessage = function(message) {
        const msg = message.data;
        if(msg == "input") {
            board.inputcolor = board.nextplayercolor;
            board.getInput = true;
        }
        else if(msg == "0"){
            console.log("draw");
        }
        else if(msg == "1") {
            console.log("win");
        }
        else if(msg == "2") {
            console.log("lose");
        }
        else {
            var statechange = false;
            for(var i=0;i<board.size;i++) {
                for(var j=0;j<board.size;j++) {
                    if(board.state[i][j] != parseInt(msg[i*board.size + j])) {
                        board.state[i][j] = parseInt(msg[i*board.size + j]);
                        statechange = true;
                    }
                }
            }
            
            if(statechange) {
                board.render();
            }
        }
    };

        
    document.addEventListener("click", e=>{clickHandler(e.offsetX,e.offsetY)});
    document.addEventListener("mousemove", e=>{mousemoveHandler(e.offsetX,e.offsetY)});
    board.render();
    board.inputfunction = (i,j) => {
        var x = "", y = "";
        if(i<10) x += "0" + i;
        else x += i;
        if(j<10) y += "0" + j;
        else y += j;
        socket.send(x+y);
        board.getInput = false;
    }
}

function clickHandler(x,y) {
    board.clickHandler(x,y);
}

function mousemoveHandler(x,y) {
    board.mousemoveHandler(x,y);
}