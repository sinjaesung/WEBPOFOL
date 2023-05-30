window.addEventListener('resize',widthcalculatePercent_resizingHandle,false);
widthcalculatePercent_resizingHandle();

window.addEventListener("resize",widthcalculatePercent_resizingHandle2,false);
widthcalculatePercent_resizingHandle2();
function widthcalculatePercent_resizingHandle(){
    let widthcalculatePercent_layouts=document.getElementsByClassName('javascript_widthcalculatePercent_layout');

    for(let outer=0; outer<widthcalculatePercent_layouts.length; outer++){
        let target_item=widthcalculatePercent_layouts[outer];
        //console.log('targetimtesss:',target_item);
        let columnCnt;
        
        let minLimitwidth=parseInt(target_item.getAttribute("minLimitWidth"));
        let adapt_range=JSON.parse(target_item.getAttribute("adapt_range"));
        let target_item_nowWidth=parseFloat(window.getComputedStyle(target_item,null)['width']);
        //console.log("targetOuter layoutItem now widthss:",target_item);
        //console.log("coluncnt,minlimiwidth:",columnCnt,minLimitwidth);
        ///console.log("now screen width,adapt rangess:",adapt_range,window.innerWidth);

        

        if(window.innerWidth >= adapt_range['start'] && window.innerWidth <= adapt_range['end']){
           // console.log("adapt calcualte 반응 범위에 해당함,이 경우에만 연산처리:");

           // console.log("targetite now width:",target_item_nowWidth);

            let widthcalculate_itemchildrens=target_item.children;

            let virtual_gap_percent=2;
            let gap_total_percent;
            let calculate_item_width;
            let item_per_percent;
            
            
            for(let cc=10; cc>=1; cc--){
                //console.log("colunCount settings>>>>>>",cc);
                columnCnt=cc;
                virtual_gap_percent=2;
                gap_total_percent=virtual_gap_percent * (columnCnt-1);//2*4-1 6%
                item_per_percent=(100-gap_total_percent) / columnCnt;
                calculate_item_width=target_item_nowWidth * (item_per_percent / 100);
                //console.log("item_per_percent,and calculate sizess:",item_per_percent,calculate_item_width,columnCnt);

                if(calculate_item_width > minLimitwidth){
                   // console.log("아이템별 percent반영width 최소width보다 커야만 widthpercent적용 peritemWIDTH percent and column Count, target_item_nowWidth",item_per_percent,columnCnt,target_item_nowWidth);
                    break;
                }
            }
            //console.log("적용 columnCounts:",columnCnt);
            target_item.setAttribute('columnCount',columnCnt);
            
            for(let s=0; s<widthcalculate_itemchildrens.length; s++){
                //console.log("ssss>: chilrren indexss",s);
                let local_child=widthcalculate_itemchildrens[s];
                if(local_child.className.indexOf("widthcalculate_item")!=-1){

                    local_child.style.width=item_per_percent+'%';
                    local_child.style.marginRight='0%';
                    if( ((s+1) % columnCnt) !=0){
                        //console.log("===>columnCnt에 따라서 index+1(childrensinde)가 columnCnt배수가 아닌것들만 우측여백%처리",widthcalculate_itemchildrens[s],(s+1),columnCnt);
                        widthcalculate_itemchildrens[s].style.marginRight=virtual_gap_percent+'%';
                    }
                }
            }
        }else{
            let widthcalculate_itemchildrens=target_item.children;
            for(let s=0; s<widthcalculate_itemchildrens.length; s++){
                //console.log("ssss>: chilrren indexss",s);
                let local_child=widthcalculate_itemchildrens[s];
                if(local_child.className.indexOf("widthcalculate_item")!=-1){

                    local_child.style=null;
                    
                }
            }
        }
    }
}

function widthcalculatePercent_resizingHandle2(){
    let widthcalculatePercent_layouts=document.getElementsByClassName('javascript_widthcalculatePercent_layout2');

    for(let outer=0; outer<widthcalculatePercent_layouts.length; outer++){
        let target_item=widthcalculatePercent_layouts[outer];
        //console.log('targetimtesss222:',target_item);
        
        let adapt_range=JSON.parse(target_item.getAttribute("adapt_range"));
        let res_per_column=JSON.parse(target_item.getAttribute("res_per_column"));

        let nowscreeenwidth=window.innerWidth;
        let match_resolution;
        for(let r in adapt_range){
            let range_item=adapt_range[r];
            let range_start=range_item.split("~")[0];
            let range_end=range_item.split("~")[1];

            if(nowscreeenwidth >= range_start && nowscreeenwidth<=range_end){
                match_resolution=r;
                break;
            }
        }
        let res_per_columncnt=res_per_column[match_resolution];
        //console.log("matching resolution and column countss:",res_per_columncnt,match_resolution);

        let target_item_nowWidth=parseFloat(window.getComputedStyle(target_item,null)['width']);
        //console.log("targetOuter layoutItem now widthss:",target_item);
       // console.log("coluncnt,target_item_nowWidth:",res_per_columncnt,target_item_nowWidth);
        //console.log("now screen width,adapt rangess:",adapt_range,window.innerWidth);


        let widthcalculate_itemchildrens=target_item.children;
        
        let gap=2;
        let gap_total_percent;
        //let calculate_item_width;
        let item_per_percent;
        
        gap_total_percent=gap*(res_per_columncnt-1);//2*4-1 6%
        item_per_percent=(100-gap_total_percent) / res_per_columncnt;
        //calculate_item_width=target_item_nowWidth * (item_per_percent / 100);
       
        //console.log("item_per_percent,and calculate sizess:",item_per_percent,gap,gap_total_percent,res_per_columncnt);

        target_item.setAttribute('columnCount',res_per_columncnt);
        
        for(let s=0; s<widthcalculate_itemchildrens.length; s++){
           // console.log("ssss>: chilrren indexss",s);
            let local_child=widthcalculate_itemchildrens[s];
            if(local_child.className.indexOf("widthcalculate_item")!=-1){

                local_child.style.width=item_per_percent+'%';
                local_child.style.marginRight='0%';
                if( ((s+1) % res_per_columncnt) !=0){
                   // console.log("===>columnCnt에 따라서 index+1(childrensinde)가 columnCnt배수가 아닌것들만 우측여백%처리",widthcalculate_itemchildrens[s],(s+1),res_per_columncnt);
                    widthcalculate_itemchildrens[s].style.marginRight=gap+'%';
                }
            }
        }
    
    }
}