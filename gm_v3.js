const SETTINGS=[
{name:'Farming Village',setup:'A small farming village is halfway through a frantic market day. Muddy lanes, low stone walls and animal pens make everything feel busy.',ending:'the whole village gathers in the square as the crisis settles',press:['A frightened herd starts moving toward the main road.','The market bell rings and the buyer is about to leave.','A storm rolls over the fields and makes every path worse.']},
{name:'Crumbling Watchtower',setup:'A lonely watchtower leans over the road, its upper floor open to the wind and its stairs cracked with age.',ending:'the tower groans behind the party as they emerge with what they came for',press:['Loose stones begin falling from above.','A rival group can be seen approaching.','The old bell starts tolling by itself.']},
{name:'Misty Forest',setup:'The trail disappears into a wet forest where every tree looks almost identical. Mist hangs at shoulder height and sounds carry strangely.',ending:'the mist thins and a clear path opens back toward civilisation',press:['The mist thickens enough to erase the path behind them.','Distant howls grow closer whenever they stop.','The last daylight is fading.']},
{name:'Busy Market Town',setup:'A crowded market town is packed with carts, hawkers, guards and people who are all in somebody else’s way.',ending:'the market erupts into cheers and immediate exaggeration about what the party just did',press:['The town gates will close at the next bell.','A procession blocks more streets every minute.','The person they need is preparing to leave.']},
{name:'Abandoned Mine',setup:'The old mine smells of wet timber and iron. Rusted rails vanish into black tunnels and every sound echoes from deeper below.',ending:'the party reaches daylight just as the old workings settle behind them',press:['Support beams begin cracking in sequence.','Their lantern fuel is visibly running low.','A flooded lower tunnel is rising.']},
{name:'Riverside Docks',setup:'Rain-slick docks stretch along a fast river crowded with barges, ropes and shouting workers.',ending:'the river carries away the last sign of trouble as the docks return to noisy normality',press:['The tide is turning and a key boat is leaving.','A crane cable starts to fray.','Harbour guards are closing the area pier by pier.']},
{name:'Snowbound Mountain Pass',setup:'A narrow mountain pass is almost buried by fresh snow. Wind cuts visibility to a few dozen feet.',ending:'the clouds break just enough to reveal the safe road down the far side',press:['Fresh snow starts sliding from the ridge.','The temperature drops sharply.','Tracks behind the group are being erased.']},
{name:'Haunted Manor',setup:'An abandoned manor stands unnaturally intact behind iron gates. Dust covers every surface, but fresh footprints cross the hall.',ending:'the house falls silent for the first time in years as dawn reaches the windows',press:['A grandfather clock begins counting down.','Doors behind the party start locking themselves.','The burning upstairs lamp moves from room to room.']},
{name:'Ancient Ruin',setup:'Half-buried ruins break through the earth like the bones of a forgotten city. Symbols repeat across the stones.',ending:'the ruins settle and the newly revealed route points clearly toward safety',press:['The ground begins trembling.','Another explorer is closing in on the objective.','A stone doorway is slowly sealing.']},
{name:'Festival Grounds',setup:'A colourful festival has spilled across a field of tents, food stalls and temporary stages. Everyone is already in a hurry.',ending:'music and cheering swallow the last of the panic as the event finally begins',press:['The opening ceremony is minutes away.','A crowd starts moving into the wrong area.','A key organiser threatens to cancel the event.']}
];

const PROBLEMS=[
{name:'Round Up the Escaped Sheep',role:'Farmer',goal:'round up six escaped prize sheep before they scatter beyond the area',why:'The farmer’s entire season depends on selling the animals today.',quote:['My prize sheep have broken out and they are heading in every direction.','Get all six back to me before they disappear and I will make it worth your while.'],comp:'One animal reaches the most dangerous part of the setting.',success:'the final sheep is returned just in time'},
{name:'Recover the Mayor’s Chest',role:'Mayor',goal:'retrieve a locked municipal chest that was taken somewhere dangerous',why:'It contains documents and coin needed before the town can finish an urgent deal.',quote:['I need that chest back before anyone else gets their hands on it.','Bring it to me unopened and quickly, because the entire town is waiting on what is inside.'],comp:'The chest is heavier, more awkward or better guarded than expected.',success:'the chest is delivered unopened to the waiting mayor'},
{name:'Find the Missing Festival Bell',role:'Festival Organiser',goal:'recover the missing ceremonial bell before the festival begins',why:'Without it the traditional opening cannot happen.',quote:['Our festival bell has vanished and the ceremony starts any minute.','Find it and get it back here before the crowd realises we have completely lost control.'],comp:'The bell has been moved again and its sound gives away the party’s position.',success:'the recovered bell rings just in time'},
{name:'Deliver the Medicine',role:'Apothecary',goal:'get a package of medicine to a sick person on the far side of the area',why:'The medicine will spoil if it is delayed much longer.',quote:['This medicine has to reach my patient immediately.','Take the fastest route you can and do not let anything keep you standing still.'],comp:'The direct route is blocked, forcing a risky shortcut.',success:'the medicine arrives in time'},
{name:'Recover a Stolen Ledger',role:'Merchant',goal:'find a stolen ledger before the thief can sell or destroy it',why:'The book contains proof of who has been cheating local traders.',quote:['Someone stole my ledger because they know exactly what it proves.','Bring it back before they can destroy it and I can finally put an end to this mess.'],comp:'A page has already been torn out and carried farther ahead.',success:'the ledger and its crucial evidence are recovered'},
{name:'Rescue the Missing Courier',role:'Postmaster',goal:'find a courier who failed to arrive with an urgent message',why:'The message determines whether people nearby walk into danger.',quote:['My courier should have been here long ago, and that means something has gone wrong.','Find them and get their message through before the people waiting for it make a terrible mistake.'],comp:'The courier is found but cannot finish the journey alone.',success:'the courier and message both reach safety'},
{name:'Find the Lost Child',role:'Innkeeper',goal:'find a missing child who wandered into the dangerous part of the area',why:'The search party is looking in the wrong direction.',quote:['My child slipped away while everyone was distracted and nobody can find them.','Please search where the others have not and bring them back before this gets any worse.'],comp:'The child is safe but trapped behind the main obstacle.',success:'the child is brought back to a relieved crowd'},
{name:'Recover the Wedding Ring',role:'Nervous Groom',goal:'recover a lost wedding ring before the ceremony begins',why:'Admitting it is lost will cause absolute chaos.',quote:['I have lost the wedding ring and the ceremony is about to start.','Please find it before anyone discovers what I have done.'],comp:'Someone else finds the ring first and thinks it belongs to them.',success:'the ring reaches the ceremony seconds before it is needed'},
{name:'Stop the Sabotage',role:'Foreman',goal:'find and stop whoever is sabotaging an important local operation',why:'One more failure will shut the whole operation down.',quote:['Someone keeps breaking things and they are getting bolder every time.','Find out who is doing it and stop the next attempt before everything here has to close.'],comp:'The saboteur triggers one final problem while escaping.',success:'the sabotage is stopped and the operation restarts'},
{name:'Recover the Stolen Keys',role:'Guard Sergeant',goal:'recover a ring of important keys before the thief uses them',why:'The keys open several places that should remain locked.',quote:['A thief has a key ring that can open half the important doors around here.','Get those keys back before they work out exactly how much trouble they can cause.'],comp:'One key has already been used, creating another problem.',success:'the keys are recovered and the final vulnerable door is secured'}
];

const PUZZLES=[
{name:"The Missing Torch",image:"./DnD_Puzzle_Cards_10/01_the_missing_torch.png"},
{name:"The Three Buttons",image:"./DnD_Puzzle_Cards_10/02_the_three_buttons.png"},
{name:"The Silent Bell",image:"./DnD_Puzzle_Cards_10/03_the_silent_bell.png"},
{name:"The Candle Order",image:"./DnD_Puzzle_Cards_10/04_the_candle_order.png"},
{name:"The Empty Pedestal",image:"./DnD_Puzzle_Cards_10/05_the_empty_pedestal.png"},
{name:"The Shadow Key",image:"./DnD_Puzzle_Cards_10/06_the_shadow_key.png"},
{name:"The Numbered Stones",image:"./DnD_Puzzle_Cards_10/07_the_numbered_stones.png"},
{name:"The Sleeping Face",image:"./DnD_Puzzle_Cards_10/08_the_sleeping_face.png"},
{name:"The Upside Down Message",image:"./DnD_Puzzle_Cards_10/09_the_upside_down_message.png"},
{name:"The Four Seasons",image:"./DnD_Puzzle_Cards_10/10_the_four_seasons.png"}
];

const MONSTERS=[
{name:"Cave Gobbler",image:"./DnD_Monster_Stat_Cards_10/01_Cave_Gobbler.png"},
{name:"Skeleton Guard",image:"./DnD_Monster_Stat_Cards_10/02_Skeleton_Guard.png"},
{name:"Giant Dungeon Rat",image:"./DnD_Monster_Stat_Cards_10/03_Giant_Dungeon_Rat.png"},
{name:"Bog Slime",image:"./DnD_Monster_Stat_Cards_10/04_Bog_Slime.png"},
{name:"Kobold Bomb Thrower",image:"./DnD_Monster_Stat_Cards_10/05_Kobold_Bomb_Thrower.png"},
{name:"Graveyard Ghoul",image:"./DnD_Monster_Stat_Cards_10/06_Graveyard_Ghoul.png"},
{name:"Fire Beetle Queen",image:"./DnD_Monster_Stat_Cards_10/07_Fire_Beetle_Queen.png"},
{name:"Mushroom Brute",image:"./DnD_Monster_Stat_Cards_10/08_Mushroom_Brute.png"},
{name:"Stone Guardian",image:"./DnD_Monster_Stat_Cards_10/09_Stone_Guardian.png"},
{name:"Goblin Chief",image:"./DnD_Monster_Stat_Cards_10/10_Goblin_Chief.png"}
];

const NPC_FIRST=['Alda','Bram','Cora','Davin','Elsie','Fen','Garrick','Hesta','Iria','Jory','Kellen','Lysa','Mara','Ned','Orla','Perrin','Rosa','Silas','Tamsin','Vern','Willa','Yorin'];
const NPC_LAST=['Bramble','Copperpot','Dale','Ember','Fenn','Goodbarrel','Hearth','Kettle','Morrow','Oak','Pike','Quill','Rook','Sedge','Thorn','Vale','Wren'];
const TRAITS=['talks far too quickly','keeps checking the time','brave until personally threatened','deeply embarrassed by the situation','overly formal under pressure','keeps giving unnecessary local history','certain the party is more competent than they are','suspicious of absolutely everyone','tries to remain cheerful','has mud, soot or flour all over their clothes','cannot stop fidgeting with a key or token','dramatically whispers things that are not secret','offers a reward before anyone asks','keeps pointing in three directions at once'];

const HURRY=[
'Move the final complication into the scene the players are already in.',
'Let the next broadly sensible solution work without another detour or extra check.',
'Say “You have seconds left — what do you do?” then resolve that final action as the climax.'
];

const $=id=>document.getElementById(id);
const rand=a=>a[Math.floor(Math.random()*a.length)];
let activeEncounter='puzzle';
let currentRunSelection=null;

function fill(el,a){
  el.innerHTML=a.map((x,i)=>`<option value="${i}">${x.name}</option>`).join('');
}

fill($('settingSelect'),SETTINGS);
fill($('problemSelect'),PROBLEMS);
fill($('puzzleSelect'),PUZZLES);
fill($('monsterSelect'),MONSTERS);

function sel(){
  return{
    setting:SETTINGS[+$('settingSelect').value],
    problem:PROBLEMS[+$('problemSelect').value],
    puzzle:PUZZLES[+$('puzzleSelect').value],
    monster:MONSTERS[+$('monsterSelect').value],
    usePuzzle:$('usePuzzle').checked,
    useMonster:$('useMonster').checked
  };
}

function previewCard(target,kind,item){
  target.innerHTML=`<img src="${item.image}" alt="${item.name}">`;
  target.title=`${kind}: ${item.name}`;
}

function refresh(){
  const s=sel();
  previewCard($('puzzlePreview'),'Puzzle card',s.puzzle);
  previewCard($('monsterPreview'),'Monster card',s.monster);
  $('puzzleChoice').textContent=s.puzzle.name;
  $('monsterChoice').textContent=s.monster.name;
  $('puzzleOption').classList.toggle('disabled',!s.usePuzzle);
  $('monsterOption').classList.toggle('disabled',!s.useMonster);
  $('puzzleSelect').disabled=!s.usePuzzle;
  $('monsterSelect').disabled=!s.useMonster;
  ['puzzlePrev','puzzleNext'].forEach(id=>$(id).disabled=!s.usePuzzle);
  ['monsterPrev','monsterNext'].forEach(id=>$(id).disabled=!s.useMonster);
  $('bothWarning').classList.toggle('show',s.usePuzzle&&s.useMonster);
  $('selectionError').classList.remove('show');
}

['settingSelect','problemSelect','puzzleSelect','monsterSelect','usePuzzle','useMonster'].forEach(id=>$(id).addEventListener('change',refresh));
function shiftSelection(selectId,list,delta){const el=$(selectId);el.value=((+el.value+delta)%list.length+list.length)%list.length;refresh()}
$('puzzlePrev').onclick=()=>shiftSelection('puzzleSelect',PUZZLES,-1);
$('puzzleNext').onclick=()=>shiftSelection('puzzleSelect',PUZZLES,1);
$('monsterPrev').onclick=()=>shiftSelection('monsterSelect',MONSTERS,-1);
$('monsterNext').onclick=()=>shiftSelection('monsterSelect',MONSTERS,1);

$('randomBtn').onclick=()=>{
  $('settingSelect').value=Math.floor(Math.random()*SETTINGS.length);
  $('problemSelect').value=Math.floor(Math.random()*PROBLEMS.length);
  $('puzzleSelect').value=Math.floor(Math.random()*PUZZLES.length);
  $('monsterSelect').value=Math.floor(Math.random()*MONSTERS.length);
  const r=Math.random();
  $('usePuzzle').checked=r<.7;
  $('useMonster').checked=r>.45;
  if(!$('usePuzzle').checked&&!$('useMonster').checked)$('usePuzzle').checked=true;
  refresh();
};

function numberedLines(items){
  return items.map((x,i)=>`${i+1}. ${x}`).join('\n');
}

function setEncounterView(type){
  if(!currentRunSelection)return;
  const s=currentRunSelection;
  if(type==='puzzle'&&!s.usePuzzle)return;
  if(type==='monster'&&!s.useMonster)return;
  activeEncounter=type;

  const showPuzzle=type==='puzzle'&&s.usePuzzle;
  const showMonster=type==='monster'&&s.useMonster;

  $('runPuzzleCard').hidden=!showPuzzle;
  $('runMonsterCard').hidden=!showMonster;
  $('puzzleTab').classList.toggle('active',showPuzzle);
  $('monsterTab').classList.toggle('active',showMonster);
  $('tapNote').textContent=showPuzzle?`Tap ${s.puzzle.name} to enlarge`:`Tap ${s.monster.name} to enlarge`;
}

function build(){
  const s=sel();
  if(!s.usePuzzle&&!s.useMonster){
    $('selectionError').classList.add('show');
    return;
  }

  const npc={name:`${rand(NPC_FIRST)} ${rand(NPC_LAST)}`,traits:[...TRAITS].sort(()=>Math.random()-.5).slice(0,3)};

  $('runTitle').textContent=`${s.setting.name} — ${s.problem.name}`;
  $('setupText').textContent=`${s.setting.setup} ${s.problem.why} The objective is simple: ${s.problem.goal}.`;
  $('npcNameRole').textContent=`${npc.name} — ${s.problem.role}`;
  $('npcTraits').textContent=npc.traits.join(' • ');
  $('npcQuote').textContent=`“${s.problem.quote[0]} ${s.problem.quote[1]}”`;

  let beats;
  if(s.usePuzzle&&s.useMonster){
    beats=[
      '0:00–1:00 — Read the setup and NPC quote. Point directly at the objective.',
      `1:00–3:30 — Move straight to ${s.puzzle.name}. Give an obvious first clue.`,
      `3:30–7:45 — ${s.monster.name} arrives or blocks the objective. Start it already threatening something important.`,
      `7:45–9:15 — Final complication: ${s.problem.comp}`,
      '9:15–10:00 — One decisive action, resolve the objective, then end.'
    ];
  }else if(s.usePuzzle){
    beats=[
      '0:00–1:00 — Read the setup and NPC quote. Point directly at the objective.',
      '1:00–3:00 — One short travel/investigation choice. Make the useful clue obvious.',
      `3:00–7:30 — Run ${s.puzzle.name}. If the table stalls, use the card’s hurry-up solution.`,
      `7:30–9:15 — Final complication: ${s.problem.comp}`,
      '9:15–10:00 — One decisive action, resolve the objective, then end.'
    ];
  }else{
    beats=[
      '0:00–1:00 — Read the setup and NPC quote. Point directly at the objective.',
      '1:00–3:00 — One short travel/investigation choice. Put the danger in sight.',
      `3:00–8:00 — Run the ${s.monster.name} battle. Keep the creature tied directly to the objective.`,
      `8:00–9:15 — Final complication: ${s.problem.comp}`,
      '9:15–10:00 — One decisive action, resolve the objective, then end.'
    ];
  }

  $('storyBeats').textContent=numberedLines(beats);
  $('pressureList').textContent=numberedLines(s.setting.press.slice(0,3));
  $('hurryList').textContent=numberedLines(HURRY);
  $('endingText').textContent=`ENDING: ${s.problem.success}; ${s.setting.ending}.`;

  $('runPuzzleCard').src=s.puzzle.image;
  $('runPuzzleCard').alt=s.puzzle.name;
  $('runMonsterCard').src=s.monster.image;
  $('runMonsterCard').alt=s.monster.name;

  $('puzzleTab').hidden=!s.usePuzzle;
  $('monsterTab').hidden=!s.useMonster;

  currentRunSelection=s;
  activeEncounter=s.usePuzzle?'puzzle':'monster';
  setEncounterView(activeEncounter);

  document.body.classList.add('run-mode');
}

function openCard(src){
  $('modalImage').src=src;
  $('cardModal').classList.add('show');
}

function closeCard(){
  $('cardModal').classList.remove('show');
  $('modalImage').src='';
}

$('puzzleTab').onclick=()=>setEncounterView('puzzle');
$('monsterTab').onclick=()=>setEncounterView('monster');
$('runPuzzleCard').onclick=()=>openCard($('runPuzzleCard').src);
$('runMonsterCard').onclick=()=>openCard($('runMonsterCard').src);
$('modalClose').onclick=closeCard;
$('cardModal').addEventListener('click',e=>{if(e.target===$('cardModal'))closeCard()});
$('runBtn').onclick=build;
$('exitRun').onclick=()=>{
  document.body.classList.remove('run-mode');
  currentRunSelection=null;
};

refresh();
