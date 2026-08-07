(()=>{
  if(!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(registration=>{
    registration.update().catch(()=>{});
  }).catch(err=>{
    console.error('Offline mode could not be enabled:',err);
  });
})();
