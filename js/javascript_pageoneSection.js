(function(){
    //let now_sectionpageindex=1;
    let lastpageindex=6;

    let javascript_pageone_prevmove=document.getElementsByClassName("javascript_pageone_prevmove");
    let javascript_pageone_nextmove=document.getElementsByClassName("javascript_pageone_nextmove");

    let javascript_pageoneSection_groups=document.getElementsByClassName("javascript_pageoneSection");

    function Section_initalize(){

        for(let j=0; j<javascript_pageoneSection_groups.length; j++){
            let item=javascript_pageoneSection_groups[j];
            item.style.display='none';
        }
        fadein_simple('survey1');
    }
    Section_initalize();
    
    for(let p=0; p<javascript_pageone_prevmove.length; p++){
        let item=javascript_pageone_prevmove[p];

        item.onclick=javascript_pageone_prevmoveFunction;
    }
    for(let p=0; p<javascript_pageone_nextmove.length; p++){
        let item=javascript_pageone_nextmove[p];

        item.onclick=javascript_pageone_nextmoveFunction;
    }

    function javascript_pageone_prevmoveFunction(event){
        let target=event.target;

        let pageoneSectionParent=parentTargetfind(target,'javascript_pageoneSection');
        console.log('find pageoneSectipnarpent:',pageoneSectionParent);

        let targetindex=parseInt(pageoneSectionParent.getAttribute("targetindex").split("survey")[1]);
        console.log('targetindex:',targetindex);

        let moveTarget='survey'+(targetindex-1>1?targetindex-1:1);

        for(let j=0; j<javascript_pageoneSection_groups.length; j++){
            let item=javascript_pageoneSection_groups[j];
            item.style.display='none';
        }
        console.log('moveTarget:',moveTarget);
        fadein_simple(moveTarget);
    }
    function javascript_pageone_nextmoveFunction(event){
        let target=event.target;

        let pageoneSectionParent=parentTargetfind(target,'javascript_pageoneSection');
        console.log('find pageoneSectipnarpent:',pageoneSectionParent);

        let targetindex=parseInt(pageoneSectionParent.getAttribute("targetindex").split("survey")[1]);
        console.log('targetindex:',targetindex);
        let moveTarget='survey'+((targetindex+1)<=lastpageindex?targetindex+1:lastpageindex);

        for(let j=0; j<javascript_pageoneSection_groups.length; j++){
            let item=javascript_pageoneSection_groups[j];
            item.style.display='none';
        }
        console.log('moveTarget:',moveTarget);
        fadein_simple(moveTarget);
    }
}());