let all_forms=document.getElementsByTagName("form");
console.log("모든 form tagsss 요소들:",all_forms);

for(let f=0; f<all_forms.length; f++){
    let form_item=all_forms[f];

    form_item.onsubmit=function(event){
        event.preventDefault();
        let target=event.target;
        let store_object={};
        let action_move_page;
        if(target.className.indexOf("searchformtype1")!=-1){
            console.log("actionsss:",target.getAttribute("action"));
            action_move_page=target.getAttribute("action");
        }
        store_object['searchform_inputkeyword']=[];

        findchild_elements_total(target,'searchform_inputkeyword',store_object);

        console.log("find all elemetnsss search realteddsss:",store_object);

        let searchform_inputkeywords=store_object['searchform_inputkeyword'];
        let search_string_total="";
        for(let s=0; s<searchform_inputkeywords.length; s++){
            let item=searchform_inputkeywords[s];

            search_string_total+= item.value;
        }
        console.log("최종적 검색어 키워드:",search_string_total);

        action_move_page += `?keyword=${search_string_total}`;
        console.log("action_move_Pagess:",action_move_page);

        location.href=action_move_page;
        return false;
    }
}

window.addEventListener('load',function(){
    console.log("페이지 로드 시점 체킹;;>>>",location.href);

    let now_page_url=location.href;

    if(now_page_url.indexOf("search")!=-1){
        console.log("검색형 페이지의 경우에만 처리>>>");

        let page_search_string=decodeURI(location.search.split("keyword=")[1]);

        console.log("검색한 단어:",page_search_string);

        let searchpage_intialize_searchkeywords=document.querySelectorAll(`[targetindex*='searchpage_intialize_searchkeyword']`);
        console.log("searchpage_intialize_searchkeywords:",searchpage_intialize_searchkeywords);
        for(let s=0; s<searchpage_intialize_searchkeywords.length; s++){
            let item=searchpage_intialize_searchkeywords[s];

            if(item.tagName=='INPUT' || item.tagName=='TEXTAREA'){
                item.value=page_search_string;
            }else{
                item.innerText=page_search_string;
            }
        }
    }
},null);