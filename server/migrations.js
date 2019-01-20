module.exports = function () {
    let migrations = new Array();
    migrations[0] = {query: "CREATE TABLE otra (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);", tag: "CREATE otra"};
    migrations[1] = {query: "CREATE TABLE otra2 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);", tag: "CREATE otra2"};
    migrations[2] = {query: "CREATE TABLE otra3 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);", tag: "CREATE otra3"};
    migrations[3] = {query: "CREATE TABLE otra4 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);", tag: "CREATE otra4"};
    migrations[4] = {query: "CREATE TABLE otra5 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);", tag: "CREATE otra5"};
    // Add more migrations here ...
    return migrations;
}