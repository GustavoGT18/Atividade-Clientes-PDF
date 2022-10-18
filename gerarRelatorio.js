import { question, questionInt } from 'readline-sync';
import { jsPDF } from 'jspdf';

const doc = new jsPDF();

function clienteNew(id, nome, cpf, email) {
    return {
        id,
        nome,
        cpf,
        email
    }
}

var clientes = [
    {
        id: 1,
        nome: `Gustavo`,
        cpf: `123.456.789-00`,
        email: `gustavo@email.com`
    },
    {
        id: 2,
        nome: `Jose`,
        cpf: `123.456.789-01`,
        email: `jose@email.com`
    }
]

    var escolha = questionInt(`
Escolha o que deseja fazer:

1- Cadastrar um novo cliente;
2- Consultar um cliente pelo id
3- Exluir cliente pelo id
4- Atualizar o cadastro de um cliente
5- Gerar relatorio com todos os clientes cadastrados
`);

    switch (escolha) {
        case 1:
            // Cadastrar um novo cliente:
            var id = questionInt('Digite o ID para o novo cliente:  ');
            var nome = question('Digite o NOME do novo cliente:  ');
            var cpf = question('Digite o CPF do novo cliente:  ');
            var email = question('Digite o EMAIL do novo cliente:  ');
            var novoCliente = clienteNew(id, nome, cpf, email);
            clientes.push(novoCliente);
            console.table(clientes);
            break;
        case 2:
            // Consultar um cliente pelo Id:
            var buscar = questionInt('Digite o ID procurado:  ');
            console.table(clientes.find(array => array.id == buscar));
            break;
        case 3:
            // Excluir um cliente pelo Id:
            var buscar = questionInt('Digite o ID do cliente que sera excluido:  ');
            var index = (clientes.findIndex(array => array.id == buscar));
            clientes.splice(index, 1);
            console.table(clientes);
            break;
        case 4:
            // Atualizar o cadastro do cliente:
            var buscar = questionInt('Digite o ID do cliente que sera atualizado:  ');
            var index = (clientes.findIndex(array => array.id == buscar));
            clientes[index].nome = question('Altere o NOME do cliente:  ');
            clientes[index].cpf = question('Altere o CPF do cliente:  ');
            clientes[index].email = question('Altere o EMAIL do cliente:  ');
            console.table(clientes);
            break;
        case 5:
            // Relatório de todos os clientes
            var dados = '';
            for(var i = 0; i < clientes.length; i++) {
                for(let key in clientes[i]) {
                    dados += `${key}: ${clientes[i][key]}\n`;
                }
                dados += `-------------------------------------------------------------------------------------\n`;
            }
            doc.text(dados, 10, 10);
            doc.save('relatorio.pdf');
            console.log(`Arquivo salvo`);
            break;
        
        default:
            console.log(`opcao nao disponivel.`);
        }