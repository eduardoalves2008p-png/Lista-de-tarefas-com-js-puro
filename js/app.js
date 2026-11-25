
const campoTitulo = document.querySelector(".campoTitulo");
const campoObs = document.querySelector(".campoObs");
const campoPrioridade = document.querySelector(".campoPrioridade");
const botaoAdicionar = document.querySelector("#botao");
const corpoTabela = document.querySelector(".tarefas tbody");


let listaTarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];


function salvarNoLocalStorage() {
    localStorage.setItem("minhasTarefas", JSON.stringify(listaTarefas));
}


function renderizarTarefas() {

    corpoTabela.innerHTML = "";

    listaTarefas.forEach((tarefa, index) => {
        const tr = document.createElement("tr");

  
        if (tarefa.concluida) {
            tr.style.textDecoration = "line-through";
            tr.style.opacity = "0.6";
        }


        let corPrioridade = "black";
        if (tarefa.prioridade === "Alta") corPrioridade = "#e53935";
        if (tarefa.prioridade === "Média") corPrioridade = "#fb8c00";
        if (tarefa.prioridade === "Baixa") corPrioridade = "#43a047";

        tr.innerHTML = `
            <td>${tarefa.titulo}</td>
            <td>${tarefa.obs || "-"}</td>
            <td style="color: ${corPrioridade}; font-weight: bold;">${tarefa.prioridade}</td>
            <td>
                <a href="#" class="btn-small waves-effect waves-light ${tarefa.concluida ? 'grey' : 'green'}" onclick="alternarConcluida(event, ${index})" title="Concluir tarefa">
                    <i class="material-icons">${tarefa.concluida ? 'undo' : 'check'}</i>
                </a>
            </td>
            <td>
                <a href="#" class="btn-small waves-effect waves-light red" onclick="apagarTarefa(event, ${index})" title="Apagar tarefa">
                    <i class="material-icons">delete</i>
                </a>
            </td>
        `;

        corpoTabela.appendChild(tr);
    });
}


function adicionarTarefa(event) {
    event.preventDefault(); 

    const titulo = campoTitulo.value.trim();
    const obs = campoObs.value.trim();
    const prioridade = campoPrioridade.value;

    
    if (titulo === "") {
        alert("Por favor, digite o título da tarefa!");
        campoTitulo.focus();
        return;
    }

   
    const novaTarefa = {
        titulo: titulo,
        obs: obs,
        prioridade: prioridade,
        concluida: false
    };

    listaTarefas.push(novaTarefa);
    salvarNoLocalStorage();
    renderizarTarefas();

    campoTitulo.value = "";
    campoObs.value = "";
    campoPrioridade.value = "Baixa";
    campoTitulo.focus();
}

function alternarConcluida(event, index) {
    event.preventDefault();
    listaTarefas[index].concluida = !listaTarefas[index].concluida;
    salvarNoLocalStorage();
    renderizarTarefas();
}

function apagarTarefa(event, index) {
    event.preventDefault();
    listaTarefas.splice(index, 1);
    salvarNoLocalStorage();
    renderizarTarefas();
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTitulo.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarTarefa(e);
});
campoObs.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarTarefa(e);
});

renderizarTarefas();