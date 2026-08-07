(()=>{
  const byId=id=>document.getElementById(id);
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));

  async function waitForExport(engine){
    const start=Date.now();
    while(!engine.disabled && Date.now()-start<1500) await wait(25);
    while(engine.disabled && Date.now()-start<20000) await wait(50);
  }

  async function exportFromBuilder(){
    const button=byId('downloadBuilder');
    const engine=byId('downloadRun');
    const runButton=byId('runBtn');
    if(!button||!engine||!runButton) return;

    const usePuzzle=!!byId('usePuzzle')?.checked;
    const useMonster=!!byId('useMonster')?.checked;
    if(!usePuzzle&&!useMonster){
      byId('selectionError')?.classList.add('show');
      return;
    }

    const original=button.textContent;
    button.disabled=true;
    button.textContent='PREPARING PNGs…';

    try{
      // Build the current selections so the PNG always matches what is on the generator page.
      runButton.click();
      await frame();
      await frame();
      await wait(120);

      if(!document.body.classList.contains('run-mode')) throw new Error('GM sheet did not build.');

      // The existing exporter handles page 1 plus whichever encounter-card pages are selected.
      engine.click();
      await waitForExport(engine);

      // Return the user to the generator page after the PNGs have been triggered.
      document.body.classList.remove('run-mode');
    }catch(err){
      console.error(err);
      alert('Could not create the GM PNG export.');
      document.body.classList.remove('run-mode');
    }finally{
      button.disabled=false;
      button.textContent=original||'DOWNLOAD GM PNGs';
    }
  }

  const button=byId('downloadBuilder');
  if(button) button.addEventListener('click',exportFromBuilder);
})();
