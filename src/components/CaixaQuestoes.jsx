import { useEffect, useId, useRef, useState } from "react";

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
        const user = normalize(resposta)
        const ok = (question.resposta || []).some(
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

    useEffect(() =>{
        prevFocused.current = document.activeElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closebtnRef.current?.focus();

        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            if(prevFocused.current instanceof HTMLElement){
                prevFocused.current.focus()
            }
        };
    }, [onClose]);


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
            
            <div className="dialog-card">
                <p className="question-prompt">{question.prompt}</p>

                <form className="question-form" onSubmit={handleSubmit}>
                    <label htmlFor="resposta" className="question-label"> Sua resposta:</label>
                    <input 
                        id="resposta"
                        className="question-input"
                        type="text"
                        autoComplete="off"
                        aria-describedby="feedback"
                        aria-invalid={feedback.type === "error" ? "true" : "false"}
                        value={resposta}
                        onChange={(e)=> setResposta(e.target.value)}
                        disabled={isCorrect}
                        placeholder="Escreva sua resposta aqui"
                    />

                    <div id="feedback" className={`question-feedback question-feedback--${feedback.type}`} aria-live="polite">
                        {feedback.msg}
                    </div>

                    {!isCorrect ? (
                        <div className="question-actions">
                            <button type="submit" className="btn btn-primary">
                                Confirmar
                            </button>
                            <button type="button" className="btn" 
                                    onClick={onClose}>
                                Voltar
                            </button>
                        </div>
                    ) : (
                        <div className="question-actions">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={()=>{
                                    onCorret(question.id)
                                    onClose();}}
                                aria-label="Avançar para a próxima pergunta">
                                    Avançar                               
                            </button>
                        </div>
                    )}

                </form>

                {question.dica && <p className="question-hint"> Dica: {question.dica}</p>}
            </div>
            </div>
        </>
    )

}