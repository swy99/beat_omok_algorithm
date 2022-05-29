DROP TABLE IF EXISTS match_info;
CREATE TABLE match_info (
  userid VARCHAR(20),
  algorithm_user VARCHAR(20),
  start_time DATETIME,
  match_time TIME,
  user_stonecolor CHAR(1),
  winner_stonecolor CHAR(1),
  timeout CHAR(1),
  move_history VARCHAR(1444)
) DEFAULT CHARSET UTF8;