export default function Die(props) {
    
    return (
        <button 
            className={props.isHeld ? "dieEnabled" : "die"} 
            onClick={() => {props.holdFunction(props.id)}}
            aria-label={`Die with value ${props.value},
            ${props.isHeld ? "held" : "not held"}`}>
                {props.value}
        </button>
    )
}