export default function Die(props) {
    
    return (
        <button 
            className={props.isHeld ? "dieEnabled" : "die"} 
            onClick={() => {props.holdFunction(props.id)}}>{props.value}
        </button>
    )
}