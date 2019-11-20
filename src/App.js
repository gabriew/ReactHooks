import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
    const [techs, setTech] = useState([]);//Inicia o state
    const [newTech, setNewTech] = useState('');// state para receber o imput
    /*function handleAdd(){
        setTech([...techs, newTech]) //Atualiza o state
        setNewTech('');//Limpa o input após adicionar
    }*/
    const handleAdd = useCallback(() => {
        //hook para retornar uma função, essa função será executada somente se ocorrerem alterações nos estados passados
        setTech([...techs, newTech]) //Atualiza o state
        setNewTech('');//Limpa o input após adicionar
    }, [newTech, techs]);
    useEffect(() => {
        const localTechs = localStorage.getItem('techs');
        if(localTechs) {
            setTech(JSON.parse(localTechs));
        }
    },[])//executado somente uma vez(carregamento), pois não foi passado nenhuma variável para monitoramento
    useEffect(() => {
        localStorage.setItem('techs', JSON.stringify(techs))
    }, [techs])//monitora o state techs, sempre que mudar executa a função
    const techsSize = useMemo(() => techs.length, [techs]); //altera a variável sempre que o state mudar, retorna um unico valor

  return (
    <>
        <ul>
            {techs.map(t => <li key={t}>{t}</li>)}
        </ul>
  <strong>Você tem {techsSize} tecnologias</strong><br/>
        <input value={newTech} onChange={e => setNewTech(e.target.value)} />
        <button type="button" onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
