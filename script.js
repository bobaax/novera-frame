const FORMATS = { square:{w:1080,h:1080}, portrait:{w:1080,h:1350}, story:{w:1080,h:1920} };
const THEMES = {
  navy :{b1:'#050b24',b2:'#0a2260',accent:'#2ec4f5',text:'#ffffff',muted:'#9db8ea'},
  ocean:{b1:'#0b3d91',b2:'#1e6fe0',accent:'#aee9ff',text:'#ffffff',muted:'#d6ecff'},
  light:{b1:'#f4f8ff',b2:'#dcebff',accent:'#1e6fe0',text:'#0a1a4a',muted:'#4a5f91'}
};
const S = { img:null, zoom:1, ox:0, oy:0, format:'square', theme:'navy' };
const $ = id => document.getElementById(id);
const cv = $('frame'), ctx = cv.getContext('2d');
const logo = new Image(); logo.src = 'data:image/jpeg;base64,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'; logo.onload = draw;

function rr(x,y,w,h,r){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); }

function wrap(text,maxW,maxLines){
  const words = text.split(/\s+/).filter(Boolean), lines = []; let cur = '';
  for (const w of words){
    const t = cur ? cur+' '+w : w;
    if (ctx.measureText(t).width > maxW && cur){ lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines.slice(0,maxLines);
}

function boxOf(W,H){
  const pad = 60, headerH = 110, footerH = S.format==='story' ? 340 : 270;
  return { pad, headerH, x:pad, y:pad+headerH, w:W-pad*2, h:H-pad*2-headerH-footerH+pad };
}

function clamp(b){
  if(!S.img) return;
  const s = Math.max(b.w/S.img.width, b.h/S.img.height)*S.zoom;
  const mx = Math.max(0,(S.img.width*s-b.w)/2), my = Math.max(0,(S.img.height*s-b.h)/2);
  S.ox = Math.min(mx,Math.max(-mx,S.ox)); S.oy = Math.min(my,Math.max(-my,S.oy));
}

function draw(){
  const {w:W,h:H} = FORMATS[S.format], t = THEMES[S.theme];
  cv.width = W; cv.height = H;
  const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,t.b1); g.addColorStop(1,t.b2);
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

  const b = boxOf(W,H);
  // header
  if (logo.complete && logo.naturalWidth){
    ctx.save(); rr(b.pad,b.pad,86,86,20); ctx.fillStyle='#fff'; ctx.fill(); ctx.clip();
    ctx.drawImage(logo,b.pad+4,b.pad+4,78,78); ctx.restore();
  }
  ctx.textBaseline='alphabetic'; ctx.textAlign='left';
  ctx.fillStyle = t.text; ctx.font = '800 52px Sora, Cairo, sans-serif';
  ctx.fillText('NOVERA', b.pad+112, b.pad+46);
  ctx.fillStyle = t.muted; ctx.font = '500 26px Sora, Cairo, sans-serif';
  ctx.fillText('Lotus University · Volunteer Team', b.pad+112, b.pad+82);

  // photo
  ctx.save(); rr(b.x,b.y,b.w,b.h,44); ctx.clip();
  if (S.img){
    clamp(b);
    const s = Math.max(b.w/S.img.width, b.h/S.img.height)*S.zoom;
    const dw = S.img.width*s, dh = S.img.height*s;
    ctx.drawImage(S.img, b.x+b.w/2-dw/2+S.ox, b.y+b.h/2-dh/2+S.oy, dw, dh);
  } else {
    ctx.fillStyle = 'rgba(46,196,245,.10)'; ctx.fillRect(b.x,b.y,b.w,b.h);
    ctx.fillStyle = t.muted; ctx.textAlign='center'; ctx.font='600 40px Sora, sans-serif';
    ctx.fillText('Your Photo', W/2, b.y+b.h/2);
    ctx.font='400 28px Sora, sans-serif'; ctx.fillText('Tap to add', W/2, b.y+b.h/2+48);
  }
  ctx.restore();
  rr(b.x,b.y,b.w,b.h,44); ctx.lineWidth = 8; ctx.strokeStyle = t.accent; ctx.stroke();

  // footer
  const name = $('name').value.trim() || 'Your Name';
  const cap = 'Welcome To Novera';
  let y = b.y+b.h+88; ctx.textAlign='left';
  ctx.fillStyle = t.text; ctx.font = '800 66px Sora, Cairo, sans-serif';
  ctx.fillText(name, b.pad, y);
  ctx.fillStyle = t.accent; ctx.fillRect(b.pad, y+22, 120, 6);
  ctx.fillStyle = t.muted; ctx.font = '500 36px Sora, Cairo, sans-serif';
  wrap(cap, W-b.pad*2, 2).forEach((l,i)=>ctx.fillText(l, b.pad, y+86+i*50));
  ctx.textAlign='right'; ctx.font='600 24px Sora, sans-serif'; ctx.fillStyle=t.muted;
  ctx.fillText('Novera · Lotus University', W-b.pad, H-b.pad+10);

  cv.classList.toggle('has', !!S.img);
  $('hint').textContent = S.img ? 'Drag the photo to reposition it' : 'Tap the frame to add your photo';
}

function loadFile(f){
  if(!f || !f.type.startsWith('image/')) return;
  const img = new Image();
  img.onload = () => { S.img = img; S.zoom = 1; S.ox = S.oy = 0; $('zoom').value = 1; $('zoomVal').textContent='1.00'; draw(); };
  img.src = URL.createObjectURL(f);
}

$('drop').onclick = () => $('file').click();
$('file').onchange = e => loadFile(e.target.files[0]);
['dragover','dragenter'].forEach(ev=>document.addEventListener(ev,e=>{e.preventDefault();$('drop').classList.add('over');}));
['dragleave','drop'].forEach(ev=>document.addEventListener(ev,e=>{e.preventDefault();$('drop').classList.remove('over');}));
document.addEventListener('drop', e => loadFile(e.dataTransfer.files[0]));

$('name').oninput = draw;
$('zoom').oninput = e => { S.zoom = +e.target.value; $('zoomVal').textContent = S.zoom.toFixed(2); draw(); };
$('reset').onclick = () => { S.zoom=1; S.ox=S.oy=0; $('zoom').value=1; $('zoomVal').textContent='1.00'; draw(); };

function seg(id,key){
  $(id).onclick = e => {
    const v = e.target.dataset.v; if(!v) return;
    S[key] = v; S.ox = S.oy = 0;
    [...$(id).children].forEach(c=>c.classList.toggle('on',c===e.target)); draw();
  };
}
seg('formats','format'); seg('themes','theme');

// drag to pan / tap to pick
let drag=null;
cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); drag={x:e.clientX,y:e.clientY,ox:S.ox,oy:S.oy,moved:false}; };
cv.onpointermove = e => {
  if(!drag||!S.img) return;
  const k = cv.width/cv.getBoundingClientRect().width;
  const dx=(e.clientX-drag.x)*k, dy=(e.clientY-drag.y)*k;
  if(Math.abs(dx)+Math.abs(dy)>6) drag.moved=true;
  S.ox=drag.ox+dx; S.oy=drag.oy+dy; draw();
};
cv.onpointerup = () => { if(drag && !drag.moved && !S.img) $('file').click(); drag=null; };

$('download').onclick = async () => {
  const btn = $('download'); btn.disabled = true; btn.textContent = 'Rendering';
  try {
    await document.fonts.ready; draw();
    const blob = await new Promise((res, rej) => cv.toBlob(b => b ? res(b) : rej(new Error('empty')), 'image/png'));
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'novera-frame.png';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    btn.textContent = 'Saved';
  } catch (err) {
    console.error(err); btn.textContent = 'Failed, try again';
  }
  setTimeout(() => { btn.disabled = false; btn.textContent = 'Download Frame'; }, 1800);
};

document.fonts.ready.then(draw); draw();
