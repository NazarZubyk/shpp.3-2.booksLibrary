CREATE DATABASE IF NOT EXISTS myDB;

CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '111111112';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
