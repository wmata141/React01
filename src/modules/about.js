import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/css/index.scss';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

const clients = [
  { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS' },
  { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ' },
  { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA' },
  { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ' },
  { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS' },
  { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }
];
const accounts = [
  { clientId: 6, bankId: 1, balance: 15000 },
  { clientId: 1, bankId: 3, balance: 18000 },
  { clientId: 5, bankId: 3, balance: 135000 },
  { clientId: 2, bankId: 2, balance: 5600 },
  { clientId: 3, bankId: 1, balance: 23000 },
  { clientId: 5, bankId: 2, balance: 15000 },
  { clientId: 3, bankId: 3, balance: 45900 },
  { clientId: 2, bankId: 3, balance: 19000 },
  { clientId: 4, bankId: 3, balance: 51000 },
  { clientId: 5, bankId: 1, balance: 89000 },
  { clientId: 1, bankId: 2, balance: 1600 },
  { clientId: 5, bankId: 3, balance: 37500 },
  { clientId: 6, bankId: 1, balance: 19200 },
  { clientId: 2, bankId: 3, balance: 10000 },
  { clientId: 3, bankId: 2, balance: 5400 },
  { clientId: 3, bankId: 1, balance: 9000 },
  { clientId: 4, bankId: 3, balance: 13500 },
  { clientId: 2, bankId: 1, balance: 38200 },
  { clientId: 5, bankId: 2, balance: 17000 },
  { clientId: 1, bankId: 3, balance: 1000 },
  { clientId: 5, bankId: 2, balance: 600 },
  { clientId: 6, bankId: 1, balance: 16200 },
  { clientId: 2, bankId: 2, balance: 10000 }
]
const banks = [
  { id: 1, name: 'SANTANDER' },
  { id: 2, name: 'CHILE' },
  { id: 3, name: 'ESTADO' }
];

const About = () => {
  const [toggled, setToggled] = useState(false);
  useEffect(() => {

  }, [])

  // 0 Arreglo con los ids de clientes
  const listClientsIds = () => {
    return clients.map((client) => client.id);

  };

  // 1 Arreglo con los ids de clientes ordenados por rut
  const listClientsIdsSortByTaxNumber = () => {
    return clients.sort((a, b) => b.taxNumber - a.taxNumber).map((client) => client.id)

  };

  // 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
  const sortClientsTotalBalances = () => {
    const clientsAux = clients.map(client => {
      let sum = 0
      accounts.forEach(account => {
        if (client.id === account.clientId) {
          sum = sum + account.balance
        }
      });
      client.balance = sum
      return client
    });
    return clientsAux.sort((a, b) => b.balance - a.balance).map((client) => client.name)
  }

  // 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
  const banksClientsTaxNumbers = () => {
    let objBank = {}
    banks.forEach(elementBank => {
      const rutsClientes = []
      accounts.forEach(elementAccount => {

        if (elementBank.id === elementAccount.bankId) {
          clients.forEach(elementClient => {
            if (elementAccount.clientId === elementClient.id) {
              rutsClientes.push(elementClient.name)
            }
          });
        }
      })
      let result = rutsClientes.filter((item, index) => {
        return rutsClientes.indexOf(item) === index;
      })

      objBank[elementBank.name] = result
    });
    return objBank
  }

  // 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
  const richClientsBalances = () => {
    const bankSantander = banks.find(element => element.name === 'SANTANDER');

    const accountsSantanderObj = accounts.reduce((prev, next) => {
      if (next.bankId && next.bankId === bankSantander.id) {
        if (prev[next.clientId]) {
          prev[next.clientId].balance += next.balance;
        } else {
          prev[next.clientId] = next;
        }
      }
      return prev;
    }, {});

    const objToArray = (obj) => {
      return Object.keys(obj).reduce((prev, next) => {
        if (next) {
          prev.push(obj[next]);
        }
        return prev;
      }, []);
    }
    const accountsSantander = objToArray(accountsSantanderObj)

    let clientBalance = []
    accountsSantander.forEach(elementClient => {
      if (elementClient.balance > 25000) {
        const client = clients.find(element => element.id === elementClient.clientId);
        if (client) {
          clientBalance.push({ name: client.name, balance: elementClient.balance })
        }
      }
    });

    return clientBalance.sort((a, b) => b.balance - a.balance)
  }

  // 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
  const banksRankingByTotalBalance = () => {
    const bankByBalance = []
    banks.forEach(elementBank => {
      let totalBalance = 0
      accounts.forEach(elementAccount => {
        if (elementBank.id === elementAccount.bankId) {
          totalBalance += elementAccount.balance
        }
      });
      bankByBalance.push({ idBank: elementBank.id, balance: totalBalance })
    });

    return bankByBalance.sort((a, b) => a.balance - b.balance)
  }

  // 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
  const banksFidelity = () => {
    let objBank = {}
    banks.forEach(elementBank => {
      let numClientes = 0
      clients.forEach(elementClient => {
        const result = accounts.filter(item => item.bankId !== elementBank.id && item.clientId === elementClient.id);

        if (result.length === 0) {
          numClientes++
        }
      });
      objBank[elementBank.name] = numClientes
    });

    return objBank
  }

  // 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
  const banksPoorClients = () => {
    let objBank = {}

    banks.forEach(elementBank => {
      console.log(elementBank);
      const arrayBankClient = []
      accounts.forEach(elementAccount => {

        if (elementBank.id === elementAccount.bankId) {
          const indexOf = arrayBankClient.findIndex(i => i.bankId === elementBank.id && i.clientId === elementAccount.clientId);

          if (indexOf === -1) {
            arrayBankClient.push(elementAccount)
          } else {
            arrayBankClient[indexOf].balance = arrayBankClient[indexOf].balance + elementAccount.balance
          }
        }
      });
      let min = arrayBankClient[0]
      arrayBankClient.forEach((item) => {
        if (min.balance > item.balance) {
          min = item
        }
      })

      objBank[elementBank.name] = min.clientId
    })

    return objBank
  }

  // 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
  // Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
  // No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
  const newClientRanking = () => {
    const newClient = { id: 7, taxNumber: '20840142', name: 'WILLIAM XAVIER MATA' }
    const newAccount = { clientId: 7, bankId: 3, balance: 9000 }

    clients.push(newClient)
    accounts.push(newAccount)

    clients.forEach(client => {
      let sum = 0
      accounts.forEach(account => {
        if (client.id === account.clientId) {
          sum = sum + account.balance
        }
      });
      client.balance = sum
    });
    const clientsByBalance = clients.sort((a, b) => b.balance - a.balance).map((client) => client.id)
    const positionRanking = clientsByBalance.indexOf(newClient.id);

    return positionRanking
  }

  const StringChallenge = (str) => {
    const size = str.length
    let flag = true
    let output = ''
    for (let index = 0; index < size; index++) {
      const element = str.charCodeAt(index);
      console.log("element ==>", element);
      if ((element > 64 && element < 91) || (element > 96 && element < 123)) {
        if (flag) {
          output = output + str.charAt(index).toLowerCase()
        } else {
          output = output + str.charAt(index).toUpperCase()
        }
        flag = true
      } else {
        flag = false
      }
    }
    console.log("output", output);
  }

  const SearchingChallenge = (str) => {
    console.log("str ==>", str);
    const arrayKey = []
    const array = []
    str.forEach(element => {
      const arrayObj = element.split(':')
      if (arrayKey.indexOf(arrayObj[0]) === -1) {
        arrayKey.push(arrayObj[0])
      }
      array.push({ [arrayObj[0]]: parseInt(arrayObj[1]) })
    });

    arrayKey.sort()
    const output = []
    arrayKey.forEach(element1 => {      
      let cont = 0
      array.forEach(element2 => {
        if (element2[element1]) {
          cont = cont + element2[element1]
        }
      });
      if (cont !== 0) {
        const obj = {
          [element1]: cont
        }
        output.push(obj)        
      }
    });
  }


  return (
    <Aside
      toggled={toggled}
      setToggled={setToggled}
    >
      <main>
        <div className="btn-toggle" onClick={() => setToggled(true)}>
          <FaBars />
        </div>
        <header>
          <h1>
            <img width={80} src={reactLogo} alt="react logo" /> {'About'}
          </h1>
        </header>
        <h2>About: 1</h2>
        {/* {console.log('Pregunta 0')}
        {console.log(listClientsIds())}
        {console.log('Pregunta 1')}
        {console.log(listClientsIdsSortByTaxNumber())}
        {console.log('Pregunta 2')}
        {console.log(sortClientsTotalBalances())}
        {console.log('Pregunta 3')}
        {console.log(banksClientsTaxNumbers())}
        {console.log('Pregunta 4')}
        {console.log(richClientsBalances())}
        {console.log('Pregunta 5')}
        {console.log(banksRankingByTotalBalance())}
        {console.log('Pregunta 6')}
        {console.log(banksFidelity())}
        {console.log('Pregunta 7')}
        {console.log(banksPoorClients())}
        {console.log('Pregunta 8')}
        {console.log(newClientRanking())} */}

        {/* {
          console.log(SearchingChallenge(["X:-1", "Y:1", "X:-4", "B:3", "X:5"]))
        } */}
        <footer>
          footer
        </footer>
      </main>
    </Aside>
  )
}

export default About;