// Filago v3 - interação central
function goto(path){
  // suporta passar query params
  window.location.href = path;
}
function showMessage(text, type='ok'){
  const el = document.getElementById('msg');
  if(!el) return;
  el.textContent = text;
  el.className = 'msg ' + (type==='ok'?'ok':'erro');
  el.style.display = 'block';
  setTimeout(()=> el.style.display='none',3500);
}
async function carregarEmpresas(selectId){
  try{
    const res = await fetch('api/listar_empresas.php');
    const arr = await res.json();
    const sel = document.getElementById(selectId);
    if(!sel) return;
    sel.innerHTML = '<option value="">Selecione...</option>';
    arr.forEach(e=>{
      const opt = document.createElement('option'); opt.value=e.id; opt.textContent=e.nome; sel.appendChild(opt);
    });
  }catch(e){console.error(e); showMessage('Erro ao carregar empresas','erro')}
}
// funções admin
async function marcarAtendido(id){
  if(!confirm('Marcar como atendido?')) return;
  const res = await fetch('api/marcar_atendido.php?id='+id); const txt = await res.text(); showMessage(txt,'ok'); carregarFila();
}
async function removerTicket(id){
  if(!confirm('Remover ticket?')) return;
  const res = await fetch('api/remover_ticket.php?id='+id); const txt = await res.text(); showMessage(txt,'ok'); carregarFila();
}
async function chamarProximo(){
  const empresa_id = document.getElementById('empresa_id').value;
  if(!empresa_id){ showMessage('Escolha empresa','erro'); return; }
  const res = await fetch('api/chamar_proximo.php?empresa_id='+empresa_id);
  const txt = await res.text(); showMessage(txt,'ok'); carregarFila();
}
async function carregarFila(){
  const empresa_id = document.getElementById('empresa_id').value;
  if(!empresa_id){ showMessage('Escolha empresa','erro'); return; }
  const res = await fetch('api/listar_fila.php?empresa_id='+empresa_id);
  const fila = await res.json();
  const ul = document.getElementById('filaLista'); ul.innerHTML='';
  fila.forEach(ticket=>{
    const li = document.createElement('li');
    li.innerHTML = `<span>${ticket.id} - ${ticket.nome} <small>(${ticket.status})</small></span>`;
    const actions = document.createElement('div'); actions.className='ticket-actions';
    const btnAt=document.createElement('button'); btnAt.textContent='Atendido'; btnAt.onclick=()=>marcarAtendido(ticket.id);
    const btnRem=document.createElement('button'); btnRem.textContent='Remover'; btnRem.className='danger'; btnRem.onclick=()=>removerTicket(ticket.id);
    actions.appendChild(btnAt); actions.appendChild(btnRem); li.appendChild(actions); ul.appendChild(li);
  });
}
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

let slides = document.querySelectorAll(".slide");
let index = 0;

function nextSlide() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}

setInterval(nextSlide, 4000);