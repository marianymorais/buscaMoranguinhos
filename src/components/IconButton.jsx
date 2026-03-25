
export default function IconButton({
    question,
    onOpen,
    locked,
    solved
}){ 

    const dialogId = `dialog-${question.id}`
    const baseIcon = question.icon ?? "/heart.png"

    const icon = locked ? "padlock.png" : solved? "check.png" : baseIcon
    const aria = locked
    ? `${question.titulo} (bloqueada, resolva a anterior)`
    : solved
    ? `${question.titulo} (resolvida)`
    : `${question.titulo} (disponivel)`
    
    return (
        <li className="iconGrid-item">
            <button 
                type="button"
                className={`icon-button${locked? "icon-button--locked" : ""}${solved? "icon-button--solved": ""}`}
                aria-haspopup="dialog"
                aria-controls={dialogId}
                aria-label={aria}
                onClick={() => onOpen(question)}
                disabled={locked}
                aria-disabled={locked || undefined}
            >
                <img src={icon} className="icon-button-img" aria-hidden="true" alt={icon} />
                <span className="visually-hidden">{question.titulo}</span>

            </button>

        </li>
    )


}