import { useId, useRef, useState } from "react";

export default function CaixaQuestoes({
    question,
    index,
    total,
    onClose,
    onCorret,
}){
    
    const titleId = useId();
    const dialogRef = useRef(null);
    const closebtnRef = useRef(null);
    const prevFocused = useRef(null);

    const [resposta, setResposta] = useState("");
    const [feedback, setFeedback] = useState({type:"info", msg:""})
    const [isCorrect, setIsCorrect] = useState(false)

    const normalize = (s) => 
    (s ?? "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,;:!?()\"'´`^~]/g,"")
        .trim()
        .toLowerCase();


    const handleSubmit = (e) => {
        e.preventDefault();
        const user = normalize(answer)
        const ok = (question.correctAnsewers || []).some(
            (ans) => normalize(ans) === user
        );
        if (ok){
            setIsCorrect(true)
            setFeedback({type:"success", msg:"Resposta correta! Próxima pergunta liberada!"})
        } else {
            setIsCorrect(false)
            setFeedback({type:"error", msg:"Não foi dessa vez. Tete novamente"})
        }
    }


    return(
        <>
            <div
                id={`dialogo-${question.id}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="dialogo"
                ref={dialogRef}
            >
                <header className="header-questao">
                    <h2
                        id={titleId}
                        className="questao-titulo" 
                    >
                    {question.titulo}
                    <span className="questao-subtitulo"> Pergunta {index +1} de {total}</span>
                    </h2>

                    <button
                        ref={closebtnRef}
                        type="button"
                        className="questao-fecha"
                        aria-label={`Fechar pergunta: ${question.titulo}`}
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </header>
            </div>
        </>
    )

}