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
    'neatly dressed despite everything around them being chaotic'
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
    'speaks with absolute confidence even when guessing'
  ];

  function sample(list,count){
    return [...list].sort(()=>Math.random()-.5).slice(0,count);
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

    const physical=sample(PHYSICAL_DESCRIPTIONS,2);
    const characteristics=sample(CHARACTERISTICS,3);
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
