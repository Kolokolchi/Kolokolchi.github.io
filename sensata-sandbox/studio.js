const concepts = [
  {id:'forma', name:'Форма', axis:'Архитектура', family:'line', font:'Segoe UI', detail:'Перетащите панораму для осмотра', palette:['#242348','#5048B8','#E4E2F8','#F8F8F4'], description:'Знак из двух арок повторяется в линейных пиктограммах. Вертикальное меню оставляет панораме большую часть экрана.'},
  {id:'orbita', name:'Орбита', axis:'Кинематограф', family:'duo', font:'Trebuchet MS Italic', detail:'', palette:['#111920','#263B45','#91E5EE','#E4F4F6'], description:'Орбита вокруг знака задаёт форму навигации. Панорама занимает весь кадр, подсвеченные указатели и плавающая панель лежат поверх неё.'},
  {id:'atlas', name:'Атлас', axis:'Картография', family:'iso', font:'Georgia / Consolas', detail:'43.25685° N · 76.89960° E', palette:['#174C39','#2F664D','#DCE2BC','#F3F0DF'], description:'Горизонтали Заилийского Алатау образуют знак. Сетка, координаты и пронумерованные остановки превращают прогулку в маршрут.'},
  {id:'signal', name:'Сигнал', axis:'Навигация', family:'solid', font:'Arial Black', detail:'', palette:['#202020','#FFD745','#F9F7EC','#FFFFFF'], description:'Двойная стрелка, жёлтые таблички и плотные силуэты заимствуют язык городских указателей. Выбор зоны вынесен на верхнюю полосу.'},
  {id:'terra', name:'Терра', axis:'Жилой альбом', family:'soft', font:'Georgia Italic', detail:'Перетащите панораму для осмотра', palette:['#56352A','#945141','#E8CEBD','#F3E8DF'], description:'Веерный знак и арочный кадр напоминают детали жилой архитектуры. Тёплая бумага, антиква и мягкие линии собирают тур в альбом.'}
];
const familyNames = {line:'Линейные', duo:'Двухтоновые', iso:'Изометрические', solid:'Силуэтные', soft:'Пластичные'};
const formats = [
  {id:'icon', name:'Иконка'},
  {id:'pin', name:'Пин'},
  {id:'arrow', name:'Стрелка'},
  {id:'sign', name:'Указатель'},
  {id:'photo', name:'Фото'}
];
const zones = ['Аэро','Двор','Холл','Квартира'];
const entryScenes = ['aero','yard','hall','apartment'];
const mediaRoot = 'media/';
const scenes = {
  aero:{zone:0,title:'Аэропанорама',folder:'_1__airpano__100m__re_20624',view:[76.72,-12.74,48],spots:[[73.37,-13.93,'yard']]},
  yard:{zone:1,title:'Внутренний двор',folder:'pano_24632',view:[16,4,73],spots:[[-1.49,-17.06,'hall'],[-171.01,37.89,'aero']]},
  hall:{zone:2,title:'Входной холл',folder:'pano_22168',view:[-11,0,70],spots:[[-4.05,-18,'lift'],[178.11,-18,'yard']]},
  lift:{zone:2,title:'Лифт',folder:'pano_22171',view:[161,-2,70],spots:[[161.25,-18,'hall']]},
  apartment:{zone:3,title:'Гостиная',folder:'panorama_2355978F_29B2_B5B4_41AE_AB74727098BE_0',tileLevel:0,view:[19.11,-2,78],spots:[[-22.29,-24,'foyer']]},
  foyer:{zone:3,title:'Прихожая',folder:'panorama_23D69A94_29B3_7FD4_41B2_1752B6E2DA79_0',tileLevel:1,view:[60,-2,78],spots:[[62.6,-24,'apartment']]}
};
const $ = id => document.getElementById(id);
const stage = $('stage'), viewport = $('viewport'), camera = $('camera'), experience = $('experience');
const params = new URLSearchParams(location.hash.slice(1));
let concept = concepts.find(item => item.id === params.get('style')) || concepts[0];
let family = Object.hasOwn(familyNames,params.get('icons')) ? params.get('icons') : concept.family;
let format = formats.find(item => item.id === params.get('format'))?.id || 'classic';
let sceneId = Object.hasOwn(scenes,params.get('scene')) ? params.get('scene') : 'yard';
const clamp = (v, min, max) => Math.max(min,Math.min(max,v));
const rad = Math.PI / 180;
const wrap = n => ((n + 180) % 360 + 360) % 360 - 180;
let [yaw,pitch,fov] = scenes[sceneId].view;
function readAngle(key, fallback, min, max) {
  const n = params.has(key) ? Number(params.get(key)) : NaN;
  return Number.isFinite(n) ? clamp(n,min,max) : fallback;
}
yaw = readAngle('yaw',yaw,-180,180);
pitch = readAngle('pitch',pitch,-80,80);
fov = readAngle('fov',fov,35,92);
let spotElements = [];
let frame = 0;
function saveView() {
  const query = new URLSearchParams({style:concept.id, icons:family, scene:sceneId, format});
  const defaults = scenes[sceneId].view;
  [yaw,pitch,fov].forEach((value, i) => {
    if (Math.abs(value - defaults[i]) > .05) query.set(['yaw','pitch','fov'][i],String(+value.toFixed(1)));
  });
  history.replaceState(null,'','#'+query);
}
function draw() {
  frame = 0;
  const w = viewport.clientWidth, h = viewport.clientHeight;
  if (!w || !h) return;
  const focal = h / (2*Math.tan(fov*rad/2));
  viewport.style.perspective = focal+'px';
  camera.style.transform = 'translateZ('+focal+'px) rotateX('+pitch+'deg) rotateY('+yaw+'deg)';
  for (const {element, longitude, latitude} of spotElements) {
    const delta = (longitude - yaw)*rad, lat = latitude*rad, tilt = pitch*rad;
    const depth = Math.sin(lat)*Math.sin(tilt) + Math.cos(lat)*Math.cos(delta)*Math.cos(tilt);
    const x = w/2 + focal*Math.cos(lat)*Math.sin(delta)/depth;
    const y = h/2 + focal*(Math.cos(lat)*Math.cos(delta)*Math.sin(tilt)-Math.sin(lat)*Math.cos(tilt))/depth;
    element.hidden = depth <= 0 || x < 5 || x > w-5 || y < 5 || y > h-3;
    if (!element.hidden) element.style.transform = 'translate('+x+'px,'+y+'px) translate(-50%,var(--anchor-y))';
  }
  $('zoom-out').disabled = fov >= 92;
  $('zoom-in').disabled = fov <= 35;
}
function queueDraw() { if (!frame) frame = requestAnimationFrame(draw); }
function thumbnail(scene) {
  if (scene.tileLevel === undefined) return mediaRoot+'main/'+scene.folder+'/thumbnail.jpg';
  return mediaRoot+'kv/'+scene.folder.replace(/_0$/,'_t.avif');
}
function markerArt(shape, dest, label = dest.title) {
  const symbol = artwork.icon(family,dest.zone);
  switch (shape) {
    case 'classic':
      return '<span class="marker-classic"><span>'+symbol+'</span>'+label+'</span>';
    case 'icon':
      return '<span class="marker-icon">'+symbol+'</span>';
    case 'pin':
      return '<span class="marker-pin"><span>'+symbol+'</span></span>';
    case 'arrow':
      return '<span class="marker-arrow'+(dest.zone === 0 ? ' ascending' : '')+'"><svg aria-hidden="true" viewBox="0 0 80 48"><ellipse class="arrow-rim" cx="40" cy="28" rx="36" ry="15"/><path class="arrow-side" d="M14 29 40 7l26 22v6L40 23 14 35Z"/><path class="arrow-face" d="M14 29 40 7l26 22-26-12z"/></svg></span>';
    case 'sign':
      return '<span class="marker-sign"><b>'+label+'</b>'+artwork.ui('arrow')+'</span>';
    case 'photo':
      return '<span class="marker-photo"><img src="'+thumbnail(dest)+'" alt="" draggable="false"><span>'+label+artwork.ui('arrow')+'</span></span>';
  }
}
function renderFormats() {
  $('formats').dataset.theme = concept.id;
  $('original-format').setAttribute('aria-pressed',String(format === 'classic'));
  for (const button of $('formats').children) {
    const id = button.dataset.format;
    button.setAttribute('aria-pressed',String(id === format));
    button.firstElementChild.innerHTML = markerArt(id,scenes.hall,'Холл');
  }
}
function renderSpots() {
  spotElements = scenes[sceneId].spots.map(([longitude,latitude,target]) => {
    const element = document.createElement('button'), dest = scenes[target];
    element.className = 'spot';
    element.dataset.format = format;
    element.innerHTML = markerArt(format,dest);
    if (['icon','pin','arrow'].includes(format)) {
      const tooltip = document.createElement('span');
      tooltip.className = 'spot-tooltip'; tooltip.textContent = dest.title;
      element.append(tooltip);
    }
    element.setAttribute('aria-label','Перейти в сцену «'+dest.title+'»');
    element.onclick = () => { changeScene(target); viewport.focus({preventScroll:true}); };
    return {element,longitude,latitude};
  });
  $('spots').replaceChildren(...spotElements.map(s => s.element));
  queueDraw();
}
function renderCube() {
  const scene = scenes[sceneId];
  const rotations = ['rotateY(0deg)','rotateY(-90deg)','rotateY(180deg)','rotateY(90deg)','rotateX(-90deg)','rotateX(90deg)'];
  const faces = rotations.map((rot,index) => {
    const face = document.createElement('div');
    face.className = 'face';
    face.style.transform = rot+' translateZ(-512px)';
    if (scene.tileLevel === undefined) {
      face.style.backgroundImage = 'url("'+mediaRoot+'main/'+scene.folder+'/tablet/'+index+'.jpg")';
    } else {
      const path = mediaRoot+'kv/'+scene.folder+'/'+'frblud'[index]+'/'+scene.tileLevel+'/';
      face.style.backgroundImage = ['0_0','0_1','1_0','1_1'].map(tile => 'url("'+path+tile+'.avif")').join(',');
      face.style.backgroundSize = '50.05% 50.05%';
      face.style.backgroundPosition = 'left top,right top,left bottom,right bottom';
    }
    return face;
  });
  camera.replaceChildren(...faces);
  $('scene-title').textContent = scene.title;
}
function changeScene(id) {
  sceneId = id;
  [yaw,pitch,fov] = scenes[id].view;
  renderCube(); renderControls(); saveView();
}
function renderControls() {
  experience.dataset.format = format;
  const buttons = [...$('scenes').children];
  buttons.forEach((el,i) => {
    const scene = scenes[entryScenes[i]];
    let glyph = artwork.icon(family,i);
    if (format === 'photo') glyph = '<img src="'+thumbnail(scene)+'" alt="" draggable="false">';
    if (format === 'arrow') glyph = markerArt('arrow',scene);
    if (format === 'sign') glyph = '';
    el.innerHTML = '<span class="zone-symbol">'+glyph+'</span><span>'+zones[i]+'</span><span class="zone-arrow">'+artwork.ui('arrow')+'</span>';
    el.setAttribute('aria-pressed',String(i === scenes[sceneId].zone));
  });
  $('icon-sample').innerHTML = zones.map((zone,i) => '<span title="'+zone+'" aria-label="'+zone+'">'+artwork.icon(family,i)+'</span>').join('');
  $('icon-family').value = family;
  renderFormats(); renderSpots();
}
function renderConcept() {
  experience.dataset.theme = concept.id;
  $('specimen').dataset.theme = concept.id;
  $('current-concept').textContent = concept.name;
  $('themes').querySelectorAll('button').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.theme === concept.id)));
  document.querySelector('.sign').innerHTML = artwork.mark(concept.id);
  document.querySelector('.small-sign').innerHTML = artwork.ui(concept.id === 'atlas' ? 'pin' : 'orbit');
  $('menu-detail').textContent = concept.detail;
  $('concept-title').textContent = 'Концепция «'+concept.name+'»';
  $('concept-description').textContent = concept.description;
  $('palette').innerHTML = concept.palette.map(color => '<span title="'+color+'" aria-label="'+color+'" style="background:'+color+'"></span>').join('');
  $('palette').setAttribute('aria-label','Цвета концепции: '+concept.palette.join(', '));
  $('type-name').textContent = concept.font;
  renderControls();
}
function selectConcept(index) {
  concept = concepts[index]; family = concept.family;
  renderConcept(); saveView();
}
document.querySelectorAll('[data-ui]').forEach(el => el.innerHTML = artwork.ui(el.dataset.ui));
$('toggle-themes').onclick = () => {
  $('themes').hidden = !$('themes').hidden;
  $('toggle-themes').setAttribute('aria-expanded',String(!$('themes').hidden));
};
function selectFormat(id) {
  if (format === id) return;
  format = id; renderControls(); saveView();
}
$('original-format').onclick = () => selectFormat('classic');
formats.forEach(item => {
  const button = document.createElement('button');
  button.className = 'format-choice'; button.dataset.format = item.id;
  button.innerHTML = '<span class="format-proof" aria-hidden="true"></span><span>'+item.name+'</span>';
  button.onclick = () => selectFormat(item.id);
  $('formats').append(button);
});
concepts.forEach((item,index) => {
  const button = document.createElement('button');
  button.className = 'concept'; button.dataset.theme = item.id;
  button.innerHTML = '<span class="tile-art">'+artwork.mark(item.id)+'</span><span><span class="tile-name">'+item.name+'</span><span class="tile-axis">'+item.axis+'</span></span><span class="concept-tick">'+artwork.ui('check')+'</span>';
  button.onclick = () => selectConcept(index);
  $('themes').append(button);
});
entryScenes.forEach(id => {
  const button = document.createElement('button');
  button.className = 'zone'; button.onclick = () => changeScene(id);
  $('scenes').append(button);
});
Object.entries(familyNames).forEach(([id,label]) => $('icon-family').add(new Option(label,id)));
$('icon-family').onchange = e => { family = e.target.value; renderControls(); saveView(); };
new ResizeObserver(queueDraw).observe(viewport);
renderCube(); renderConcept();

function zoom(amount) { fov = clamp(fov+amount,35,92); queueDraw(); saveView(); }
$('home-view').onclick = () => { [yaw,pitch,fov] = scenes[sceneId].view; queueDraw(); saveView(); };
$('zoom-out').onclick = () => zoom(8);
$('zoom-in').onclick = () => zoom(-8);
let drag = null;
viewport.addEventListener('pointerdown', e => {
  if (drag || e.button !== 0) return;
  viewport.setPointerCapture(e.pointerId);
  drag = {id:e.pointerId,x:e.clientX,y:e.clientY,yaw,pitch};
});
viewport.addEventListener('pointermove', e => {
  if (!drag || drag.id !== e.pointerId) return;
  const scale = fov/viewport.clientHeight;
  yaw = wrap(drag.yaw - (e.clientX-drag.x)*scale);
  pitch = clamp(drag.pitch + (e.clientY-drag.y)*scale,-80,80);
  queueDraw();
});
viewport.addEventListener('lostpointercapture', e => {
  if (drag && drag.id === e.pointerId) { drag = null; saveView(); }
});
stage.addEventListener('wheel',e => {
  if (e.ctrlKey || e.metaKey) return;
  e.preventDefault(); zoom(Math.sign(e.deltaY)*4);
},{passive:false});
viewport.addEventListener('keydown',e => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  switch(e.key) {
    case 'ArrowLeft': yaw = wrap(yaw-7); break;
    case 'ArrowRight': yaw = wrap(yaw+7); break;
    case 'ArrowUp': pitch = clamp(pitch+6,-80,80); break;
    case 'ArrowDown': pitch = clamp(pitch-6,-80,80); break;
    case '+': case '=': zoom(-8); break;
    case '-': zoom(8); break;
    default: return;
  }
  e.preventDefault(); queueDraw(); saveView();
});
document.addEventListener('keydown',e => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.target.matches('select,input,textarea')) return;
  if (/^[1-5]$/.test(e.key)) selectConcept(Number(e.key)-1);
  if (e.key === 'Escape' && experience.classList.contains('full-window')) {
    experience.classList.remove('full-window'); updateExpand();
  }
});
function updateExpand() {
  const active = document.fullscreenElement === experience || experience.classList.contains('full-window');
  const label = active ? 'Свернуть тур' : 'Развернуть тур';
  $('expand').setAttribute('aria-label',label);
  $('expand').title = label;
  $('expand').innerHTML = '<span data-ui>'+artwork.ui(active ? 'shrink' : 'expand')+'</span>';
  if (!active) $('expand').focus({preventScroll:true});
  queueDraw();
}
$('expand').onclick = async () => {
  if (document.fullscreenElement) return document.exitFullscreen();
  if (!experience.classList.contains('full-window') && experience.requestFullscreen) {
    try { await experience.requestFullscreen(); return; } catch { /* Fall back to an in-page view. */ }
  }
  experience.classList.toggle('full-window'); updateExpand();
};
document.addEventListener('fullscreenchange',updateExpand);
let shareTimer;
$('share').onclick = async () => {
  saveView();
  try {
    await navigator.clipboard.writeText(location.href);
  } catch {
    const input = document.createElement('textarea');
    input.className = 'sr-only'; input.value = location.href; document.body.append(input); input.select();
    const copied = document.execCommand('copy'); input.remove(); $('share').focus();
    if (!copied) { window.prompt('Ссылка на выбранную концепцию',location.href); return; }
  }
  $('share-text').textContent = 'Ссылка скопирована';
  $('notice').textContent = 'Ссылка на выбранную концепцию скопирована.';
  clearTimeout(shareTimer);
  shareTimer = setTimeout(() => { $('share-text').textContent = 'Скопировать ссылку'; $('notice').textContent = ''; },1800);
};
