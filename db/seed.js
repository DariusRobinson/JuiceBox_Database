// grab our client with destructuring from the export in index.js
const { client, getAllUsers, createUser } = require("./index");


async function dropTables() {
    try {
        console.log("Starting to drop tables...");
        
        await client.query(`
        DROP TABLE IF EXISTS users;
        `);
        
        console.log("Finished dropping tables!");
    } catch (error) {
        console.error("Error dropping tables!");
        throw error; // we pass the error up to the function that calls dropTables
        }
        }
        async function testDB() {
  try {
    // connect the client to the database, finally
    client.connect();

    // queries are promises, so we can await them
    const users = await getAllUsers();
    // for now, logging is a fine way to see what's up
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}




// this function should call a query which creates all tables for our database
async function createTables() {
    try {
        console.log("Starting to build tables...");
        
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
            );
            `);
            console.log("Finished building tables!");
            
        } catch (error) {
            console.error("Error building tables!");
            throw error; // we pass the error up to the function that calls createTables
        }
    }
      
      // new function, should attempt to create a few users
      async function createInitialUsers() {
        try {
          console.log("Starting to create users...");
      
          const albert = await createUser({ username: 'albert', password: 'bertie99' });
          const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
          const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });
          console.log(albert );
          console.log(sandra);
          console.log(glamgal);
      
          console.log("Finished creating users!");
        } catch(error) {
          console.error("Error creating users!");
          throw error;
        }
      }


    async function rebuildDB() {
        try {
            client.connect();
            
            await dropTables();
            await createTables();
            await createInitialUsers();

        } catch (error) {
            console.error(error);
        }
    }

    async function testDB() {
      try {
        console.log("Starting to test database...");
        
       
        // queries are promises, so we can await them
        const users = await getAllUsers();
        // for now, logging is a fine way to see what's up
        console.log("getAllUsers:", users);
        
        console.log("Finished database tests!");
      } catch (error) {
        console.error("Error testing database!");
        console.error(error);
      }
    }
    
    rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
    
