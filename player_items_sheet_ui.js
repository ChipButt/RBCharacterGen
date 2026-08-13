(()=>{
  const HEADER='data:image/webp;base64,UklGRuIDAABXRUJQVlA4INYDAABQHwCdASpvAV8APp1MoEwlpCMiIbSbCLATiWlu+F8U+jcy/tGEOiq9XylH4qy//JcIPuJlH7dPnn9j71/oM/kH+c1iX/Ieg3/kehb6C9GIeFDitaxvucpgdJMDpJgdJMDpJgdJMDpJOuiLBUUst5UZu8E1TaeLZWvRYx7PPO4vJNrTE9DJ3fhZJ2KqmI9/eQynib0ptwFwVivnmBYIGWTKARDd7sx22OAIQvxvO+77MusUHdqksLzg0YyzzSUjdf3uzmB6dPzklA4rWsd4DXlhFD32W9Bo6O2U2unIw8L3OdRdPFRRNbxi/eqJitaw6wRfuwmYn25RAhCCfDcDhjTVsaIAAP75sQAAAHq8oDJCnH+GglNWtXWJSNiIrphAiq07qxA19paAnhVLI5MPfVbT633/r7e3knyZT4tB/iQ6rKSCz91kvWN2rRS5ggzPqhK21Dg8U9s8MS+hqYuhXEQmdo5ARfSp4GUIUTcxV9cB5QNH1USI8cHk6rYVQuOsBk4qXuu+SLndE8fm2eKMJF1fzXCSThLbnBlhIMKkKqvjF6NEaWoRoV3Wcj+xQwcvR4GAH13lTrbULO7FTMQU8/ewWZCYTUyYIBlg4LR2NNoejIFXwbsG5uCxeImydulHhxpWKC9amuDyCtRe603i+c2Ayfi7dJTdB6aO9v1nFTdBwX/k8HJq99C+LO6w/lWET6do2ENtogF2G4uJ+DK1p3Ex6b/adZmz5Nq/SxKc2y82xS4PtcwKyxObekqq7oMYYWGcpJxfGDPKLePXoNYcAlr7/XbA1oM8EKvlPvFZ+Z+BB6MTDoi1rp6t112Vzq6YydrWzWBSyzkgOycx6LqOGsHi10fpdMc9Jg1eUWH1Q7Ejemphh9ofefL4/Mbmf9Cl6AZb4Y5rwMTArCx2t/QELrrKl+3lFuLsEYy/K269DBv+2/yMR5Evl8yIM4GjOy/fhJFxq836EsDahZ/XgTmblfpdJIWA1783WsVXb7nuOmNI1nx5oY1WRPHgXN1LtjfwuH2D7m8CHNbSGJWAqguv55m/HAWvIT0yp++8zBdFATp9ov+m+B7DfUX1WRRi/CjiOJTh0rJ0RCF/R0EKimeCI53dPGdqIVnSilP+a6LYnUX1czBp1xjLnihGMXNt1gEAAg8YwrCiyuUQ6w80xPdsqYvqJjKkyG8CNz03+k07hf3+5w7aJk8M+eIisctkFJJVw3GlV0quGffNWpssmvbuy//hLzoHcuuflARLVvXlPen3d5PoeQdp2pJzd9vnqrAF9HP5HzwVs1BhfI5r2vjrCeIYVIAAAAAA';

  function loadActionSheetUi(){
    if(document.querySelector('script[data-rb-action-sheet-ui]')||document.getElementById('rb-actions-sheet-ui'))return;
    const script=document.createElement('script');
    script.src='./player_actions_sheet_ui.js?v=20260813-1515';
    script.dataset.rbActionSheetUi='1';
    document.head.appendChild(script);
  }

  function install(){
    if(document.getElementById('rb-items-sheet-ui'))return;
    const style=document.createElement('style');
    style.id='rb-items-sheet-ui';
    style.textContent=`
      .edit-panel:not(.collapsed){overflow:visible!important}
      .edit-panel:not(.collapsed) .edit-collapsible-content{max-height:none!important;overflow:visible!important;opacity:1!important}
      body:not(.play-mode){overflow-y:auto!important}
      body:not(.play-mode) .controls{height:auto!important;max-height:none!important}
      .rb-item-list{display:grid!important;gap:5px!important;margin:4px 0 8px!important;padding:80px 12px 9px!important;background:#fff url("${HEADER}") top center/100% 80px no-repeat!important;border:1px solid #d5d5d5!important;border-radius:2px!important;box-shadow:none!important;overflow:visible!important}
      .rb-item-row{display:grid!important;gap:2px!important;margin:0!important;padding:2px 8px 6px!important;border:0!important;border-bottom:1px solid #d8d8d8!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
      .rb-item-row:last-of-type{border-bottom:0!important}.rb-item-row h3{display:none!important}.rb-item-row label{margin:0!important;font-size:0!important;color:transparent!important}
      .rb-item-row input.rb-item-name{height:29px!important;min-height:29px!important;margin:0!important;padding:3px 7px!important;border:0!important;border-bottom:1px solid #aaa!important;border-radius:0!important;background:rgba(255,255,255,.94)!important;color:#111!important;text-align:center!important;font-family:Arial,Helvetica,sans-serif!important;font-size:13px!important;line-height:1.1!important;font-weight:900!important}
      .rb-item-row textarea.rb-item-desc{display:block!important;width:100%!important;height:42px!important;min-height:42px!important;max-height:42px!important;margin:0!important;padding:4px 7px!important;resize:none!important;overflow-y:auto!important;border:0!important;border-radius:0!important;background:rgba(255,255,255,.94)!important;color:#222!important;text-align:center!important;font-family:Arial,Helvetica,sans-serif!important;font-size:11px!important;line-height:1.18!important;font-weight:700!important}
      .rb-item-list>.rb-help{margin:0!important;padding:2px 0 0!important;color:#555!important;text-align:center!important;font-size:10px!important;line-height:1.1!important;font-weight:800!important}
      @media(max-width:520px){.rb-item-list{padding-top:70px!important;background-size:100% 70px!important}.rb-item-row textarea.rb-item-desc{height:48px!important;min-height:48px!important;max-height:48px!important}}
    `;
    document.head.appendChild(style);
    const tidy=()=>{
      const list=document.querySelector('.rb-item-list');
      if(!list)return false;
      const label=[...document.querySelectorAll('.rb-section-label')].find(el=>el.textContent.trim().toLowerCase()==='items');
      if(label){label.style.display='none';const help=label.nextElementSibling;if(help?.classList.contains('rb-help'))help.style.display='none'}
      list.setAttribute('aria-label','Equipment');
      return true;
    };
    if(tidy())return;
    const observer=new MutationObserver(()=>{if(tidy())observer.disconnect()});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),12000);
  }
  const start=()=>{loadActionSheetUi();install();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
