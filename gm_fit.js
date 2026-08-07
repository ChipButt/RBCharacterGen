(()=>{
  const PHYSICAL_DESCRIPTIONS=[
    'weather-beaten face with deep smile lines',
    'broad-shouldered and noticeably taller than most locals',
    'short and wiry with quick, restless movements',
    'thick dark hair tied back with a strip of cloth',
    'untidy grey hair and a carefully trimmed moustache',
    'bright eyes beneath heavy, expressive eyebrows',
    'a crooked nose that looks like it has been broken before',
    'mud-stained boots and practical clothes patched at the elbows',
    'an old scar running from one cheek toward the jaw',
    'freckled face and sun-reddened cheeks',
    'long braided hair decorated with small wooden beads',
    'round spectacles that constantly slip down their nose',
    'a heavy wool coat that is clearly one size too large',
    'calloused hands marked by years of physical work',
    'a slightly stooped posture but surprisingly quick steps',
    'neatly dressed despite everything around them being chaotic',
    'closely cropped hair with one stubborn lock falling forward',
    'a square jaw covered by two days of stubble',
    'a narrow face with a prominent chin',
    'thick curly hair that refuses to stay tidy',
    'one eyebrow split by a thin old scar',
    'a chipped front tooth visible whenever they speak',
    'a small burn scar across the back of one hand',
    'ink-stained fingers and nails cut very short',
    'clothes smelling faintly of smoke and wood ash',
    'a bright scarf wrapped several times around their neck',
    'a battered hat decorated with a single feather',
    'a leather apron covered in old cuts and scratches',
    'a patched cloak fastened with an oversized brass pin',
    'a face tanned dark from years spent outdoors',
    'pale complexion that makes every blush immediately obvious',
    'very long eyelashes and unusually pale eyes',
    'deep-set eyes that make them look permanently tired',
    'a round cheerful face with a dimpled chin',
    'a thin face framed by shoulder-length straight hair',
    'a shaved head with a faded tattoo behind one ear',
    'a thick beard braided into two short plaits',
    'a neat pointed beard with several strands of grey',
    'a heavy fringe almost hiding their eyebrows',
    'a ponytail held together with a piece of old string',
    'one ear decorated with several tiny metal rings',
    'a silver tooth that catches the light when they grin',
    'a faint limp that becomes more obvious when they hurry',
    'walks with an old wooden cane polished smooth from use',
    'moves with the careful balance of someone used to boats',
    'stands ramrod straight even when completely exhausted',
    'keeps their shoulders hunched as though expecting rain',
    'very small hands covered in tiny old scars',
    'large rough hands with permanently blackened fingernails',
    'wears several mismatched rings on both hands',
    'wears a simple cord necklace carrying a worn wooden charm',
    'has a faded ribbon tied around one wrist',
    'a narrow scar crossing the bridge of their nose',
    'a crescent-shaped birthmark beside one eye',
    'a scattering of freckles across their nose and shoulders',
    'rosy cheeks contrasting with an otherwise pale face',
    'one eye slightly darker in colour than the other',
    'long fingers that constantly drum against nearby surfaces',
    'crooked fingers suggesting several badly healed breaks',
    'a missing little finger on their left hand',
    'a broad nose and strong cheekbones',
    'a small nose and sharply defined cheekbones',
    'full eyebrows that almost meet when they frown',
    'a permanent crease between their eyebrows',
    'laugh lines around both eyes despite their worried expression',
    'dark circles under their eyes from obvious lack of sleep',
    'a fresh scrape along one forearm',
    'a bandaged hand they keep forgetting not to use',
    'dusty clothes with one knee recently torn open',
    'boots polished perfectly despite the muddy surroundings',
    'a coat covered with far too many practical pockets',
    'sleeves rolled neatly to exactly the same height',
    'clothes fastened with mismatched buttons',
    'a colourful waistcoat beneath an otherwise plain outfit',
    'a belt crowded with pouches, keys and small tools',
    'a long coat with frayed cuffs and a carefully repaired collar',
    'an oversized satchel hanging heavily from one shoulder',
    'a pair of sturdy gloves tucked permanently into their belt',
    'hair streaked naturally with a single patch of white',
    'short silver hair brushed carefully away from the face',
    'thick auburn hair gathered in a loose bun',
    'fine blond hair that keeps blowing into their eyes',
    'dark wavy hair cut unevenly as though done at home',
    'a carefully waxed moustache that curls upward at both ends',
    'a huge beard hiding most of their mouth',
    'a completely clean-shaven face with a prominent jawline',
    'a small tattoo visible at the base of their thumb',
    'several old scratches across their forearms',
    'a noticeable gap between their front teeth',
    'one sleeve pinned neatly above the elbow',
    'a stiff leather brace around one knee',
    'a tiny pair of spectacles balanced at the end of their nose',
    'thick square spectacles with one arm repaired using wire',
    'a monocle they keep forgetting is still in place',
    'a voice accompanied by a visible nervous swallow',
    'a habit of tilting their head sharply when listening',
    'a remarkably loud set of jangling keys hanging from their belt'
  ];

  const CHARACTERISTICS=[
    'talks far too quickly',
    'keeps checking the time',
    'brave until personally threatened',
    'deeply embarrassed by the situation',
    'overly formal under pressure',
    'keeps giving unnecessary local history',
    'certain the party is more competent than they are',
    'suspicious of absolutely everyone',
    'tries to remain cheerful no matter what happens',
    'cannot stop fidgeting with a key, coin or token',
    'dramatically whispers things that are not secret',
    'offers a reward before anyone asks',
    'keeps pointing in three directions at once',
    'constantly apologises for things that are not their fault',
    'gets distracted whenever somebody mentions food',
    'speaks with absolute confidence even when guessing',
    'answers simple questions with unnecessarily long stories',
    'refuses to admit when they do not know something',
    'becomes extremely competitive over trivial matters',
    'assumes every problem can be solved with enough rope',
    'laughs nervously at completely inappropriate moments',
    'keeps lowering their voice whenever money is mentioned',
    'treats every stranger as though they have met before',
    'remembers faces perfectly but never remembers names',
    'remembers names perfectly but constantly confuses faces',
    'takes every figure of speech completely literally',
    'cannot resist correcting tiny factual mistakes',
    'keeps trying to finish other people’s sentences',
    'pauses dramatically before saying anything important',
    'speaks in very short sentences when frightened',
    'becomes unusually calm when everyone else panics',
    'panics loudly but remains surprisingly useful',
    'is convinced there is a simple explanation for everything',
    'is convinced everything is part of a larger conspiracy',
    'expects bad luck whenever someone says things are going well',
    'is relentlessly optimistic about obviously terrible situations',
    'immediately assumes responsibility for organising everyone',
    'keeps asking whether everyone has eaten recently',
    'tries to feed people whenever conversation becomes awkward',
    'offers unsolicited but genuinely useful practical advice',
    'gives terrible advice with tremendous confidence',
    'has a proverb ready for every situation',
    'regularly invents proverbs and insists they are traditional',
    'cannot tell a joke without laughing before the punchline',
    'never laughs at jokes but remembers them for later',
    'keeps making tiny bets on what will happen next',
    'counts objects in the room whenever nervous',
    'rearranges nearby objects into neat rows while talking',
    'straightens crooked pictures, signs and furniture automatically',
    'cannot leave an unlocked door without checking it twice',
    'keeps checking that they still have the same important item',
    'makes intense eye contact while saying completely mundane things',
    'avoids eye contact whenever they are being sincere',
    'uses everybody’s full name whenever they are annoyed',
    'gives everyone an immediate nickname',
    'refers to themselves in the third person when stressed',
    'keeps muttering the next step of their plan under their breath',
    'writes down everything even when there is no reason to',
    'has terrible handwriting and insists it is perfectly readable',
    'draws little diagrams whenever explaining directions',
    'gives directions entirely using landmarks that no longer exist',
    'describes distances only in walking time',
    'always knows exactly where north is',
    'gets hopelessly turned around indoors',
    'will trust anyone who is kind to animals',
    'does not trust anyone wearing unusually clean boots',
    'judges people almost entirely by their manners',
    'is instantly impressed by displays of confidence',
    'is instantly suspicious of displays of confidence',
    'tries to negotiate even when nobody is bargaining',
    'accepts the first offer and then regrets it immediately',
    'has a detailed contingency plan for unlikely disasters',
    'refuses to plan further ahead than the next five minutes',
    'keeps saying “this is fine” when it clearly is not',
    'insists the situation is under control while actively losing control',
    'gets visibly excited whenever a mystery appears',
    'hates mysteries and demands straightforward answers',
    'treats minor inconveniences as personal challenges',
    'turns serious problems into practical checklists',
    'cannot resist volunteering other people for jobs',
    'volunteers themselves before thinking through the consequences',
    'is fiercely protective of local traditions',
    'thinks most local traditions are ridiculous but follows them anyway',
    'constantly compares the current problem to something that happened years ago',
    'claims to know everybody in the area and probably does',
    'claims to know everybody in the area and clearly does not',
    'is embarrassed whenever anyone thanks them',
    'becomes suspicious whenever anyone is too generous',
    'assumes kindness always needs to be repaid immediately',
    'keeps offering increasingly impractical rewards',
    'treats small amounts of money with extreme seriousness',
    'waves away large sums while obsessing over tiny expenses',
    'speaks softly until angry, then becomes startlingly loud',
    'speaks loudly until angry, then becomes unnervingly quiet',
    'never swears and substitutes increasingly strange harmless words',
    'swears creatively whenever even mildly inconvenienced',
    'is polite to everyone except close friends',
    'is rude by accident but immediately tries to fix it',
    'has no patience for ceremony or titles',
    'insists on proper titles even during emergencies',
    'keeps asking one more question after everyone is ready to leave',
    'tries to end every conversation three times before actually leaving',
    'believes animals understand far more language than people think',
    'talks to tools, carts and doors as though they are being difficult on purpose',
    'thanks inanimate objects when they work properly',
    'blames inanimate objects when anything goes wrong',
    'becomes intensely focused when given a concrete task',
    'gets bored halfway through explanations and jumps to the conclusion',
    'needs every plan explained from the beginning before agreeing',
    'agrees immediately and asks questions only after starting',
    'is terrified of disappointing people',
    'acts unimpressed by danger but is obviously thrilled by it',
    'complains constantly while willingly helping anyway',
    'never complains but keeps an obvious mental list of grievances',
    'treats every problem as a chance to make a new friend',
    'assumes strangers are potential trouble until proven otherwise',
    'is fascinated by adventurers and asks far too many questions',
    'is unimpressed by adventurers and treats them like ordinary workers',
    'has a remarkable ability to stay focused amid total chaos',
    'loses their train of thought whenever interrupted',
    'repeats the last few words of a sentence while thinking',
    'uses elaborate hand gestures for even simple explanations',
    'nods constantly while other people speak',
    'frowns deeply whenever concentrating, even when perfectly happy',
    'smiles whenever nervous and cannot stop',
    'takes notes on people they have just met',
    'keeps a mental score of every favour owed',
    'forgives mistakes quickly but never forgets them',
    'holds grudges over tiny things but forgets serious insults',
    'has an intense dislike of being late',
    'is always late and always has an elaborate explanation',
    'insists on doing one thing properly rather than three things quickly',
    'tries to do five things at once and finishes none cleanly',
    'cannot resist making a dramatic entrance',
    'tries very hard not to attract attention and somehow always does',
    'treats silence as something that must immediately be filled',
    'goes completely silent whenever thinking hard',
    'becomes much friendlier once given a specific job to do',
    'gets increasingly sarcastic as the situation becomes worse',
    'responds to sarcasm as though every word is sincere',
    'believes every problem has a person responsible for it',
    'believes most disasters are simply bad timing rather than anyone’s fault'
  ];

  const RECENT_PHYSICAL_KEY='rb600_recent_npc_physical';
  const RECENT_CHARACTER_KEY='rb600_recent_npc_characteristics';

  function shuffle(list){
    const copy=[...list];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function readRecent(key){
    try{return JSON.parse(sessionStorage.getItem(key)||'[]')}catch{return []}
  }

  function writeRecent(key,values){
    try{sessionStorage.setItem(key,JSON.stringify(values))}catch{}
  }

  function sampleFresh(list,count,key,historyLimit){
    const recent=readRecent(key);
    let available=list.filter(item=>!recent.includes(item));
    if(available.length<count) available=[...list];
    const chosen=shuffle(available).slice(0,count);
    const next=[...recent,...chosen].slice(-historyLimit);
    writeRecent(key,next);
    return chosen;
  }

  function fitBoxText(id,minRatio=.56){
    const el=document.getElementById(id);
    if(!el || !document.body.classList.contains('run-mode') || el.clientWidth===0 || el.clientHeight===0) return;

    el.style.fontSize='';
    const initial=parseFloat(getComputedStyle(el).fontSize)||12;
    let size=initial;
    const minSize=Math.max(6,initial*minRatio);

    while((el.scrollHeight>el.clientHeight+1 || el.scrollWidth>el.clientWidth+1) && size>minSize){
      size-=0.25;
      el.style.fontSize=`${size}px`;
    }
  }

  function fitAll(){
    fitBoxText('setupText',.56);
    fitBoxText('npcTraits',.52);
  }

  function scheduleFit(){
    requestAnimationFrame(()=>requestAnimationFrame(fitAll));
  }

  function renderNpcDetails(){
    const el=document.getElementById('npcTraits');
    if(!el) return;

    const physical=sampleFresh(PHYSICAL_DESCRIPTIONS,2,RECENT_PHYSICAL_KEY,30);
    const characteristics=sampleFresh(CHARACTERISTICS,3,RECENT_CHARACTER_KEY,60);
    el.textContent=[...physical,...characteristics].map(x=>`• ${x}`).join('\n');
    scheduleFit();
  }

  const bodyObserver=new MutationObserver(scheduleFit);
  bodyObserver.observe(document.body,{attributes:true,attributeFilter:['class']});

  ['setupText','npcTraits'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){
      const observer=new MutationObserver(scheduleFit);
      observer.observe(el,{childList:true,characterData:true,subtree:true});
    }
  });

  const runBtn=document.getElementById('runBtn');
  if(runBtn){
    runBtn.addEventListener('click',()=>requestAnimationFrame(renderNpcDetails));
  }

  window.addEventListener('resize',scheduleFit,{passive:true});
  window.addEventListener('orientationchange',scheduleFit,{passive:true});
  scheduleFit();
})();
