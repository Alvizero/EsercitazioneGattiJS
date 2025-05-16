const login = document.getElementById("login");

const sezioneQuiz = document.getElementById("sezioneQuiz");
sezioneQuiz.style.display = "none";

const sezionePunteggi = document.getElementById("sezionePunteggi");
//sezionePunteggi.style.display = "none";

const nome = document.getElementById("nome");
const eta = document.getElementById("eta");
const email = document.getElementById("email");

// LOGIN
document.getElementById("accedi").addEventListener("click", accedi);

function accedi() {
  if (validazioneDati() == true) {
    login.style.display = "none";
    sezioneQuiz.style.display = "block";
  }
}

function validazioneDati() {

  if (nome.value == "") {
    alert("Inserisci il nome.");
    nome.focus();
    return false;
  }
  
  if (eta.value == "" || eta.value < 5) {
    alert("Inserisci la tua età, oppure devi avere piu' di 5 anni per fare il quiz");
    eta.focus();
    return false;
  }

  if (email.value == "") {
    alert("Inserisci il email.");
    email.focus();
    return false;
  }

  return true;
}

document.getElementById("cancella").addEventListener("click", cancella);

function cancella() {
  nome.value = "";
  eta.value = "";
  email.value = "";
}
// LOGIN


// QUIZ
document.getElementById("confermaQuiz").addEventListener("click", confermaQuiz);

let punteggio = 0;

function confermaQuiz() {
  punteggio = 0;

  rispondidom1(); // DOMANDA 1
  rispondidom2(); // DOMANDA 2
  rispondidom3(); // DOMANDA 3

  // per evitare che quando il punteggio viene mostrato all'utente, gli venga mostrato un punteggio negativo nel caso avesse che la somma dei punteggi di tutte le domande sia negativo
  if(punteggio < 0) {
    punteggio = 0;
  }

  mostraParte3(); // PARE 3 (PUNTEGGIO)
}

// DOMANDA 1
function rispondidom1() {
  if(felino.checked && !pesce.checked && !rettile.checked) {
    punteggio += 2;
  } else {
    punteggio--;
  }
}

// DOMANDA 2
document.getElementById("foto1").addEventListener("click", foto1);
document.getElementById("foto2").addEventListener("click", foto2);

let rispostaDom2;

function foto1() {
  rispostaDom2 = "foto1";
}

function foto2() {
  rispostaDom2 = "foto2";
}

function rispondidom2() {
  if(rispostaDom2 == "foto2") {
    punteggio += 2;
  } else {
    punteggio--;
  }
}

// DOMANDA 3
function rispondidom3() {
  if(domanda3.value == "risposta2") {
    punteggio += 2;
  } else {
    punteggio--;
  }
}
// QUIZ


// PARTE 3 //
function mostraParte3() {
  sezioneQuiz.style.display = "none";
  sezionePunteggi.style.display = "block";

  document.getElementById("nomeVisualizzato").innerHTML = "Nome: " + nome.value;
  document.getElementById("punteggio").innerHTML = "Punteggio totale: " + punteggio;

  document.getElementById("home").addEventListener("click", tornaLogin);

  // BARRA DEL TEMPO
  let barra = document.getElementById("barra");
  let tempoDurataBarra = 10; // ritorna alla home dopo 10 secondi
  
  barra.style.width = "100%"; // larghezza iniziale della barra al 100%

  let tempoBarra = setInterval(aggiornaBarra, 1000); // esegue questa funzione ogni secondo (1000ms)

  function aggiornaBarra() {
    tempoDurataBarra--; // Scala il tempo di durata della barra restante di un secondo
    let percentuale = tempoDurataBarra * 10; // Calcola la nuova larghezza della barra (1 second = 10%)
    barra.style.width = percentuale + "%"; // Applica la nuova larghezza

    let testoBarra = document.getElementById("testoBarra").innerHTML = "Tornerai in automatico all'inizio tra: " + tempoDurataBarra + " secondi"; // Aggiorna la scritta con il tempo rimanente

    if (tempoDurataBarra <= 0) { // Quando il tempo finisce
      clearInterval(tempoBarra); // Ferma il timer
      tornaLogin(); // Torna alla schermata di login
    }
  }
  // BARRA DEL TEMPO
}

// RESET DI TUTTO
function tornaLogin() {
  login.style.display = "block";
  sezioneQuiz.style.display = "none";
  sezionePunteggi.style.display = "none";

  // Reset dei dati
  cancella();
  punteggio = 0;
  rispostaDom2 = null;
}