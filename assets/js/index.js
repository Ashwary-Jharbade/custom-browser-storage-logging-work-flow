import logProvider from "./providers/provider.js";

let obj = {};
obj = logProvider(obj,"session");
obj.name = "Pikachu";
obj.class = "Pokemon";
obj.type = "Electric";
delete obj.class
console.log(obj);