import { logTable } from "./log.js";
import { usersTable } from "./users.js";

export const schema = {
    users: usersTable,
    log: logTable,
}