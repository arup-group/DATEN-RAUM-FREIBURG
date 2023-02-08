/**
 * Helper query calls
 */
import { createTables, insertIntoTables } from "./queryFunctions";
(async () => {
  await createTables();
  await insertIntoTables();
})();
