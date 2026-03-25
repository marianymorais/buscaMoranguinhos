import IconButton from "./IconButton"

export default function GridIncones({
    questions,
    onOpen,
    modalOpen,
    unlockedIndex,
    solvedSet,
}){

    return(
        <section 
        aria-hidden={modalOpen || undefined}
        inert={modalOpen ? "" : undefined}
        className="iconGrid-container" >

            <ul className="icon-grid">
                {questions.map((q, idx) => {
                    const locked = idx > unlockedIndex;
                    const solved = solvedSet.has(q.id);
                    return (
                        <IconButton  
                            key={q.id}
                            question={q}
                            onOpen={onOpen}
                            locked={locked}
                            solved={solved}
                        />
                    )
                })}
            </ul>

        </section>
    )    
}