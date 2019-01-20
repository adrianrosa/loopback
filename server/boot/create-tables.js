module.exports = function(server) {

  /*if(process.env.NODE_ENV == "production" || !process.env.SEED_DATA || process.env.SEED_DATA == "false") {
    server.dataSources.mysqlDs.automigrate();
    server.dataSources.mysqlDs.autoupdate();
    console.log("Tables created successfully");
    return;
  }*/

  /*server.dataSources.mysqlDs.automigrate('AccessToken', function(err) {
    if (err) throw err;
  });

  server.dataSources.mysqlDs.automigrate('ACL', function(err) {
    if (err) throw err;
  });

  server.dataSources.mysqlDs.automigrate('Role', function(err) {
    if (err) throw err;
  });

  server.dataSources.mysqlDs.automigrate('RoleMapping', function(err) {
    if (err) throw err;
  });

  server.dataSources.mysqlDs.automigrate('User', function(err) {
    if (err) throw err;
  });*/

  let ds = server.dataSources.mysqlDs;

  ds.connector.execute("SELECT MAX(migration) AS result FROM migrations;", null, function(err, records) {
    const lastMigration = records[0].result == null ? 0 : parseInt(records[0].result) + 1;
    let migrations = getMigrations();
    if (lastMigration < migrations.length) {
      for (let index = lastMigration; index < migrations.length; index++) {
        executeQuery(migrations[index], index, "table");
      }
    }
  });

  function getMigrations() {
    let migrations = new Array();
    migrations[0] = "CREATE TABLE otra (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
    migrations[1] = "CREATE TABLE otra2 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
    migrations[2] = "CREATE TABLE otra3 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
    migrations[3] = "CREATE TABLE otra4 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
    migrations[4] = "CREATE TABLE otra5 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
    return migrations;
  }

  function executeQuery(query, migrationNumber, name) {
    ds.connector.execute(query, null, function(err) {
      if (!err) {
        let current = new Date();
        let currentFormated = current.getFullYear() + "-" + ("00" + (current.getMonth()+1)).slice(-2) + "-" + ("00" + current.getDate()).slice(-2) + " " + ("00" + current.getHours()).slice(-2) + ":" + ("00" + current.getMinutes()).slice(-2) + ":" + ("00" + current.getSeconds()).slice(-2);
        ds.connector.execute("INSERT INTO migrations (migration, created_at) VALUES ('"+ migrationNumber + "', '" + currentFormated + "');", null, function(err) {
          if (err) {
           console.error("Error migrations record");
           return;
          }
          console.log("Migration successfully: " + name);
        });
        return;
      }
      console.error(err);
    });
  }
};