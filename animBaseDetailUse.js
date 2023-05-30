import animBaseDetail from "./animBaseDetail$p.js";

let characterdatabase=JSON.parse(localStorage.getItem("characterdata"));
console.log("characterdatabase:",characterdatabase);
new animBaseDetail(characterdatabase['src'],true,characterdatabase);

