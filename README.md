# beat_omok_algorithm

This is a web game service to play omok against AI that was trained using reinforcement learning.

It consists of web server, websocket server, and db server.

This project is done as a part of the team project of team 32 in CS376 (Machine Learning) of KAIST.

# Web server

Web server was made with python(flask) and javascript.

It delivers html and javascript files to the client on request.

# Websocket server

Websocket server was made with python(websockets + asyncio).

It gets input from the player and plays as the algorithm.

# DB server

It was made with Mysql and python(SQLAlchemy).

It stores the match data between the user and the algorithm.

# [Algorithm](https://github.com/lumiknit/journey-to-learn-omok)

The algorithm uses policy network built with CNN layers to choose its moves. It was trained using reinforcement learning.

The algorithm was developed by [Hyogun Lee](https://github.com/lumiknit/) as the team project in CS376(Machine Learning) of KAIST.
