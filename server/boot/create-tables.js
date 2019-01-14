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
  });

  server.dataSources.mysqlDs.automigrate('otra', function(err) {
    if (err) throw err;
  });
  /*server.dataSources.mysqlDs.discoverAndBuildModels(
    'otra',
    {relations: true},
    function(err, models) {
      if (err) throw(err);

      // Step 2: expose all new models via REST API
      for (const modelName in models) {
        app.model(models[modelName], {dataSource: dataSource});
      }
    });

  server.dataSources.mysqlDs.automigrate('category', function(err) {
      if (err) throw err;
  
      server.models.category.create([{
        name: 'Accesories',
        enable: true
      }, {
        name: 'Memories',
        enable: true
      }], function(err, Category) {
        if (err) throw err;
  
        console.log('Category created: \n', Category);
      });
  });

  server.dataSources.mysqlDs.automigrate('product', function(err) {
    if (err) throw err;

    server.models.product.create([{
      name: 'Headset Logitech',
      price: 70,
      categoryId: 1
    }, {
      name: 'Kingston 8GB DDR5',
      price: 110,
      categoryId: 2
    }], function(err, Product) {
      if (err) throw err;

      console.log('Product created: \n', Product);
    });
  });*/

  //server.dataSources.mysqlDs.autoupdate();

  let ds = server.dataSources.mysqlDs;
  let migrations = new Array();
  migrations["0"] = "CREATE TABLE otra (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
  migrations["1"] = "CREATE TABLE otra2 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
  migrations["2"] = "CREATE TABLE otra3 (id INT PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);";
  
  ds.connector.execute("SELECT MAX(migration) AS result FROM migrations;", null, function(err, records) {
    let lastMigration = records[0].result;
    if (migrations.length == lastMigration) {
      console.log("Migrations up to now");
      return;
    }
    console.log("Last migration: "+ lastMigration);
    console.log("Count of the migrations: "+ migrations.length);
    let starter = !lastMigration || lastMigration == 0 ? 0 : migrations.length - lastMigration;
    console.log("Starter: " + starter);
    for (let index = starter-1; index < migrations.length; index++) {
      console.log(migrations[index]);
      if (!migrations[index]) {
        //executeQuery(migrations[index], index);
      }
    }
  });

  function executeQuery(query, migrationNumber) {
    ds.connector.execute(query, null, function(err) {
      if (!err) {
        ds.connector.execute("INSERT INTO migrations (migration, created_at) VALUES ('"+ migrationNumber + "', '2018-01-14');", null, function(err) {
          if (err) {
           console.error("Error migrations record");
           return;
          }
          console.log("Migration successfully");
        });
        return;
      }
      console.error(err);
    });
  }
};