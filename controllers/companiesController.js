"use strict";
const db = require('../models/db');
module.exports = {
    index: async (ctx, next)=>{
        ctx.body = await db.companies.all();
    },

    get: async (ctx, id, next)=>{
        ctx.body = await db.companies.get(Number(id));
    },
    add: async (ctx, next)=>{
        await db.companies.add(ctx.request.body);
    },
    delete: async (ctx, id, next)=>{
        await db.companies.delete(Number(id));
    },
    update: async (ctx, id, next)=>{
        await db.companies.update(Number(id), await ctx.request.body);
    },

    getProducts: async(ctx, id, next)=>{
        ctx.body = await db.companies.getProducts(Number(id));
    },

    addProduct: async(ctx, compId, prodId, next)=>{
        await db.companies.addProduct(Number(compId), Number(prodId));
    },
    deleteProduct: async(ctx, compId, prodId, next)=>{
        await db.companies.deleteProduct(Number(compId), Number(prodId));
    }

}
