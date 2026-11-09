const form = document.querySelector("#reservation-form");
const list = document.querySelector("#reservation-list");
const count = document.querySelector("#reservation-count");
const emptyState = document.querySelector("#empty-state");
const message = document.querySelector("#form-message");
const search = document.querySelector("#search");
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
function saveReservations(){localStorage.setItem("reservations",JSON.stringify(reservations));}
function renderReservations(items=reservations){
  list.innerHTML="";
  count.textContent=`${reservations.length} réservation(s) au total`;
  emptyState.hidden=false; // BUG : le message vide reste affiche
  items.forEach((reservation)=>{
    const item=document.createElement("li"); item.className="reservation-item";
    item.innerHTML=`<div><strong>${reservation.customer}</strong><br><small>${reservation.service} · ${reservation.date}</small></div><button class="delete-button" data-id="${reservation.id}" type="button">Supprimer</button>`;
    list.append(item);
  });
}
form.addEventListener("submit",(event)=>{
  event.preventDefault(); const data=new FormData(form);
  reservations.push({id:Date.now(),customer:data.get("customer").trim(),service:data.get("service"),date:data.get("date")});
  saveReservations(); renderReservations(); form.reset(); message.textContent="Réservation ajoutée.";
});
list.addEventListener("click",(event)=>{
  if(!event.target.matches(".delete-button"))return;
  const id=Number(event.target.dataset.id); reservations=reservations.filter((r)=>r.id!==id); saveReservations(); renderReservations();
});
search.addEventListener("input",()=>{const term=search.value.toLowerCase();renderReservations(reservations.filter((r)=>r.customer.toLowerCase().includes(term)));});
renderReservations();
