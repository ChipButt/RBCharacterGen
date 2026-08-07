(()=>{
  const setup=()=>document.getElementById('setupText');

  function fitSetupText(){
    const el=setup();
    if(!el || !document.body.classList.contains('run-mode') || el.clientWidth===0 || el.clientHeight===0) return;

    // Always start from the font size defined by the GM layout, then only shrink if needed.
    el.style.fontSize='';
    const initial=parseFloat(getComputedStyle(el).fontSize)||12;
    let size=initial;
    const minSize=Math.max(6,initial*0.58);

    while((el.scrollHeight>el.clientHeight+1 || el.scrollWidth>el.clientWidth+1) && size>minSize){
      size-=0.25;
      el.style.fontSize=`${size}px`;
    }
  }

  function scheduleFit(){
    requestAnimationFrame(()=>requestAnimationFrame(fitSetupText));
  }

  const bodyObserver=new MutationObserver(scheduleFit);
  bodyObserver.observe(document.body,{attributes:true,attributeFilter:['class']});

  const setupEl=setup();
  if(setupEl){
    const textObserver=new MutationObserver(scheduleFit);
    textObserver.observe(setupEl,{childList:true,characterData:true,subtree:true});
  }

  window.addEventListener('resize',scheduleFit,{passive:true});
  window.addEventListener('orientationchange',scheduleFit,{passive:true});
  scheduleFit();
})();
