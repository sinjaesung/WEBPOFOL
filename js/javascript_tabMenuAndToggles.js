//TABMENU APISS
let javascript_tabmenugroup=document.getElementsByClassName("javascript_tabmenugroup");
for(let t=0; t<javascript_tabmenugroup.length; t++){

    let item_target=javascript_tabmenugroup[t];
    if(item_target.className.indexOf("javascript_tabmenugroup")==-1){
        item_target=parentTargetfind(item_target,"javascript_tabmenugroup");
    }
    console.log("real targetss:",item_target);
    item_target.onclick=javascript_tabmenu_trigger;
   
}
function javascript_tabmenu_trigger(event){
    let click_target=event.target;
    if(click_target.className.indexOf("javascript_tabmenugroup")==-1){
        click_target=parentTargetfind(click_target,"javascript_tabmenugroup");
    }
    console.log("real targetss:",click_target);

    let related_tabgroupid=click_target.getAttribute("tabmenu_groupid");
    let related_tabgroups=document.getElementsByClassName("javascript_tabmenugroup_"+related_tabgroupid);
    console.log("javascript tabmenu 관련 그룹:","javascript_tabmenugroup_"+related_tabgroupid,related_tabgroups);
    let click_tab_index=click_target.getAttribute("tabmenuindex");
    console.log("clickTabindexss:",click_tab_index);
    let javascript_tabmenutrigger_group=document.getElementsByClassName("javascript_tabmenutrigger_"+related_tabgroupid);

    for(let t=0; t<javascript_tabmenutrigger_group.length; t++){
        let tabgrouptrigger_htmlElement=javascript_tabmenutrigger_group[t];
        if(tabgrouptrigger_htmlElement.getAttribute("tabmenuindex") &&tabgrouptrigger_htmlElement.getAttribute("tabmenuindex")==click_tab_index){
            //특정 targetindex가진 임의 자식타깃들 모두 찾아 해당 타깃들에 custom형태 코드 적용
            let tabmenu_related_targets=tabgrouptrigger_htmlElement.getAttribute("tabmenu_related_targets").split(',');
            let storeObject={};
            for(let s=0; s<tabmenu_related_targets.length; s++){
                let item=tabmenu_related_targets[s];
                storeObject[item]=[];//empty array settingssss
            }
        
            for(let s=0; s<tabmenu_related_targets.length; s++){
                let item=tabmenu_related_targets[s];
                console.log("tabmenu_related_targets=============================================finding child specifiy elementsss start=================================================");
                findchild_elements_total(tabgrouptrigger_htmlElement,item,storeObject);
                console.log("tabmenu_related_targets==============================================finding child specifiy elementsss endsss================================================");
            }
            console.log("=====================tabmenu_related_targets=찾아낸 관련 타깃 자식들!!!===========================================================activesss",storeObject);
            for(let s in storeObject){
                let targeting=storeObject[s];
                
                if(s=='javascript_tabmenu_tabBar'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        // let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).css({"opacity":"100%"});
                    }
                }else if(s==='javascript_tabmenu_txt'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        // let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).css({"color":"#df8050"});
                    }
                }
            }     
            //finding childrens custom code adaptss
        }else{
            //특정 targetindex가진 임의 자식타깃들 모두 찾아 해당 타깃들에 custom형태 코드 적용
            let tabmenu_related_targets=tabgrouptrigger_htmlElement.getAttribute("tabmenu_related_targets").split(',');
            let storeObject={};
            for(let s=0; s<tabmenu_related_targets.length; s++){
                let item=tabmenu_related_targets[s];
                storeObject[item]=[];//empty array settingssss
            }
        
            for(let s=0; s<tabmenu_related_targets.length; s++){
                let item=tabmenu_related_targets[s];
                console.log("tabmenu_related_targets=============================================finding child specifiy elementsss start=================================================");
                findchild_elements_total(tabgrouptrigger_htmlElement,item,storeObject);
                console.log("tabmenu_related_targets==============================================finding child specifiy elementsss endsss================================================");
            }
            console.log("=====================tabmenu_related_targets=찾아낸 관련 타깃 자식들!!!===========================================================resetss",storeObject);
            for(let s in storeObject){
                let targeting=storeObject[s];
                
                if(s=='javascript_tabmenu_tabBar'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        // let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).css({"opacity":"0%"});
                    }
                }else if(s==='javascript_tabmenu_txt'){
                    for(let t=0; t<targeting.length; t++){
                        let target_local=targeting[t];
                        // let parent_originId=find_directParent_OriginId(target_local);
                        console.log("target과 구하기",target_local);
                        let target_OriginId=target_local.getAttribute("OriginId");
                        let matching_target_OriginId=target_OriginId.split('~').join('\\~');
                        $(`[OriginId=${matching_target_OriginId}]`).css({"color":"#000"});
                    }
                }
            }     
            //finding childrens custom code adaptss
        }
    }

    for(let t=0; t<related_tabgroups.length; t++){
        let tabgrouptarget_htmlElement=related_tabgroups[t];

        if(tabgrouptarget_htmlElement.getAttribute("tabmenuindex") &&tabgrouptarget_htmlElement.getAttribute("tabmenuindex")==click_tab_index){
            tabgrouptarget_htmlElement.style.display='block';
        }else{
            tabgrouptarget_htmlElement.style.display='none'
        }
    }
}



//toggle contentss...javascript_toggleing_structure1
let javascript_toggleing_structure1=document.getElementsByClassName("javascript_toggleing_structure1");
for(let t=0; t<javascript_toggleing_structure1.length; t++){
    let item_target=javascript_toggleing_structure1[t];
    if(item_target.className.indexOf("javascript_toggleing_structure1")==-1){
        item_target=parentTargetfind(item_target,"javascript_toggleing_structure1");
    }
    console.log("real targetss:",item_target);
    item_target.onclick=javascript_toggleing_structure1_function;
   
} 
function javascript_toggleing_structure1_function(event){
    let target=event.target;
    if(target.className.indexOf("javascript_toggleing_structure1")==-1){
        target=parentTargetfind(target,"javascript_toggleing_structure1");
    }
    console.log("real find togglinegf stufctufe1 function Tragetss:",target);

    let togglestatus=target.getAttribute("togglestatus");
    let storeObject={
        'togglestatusicon':[],
        'toggleshowhidecontent1':[]
    }
    findchild_elements_total(target,'togglestatusicon',storeObject);
    findchild_elements_total(target,'toggleshowhidecontent1',storeObject);
    console.log("finding childrens targetss:",storeObject);

    if(togglestatus==='close'){
        for(let s in storeObject){
            let storeItem=storeObject[s];
            if(s==='togglestatusicon'){
                for(let ss=0; ss<storeItem.length; ss++){
                    let item_loca=storeItem[ss];
                    item_loca.style.transform='none';
                }
            }else if(s==='toggleshowhidecontent1'){
                for(let ss=0; ss<storeItem.length; ss++){
                    let item_loca=storeItem[ss];
                    item_loca.style.display='block';
                }
            }
        }
        target.setAttribute("togglestatus","open");
    }else{
        for(let s in storeObject){
            let storeItem=storeObject[s];
            if(s==='togglestatusicon'){
                for(let ss=0; ss<storeItem.length; ss++){
                    let item_loca=storeItem[ss];
                    item_loca.style.transform='rotateZ(180deg)';
                }
            }else if(s==='toggleshowhidecontent1'){
                for(let ss=0; ss<storeItem.length; ss++){
                    let item_loca=storeItem[ss];
                    item_loca.style.display='none';
                }
            }
        }
        target.setAttribute("togglestatus","close");
    }
}