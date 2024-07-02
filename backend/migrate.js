// Runs the migration.sql file in the migrations folder to create the tables in the database

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import supabaseAdmin from "./config/supabaseAdmin.js"

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigration = async () => {
    const migrationFilePath = path.join(__dirname, 'migrations', 'migration-020724-1602.sql');
    const migrationQuery = fs.readFileSync(migrationFilePath, { encoding: "utf-8" });

    const queries = migrationQuery.split(";").filter(query => query.trim() !== "");

    // Run each query in the migration file using the execute_migration RPC function
    for (const query of queries) {
        const { error } = await supabaseAdmin.rpc('execute_migration', { migration_sql: query });
        if (error) {
            console.error("Error running migration:", error);
            break;
        } else {
            console.log("Migration query executed successfully");
        }
    }
};

runMigration();
