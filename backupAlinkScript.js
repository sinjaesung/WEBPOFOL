let animDetailLink=document.getElementsByClassName("animDetailLink");
for(let i=0; i<animDetailLink.length; i++){
    let item=animDetailLink[i];
    item.addEventListener("click",function(event){
        let target=event.target;
        console.log("클릭발생",target,target.className);

        if(!target.className || target.className.indexOf("animDetailLink")==-1){
            target=parentTargetfind(target,"animDetailLink")
        }
        let characterdata=target.getAttribute("characterdata");
        localStorage.setItem("characterdata",characterdata);
    },false)
}