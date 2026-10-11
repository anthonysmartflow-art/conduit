import fs from 'node:fs';import sharp from 'sharp';import {load} from 'cheerio';
const path='content/article.json';const article=JSON.parse(fs.readFileSync(path,'utf8'));const $=load(article.html,null,false);let originalBytes=0,optimizedBytes=0;
for(const el of $('img').toArray()){
 const src=$(el).attr('src');const file='public'+src;const meta=await sharp(file).metadata();originalBytes+=fs.statSync(file).size;const sizes=[...new Set([Math.min(400,meta.width),Math.min(800,meta.width),Math.min(1600,meta.width)])];const candidates=[];
 for(const width of sizes){const dest=src.replace(/\.[^.]+$/,`-${width}.webp`);await sharp(file).resize({width,withoutEnlargement:true}).webp({quality:85}).toFile('public'+dest);candidates.push(`${dest} ${width}w`);if(width===sizes.at(-1))optimizedBytes+=fs.statSync('public'+dest).size;}
 $(el).attr('srcset',candidates.join(', ')).attr('sizes',$(el).closest('.image-row').length?'200px':'(max-width: 780px) calc(100vw - 40px), 790px').attr('width',meta.width).attr('height',meta.height);
}
article.html=$.html();fs.writeFileSync(path,JSON.stringify(article,null,2)+'\n');console.log({originalBytes,optimizedBytes});
