window.rbPlayerTransform=function(app){
  app=app.replace('  bindEdits();',`  bindEdits();
  window.__rb600={
    getState:()=>state,
    speciesData,
    classData,
    ACTION_PRESETS,
    proficiency,
    chooseSkills,
    chooseSpellLines,
    refreshDerivedStatsAfterPointBuy,
    applySpeciesPortrait,
    calcHP,
    syncInputs,
    render,
    attackBonus,
    attackDamage,
    fmtMod
  };`);

  app=app.replace(/  function fitStyled\(key,generated\)\{[\s\S]*?\n  \}\n\n  function drawStatStack/,`  function fitStyled(key,generated){
    const b=layout[key]; if(!b)return;
    const value=displayContent(key,generated);
    let size=Math.min(b.font||20,Math.max(6,b.h*.86));
    const hardMin=5;
    while(size>hardMin){
      ctx.font=fontString(b,size);
      if(ctx.measureText(value).width<=b.w && size*1.12<=b.h)break;
      size-=.5;
    }
    ctx.save();
    ctx.fillStyle=b.color||'#111';
    ctx.font=fontString(b,size);
    ctx.textBaseline='middle';
    ctx.textAlign=b.align||'left';
    let x=b.x;
    if(b.align==='center')x=b.x+b.w/2;
    if(b.align==='right')x=b.x+b.w;
    ctx.fillText(value,x,b.y+b.h/2);
    ctx.restore();
  }

  function drawStatStack`);

  app=app.replace(/  function wrappedStyled\(key,generated,maxLines=2\)\{[\s\S]*?\n  \}\n  function listStyled/,`  function wrappedStyled(key,generated,maxLines=Infinity){
    const b=layout[key]; if(!b)return;
    const value=displayContent(key,generated);
    const hardMin=5;
    let size=b.font||15,lines=[],lh=0;
    const wrapAtSize=currentSize=>{
      ctx.font=fontString(b,currentSize);
      const paragraphs=String(value).split('\\n');
      const out=[];
      for(const paragraph of paragraphs){
        const words=paragraph.split(/\\s+/).filter(Boolean);
        if(!words.length){out.push('');continue;}
        let line='';
        for(const word of words){
          const test=line?line+' '+word:word;
          if(line&&ctx.measureText(test).width>b.w){out.push(line);line=word;}else line=test;
        }
        if(line)out.push(line);
      }
      return out;
    };
    while(size>hardMin){
      lines=wrapAtSize(size);
      lh=size*1.12;
      if(lines.length*lh<=b.h)break;
      size-=.5;
    }
    lines=wrapAtSize(size);
    lh=size*1.12;
    const total=(lines.length-1)*lh;
    ctx.save();
    ctx.fillStyle=b.color||'#111';
    ctx.font=fontString(b,size);
    ctx.textBaseline='middle';
    ctx.textAlign=b.align||'center';
    let x=b.x+b.w/2;
    if(b.align==='left')x=b.x;
    if(b.align==='right')x=b.x+b.w;
    lines.forEach((ln,i)=>ctx.fillText(ln,x,b.y+b.h/2-total/2+i*lh));
    ctx.restore();
  }
  function listStyled`);

  app=app.replace(/  function drawEquipmentFancy\(items\)\{[\s\S]*?\n  \}\n\n  function generatedValueForKey/,`  function drawEquipmentFancy(items){
    const b=layout['equipment']; if(!b)return;
    const raw=displayContent('equipment',(items||[]).join('\\n'));
    const entries=raw.split('\\n').map(s=>s.trim()).filter(Boolean).slice(0,4);
    if(!entries.length)return;
    const goldEntry=entries.find(e=>/^\\d+\\s*gp$/i.test(e));
    const itemEntries=entries.filter(e=>e!==goldEntry).slice(0,3);
    const goldH=goldEntry?34:0;
    const slotH=(b.h-goldH)/Math.max(1,itemEntries.length);
    const cx=b.x+b.w/2;

    function wrapAll(value,maxWidth,size){
      ctx.font=fontString({...b,bold:true},size);
      const words=String(value||'').split(/\\s+/).filter(Boolean);
      const lines=[];let line='';
      for(const word of words){
        const test=line?line+' '+word:word;
        if(line&&ctx.measureText(test).width>maxWidth){lines.push(line);line=word;}else line=test;
      }
      if(line)lines.push(line);
      return lines;
    }

    itemEntries.forEach((entry,index)=>{
      const top=b.y+index*slotH+2;
      const parts=entry.split('—');
      const name=(parts.shift()||'').trim();
      const desc=(parts.join('—')||'').trim();
      let nameSize=Math.min(22,slotH*.30);
      while(nameSize>6){
        ctx.font=fontString({...b,bold:true},nameSize);
        if(ctx.measureText(name).width<=b.w-20)break;
        nameSize-=.5;
      }
      const descArea=Math.max(12,slotH-nameSize-8);
      let descSize=15,descLines=[];
      while(descSize>5){
        descLines=wrapAll(desc,b.w-28,descSize);
        if(descLines.length*descSize*1.12<=descArea)break;
        descSize-=.5;
      }
      descLines=wrapAll(desc,b.w-28,descSize);
      ctx.save();
      ctx.fillStyle=b.color||'#111';
      ctx.textAlign='center';
      ctx.textBaseline='top';
      ctx.font=fontString({...b,bold:true},nameSize);
      ctx.fillText(name,cx,top);
      ctx.font=fontString({...b,bold:true},descSize);
      const descTop=top+nameSize+4;
      const lh=descSize*1.12;
      descLines.forEach((line,i)=>ctx.fillText(line,cx,descTop+i*lh));
      ctx.restore();
    });

    if(goldEntry){
      let goldSize=22;
      while(goldSize>6){
        ctx.font=fontString({...b,bold:true},goldSize);
        if(ctx.measureText(goldEntry).width<=b.w-20)break;
        goldSize-=.5;
      }
      ctx.save();
      ctx.fillStyle=b.color||'#111';
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.font=fontString({...b,bold:true},goldSize);
      ctx.fillText(goldEntry,cx,b.y+b.h-goldH/2);
      ctx.restore();
    }
  }

  function generatedValueForKey`);

  app=app.replace('</body>','<script src="./player_rules.js?v=20260813-0940"><\\/script></body>');
  return app;
};