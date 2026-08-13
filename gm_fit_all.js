(()=>{
  const CONTENT_IDS=[
    'runTitle','setupText','npcNameRole','npcTraits','npcQuote',
    'storyBeats','pressureList','hurryList','endingText','tapNote'
  ];

  function fitElement(el){
    if(!el || !document.body.classList.contains('run-mode')) return;
    if(el.clientWidth===0 || el.clientHeight===0) return;

    // Always start again from the CSS-defined size so the text can grow back
    // when moving to a larger screen, then shrink only as much as required.
    el.style.fontSize='';
    const base=parseFloat(getComputedStyle(el).fontSize)||12;
    let size=base;
    const hardMin=5;

    while((el.scrollHeight>el.clientHeight+1 || el.scrollWidth>el.clientWidth+1) && size>hardMin){
      size-=0.25;
      el.style.fontSize=`${size}px`;
    }
  }

  function fitAll(){
    CONTENT_IDS.forEach(id=>fitElement(document.getElementById(id)));
  }

  function schedule(){
    requestAnimationFrame(()=>requestAnimationFrame(fitAll));
  }

  const bodyObserver=new MutationObserver(schedule);
  bodyObserver.observe(document.body,{attributes:true,attributeFilter:['class']});

  CONTENT_IDS.forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    new MutationObserver(schedule).observe(el,{childList:true,characterData:true,subtree:true});
  });

  const runBtn=document.getElementById('runBtn');
  if(runBtn)runBtn.addEventListener('click',schedule);
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  schedule();
})();