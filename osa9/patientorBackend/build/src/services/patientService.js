"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../data/db");
// this would be an emergency solution, for example if couldnt export
// it from .ts file as it is now.. well you know...
//const dbData: Array<Customer> = db as Array<Customer>;
const getEntries = () => {
    return db_1.db;
};
const addEntry = (newEntry) => {
    newEntry.id = db_1.db.length + 1;
    db_1.db.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    addEntry
};
