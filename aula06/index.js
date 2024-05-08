const fs = require('fs');
const xml2js = require('xml2js');


const readFileXML = (filepath, encoding = 'utf-8') => {

    const promisseCallback = (resolve, reject) => {

        fs.readFile(filepath, encoding, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                xml2js.parseString(data, (parseErr, result) => {

                    if (parseErr) {
                        console.error('Erro ao converter XML para JSON:', parseErr);
                        return;
                    }

                    const convertArrayValues = (obj) => {
                        for (const key in obj) {
                            if (Array.isArray(obj[key]) && obj[key].length === 1) {
                                obj[key] = obj[key][0];
                            }
                            if (typeof obj[key] === 'object') {
                                convertArrayValues(obj[key]);
                            }
                         
                        }
                    }
                    convertArrayValues(result);
                    const {dados_clientes: {cliente}} = result
                    resolve(result)
                }
                )
            } catch (e) {
                reject(e);
            }
        })
    }
    return new Promise(promisseCallback);
}

readFileXML('clientes.xml').then(console.log).catch(console.error);

readFileXML('clientes.xml').then((res) => {
    const { dados_clientes: { cliente: { nome, data_nasc, cpf, telefones, enderecos } } } = res;
    console.log(nome, data_nasc, cpf, telefones, enderecos);
})

const readFileJSON = (filePath, encoding = 'utf-8') => {
    const promisseCallback = (resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                return;
            }
            try {
                //converte o arquivo json para javascript
                const object = JSON.parse(data);
                resolve(object);
            } catch (e) {
                reject(e);
            }
        })
    }
    return new Promise(promisseCallback);
}

readFileJSON('clientes.json').then(console.log).catch(console.error);
