
let tbody = document.querySelector('table tbody')
var aluno = {};
function cadastrar() {

    aluno.nome = document.querySelector('#nome').value;
    aluno.sobrenome = document.querySelector('#sobrenome').value;
    aluno.telefone = document.querySelector('#telefone').value;
    aluno.ra = document.querySelector('#ra').value;
    if (aluno.id === undefined | aluno.id === 0) {
        salvarEstudante('POST', 0, aluno)
    } else {
        salvarEstudante('PUT', aluno.id, aluno);
    }

    carregaEstudantes();
    $('#exampleModal').modal('hide');
}

function carregaEstudantes() {
    tbody.innerHTML = '';

    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://localhost:44319/api/Aluno/`, true);

    xhr.onerror = function () {
        console.log('ERRO', xhr.readyState);
    }
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var estudantes = JSON.parse(this.responseText);
            for (var indice in estudantes) {
                adicionaLinha(estudantes[indice]);
            }
        }
    }
    xhr.send();
}

carregaEstudantes();

function salvarEstudante(metodo, id, corpo) {

    let xhr = new XMLHttpRequest();
    if (id === undefined | id === 0) {
        id = '';
    }

    xhr.open(metodo, `https://localhost:44319/api/Aluno/${id}`, false);

    if (corpo !== undefined) {
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(corpo));
    }
}

function deletarEstudante(id) {

    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', `https://localhost:44319/api/Aluno/${id}`, false);
    xhr.send();
}

function excluir(estudante) {
    bootbox.confirm({
        message: `Tem certeza que deseja excluir o estudante ${estudante.nome}?`,
        buttons: {
            confirm: {
                label: 'Sim',
                className: 'btn-success'
            },
            cancel: {
                label: 'Nao',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                deletarEstudante(estudante.id);
                carregaEstudantes();
            }
        }
    });

}

function novoAluno() {
    var btnSalvar = document.querySelector('#btnSalvar');
    var tituloModal = document.querySelector('#tituloModal');

    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};

    btnSalvar.textContent = 'Cadastrar';
    tituloModal.textContent = 'Cadastrar Aluno'

    $('#exampleModal').modal('show');
}

function cancelar() {
    var btnSalvar = document.querySelector('#btnSalvar');
    var tituloModal = document.querySelector('#tituloModal');

    document.querySelector('#nome').value = '';
    document.querySelector('#sobrenome').value = '';
    document.querySelector('#telefone').value = '';
    document.querySelector('#ra').value = '';

    aluno = {};

    btnSalvar.textContent = 'Cadastrar';
    tituloModal.textContent = 'Cadastrar Aluno'

    $('#exampleModal').modal('hide');
}


function editarEstudante(estudante) {
    var btnSalvar = document.querySelector('#btnSalvar');
    var tituloModal = document.querySelector('#tituloModal');

    document.querySelector('#nome').value = estudante.nome;
    document.querySelector('#sobrenome').value = estudante.sobrenome;
    document.querySelector('#telefone').value = estudante.telefone;
    document.querySelector('#ra').value = estudante.ra;

    btnSalvar.textContent = 'Salvar';
    tituloModal.textContent = `Editar Aluno ${estudante.nome}`

    aluno = estudante;
}

function adicionaLinha(estudante) {

    let trow = ` 
        <tr>
            <td>${estudante.nome}</td>
            <td>${estudante.sobrenome}</td>
            <td>${estudante.telefone}</td>
            <td>${estudante.ra}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editarEstudante(${JSON.stringify(estudante)})'>Editar</button>
                <button class="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onclick='excluir(${JSON.stringify(estudante)})'>Deletar</button>
            </td>
        </tr>
    `
    tbody.innerHTML += trow;
}