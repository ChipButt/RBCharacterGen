const CACHE_NAME='rb600-offline-v8';

const PRECACHE=[
  './',
  './index.html',
  './player.html',
  './gm.html',
  './offline.js',
  './player_transform.js',
  './player_rules.js',
  './player_action_core.js',
  './player_actions_bard_warlock.js',
  './player_actions_sorc_wizard.js',
  './player_actions_divine.js',
  './player_actions_traits.js',
  './600_second_dnd_character_player_v21.html',
  './600 Second logo.png',
  './gm_v3.css',
  './gm_v3.js',
  './gm_fit.js',
  './gm_fit_all.js',
  './gm_export.js',
  './gm_export_builder.js',

  './600_Second_DnD_Individual_Assets/01_roll_britannia_logo.png',
  './600_Second_DnD_Individual_Assets/02_600_second_dnd_title.png',
  './600_Second_DnD_Individual_Assets/03_top_brush_stroke.png',
  './600_Second_DnD_Individual_Assets/04_middle_brush_stroke.png',
  './600_Second_DnD_Individual_Assets/05_small_left_pill.png',
  './600_Second_DnD_Individual_Assets/06_small_center_pill.png',
  './600_Second_DnD_Individual_Assets/07_small_right_pill.png',
  './600_Second_DnD_Individual_Assets/08_bottom_brush_stroke.png',

  './DnD_Puzzle_Cards_10/01_the_missing_torch.png',
  './DnD_Puzzle_Cards_10/02_the_three_buttons.png',
  './DnD_Puzzle_Cards_10/03_the_silent_bell.png',
  './DnD_Puzzle_Cards_10/04_the_candle_order.png',
  './DnD_Puzzle_Cards_10/05_the_empty_pedestal.png',
  './DnD_Puzzle_Cards_10/06_the_shadow_key.png',
  './DnD_Puzzle_Cards_10/07_the_numbered_stones.png',
  './DnD_Puzzle_Cards_10/08_the_sleeping_face.png',
  './DnD_Puzzle_Cards_10/09_the_upside_down_message.png',
  './DnD_Puzzle_Cards_10/10_the_four_seasons.png',

  './DnD_Monster_Stat_Cards_10/01_Cave_Gobbler.png',
  './DnD_Monster_Stat_Cards_10/02_Skeleton_Guard.png',
  './DnD_Monster_Stat_Cards_10/03_Giant_Dungeon_Rat.png',
  './DnD_Monster_Stat_Cards_10/04_Bog_Slime.png',
  './DnD_Monster_Stat_Cards_10/05_Kobold_Bomb_Thrower.png',
  './DnD_Monster_Stat_Cards_10/06_Graveyard_Ghoul.png',
  './DnD_Monster_Stat_Cards_10/07_Fire_Beetle_Queen.png',
  './DnD_Monster_Stat_Cards_10/08_Mushroom_Brute.png',
  './DnD_Monster_Stat_Cards_10/09_Stone_Guardian.png',
  './DnD_Monster_Stat_Cards_10/10_Goblin_Chief.png',

  './dnd20_species_headshots_v15/aarakocra.png',
  './dnd20_species_headshots_v15/aasimar.png',
  './dnd20_species_headshots_v15/dragonborn.png',
  './dnd20_species_headshots_v15/dwarf.png',
  './dnd20_species_headshots_v15/elf.png',
  './dnd20_species_headshots_v15/firbolg.png',
  './dnd20_species_headshots_v15/genasi.png',
  './dnd20_species_headshots_v15/gnome.png',
  './dnd20_species_headshots_v15/goblin.png',
  './dnd20_species_headshots_v15/goliath.png',
  './dnd20_species_headshots_v15/half_elf.png',
  './dnd20_species_headshots_v15/half_orc.png',
  './dnd20_species_headshots_v15/halfling.png',
  './dnd20_species_headshots_v15/human.png',
  './dnd20_species_headshots_v15/kenku.png',
  './dnd20_species_headshots_v15/kobold.png',
  './dnd20_species_headshots_v15/tabaxi.png',
  './dnd20_species_headshots_v15/tiefling.png',
  './dnd20_species_headshots_v15/triton.png',
  './dnd20_species_headshots_v15/yuan_ti.png'
];

function cleanRequestUrl(input){
  const url=new URL(typeof input==='string'?input:input.url,self.registration.scope);
  url.search='';
  url.hash='';
  return url.toString();
}

async function precacheOne(cache,path){
  const url=cleanRequestUrl(path);
  const existing=await cache.match(url,{ignoreSearch:true});
  if(existing) return true;
  try{
    const response=await fetch(new Request(url,{cache:'reload'}));
    if(response && response.ok){
      await cache.put(url,response.clone());
      return true;
    }
    console.warn('Offline cache skipped',url,response?.status);
  }catch(err){
    console.warn('Offline cache failed',url,err);
  }
  return false;
}

async function warmCache(){
  const cache=await caches.open(CACHE_NAME);
  await Promise.allSettled(PRECACHE.map(path=>precacheOne(cache,path)));
}

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    await warmCache();
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(
      names
        .filter(name=>name.startsWith('rb600-offline-') && name!==CACHE_NAME)
        .map(name=>caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('message',event=>{
  if(event.data?.type!=='WARM_CACHE') return;
  event.waitUntil((async()=>{
    await warmCache();
    if(event.ports?.[0]) event.ports[0].postMessage({type:'OFFLINE_READY'});
  })());
});

async function cachedResponse(request){
  const cache=await caches.open(CACHE_NAME);
  return (
    await cache.match(request,{ignoreSearch:true}) ||
    await cache.match(cleanRequestUrl(request),{ignoreSearch:true})
  );
}

async function fetchAndCache(request){
  const cache=await caches.open(CACHE_NAME);
  const response=await fetch(request);
  if(response && response.ok){
    await cache.put(cleanRequestUrl(request),response.clone());
  }
  return response;
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  event.respondWith((async()=>{
    const cached=await cachedResponse(request);
    if(cached){
      fetchAndCache(request).catch(()=>{});
      return cached;
    }
    try{
      return await fetchAndCache(request);
    }catch(err){
      if(request.mode==='navigate' || request.destination==='document'){
        const fallback=await cachedResponse(new Request(new URL('./index.html',self.registration.scope)));
        if(fallback) return fallback;
      }
      throw err;
    }
  })());
});