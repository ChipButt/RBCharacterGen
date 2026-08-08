(()=>{
  if(!('serviceWorker' in navigator)) return;

  let preparation;
  let ready=false;

  function warm(registration){
    return new Promise(resolve=>{
      const worker=registration.active||registration.waiting||registration.installing;
      if(!worker){ resolve(); return; }

      const channel=new MessageChannel();
      const timer=setTimeout(resolve,20000);
      channel.port1.onmessage=()=>{
        clearTimeout(timer);
        resolve();
      };

      try{
        worker.postMessage({type:'WARM_CACHE'},[channel.port2]);
      }catch(err){
        clearTimeout(timer);
        resolve();
      }
    });
  }

  async function prepareOffline(){
    if(preparation) return preparation;

    preparation=(async()=>{
      const registration=await navigator.serviceWorker.register('./sw.js?v=20260808-2',{scope:'./'});
      registration.update().catch(()=>{});

      await navigator.serviceWorker.ready;

      if(!navigator.serviceWorker.controller){
        await new Promise(resolve=>{
          const timer=setTimeout(resolve,5000);
          navigator.serviceWorker.addEventListener('controllerchange',()=>{
            clearTimeout(timer);
            resolve();
          },{once:true});
        });
      }

      await warm(registration);
      ready=true;
      document.documentElement.classList.add('offline-ready');
      window.dispatchEvent(new Event('rb-offline-ready'));
      return true;
    })().catch(err=>{
      console.error('Offline mode could not be prepared:',err);
      return false;
    });

    return preparation;
  }

  window.RBOfflineReady=()=>prepareOffline();

  if(document.readyState==='complete') prepareOffline();
  else window.addEventListener('load',prepareOffline,{once:true});

  document.addEventListener('click',async event=>{
    if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor=event.target.closest?.('a[href]');
    if(!anchor) return;

    const url=new URL(anchor.href,location.href);
    if(url.origin!==location.origin) return;
    if(anchor.target && anchor.target!=='_self') return;

    if(!ready && navigator.onLine){
      event.preventDefault();
      await prepareOffline();
      location.href=url.href;
    }
  },true);
})();
