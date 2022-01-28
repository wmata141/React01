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
    const foo = {
      bar: 10,
      baz: function (x = 10) {
        return this.bar + x

      }
    }
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

  const StringChallenge2 = (str) => {
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

  // Input: "aabbcde"
  // Output: 2a2b1c1d1e
  // Input: "wwwbbbw"
  // Output: 3w3b1w

  function StringChallenge(str) {
    const arrayStr = str.split('')
    let auxString = arrayStr[0]
    let outPut = ''
    let cont = 0

    for (let index = 0; index <= arrayStr.length; index++) {
      if (auxString === arrayStr[index]) {
        cont++
      } else {
        outPut = outPut + cont + auxString
        auxString = arrayStr[index]
        cont = 1
      }
    }

    return outPut;
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

  // that, given an array A of N integers, returns the smallest positive integer(greater than 0) that does not occur in A.
  // For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.
  // Given A = [1, 2, 3], the function should return 4.
  // Given A = [−1, −3], the function should return 1.
  // Write an efficient algorithm for the following assumptions:
  // N is an integer within the range[1..100, 000];
  // each element of array A is an integer within the range[−1, 000, 000..1, 000, 000].
  // Example test:   [1, 3, 6, 4, 1, 2]
  // WRONG ANSWER (got 2 expected 5)

  // Example test:   [1, 2, 3]
  // WRONG ANSWER (got 2 expected 4)

  // Example test:   [-1, -3]
  // WRONG ANSWER (got 0 expected 1)

  const A = [1, 3, 6, 4, 1, 2]
  const manorSeguido = (A) => {
    const aOrder = A.sort();

    let elementAux = aOrder[0];
    for (let index = 0; index < aOrder.length; index++) {
      const element = aOrder[index];

      if (element === elementAux || elementAux + 1 === element) {
        elementAux = element
      } else {
        if (elementAux < 0) {
          console.log("1")
          return 1
        } else {
          console.log("elementAux + 1", elementAux + 1);
          return elementAux + 1
        }
      }
    }

    console.log("aOrder[index] + 1", aOrder[aOrder.length - 1] + 1);
    return aOrder[aOrder.length - 1] + 1
  }

  const S = ">>><<<"
  const arrayCount = [0, 0, 0, 0]
  const arrowTurn = (S) => {
    const aArray = S.split('');
    console.log("aArray ==>", aArray);
    aArray.forEach(element => {
      if (element === '>') {
        arrayCount[0] = arrayCount[0] + 1
      }
      if (element === '<') {
        arrayCount[1] = arrayCount[1] + 1
      }
      if (element === 'v') {
        arrayCount[2] = arrayCount[2] + 1
      }
      if (element === '^') {
        arrayCount[3] = arrayCount[3] + 1
      }
    });

    let mayor = 0
    let count = 0
    arrayCount.forEach(element => {
      if (mayor < element) {
        mayor = element
      }
      count = count + element
    });

    return count - mayor
  }

  const test = (x) => {
    // let object = {a: '1', b: '2'};
    // let { a, b} = object

    // array1.concat(array2);
    // console.log(a,b)
    const array1 = ['a', 'b', 'c'];
    const array2 = ['d', 'e', 'f'];
    const array3 = array1.concat(array1);

    console.log(array3);
    return x
  }

  const pregunta_1_pantufla = (n = 100) => {
    let pantufla = ''

    for (let index = 0; index < n; index++) {

      if (index % 2 === 0 && index % 3 === 0) {
        pantufla += 'fla'
      } else {
        if (index % 2 === 0) pantufla += 'pan';
        if (index % 3 === 0) pantufla += 'tu';
      }
    }

    return pantufla
  }

  const pregunta_2_uber = (a = [1, 1], b = [3, 4], c = [5, 3]) => {
    let distancia_1 = 0;
    let distancia_2 = 0;
    let cercano = 'A'

    a[0] > b[0] ? distancia_1 += a[0] - b[0] : distancia_1 += b[0] - a[0]
    a[1] > b[1] ? distancia_1 += a[1] - b[1] : distancia_1 += b[1] - a[1]

    a[0] > c[0] ? distancia_2 += a[0] - c[0] : distancia_2 += c[0] - a[0]
    a[1] > c[1] ? distancia_2 += a[1] - c[1] : distancia_2 += c[1] - a[1]

    if (distancia_1 > distancia_2) {
      cercano = 'B'
    }

    return `El pasajero más cercano es ${cercano}`
  }

  const pregunta_3_carrera = (liebre_a_posicion = 10, liebre_a_velocidad = 1, liebre_b_posición = 0, liebre_b_velocidad = 2, tiempo = 100) => {
    let a = liebre_a_posicion
    let b = liebre_b_posición

    for (let index = 0; index < tiempo; index++) {
      if (a !== b) {
        a += liebre_a_velocidad
        b += liebre_b_velocidad
      } else {
        return `Las liebres se encontraron en el cuadrante ${a}`
      }      
    }
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
        {/* {console.log(StringChallenge("aabbcde"))} */}
        {/* {console.log(SearchingChallenge(["X:-1", "Y:1", "X:-4", "B:3", "X:5"]))} */}
        {/* {console.log(test("about1"))} */}
        {console.log('Pregunta 1')}
        {console.log(pregunta_3_carrera())}
        <footer>
          footer
        </footer>
      </main>
    </Aside>
  )
}

export default About;