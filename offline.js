(()=>{
  if(!('serviceWorker' in navigator)) return;

  const register=async()=>{
    try{
      const registration=await navigator.serviceWorker.register('./sw.js',{scope:'./'});
      registration.update().catch(()=>{});
    }catch(err){
      console.error('Offline mode could not be enabled:',err);
    }
  };

  if(document.readyState==='complete') register();
  else window.addEventListener('load',register,{once:true});
})();
