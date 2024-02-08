
const config = [1, 1, 1, 1, 1, 0, 1, 1, 1];
const app = document.getElementById("app");
const clickedRecord = [];

const onBoxClick = (btnElement) => {
    btnElement.style.backgroundColor = "green";
    btnElement.style.pointerEvents = "none";
    console.log('click')
    if(!clickedRecord.includes(btnElement.id)){
        clickedRecord.push(btnElement.id);
    }
    if(clickedRecord.length === 8) {
        setTimeout(triggerFunc, 1000)
    }
}

const triggerFunc = () => {
    
const timer = setInterval(() =>{
    if(clickedRecord.length === 0){
        clearInterval(timer);
    }
    else{
        const undoId = clickedRecord.pop();
        // Trick to apply css without modifying the existing styling.
        Object.assign( document.getElementById(undoId).style, {backgroundColor: "", pointerEvents: "auto"});
       
    }
    
}, 350);

}

const createBtn = (index) => {
   const button = document.createElement('button');
   const id = index + 1;
   button.id = id;
   button.className = "box";
   button.setAttribute("type", "button");
   button.setAttribute("aria-label", `box${id}`);

// event listener
button.addEventListener('click', () => onBoxClick(button))



//    special props
    if(id === 7 || id === 8 || id === 9){
        button.style.gridRow = 3; 
    }
    if(id === 5){
        button.style.gridColumn = 3;
    }
   return button;
}

const uiArray = config.map((item, index) => {
    if(item){
        return createBtn(index);
    }
   else{ 
    return null;
}
})
.filter(Boolean)
.forEach(elem => {
    app.appendChild(elem);
})
