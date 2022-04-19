import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/css/index.scss';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

// Responsables de los cuarteles
const paddockManagers = [
  { id: 1, taxNumber: '132254524', name: 'JUAN TAPIA BURGOS' },
  { id: 2, taxNumber: '143618668', name: 'EFRAIN SOTO VERA' },
  { id: 3, taxNumber: '78903228', name: 'CARLOS PEREZ GONZALEZ' },
  { id: 4, taxNumber: '176812737', name: 'ANDRES VIÑALES CIENFUEGOS' },
  { id: 5, taxNumber: '216352696', name: 'OSCAR PEREZ ZUÑIGA' },
  { id: 6, taxNumber: '78684747', name: 'JOAQUIN ANDRADE SANDOVAL' }
];

// Tipo de cuartel, en el cual se utiliza el tipo de producto plantado
const paddockType = [
  { id: 1, name: 'PALTOS' },
  { id: 2, name: 'AVELLANOS' },
  { id: 3, name: 'CEREZAS' },
  { id: 4, name: 'NOGALES' },
]

// Un paddock representa un cuartel de un campo (Entiéndase también como potrero o parcela), el área está representada en m2, harvestYear es el año en el que se sembró el cuartel
const paddocks = [
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 1200 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 4, harvestYear: 2019, area: 500 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 20000 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 3, harvestYear: 2021, area: 8401 },
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2020, area: 2877 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 2, harvestYear: 2017, area: 15902 },
  { paddockManagerId: 3, farmId: 3, paddockTypeId: 2, harvestYear: 2018, area: 1736 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2020, area: 2965 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 4, harvestYear: 2018, area: 1651 },
  { paddockManagerId: 5, farmId: 1, paddockTypeId: 1, harvestYear: 2018, area: 700 },
  { paddockManagerId: 1, farmId: 2, paddockTypeId: 1, harvestYear: 2019, area: 7956 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 3745 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 3, harvestYear: 2021, area: 11362 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2021, area: 300 },
  { paddockManagerId: 3, farmId: 2, paddockTypeId: 2, harvestYear: 2020, area: 19188 },
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 17137 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 100 },
  { paddockManagerId: 2, farmId: 1, paddockTypeId: 3, harvestYear: 2019, area: 11845 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 1, harvestYear: 2018, area: 15969 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 1, harvestYear: 2029, area: 10420 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 3, harvestYear: 2010, area: 3200 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 2, harvestYear: 2012, area: 10587 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 2, harvestYear: 2018, area: 16750 }
];

const farms = [
  { id: 1, name: 'AGRICOLA SANTA ANA' },
  { id: 2, name: 'VINA SANTA PAULA' },
  { id: 3, name: 'FORESTAL Y AGRICOLA LO ENCINA' }
];

function SortArrayName(x, y) {
  return x.name.localeCompare(y.name);
}

function objToArray(obj) {
  return Object.keys(obj).reduce((prev, next) => {
    if (next) {
      prev.push(obj[next]);
    }
    return prev;
  }, []);
}

// 0 Arreglo con los ids de los responsables de cada cuartel
function listPaddockManagerIds() {
  return paddockManagers.map((paddockManager) => paddockManager.id);
};

// 1 Arreglo con los ruts de los responsables de los cuarteles, ordenados por nombre
function listPaddockManagersByName() {
  return paddockManagers.sort(SortArrayName);
};

// 2 Arreglo con los nombres de cada tipo de cultivo, ordenados decrecientemente por la suma TOTAL de la cantidad de hectáreas plantadas de cada uno de ellos.
function sortPaddockTypeByTotalArea() {
  const paddocksAux = paddockType.map(pm => {
    let sum = 0
    paddocks.forEach(p => {
      if (pm.id === p.paddockTypeId) {
        sum = sum + p.area
      }
    });
    pm.area = sum
    return pm
  });
  return paddocksAux.sort((a, b) => b.area - a.area).map((pm) => pm.name)
}

// 3 Arreglo con los nombres de los administradores, ordenados decrecientemente por la suma TOTAL de hectáreas que administran.
function sortFarmManagerByAdminArea() {
  const paddockManagersAux = paddockManagers.map(pm => {
    let sum = 0
    paddocks.forEach(p => {
      if (pm.id === p.paddockTypeId) {
        sum = sum + p.area
      }
    });
    pm.area = sum
    return pm
  });
  return paddockManagersAux.sort((a, b) => b.area - a.area).map((pm) => pm.name)
}

// 4 Objeto en que las claves sean los nombres de los campos y los valores un arreglo con los ruts de sus administradores ordenados alfabéticamente por nombre.
function farmManagerNames() {
  let objFarms = {}
  farms.forEach(elementFarm => {
    const rutsPaddockManagers = []

    paddocks.forEach(elementPaddocks => {
      if (elementFarm.id === elementPaddocks.farmId) {
        paddockManagers.forEach(elementPaddockManagers => {
          if (elementPaddockManagers.id === elementPaddocks.paddockManagerId) {
            rutsPaddockManagers.push(elementPaddockManagers)
          }
        });
      }
    })

    let result = rutsPaddockManagers.filter((item, index) => {
      return rutsPaddockManagers.indexOf(item) === index;
    })

    objFarms[elementFarm.name] = result
  });

  return objFarms
}

// 5 Arreglo ordenado decrecientemente con los m2 totales de cada campo que tengan más de 2 hectáreas en Paltos
function biggestAvocadoFarms() {
  const farmPaltos = paddockType.find(element => element.name === 'PALTOS');

  const paltosObj = paddocks.reduce((prev, next) => {
    if (next.paddockTypeId === farmPaltos.id) {
      if (prev[next.farmId]) {
        prev[next.farmId].area += next.area;
      } else {
        prev[next.farmId] = next;
      }
    }
    return prev;
  }, {});


  const paltosList = objToArray(paltosObj)


  let mCampo = []
  paltosList.forEach(element => {
    if (element.area > 2000) {
      mCampo.push(element.area)
    }
  });

  return mCampo.sort((a, b) => b.area - a.area)
}

// 6 Arreglo con nombres de los administradores de la FORESTAL Y AGRÍCOLA LO ENCINA, ordenados por nombre, que trabajen más de 1000 m2 de Cerezas
function biggestCherriesManagers() {
  const farmForestal = farms.find(element => element.name === 'FORESTAL Y AGRICOLA LO ENCINA');
  const paddockTypeCereza = paddockType.find(element => element.name === 'CEREZAS');

  const forestalCereza = paddocks.map(item => {
    if (item.farmId === farmForestal.id && item.paddockTypeId === paddockTypeCereza.id) {
      return item
    }
  }).filter(notUndefined => notUndefined !== undefined);

  const forestalCerezaObj = forestalCereza.reduce((prev, next) => {
    if (prev[next.paddockManagerId]) {
      prev[next.paddockManagerId].area += next.area;
    } else {
      prev[next.paddockManagerId] = next;
    }

    return prev;
  }, {});

  const forestalCerezaList = objToArray(forestalCerezaObj)

  let administradores = []
  forestalCerezaList.forEach(fc => {
    if (fc.area > 1000 ) {
      const paddockManager = paddockManagers.find(element => element.id === fc.paddockManagerId);      
      administradores.push(paddockManager.name)
    }
  });

  return administradores.sort((a, b) => b - a)
}

// 7 Objeto en el cual las claves sean el nombre del administrador y el valor un arreglo con los nombres de los campos que administra, ordenados alfabéticamente
function farmManagerPaddocks() {
  let nameObj = {} 

  paddockManagers.forEach(element => {         
    let claves = Object.values(element); 

    nameObj[element.name] = claves.sort((a, b) => a - b)    
  });

  return nameObj
}

// 8 Objeto en que las claves sean el tipo de cultivo concatenado con su año de plantación (la concatenación tiene un separador de guión ‘-’, por ejemplo AVELLANOS-2020) y el valor otro objeto en el cual la clave sea el id del administrador y el valor el nombre del administrador
function paddocksManagers() {
  let auxObj = {} 
  paddocks.forEach(element => {
    const paddockTypeObj = paddockType.find(p => p.id === element.paddockTypeId);
    const paddockManagerObj = paddockManagers.find(p => p.id === element.paddockManagerId);

    const keyObj = `${paddockTypeObj.name} - ${element.harvestYear}`

    auxObj[keyObj] = { [paddockManagerObj.id]: paddockManagerObj.name}
  });

  return auxObj
}

// 9 Agregar nuevo administrador con datos ficticios a "paddockManagers" y agregar un nuevo cuartel de tipo NOGALES con 900mts2, año 2017 de AGRICOLA SANTA ANA, administrado por este nuevo administrador 
// Luego devolver el lugar que ocupa este nuevo administrador en el ranking de la pregunta 3.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newManagerRanking() {
  const nuevoAdministrador = { id: 7, taxNumber: '20840142', name: 'WILLIAM XAVIER MATA' }
  const nuevoCuartel = { paddockManagerId: 7, farmId: 1, paddockTypeId: 4, harvestYear: 2017, area: 900 }

  paddockManagers.push(nuevoAdministrador)
  paddocks.push(nuevoCuartel)

  const rankingList = sortFarmManagerByAdminArea()

  const positionRanking = rankingList.indexOf(nuevoAdministrador.name);

  return positionRanking
}

const About = () => {
  const [toggled, setToggled] = useState(false);

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
        <h2>About: 5</h2>

        {console.log('Pregunta 0')}
        {console.log(listPaddockManagerIds())}
        {console.log('Pregunta 1')}
        {console.log(listPaddockManagersByName())}
        {console.log('Pregunta 2')}
        {console.log(sortPaddockTypeByTotalArea())}
        {console.log('Pregunta 3')}
        {console.log(sortFarmManagerByAdminArea())}
        {console.log('Pregunta 4')}
        {console.log(farmManagerNames())}
        {console.log('Pregunta 5')}
        {console.log(biggestAvocadoFarms())}
        {console.log('Pregunta 6')}
        {console.log(biggestCherriesManagers())}
        {console.log('Pregunta 7')}
        {console.log(farmManagerPaddocks())}
        {console.log('Pregunta 8')}
        {console.log(paddocksManagers())}
        {console.log('Pregunta 9')}
        {console.log(newManagerRanking())}
        <footer>
          footer
        </footer>
      </main>
    </Aside>
  )
}

export default About;