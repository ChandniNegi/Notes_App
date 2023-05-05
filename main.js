const btn=document.querySelector("#btn")
const main=document.querySelector('#main')
btn.addEventListener(
    "click",
    function(){
        addNote()
    }
)
const savenote=()=>{
    const note=document.querySelectorAll(".note textarea");
    console.log(note);
    const data=[];
    note.forEach(
        (note)=>{
            data.push(note.value)
        }
    )
    if(data.length===0){
        localStorage.removeItem("note")
    }else{
        localStorage.setItem("note",JSON.stringify(data))
    }
}
const addNote=(text="")=>{
    const note=document.createElement("div");
    note.classList.add("note")
    note.innerHTML=`
    <div class="tool">
    <i class="save fas fa-save"></i>
    <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`;
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            savenote()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            savenote()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            savenote()
        }
    )
main.appendChild(note);
savenote()
}
(
    function(){
        const lsnote=JSON.parse(localStorage.getItem("note"));
        if(lsnote===null){
            addNote()
        }else{
            lsnote.forEach(
                (lsnote)=>{
                    addNote(lsnote)
                }
            )
        }
    }
)()