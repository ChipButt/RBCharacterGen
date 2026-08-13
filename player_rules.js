(()=>{
  const ACTION_MIN_LEVEL={
    'Flurry of Blows':2,
    'Divine Smite':2,
    'Thunderous Smite':2,
    'Hunter’s Mark':2,
    'Hail of Thorns':2
  };

  const UNIVERSAL_ACTIONS=[
    {name:'Dash',ability:'STR',dice:'—',type:'Effect',bonusText:'—',damageText:'Extra movement',desc:'Use your action to gain extra movement equal to your speed for the current turn.'},
    {name:'Disengage',ability:'DEX',dice:'—',type:'Effect',bonusText:'—',damageText:'No opportunity attacks',desc:'Your movement does not provoke opportunity attacks for the rest of the current turn.'},
    {name:'Dodge',ability:'DEX',dice:'—',type:'Effect',bonusText:'—',damageText:'Defensive',desc:'Until your next turn, attacks you can see have disadvantage against you, and you have advantage on Dexterity saving throws.'},
    {name:'Help',ability:'CHA',dice:'—',type:'Effect',bonusText:'—',damageText:'Grant advantage',desc:'Aid another creature with a task or distract an enemy so an ally gains advantage on the next relevant check or attack.'}
  ];

  const ITEM_NAME_MAX=45;
  const ITEM_DESC_MAX=150;

  function addStyles(){
    if(document.getElementById('rb-structured-edit-styles'))return;
    const style=document.createElement('style');
    style.id='rb-structured-edit-styles';
    style.textContent=`
      .rb-edit-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
      .rb-edit-grid label{margin:0}
      .rb-section-label{display:block;margin:14px 0 7px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.03em;color:#333}
      .rb-help{font-size:11px;color:#666;line-height:1.4;margin:0 0 9px}
      .rb-action-list,.rb-item-list{display:grid;gap:10px;margin-bottom:12px}
      .rb-action-row,.rb-item-row{border:1px solid #d4d4d4;border-radius:10px;padding:10px;background:#fafafa}
      .rb-action-row h3,.rb-item-row h3{margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#555}
      .rb-action-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:7px}
      .rb-readout{display:block;width:100%;min-height:38px;margin-top:5px;border:1px solid #d3d3d3;border-radius:8px;padding:9px 10px;background:#f0f0f0;color:#222;font-size:12px;line-height:1.35;white-space:normal}
      .rb-action-desc{min-height:68px}
      .rb-item-row textarea{min-height:78px;resize:vertical}
      .rb-derived{background:#f0f0f0!important;color:#555!important;cursor:not-allowed}
      @media(max-width:520px){.rb-edit-grid,.rb-action-meta{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function trimDesc(value){
    const text=String(value||'').trim();
    if(text.length<=ITEM_DESC_MAX)return text;
    const cut=text.slice(0,ITEM_DESC_MAX+1);
    const word=cut.lastIndexOf(' ');
    return (word>100?cut.slice(0,word):text.slice(0,ITEM_DESC_MAX)).trim().replace(/[.,;:!?-]+$/,'')+'…';
  }

  function splitItem(line){
    const parts=String(line||'').split('—');
    return {name:(parts.shift()||'').trim(),desc:(parts.join('—')||'').trim()};
  }

  function waitForApi(){
    return new Promise(resolve=>{
      const tryNow=()=>{
        if(window.__rb600&&window.__rb600.getState){resolve(window.__rb600);return true;}
        return false;
      };
      if(tryNow())return;
      const timer=setInterval(()=>{if(tryNow())clearInterval(timer)},25);
      setTimeout(()=>{clearInterval(timer);if(!tryNow())resolve(null)},10000);
    });
  }

  waitForApi().then(api=>{
    if(!api)return;
    addStyles();

    const legacySpecies=document.getElementById('speciesInput');
    const legacyClass=document.getElementById('classInput');
    const legacySpeed=document.getElementById('speedInput');
    const hpInput=document.getElementById('hpInput');
    const levelInput=document.getElementById('levelInput');
    const statsEditor=document.getElementById('statsEditor');
    const pointBuy=document.getElementById('pointBuyStatus');
    const legacyActions=document.getElementById('spellsInput');
    const legacyEquipment=document.getElementById('equipmentInput');
    const editContent=document.getElementById('editCharacterContent');
    if(!editContent)return;

    const oldGrid=legacySpecies?.closest('.grid.two');
    if(oldGrid)oldGrid.style.display='none';
    if(legacyActions?.closest('label'))legacyActions.closest('label').style.display='none';
    if(legacyEquipment?.closest('label'))legacyEquipment.closest('label').style.display='none';

    if(legacySpeed){
      legacySpeed.readOnly=true;
      legacySpeed.classList.add('rb-derived');
      legacySpeed.title='Speed is determined by the selected species.';
    }
    if(hpInput){
      hpInput.readOnly=true;
      hpInput.classList.add('rb-derived');
      hpInput.title='Hit Points are calculated from class, level and Constitution and cannot be manually increased.';
    }

    const selectorGrid=document.createElement('div');
    selectorGrid.className='rb-edit-grid';
    selectorGrid.innerHTML='<label>Species<select id="rbSpeciesEdit"></select></label><label>Class<select id="rbClassEdit"></select></label>';
    oldGrid?.insertAdjacentElement('afterend',selectorGrid);
    const speciesSelect=selectorGrid.querySelector('#rbSpeciesEdit');
    const classSelect=selectorGrid.querySelector('#rbClassEdit');
    speciesSelect.innerHTML=Object.keys(api.speciesData).map(x=>`<option value="${x}">${x}</option>`).join('');
    classSelect.innerHTML=Object.keys(api.classData).map(x=>`<option value="${x}">${x}</option>`).join('');

    const actionLabel=document.createElement('div');
    actionLabel.className='rb-section-label';
    actionLabel.textContent='Action rows';
    const actionHelp=document.createElement('div');
    actionHelp.className='rb-help';
    actionHelp.textContent='Choose an action or spell available to the current class and level. The remaining action fields are filled automatically.';
    const actionList=document.createElement('div');
    actionList.className='rb-action-list';

    const itemLabel=document.createElement('div');
    itemLabel.className='rb-section-label';
    itemLabel.textContent='Items';
    const itemHelp=document.createElement('div');
    itemHelp.className='rb-help';
    itemHelp.textContent='Three editable items. Names can be changed freely; descriptions are limited to 150 characters so they remain readable on the sheet.';
    const itemList=document.createElement('div');
    itemList.className='rb-item-list';

    if(pointBuy){
      pointBuy.insertAdjacentElement('afterend',actionLabel);
      actionLabel.insertAdjacentElement('afterend',actionHelp);
      actionHelp.insertAdjacentElement('afterend',actionList);
      actionList.insertAdjacentElement('afterend',itemLabel);
      itemLabel.insertAdjacentElement('afterend',itemHelp);
      itemHelp.insertAdjacentElement('afterend',itemList);
    }else{
      editContent.append(actionLabel,actionHelp,actionList,itemLabel,itemHelp,itemList);
    }

    function poolForState(state){
      const classPool=(api.ACTION_PRESETS[state.cls]||[]).filter(action=>(Number(state.level)||1)>=(ACTION_MIN_LEVEL[action.name]||1));
      const combined=[...classPool,...UNIVERSAL_ACTIONS];
      const seen=new Set();
      return combined.filter(a=>{if(seen.has(a.name))return false;seen.add(a.name);return true;});
    }

    function ensureActions(state){
      const pool=poolForState(state);
      if(!Array.isArray(state.actions))state.actions=[];
      state.actions=state.actions.filter(action=>pool.some(option=>option.name===action.name));
      for(const option of pool){
        if(state.actions.length>=4)break;
        if(!state.actions.some(a=>a.name===option.name))state.actions.push({...option});
      }
      while(state.actions.length<4&&pool.length)state.actions.push({...pool[state.actions.length%pool.length]});
      state.actions=state.actions.slice(0,4);
      return pool;
    }

    function bonusText(action){
      if(action.bonusText!=null)return action.bonusText;
      const value=api.attackBonus(action);
      return typeof value==='number'?api.fmtMod(value):String(value);
    }

    function damageText(action){
      if(action.damageText!=null)return action.damageText;
      return api.attackDamage(action);
    }

    function renderActions(){
      const state=api.getState();
      if(!state)return;
      const pool=ensureActions(state);
      actionList.innerHTML='';
      state.actions.forEach((action,index)=>{
        const row=document.createElement('div');
        row.className='rb-action-row';
        row.innerHTML=`<h3>Action ${index+1}</h3><label>Name<select class="rb-action-select"></select></label><div class="rb-action-meta"><label>Bonus / Save<span class="rb-readout rb-bonus"></span></label><label>Damage / Effect<span class="rb-readout rb-damage"></span></label></div><label>Description<span class="rb-readout rb-action-desc"></span></label>`;
        const select=row.querySelector('.rb-action-select');
        select.innerHTML=pool.map(option=>`<option value="${option.name}">${option.name}</option>`).join('');
        select.value=action.name;
        const updateReadout=()=>{
          const current=state.actions[index];
          row.querySelector('.rb-bonus').textContent=bonusText(current);
          row.querySelector('.rb-damage').textContent=damageText(current);
          row.querySelector('.rb-action-desc').textContent=current.desc||'';
        };
        select.addEventListener('change',()=>{
          const chosen=pool.find(option=>option.name===select.value);
          if(!chosen)return;
          state.actions[index]={...chosen};
          updateReadout();
          api.render();
        });
        updateReadout();
        actionList.appendChild(row);
      });
    }

    function normaliseItems(state){
      const lines=Array.isArray(state.equipment)?state.equipment:[];
      const gold=lines.find(line=>/^\d+\s*gp$/i.test(String(line).trim()))||'10 gp';
      const items=lines.filter(line=>!/^\d+\s*gp$/i.test(String(line).trim())).slice(0,3).map(splitItem);
      while(items.length<3)items.push({name:'Unnamed Item',desc:'Add a short description.'});
      items.forEach(item=>{
        item.name=(item.name||'Unnamed Item').slice(0,ITEM_NAME_MAX);
        item.desc=trimDesc(item.desc||'Add a short description.');
      });
      state.equipment=[...items.map(item=>`${item.name} — ${item.desc}`),gold];
      return {items,gold};
    }

    function renderItems(){
      const state=api.getState();
      if(!state)return;
      const {items,gold}=normaliseItems(state);
      itemList.innerHTML='';
      const commit=()=>{
        state.equipment=[...items.map(item=>`${item.name} — ${item.desc}`),gold];
        api.render();
      };
      items.forEach((item,index)=>{
        const row=document.createElement('div');
        row.className='rb-item-row';
        row.innerHTML=`<h3>Item ${index+1}</h3><label>Item name<input class="rb-item-name" type="text" maxlength="${ITEM_NAME_MAX}"></label><label>Description<textarea class="rb-item-desc" rows="3" maxlength="${ITEM_DESC_MAX}"></textarea></label>`;
        const name=row.querySelector('.rb-item-name');
        const desc=row.querySelector('.rb-item-desc');
        name.value=item.name;
        desc.value=item.desc;
        name.addEventListener('input',()=>{item.name=(name.value||'Unnamed Item').slice(0,ITEM_NAME_MAX);commit();});
        desc.addEventListener('input',()=>{item.desc=trimDesc(desc.value);commit();});
        itemList.appendChild(row);
      });
      const goldNote=document.createElement('div');
      goldNote.className='rb-help';
      goldNote.textContent=`Gold carried: ${gold}`;
      itemList.appendChild(goldNote);
    }

    function guardStats(){
      statsEditor?.querySelectorAll('input[type="number"]').forEach(input=>{
        input.min='8';input.max='15';input.step='1';
        if(input.dataset.rbCapGuard)return;
        input.dataset.rbCapGuard='1';
        input.addEventListener('input',()=>{
          if(input.value==='')return;
          const n=Number(input.value);
          if(n>15)input.value='15';
          if(n<8)input.value='8';
        });
      });
    }

    function refreshDerivedLabels(){
      const state=api.getState();
      if(!state)return;
      speciesSelect.value=state.species;
      classSelect.value=state.cls;
      if(legacySpecies){legacySpecies.value=state.species;legacySpecies.readOnly=true;}
      if(legacyClass){legacyClass.value=state.cls;legacyClass.readOnly=true;}
      if(legacySpeed){legacySpeed.value=state.speed;legacySpeed.readOnly=true;}
      if(hpInput){
        hpInput.value=state.hp;
        hpInput.readOnly=true;
        const maxHp=api.calcHP(state.cls,state.level,{...state.stats,CON:15});
        hpInput.max=String(maxHp);
        hpInput.title=`Calculated automatically. Maximum HP at this class and level under the generator's legal Constitution cap is ${maxHp}.`;
      }
      if(levelInput){levelInput.min='1';levelInput.max='20';levelInput.step='1';}
      guardStats();
    }

    function refreshAll(){
      if(!api.getState())return;
      refreshDerivedLabels();
      renderActions();
      renderItems();
    }

    speciesSelect.addEventListener('change',()=>{
      const state=api.getState();
      if(!state||!api.speciesData[speciesSelect.value])return;
      state.species=speciesSelect.value;
      state.speed=`${api.speciesData[state.species].speed} ft`;
      api.applySpeciesPortrait(state.species);
      if(legacySpecies)legacySpecies.value=state.species;
      if(legacySpeed)legacySpeed.value=state.speed;
      renderActions();
      api.render();
    });

    classSelect.addEventListener('change',()=>{
      const state=api.getState();
      const cls=classSelect.value;
      if(!state||!api.classData[cls])return;
      state.cls=cls;
      state.saveProfs=[...api.classData[cls].saves];
      state.skillProfs=api.chooseSkills(cls);
      state.spellLines=api.chooseSpellLines(cls,state.level);
      state.actions=[];
      api.refreshDerivedStatsAfterPointBuy();
      if(legacyClass)legacyClass.value=cls;
      api.syncInputs();
      api.render();
      setTimeout(refreshAll,0);
    });

    levelInput?.addEventListener('change',()=>{
      const state=api.getState();
      if(!state)return;
      state.level=Math.max(1,Math.min(20,Math.round(Number(levelInput.value)||state.level)));
      state.prof=api.proficiency(state.level);
      state.spellLines=api.chooseSpellLines(state.cls,state.level);
      state.actions=[];
      api.refreshDerivedStatsAfterPointBuy();
      api.syncInputs();
      api.render();
      setTimeout(refreshAll,0);
    });

    document.getElementById('generateBtn')?.addEventListener('click',()=>setTimeout(refreshAll,0));
    document.getElementById('editCharacterToggle')?.addEventListener('click',()=>setTimeout(refreshAll,0));
    statsEditor?.addEventListener('change',()=>setTimeout(()=>{refreshDerivedLabels();renderActions()},0));

    const starter=setInterval(()=>{
      if(api.getState()){
        clearInterval(starter);
        refreshAll();
      }
    },40);
    setTimeout(()=>clearInterval(starter),10000);
  });
})();
