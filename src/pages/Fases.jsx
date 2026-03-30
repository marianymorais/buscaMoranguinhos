import { useState, useMemo } from "react"
import questoes from "../../public/data/perguntas.json"

import CaixaQuestoes from "../components/CaixaQuestoes"
import GridIcones from "../components/GridIcones"
import "./fases.css"

export default function Fases(){

    const [selecionada, setSelecionada] = useState(null);

    const [unlockedIndex, setUnlockedIndex] = useState(0);
    const [solvedSet, setSolvedSet] = useState(()=> new Set());

    const total = questoes.length

    const handleOpen = (ques) => setSelecionada(ques);
    const handleClose = () => setSelecionada(null);

    const progresso = useMemo(() => {
        const solved = solvedSet.size;
        return {solved, total, percent: Math.round((solved/total) * 100)};
    }, [solvedSet, total])

    const handleCorrect = (id) =>{
        setSolvedSet((prev) => {
            const next = new Set(prev);
            next.add(id)
            return next;
        });
        const idx = questoes.findIndex((q) => q.id === id);
        if (idx > -1 && idx < questoes.length -1){
            setUnlockedIndex((prev) => Math.max(prev, idx +1));
        }
    };


    return(
        <main className="app">
            <header>
                <h1>Caça Tesouros~~</h1>


                <section className="progress">
                    <div 
                        className="progress-bar"
                        style={{width: `${progresso.percent}%`}}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progresso.percent}
                        aria-label={`Progresso:${progresso.solved} de ${progresso.total} resolvidas`}
                    />
                    <span className="progress-label">{progresso.solved}/{progresso.total}</span>
                </section>
            </header>

            <GridIcones
                questions={questoes}
                onOpen={handleOpen}
                modalOpen={Boolean(selecionada)}
                unlockedIndex={unlockedIndex}
                solvedSet={solvedSet} 
            />



            {selecionada && (
                <CaixaQuestoes 
                    question={selecionada}
                    index={questoes.findIndex((q) => q.id === selecionada.id)}
                    total={total}
                    onClose={handleClose}
                    onCorret={handleCorrect}
                />
            ) }
        
        </main>
    )

}