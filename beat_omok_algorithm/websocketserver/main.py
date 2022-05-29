from game import *
from db import storedata
import datetime

async def serve(ws):
    starttime = str(datetime.datetime.now())[0:19]
    ip = str(ws.remote_address[0])
    print("[CONNECTED]" + ip)

    async def send(msg):
        try:
            if type(msg) is list:
                await ws.send("".join(map(str,msg)))
            else:
                await ws.send(str(msg))
        except:
            print("[ERROR] send to (" + ip + ") failed")

    async def recv():
        try:
            await ws.send("input")
            msg = await ws.recv()
            x = msg[0:2]
            y = msg[2:4]
            if int(x) > 9:
                x = chr(int(x) - 10 + ord('A'))
            else:
                x = msg[1]
            if int(y) > 9:
                y = chr(int(y) - 10 + ord('A'))
            else:
                y = msg[3]
            return x+y
        except:
            print("[GG]" + ip)
            return "gg"

    usercolor, winner, gg, history = await playAgainstAlgorithm(send,recv)
    if usercolor == 1:
        usercolor = "b"
    else:
        usercolor = "w"
    if winner == 1:
        winner = "b"
    elif winner == 2:
        winner = "w"
    else:
        winner = "d"
    if gg:
        gg = "t"
    else:
        gg = "f"

    endtime = str(datetime.datetime.now())[0:19]
    if len(history) >= 5: storedata(ip, "10hr weight", starttime, endtime, usercolor, winner, gg, historyparse(history))
    else: print("[" + ip + "] Game ended in less than 5 moves and is not recorded.")
    print("[DISCONNECTED]" + ip)

def historyparse(his):
    res = ""
    for move in his:
        x,y = move//15, move%15
        res += "%02d%02d" % (x,y)
    return res

async def main():
    server_ip = "localhost"
    port = 18765
    async with websockets.serve(serve, server_ip, port):
        await asyncio.Future()  # run forever

if __name__ == '__main__':
    init_nn()
    print("[SERVER ONLINE]\n")
    asyncio.run(main())