export default class Pessoa {

    constructor(pNome, pSobrenome, pSexo, pDataNasci, pCPF, pCRM, pCategoria, pEmail, pEndereco) {
        this.nome = pNome;
        this.sobrenome = pSobrenome;
        this.sexo = pSexo;
        this.data_nasci = pDataNasci;
        this.cpf = pCPF;
        this.crm = pCRM;
        this.categoria = pCategoria;
        this.email = pEmail;
        this.endereco = pEndereco;
    }

    get Nome() { return this.nome }
    set Nome(value) { return this.nome = value }

    get Sobrenome() { return this.sobrenome }
    set Sobrenome(value) { return this.sobrenome }

    get Sexo() { return this.sexo }
    set Sexo(value) { return this.sexo = value }

    get Data_nasc() { return this.data_nasci }
    set Data_nasc(value) { return this.data_nasci = value }

    get Cpf() { return this.cpf }
    set Cpf(value) { return this.cpf = value }

    get Crm() { return this.crm }
    set Crm(value) { return this.crm = value }

    get Categoria() { return this.categoria }
    set Categoria(value) { return this.categoria = value }

    get Email() { return this.email }
    set Email(value) { return this.email = value }

    get Endereco() { return this.endereco }
    set Endereco(value) { return this.endereco = value }
    
}
