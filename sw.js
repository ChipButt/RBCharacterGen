const CACHE_NAME='rb600-offline-v10';

const ROOT=[
  './','./index.html','./player.html','./gm.html','./offline.js',
  './player_transform.js','./player_rules.js','./player_items_sheet_ui.js',
  './player_action_core.js','./player_actions_bard_warlock.js','./player_actions_sorc_wizard.js',
  './player_actions_divine.js','./player_actions_highlevel.js','./player_actions_traits.js',
  './600_second_dnd_character_player_v21.html','./600 Second logo.png',
  './gm_v3.css','./gm_v3.js','./gm_fit.js','./gm_fit_all.js','./gm_export.js','./gm_export_builder.js'
];
const GM=['01_roll_britannia_logo.png','02_600_second_dnd_title.png','03_top_brush_stroke.png','04_middle_brush_stroke.png','05_small_left_pill.png','06_small_center_pill.png','07_small_right_pill.png','08_bottom_brush_stroke.png'].map(x=>'./600_Second_DnD_Individual_Assets/'+x);
const PUZZLES=['01_the_missing_torch.png','02_the_three_buttons.png','03_the_silent_bell.png','04_the_candle_order.png','05_the_empty_pedestal.png','06_the_shadow_key.png','07_the_numbered_stones.png','08_the_sleeping_face.png','09_the_upside_down_message.png','10_the_four_seasons.png'].map(x=>'./DnD_Puzzle_Cards_10/'+x);
const MONSTERS=['01_Cave_Gobbler.png','02_Skeleton_Guard.png','03_Giant_Dungeon_Rat.png','04_Bog_Slime.png','05_Kobold_Bomb_Thrower.png','06_Graveyard_Ghoul.png','07_Fire_Beetle_Queen.png','08_Mushroom_Brute.png','09_Stone_Guardian.png','10_Goblin_Chief.png'].map(x=>'./DnD_Monster_Stat_Cards_10/'+x);
const SPECIES=['aarakocra','aasimar','dragonborn','dwarf','elf','firbolg','genasi','gnome','goblin','goliath','half_elf','half_orc','halfling','human','kenku','kobold','tabaxi','tiefling','triton','yuan_ti'].map(x=>'./dnd20_species_headshots_v15/'+x+'.png');
const PRECACHE=[...ROOT,...GM,...PUZZLES,...MONSTERS,...SPECIES];

const clean=input=>{const u=new URL(typeof input==='string'?input:input.url,self.registration.scope);u.search='';u.hash='';return u.toString()};
async function cacheOne(cache,path){
  const url=clean(path);
  if(await cache.match(url,{ignoreSearch:true}))return true;
  try{const r=await fetch(new Request(url,{cache:'reload'}));if(r?.ok){await cache.put(url,r.clone());return true}}catch(e){console.warn('Offline cache failed',url,e)}
  return false;
}
async function warm(){const c=await caches.open(CACHE_NAME);await Promise.allSettled(PRECACHE.map(x=>cacheOne(c,x)))}
self.addEventListener('install',e=>e.waitUntil((async()=>{await warm();await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const n of await caches.keys())if(n.startsWith('rb600-offline-')&&n!==CACHE_NAME)await caches.delete(n);await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data?.type==='WARM_CACHE')e.waitUntil((async()=>{await warm();e.ports?.[0]?.postMessage({type:'OFFLINE_READY'})})())});
async function cached(req){const c=await caches.open(CACHE_NAME);return await c.match(req,{ignoreSearch:true})||await c.match(clean(req),{ignoreSearch:true})}
async function network(req){const c=await caches.open(CACHE_NAME);const r=await fetch(req);if(r?.ok)await c.put(clean(req),r.clone());return r}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  e.respondWith((async()=>{const hit=await cached(r);if(hit){network(r).catch(()=>{});return hit}try{return await network(r)}catch(err){if(r.mode==='navigate'||r.destination==='document'){const f=await cached(new Request(new URL('./index.html',self.registration.scope)));if(f)return f}throw err}})());
});