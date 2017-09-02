"use strict";
const products = [{id: 0, name: 'p0'},{id:1, name: 'p1'},{id:2, name: 'p2'}, {id:3, name: 'p3'}, {id:4, name: 'p4'}];
const companies = [{id: 0, name: 'c0'},{id:1, name: 'c1'}, {id:2, name: 'c2'}, {id:3, name: 'c3'}, {id:4, name: 'c4'}];
const errorWithType = require('./ErrorWithType.js');
const errTypes = require('../constants/errorTypes.js');
let CID = 4, PID = 4;
const errorDbNotFound = (msg)=>{
  return errorWithType(msg, errTypes.DBNOTFOUND);
}
const getProducstOfCompany = (compId)=>{
   const rv = [];
   products.forEach((p)=>{
      if(p.compId === compId){
          rv.push(p);
      }
   });
   return rv;
};

const replaceWith = (arr, id, value)=>{
    const ind = arr.findIndex(x => x.id == id);
    arr[idnex] = value;
}


//this functions shuld return promisees in real world so will use tehm with await in this app
module.exports = {
    products: {
        name: 'products',
        list: [],
        clean: false,
        load: function(){
            if(!this.clean){
                this.list = products;
                this.clean = true;
            }
        },
        all: function(){
            this.load();   
            return this.list;
        },
        get: function(id){
            this.load();
            const ind = this.list.findIndex(p=> p.id === id);
            if(ind == -1){
                throw errorDbNotFound(`no product with id ${id} exists`) 
            }   
            return this.list[ind];
        },
        add: function(prod){
            prod.id = ++PID;
            products.push(prod);
            this.clean = false;
        },
        delete: function(id){
            if(!products.find(p=> p.id === id)){
                throw errorDbNotFound(`no product with id ${id} exists`) 
            }
            products.splice(id,1);
            this.clean = false;
        },
        update: function(id, prod){
            if(!products.find(p=> p.id === id)){
                throw errorDbNotFound(`no product with id ${id} exists`) 
            }
            replaceWith(products,id,pord);
            this.clean = false;
        }
    },

   companies: {
       load: function(){
          if(!this.clean){
              this.list = companies;
              this.clean = true;
          }
       },
       all: function(){
           this.load();
           return this.list;
       },
       get: function(id){
           this.load();
           const ind = this.list.findIndex(c=> c.id === id);
           if(ind === -1){
               throw errorDbNotFound(`no company with id ${id} exists`);
           }
           return this.list[ind];
       },
       add: function(comp){
           comp.id = ++CID;
           companies.push(comp);
           this.clean = false;
       },
       delete: function(id){     
           if(!companies.find(c=> c.id === id)){
               throw errorDbNotFound(`no company with id ${id} exists`);
           }
           companies.splice(id,1);
           this.clean = false;
       },
       update: function(id, comp){
          if(!companies.find(c=> c.id === id)){
               throw errorDbNotFound(`no company with id ${id} exists`);
           }
           replaceWith(companies, id, comp);
           this.clean = false;
       },
       addProduct: function(compId, prodId){
           const prodIndex = products.findIndex(p=>p.id === prodId);
           if(prodIndex === -1){
               throw errorDbNotFound(`no prodct with id ${prodId} exists`);
           }
           if(!companies.find(c=> c.id === compId)){
               throw errorDbNotFound(`no company with id ${compId} exists`);
           }
           products[prodIndex].compId = compId;
       },

       getProducts: function(compId){
          if(!companies.find(c=> c.id === compId)){
            throw errorDbNotFound(`no company with id ${compId} exists`) 
          }
          return getProducstOfCompany(compId);
       }, 

       deleteProduct: function(compId, prodId){
          const prodIndex = products.findIndex(p=>p.id === prodId);
          if(prodIndex === -1){
             throw errorDbNotFound(`no product with id ${compId} exists`);         
          }
          if(products[prodIndex].compId !== compId){
             throw errorDbNotFound(`product with id ${prodId} doesn't belong to company with id ${compId}`);
          }
          products[prodIndex].compId = null;
       }
   }
}
