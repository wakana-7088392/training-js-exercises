const stats = require("stats.js");
const BitSet = require("sets.js").BitSet;

let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]);
