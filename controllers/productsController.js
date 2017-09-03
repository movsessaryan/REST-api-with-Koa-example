"use strict";
const db = require('../models/db');
module.exports = {
    index: async(ctx, next)=>{
        ctx.body = await db.products.all();
    },

    get: async(ctx, id, next)=>{
        ctx.body = await db.products.get(Number(id));
    },
    add: async(ctx, next)=>{
        await db.products.add( await ctx.request.body);
    },
    delete: async(ctx, id, next)=>{
        await db.products.delete(Number(id));
    },
    update: async(ctx, id, next)=>{
        await db.products.update(Number(id), await ctx.request.body);
    }

};