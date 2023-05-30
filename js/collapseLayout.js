
function collapseReplacelayout_resizingHandle(event){

    function initialize_reset(targetitem,storeObject){
        //not adapt resolutison rangessss intialize inline styless(layout)
        //console.log("(lAYOUT back to originState),===>함수 실행마다 모든 관련 대상개체들 초기화!!",targetitem);

        let collapsegroupTargetString=`collapsegroup`;//groupids(reseolution반응 포인트 관련 모든 대상들) resolution별 모든 대상체들
        storeObject[collapsegroupTargetString]=[];
        findchild_elements_total(targetitem,collapsegroupTargetString,storeObject);

       // console.log("======>>>>>>>findchildElements total copleted!!!!:",storeObject);

        //resolutions per adapt!!! now one point usess...!
        let resolutionPer_match_parts=storeObject[collapsegroupTargetString];
        for(let r=0; r<resolutionPer_match_parts.length; r++){
            let local_item=resolutionPer_match_parts[r];

            let collapseStyle=JSON.parse(local_item.getAttribute('collapsestyle'));
            for(let styles in collapseStyle){
                let $matching_resolution_style=collapseStyle[styles];
                //console.log("local_items!!: and styles: groupREsolutionIndex:",local_item,$matching_resolution_style);

                for(let ss in $matching_resolution_style){
                   // console.log("local item per final remove inlines stylesss",local_item.style,ss,$matching_resolution_style[ss]);
                    local_item.style.removeProperty(ss);
                    local_item.style[ss]=null;
                    //local_item.style['backgroundColor']='blue';
                }
            }
            local_item.style={};//기존 inlines스타일 초기화.

            if(local_item.getAttribute("controlOriginalstyleClass")){
                let controlOriginalStyle=JSON.parse(local_item.getAttribute("controlOriginalstyleClass"));

                for(let originalStyles in controlOriginalStyle){
                    controlOriginalStyle=controlOriginalStyle[originalStyles];//resoliution per 
                    let controlStyles=controlOriginalStyle.split('^');

                   // console.log("controlOriginalStyle(addback to origin stlye classs)",controlOriginalStyle,controlStyles);
                    local_item.classList.add(...controlStyles);
                }                      
            }
        }
    }

   // console.log("screen resize startss!!!",event,window.innerWidth);
    var now_screenwidth=window.innerWidth;
   // console.log("nowscreenwidth??:",now_screenwidth);

    var collapseReplace_layouts=document.getElementsByClassName("javascript_collapseReplacelayout");
    for(let outer=0; outer<collapseReplace_layouts.length; outer++){
        let targetitem=collapseReplace_layouts[outer];
        
        let storeObject={};

        //console.log("targetitemss:",targetitem,targetitem.getAttribute("groupids"));
        //let groupids=targetitem.getAttribute("groupids").split("^");
        let target_adapt_resolutionrange=JSON.parse(targetitem.getAttribute("adapt_resolution_range"));
        //console.log("targetadapt resoutlion range:",target_adapt_resolutionrange);

        initialize_reset(targetitem,storeObject);//관련된 colapseLayout하부 모든 대상체들의 inline기존 스타일해제/원본 style복구(모든 해상도case포함한 모든 개체들)

        //let isfind_match_resolution=false;
        for(let i in target_adapt_resolutionrange){
            //console.log("i,values:",i,target_adapt_resolutionrange[i]);
            let object_value=target_adapt_resolutionrange[i]
            let resolution_start=object_value['start'];
            let resolution_end=object_value['end'];

           // console.log('now screen width,size widthsss:',now_screenwidth, i, resolution_start,resolution_end);
            //action Start (targetitem layoutCoallpseTarget layouts inners per storeObjectLocals matching targets inlineEffect adapt and unApdat )
            if(now_screenwidth >= resolution_start && now_screenwidth <= resolution_end){
              //  console.log("matching resolutions groupidss!!!:",i);

                let target_rootchilds=targetitem.children;
                let target_collapseLayout_width=parseFloat(window.getComputedStyle(targetitem,null)['width']);
                let targetchild_widths_total=0;
              //  console.log("targetitem(layoutcoallpse) now WIDTH:",target_collapseLayout_width);
                for(let t=0; t<target_rootchilds.length; t++){
                    let child_layout=target_rootchilds[t];
                    if(child_layout.className.indexOf("collapse_width_calculate")!=-1){
                        let width_local=parseFloat(window.getComputedStyle(child_layout,null)['width']);
                        //console.log("child layouts and widths!!!:",child_layout,width_local);
                        targetchild_widths_total += width_local;
                    }                    
                }
                //console.log("matching targetLayout(collapse) nowWIDTH, AND CHILD widthss:",target_collapseLayout_width,targetchild_widths_total);
                if(targetchild_widths_total >= target_collapseLayout_width-20){
                    //console.log("collapse mother less than motherchildswidthTotalss!!! (LAYOUT COLLAPSE!!!ADAPT!)",targetitem);
                    let collapsegroupTargetString=`collapsegroup${i}Target`;
                    storeObject[collapsegroupTargetString]=[];
                    findchild_elements_total(targetitem,collapsegroupTargetString,storeObject);
                    //console.log("======>>>>>>>findchildElements total copleted!!!!:",storeObject);


                    //resolutions per adapt!!!(각 resize실행시마다 각 layoutcollapse에서의 매칭된 한개씩의 layoutCase(1번) 매칭)
                    let resolutionPer_match_parts=storeObject[collapsegroupTargetString];
                    for(let r=0; r<resolutionPer_match_parts.length; r++){
                        let local_item=resolutionPer_match_parts[r];
                      //  console.log("local itemss:",local_item);
                        if(local_item.getAttribute("controlOriginalstyleClass")){
                            let controlOriginalStyle=JSON.parse(local_item.getAttribute("controlOriginalstyleClass"));
                            //console.log("contorlOringslastyle:",controlOriginalStyle,i);

                            controlOriginalStyle=controlOriginalStyle[i];//resoliution per 
                            if(controlOriginalStyle){
                                let controlStyles=controlOriginalStyle.split('^');

                               // console.log("controlOriginalStyle:(remove origin styles class)",controlOriginalStyle,controlStyles);
                                local_item.classList.remove(...controlStyles);
                            }
                            
                        }
                        
                        if(local_item.getAttribute("collapseStyle")){
                            let collapseStyle=JSON.parse(local_item.getAttribute('collapseStyle'));
                            let $matching_resolution_style=collapseStyle[i];
                            //console.log("local_items!!: and styles: groupREsolutionIndex:",i,local_item,$matching_resolution_style);

                            if($matching_resolution_style){
                                for(let ss in $matching_resolution_style){
                                    //console.log("local item per final adapt inlines stylesss",local_item.style,ss,$matching_resolution_style[ss]);
                                    //local_item.style[`${ss}`]=`${$matching_resolution_style[ss]}`;
                                    //local_item.style['backgroundColor']='red';
                                    //local_item.style['width']='100% !important';
                                    local_item.style.setProperty(ss,$matching_resolution_style[ss]);
                                    local_item.style[ss]=$matching_resolution_style[ss];
                                }
                            }
                            
                        }
                        
                    }
                }
            }

        }
    }
    
}

window.addEventListener("resize",collapseReplacelayout_resizingHandle,false);
collapseReplacelayout_resizingHandle();