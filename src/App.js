import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import Formulario from './componentes/Formulario';
import Axios from 'axios';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({})
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    if (moneda === '') return;


    // consulta api
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    guardarCargando(true);

    setTimeout(() => {

      // Peticion HTTP
      Axios.get(url).then((resultado) => {
        guardarCargando(false);
        console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])

      });
    }, 3000);


  }, [moneda, criptomoneda])

  const componente =  (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
