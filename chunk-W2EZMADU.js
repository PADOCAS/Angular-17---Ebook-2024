import{a as s,fa as r}from"./chunk-QUZ462WQ.js";import{$ as n,ea as o}from"./chunk-D4MAV7ZB.js";var f=(()=>{let e=class e{constructor(t){this.http=t}getFornecedores(){return this.http.get(r.api+"fornecedores")}salvar(t){return t.id!==null&&t.id!==0?this.http.put(r.api+"fornecedores/"+t.id,t):this.http.post(r.api+"fornecedores",t)}pegar(t){return this.http.get(r.api+"fornecedores/"+t)}deletar(t){return this.http.delete(r.api+"fornecedores/"+t)}};e.\u0275fac=function(p){return new(p||e)(o(s))},e.\u0275prov=n({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();export{f as a};
