import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import Axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    const [ listacripto, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    const [moneda, SelectMonedas] = useMoneda('Elije tu moneda', '', MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

   /*  useEffect(() =>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await Axios.get(url);

            console.log(resultado);
        }

        consultarAPI();
    }, []) */
    const consultarAPI = () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        Axios.get(url).then((resultado) => {
            guardarCriptomonedas(resultado.data.Data);

        });
    }

    useEffect(() =>{        
        consultarAPI();
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda)

    }

    return (
        <form onSubmit={cotizarMoneda}>

            { error ? <Error mensaje="Todos los campos son obligatorios"></Error>: null }
            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

export default Formulario;