(()=>{
  const PAGE_W=1414;
  const PAGE_H=2000;

  const byId=id=>document.getElementById(id);

  function safeName(value){
    return String(value||'image')
      .replace(/[^a-z0-9]+/gi,'_')
      .replace(/^_+|_+$/g,'') || 'image';
  }

  function loadImage(src){
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.onload=()=>resolve(img);
      img.onerror=reject;
      img.src=src;
    });
  }

  function downloadCanvas(canvas,filename){
    const a=document.createElement('a');
    a.download=filename;
    a.href=canvas.toDataURL('image/png');
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function colour(value){
    if(!value) return '#111';
    if(value.startsWith('rgb')){
      const n=(value.match(/\d+(?:\.\d+)?/g)||[]).map(Number);
      return `rgb(${n[0]||0},${n[1]||0},${n[2]||0})`;
    }
    return value;
  }

  function fontFamily(value){
    const first=String(value||'Arial').split(',')[0].trim();
    return first.replace(/^['"]|['"]$/g,'') || 'Arial';
  }

  function wrapLines(ctx,text,maxWidth){
    const result=[];
    for(const paragraph of String(text||'').split('\n')){
      if(!paragraph.trim()){
        result.push('');
        continue;
      }
      const words=paragraph.trim().split(/\s+/);
      let line='';
      for(const word of words){
        const candidate=line ? `${line} ${word}` : word;
        if(!line || ctx.measureText(candidate).width<=maxWidth){
          line=candidate;
        }else{
          result.push(line);
          line=word;
        }
      }
      if(line) result.push(line);
    }
    return result;
  }

  function drawTextElement(ctx,el,x,y,w,h,sx,sy){
    const cs=getComputedStyle(el);
    const size=Math.max(1,parseFloat(cs.fontSize)*sx);
    const rawLineHeight=parseFloat(cs.lineHeight);
    const lineHeight=(Number.isFinite(rawLineHeight)?rawLineHeight:parseFloat(cs.fontSize)*1.2)*sy;
    const weight=cs.fontWeight||'400';
    const style=cs.fontStyle||'normal';
    const family=fontFamily(cs.fontFamily);
    const align=cs.textAlign||'left';

    ctx.save();
    ctx.fillStyle=colour(cs.color);
    ctx.font=`${style} ${weight} ${size}px ${family}`;
    ctx.textBaseline='top';
    ctx.textAlign=align;

    const lines=wrapLines(ctx,el.textContent,w);
    for(let i=0;i<lines.length;i++){
      const yy=y+i*lineHeight;
      if(yy+lineHeight>y+h+1) break;
      let xx=x;
      if(align==='center') xx=x+w/2;
      else if(align==='right') xx=x+w;
      ctx.fillText(lines[i],xx,yy);
    }
    ctx.restore();
  }

  async function drawImageFit(ctx,img,x,y,w,h,fit='fill',opacity=1){
    let dx=x,dy=y,dw=w,dh=h;
    if(fit==='contain'||fit==='cover'){
      const ir=(img.naturalWidth||img.width)/(img.naturalHeight||img.height);
      const br=w/h;
      const useWidth=(fit==='contain'&&ir>br)||(fit==='cover'&&ir<br);
      if(useWidth){
        dw=w;
        dh=w/ir;
        dy=y+(h-dh)/2;
      }else{
        dh=h;
        dw=h*ir;
        dx=x+(w-dw)/2;
      }
    }
    ctx.save();
    ctx.globalAlpha=Number.isFinite(opacity)?opacity:1;
    ctx.drawImage(img,dx,dy,dw,dh);
    ctx.restore();
  }

  async function renderGmSheet(){
    const sheet=byId('gmSheet');
    if(!sheet) throw new Error('GM sheet element not found.');

    const rect=sheet.getBoundingClientRect();
    const sx=PAGE_W/rect.width;
    const sy=PAGE_H/rect.height;

    const canvas=document.createElement('canvas');
    canvas.width=PAGE_W;
    canvas.height=PAGE_H;
    const ctx=canvas.getContext('2d');
    ctx.fillStyle=getComputedStyle(sheet).backgroundColor||'#000';
    ctx.fillRect(0,0,PAGE_W,PAGE_H);

    const items=[...sheet.children]
      .filter(el=>{
        if(el.hidden) return false;
        const cs=getComputedStyle(el);
        return cs.display!=='none'&&cs.visibility!=='hidden'&&parseFloat(cs.opacity)!==0;
      })
      .map((el,index)=>({el,index,z:parseFloat(getComputedStyle(el).zIndex)||0}))
      .sort((a,b)=>a.z-b.z||a.index-b.index);

    for(const {el} of items){
      const cs=getComputedStyle(el);
      const r=el.getBoundingClientRect();
      const x=(r.left-rect.left)*sx;
      const y=(r.top-rect.top)*sy;
      const w=r.width*sx;
      const h=r.height*sy;

      if(el.tagName==='IMG'){
        const img=await loadImage(el.currentSrc||el.src);
        await drawImageFit(ctx,img,x,y,w,h,cs.objectFit||'fill',parseFloat(cs.opacity));
        continue;
      }

      if(el.classList.contains('encounter-tab')){
        const bg=el.querySelector('img');
        if(bg){
          const img=await loadImage(bg.currentSrc||bg.src);
          await drawImageFit(ctx,img,x,y,w,h,'fill',1);
        }
        const label=el.querySelector('span');
        if(label){
          const lcs=getComputedStyle(label);
          ctx.save();
          ctx.fillStyle=colour(lcs.color);
          ctx.font=`${lcs.fontStyle||'normal'} ${lcs.fontWeight||'900'} ${parseFloat(lcs.fontSize)*sx}px ${fontFamily(lcs.fontFamily)}`;
          ctx.textAlign='center';
          ctx.textBaseline='middle';
          ctx.fillText(label.textContent,x+w/2,y+h/2);
          ctx.restore();
        }
        continue;
      }

      if(el.classList.contains('sheet-text')){
        drawTextElement(ctx,el,x,y,w,h,sx,sy);
      }
    }

    return canvas;
  }

  async function makeCardPage(src){
    const img=await loadImage(src);
    const canvas=document.createElement('canvas');
    canvas.width=PAGE_W;
    canvas.height=PAGE_H;
    const ctx=canvas.getContext('2d');
    ctx.fillStyle='#fff';
    ctx.fillRect(0,0,PAGE_W,PAGE_H);

    const margin=70;
    const boxW=PAGE_W-margin*2;
    const boxH=PAGE_H-margin*2;
    const ir=(img.naturalWidth||img.width)/(img.naturalHeight||img.height);
    const br=boxW/boxH;
    let w,h;
    if(ir>br){
      w=boxW;
      h=w/ir;
    }else{
      h=boxH;
      w=h*ir;
    }
    ctx.drawImage(img,(PAGE_W-w)/2,(PAGE_H-h)/2,w,h);
    return canvas;
  }

  function currentSelection(){
    const usePuzzle=!!byId('usePuzzle')?.checked;
    const useMonster=!!byId('useMonster')?.checked;
    const puzzleImg=byId('runPuzzleCard');
    const monsterImg=byId('runMonsterCard');
    return {
      usePuzzle,
      useMonster,
      puzzleSrc:puzzleImg?.getAttribute('src')||'',
      puzzleName:puzzleImg?.alt||'Puzzle',
      monsterSrc:monsterImg?.getAttribute('src')||'',
      monsterName:monsterImg?.alt||'Monster',
      title:byId('runTitle')?.textContent||'GM Story'
    };
  }

  async function downloadPack(){
    if(!document.body.classList.contains('run-mode')) return;

    const button=byId('downloadRun');
    const original=button?.textContent;
    if(button){
      button.disabled=true;
      button.textContent='PREPARING PNGs…';
    }

    try{
      const s=currentSelection();
      const base=safeName(s.title);
      const downloads=[];

      downloads.push({
        canvas:await renderGmSheet(),
        name:`${base}_page_1_gm_sheet.png`
      });

      let page=2;
      if(s.usePuzzle&&s.puzzleSrc){
        downloads.push({
          canvas:await makeCardPage(s.puzzleSrc),
          name:`${base}_page_${page++}_puzzle_${safeName(s.puzzleName)}.png`
        });
      }
      if(s.useMonster&&s.monsterSrc){
        downloads.push({
          canvas:await makeCardPage(s.monsterSrc),
          name:`${base}_page_${page++}_monster_${safeName(s.monsterName)}.png`
        });
      }

      for(let i=0;i<downloads.length;i++){
        if(i) await new Promise(resolve=>setTimeout(resolve,200));
        downloadCanvas(downloads[i].canvas,downloads[i].name);
      }
    }catch(err){
      console.error(err);
      alert('Could not create the GM PNG export.');
    }finally{
      if(button){
        button.disabled=false;
        button.textContent=original||'DOWNLOAD GM PNGs';
      }
    }
  }

  const button=byId('downloadRun');
  if(button) button.addEventListener('click',downloadPack);
})();