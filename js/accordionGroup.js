//accroidion group apisss....
let javascript_accordion_group=document.getElementsByClassName("javascript_accordion_group");
for(let item=0; item<javascript_accordion_group.length; item++){
    let item_target=javascript_accordion_group[item];
    if(item_target.className.indexOf("javascript_accordion_group")==-1){
        item_target=parentTargetfind(item_target,"javascript_accordion_group");
    }
    console.log("real targetss:",item_target);
    item_target.onclick=accordion_trigger;
}

function accordion_trigger(event){
    //commons codes....startss
    let target=event.target;


    if(target.className.indexOf("javascript_accordion_group")==-1){
        target=parentTargetfind(target,"javascript_accordion_group");
    }
    let accrodion_groupid=target.getAttribute("accordion_groupid");

    let related_accordionGroups=document.getElementsByClassName("javascript_accordion_group_"+accrodion_groupid);
    
    console.log("클릭 타깃 및 클릭타깃의 관련 그룹리스트:",target,accrodion_groupid,related_accordionGroups);
    
    for(let a=0; a<related_accordionGroups.length; a++){
        let item_loca=related_accordionGroups[a];
        if(item_loca!==target){
            console.log("=-=======================resset==================================");
            //item_loca.setAttribute("responsevalue_rate",1);
            custom_execute(item_loca,'reset');
        }else{
            console.log("=-=======================active==================================");
            //item_loca.setAttribute("responsevalue_rate",1);
            custom_execute(item_loca,'active');
        }
    }
    
    function custom_execute(target,status){
        //custom styless control objectss...
        let accordion_related_targets=target.getAttribute("accordion_related_targets").split(',');
        let storeObject={};
        for(let s=0; s<accordion_related_targets.length; s++){
            let item=accordion_related_targets[s];
            storeObject[item]=[];//empty array settingssss
        }
    
        for(let s=0; s<accordion_related_targets.length; s++){
            let item=accordion_related_targets[s];
            console.log("accordion_related_targets=============================================finding child specifiy elementsss start=================================================");
            findchild_elements_total(target,item,storeObject);
            console.log("accordion_related_targets==============================================finding child specifiy elementsss endsss================================================");
        }
        console.log("=====================accordion_related_targets=찾아낸 관련 타깃 자식들!!!===========================================================",status,storeObject);
        //common codes....endss

        //custom styless!!! active 처리
        if(status=='active'){
            for(let s in storeObject){
                let targeting=storeObject[s];
                
                if(s=='accordionEffectTarget0'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        // let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 그의 직속부모Oriingind구조 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).animateRotate('Z',(50),0,90,(500),'swing',null);
                    
                    }
                }else if(s=='accordionEffectTarget_selfHighlight'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        // let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 그의 직속부모Oriingind구조 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).css({'background-color':"rgba(244,244,243,0.6)"});
                    
                    }
                }//본래의 jsclass 스타일원본값을 가지고 있는 요소에 대해서 겹치는 css property를 수정해야하는경운는 custom으로 조정할 프로퍼티항목들에 대해서한해서 원본값(스크린상황별)에 대한 비율크기0~1로 지정된 크기로 값을 인라인스타일링 조정한다.
                else if(s=='accordion_subChildTarget'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        //let parent_originId=find_directParent_OriginId(target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        target_local.setAttribute("responsevalue_rate",1);
                        target_local.setAttribute("inlineresponsive_allow",'true');
                        console.log("target과 그의 직속부모Oriingind구조 구하기",target_local);

                        let find_height=find_nowscreen_matching_CSSproperty_responvalue(target_local,'height',1);
                        let find_paddingTop=find_nowscreen_matching_CSSproperty_responvalue(target_local,'padding-top',1);
                        let find_paddingBottom=find_nowscreen_matching_CSSproperty_responvalue(target_local,'padding-bottom',1);

                        //find_nowscreen_matching_CSSproperty_responvalue(target_local,'width');
                        //find_nowscreen_matching_CSSproperty_responvalue(target_local,'padding-left');
                        //find_nowscreen_matching_CSSproperty_responvalue(target_local,'padding-right');
                        //let find_displayType_distinct=find_nowscreen_matching_CSSproperty_responvalue(target_local,'display',1);
                        // console.log("find displaType target distinctss:",target_local,find_displayType_distinct);
                        //target_local.style.display=find_displayType_distinct;
                    
                        console.log("adapt find heightss paddingtop,padingbotomsss",find_height,find_paddingTop,find_paddingBottom);
                        $(`[OriginId=${matching_target_OriginId}]`).animate({'height':find_height,'padding-top':find_paddingTop,'padding-bottom':find_paddingBottom,'opacity':'100%'},500);
                    }
                }
            } 
        }else if(status=='reset'){
            for(let s in storeObject){
                let targeting=storeObject[s];
                
                if(s=='accordionEffectTarget0'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        //let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 그의 직속부모Oriingind구조 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        //$(`[OriginId=${matching_target_OriginId}]`).animateRotate('Z',(50),90,0,(500),'swing',null);
                        $(`[OriginId=${matching_target_OriginId}]`).css("transform","rotateZ(0deg)")
                    }
                }else if(s=='accordionEffectTarget_selfHighlight'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        ///let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 그의 직속부모Oriingind구조 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).css({'background-color':"transparent"});
                    
                    }
                }else if(s=='accordion_subChildTarget'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        //let parent_originId=find_directParent_OriginId(target_local);
                        
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        console.log("target과 그의 직속부모Oriingind구조 구하기",target_local);

                        target_local.setAttribute("inlineresponsive_allow",'false');
                        target_local.setAttribute("responsevalue_rate",1);

                        /*let find_height=find_nowscreen_matching_CSSproperty_responvalue(target_local,'height');
                        //find_nowscreen_matching_CSSproperty_responvalue(target_local,'width');
                        //find_nowscreen_matching_CSSproperty_responvalue(target_local,'padding-left');
                        //find_nowscreen_matching_CSSproperty_responvalue(target_local,'padding-right');
                        let find_displayType_distinct=find_nowscreen_matching_CSSproperty_responvalue(target_local,'display');
                        console.log("find displaType target distinctss:",find_displayType_distinct);
                        target_local.style.display=find_displayType_distinct;
                    
                        console.log("adapt find heightss:",find_height);*/
                        $(`[OriginId=${matching_target_OriginId}]`).animate({'height':0,'padding-top':0,'padding-bottom':0,'opacity':'0%'},500);
                    }
                }
            } 
        }
    }
}