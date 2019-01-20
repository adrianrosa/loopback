let getMigrations = require("../migrations");

module.exports = function(server) {

  server.dataSources.mysqlDs.automigrate('AccessToken', function(err) {
    //if (!err) console.log("Migration successfully: Access Token");
  });

  server.dataSources.mysqlDs.automigrate('ACL', function(err) {
    //if (!err) console.log("Migration successfully: ACL");
  });

  server.dataSources.mysqlDs.automigrate('Role', function(err) {
    //if (!err) console.log("Migration successfully: Role");
  });

  server.dataSources.mysqlDs.automigrate('RoleMapping', function(err) {
    //if (!err) console.log("Migration successfully: Role Mapping");
  });

  server.dataSources.mysqlDs.automigrate('User', function(err) {
    //if (!err) console.log("Migration successfully: User");
  });

  let ds = server.dataSources.mysqlDs;

  ds.connector.execute("SELECT MAX(migration) AS result FROM migrations;", null, function(err, records) {
    const lastMigration = records[0].result == null ? 0 : parseInt(records[0].result) + 1;
    let migrations = getMigrations();
    if (lastMigration < migrations.length) {
      for (let index = lastMigration; index < migrations.length; index++) {
        executeQuery(migrations[index].query, index, migrations[index].tag);
      }
    }
  });

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