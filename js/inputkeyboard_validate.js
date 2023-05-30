
/*유효성check final관련 local함수*/
if(document.getElementById("javascript_validateform_submit")){
    javascript_validateform_submit.addEventListener('click',inputfinal_validate_trigger,false);
    function inputfinal_validate_trigger(event){
        event.preventDefault();
        let submit_target=event.target;
        console.log('inputfinal_validate_trigger triggerss 실행');
        let javascript_inputvalidate_items=document.getElementsByClassName("javascript_inputvalidate");
        let password_values=[];//password,passwordrepat,password related anothers..

        for(let i=0;i<javascript_inputvalidate_items.length; i++){ 
            let item=javascript_inputvalidate_items[i];
            
            console.log('itemss:',item);

            if(item.getAttribute("type")=="checkbox"){
                console.log("checkbox요소:",item);
                let related_child_checkboxes=document.querySelectorAll(`[targetindex*='${item.getAttribute("targetindex")}']`);//어떤 특정 집단 체크박스그룹 mother checkbox or target의 targetindex groupid값과 관련된 하위 checkboxes들을 구하여 그들 모두 체크여부 판단

                console.log("related child checkboxess:",related_child_checkboxes);

                for(let c=0; c<related_child_checkboxes.length; c++){
                    let item_=related_child_checkboxes[c];

                    if(!item_.checked){
                        alert("checkboxs관련 모든 요소중에 미체크되어있는것 하나라도 발견시에!");
                        return false;
                    }
                }
            }
            if(item.getAttribute("type")=="checkbox"){
                console.log("checkbox요소:",item);

                let checkbox_namegroup=item.getAttribute("name");
                let checkbox_namegroup_checkes=document.querySelectorAll(`[name=${checkbox_namegroup}]:checked`);
                console.log("checkbox name그룹:",checkbox_namegroup,checkbox_namegroup_checkes);

               if(checkbox_namegroup_checkes.length==0){
                  alert(`checkbox namegroup :${checkbox_namegroup} 의 경우 아예 체크가 되어있지 않음 값없음(다중값or단일값)`);
                  return false;
               }
            }

            if(item.getAttribute("type")=="text" || item.getAttribute("type")=='password'){
                console.log('item text valuess:',item,item.value);   

                if(item.value=="" || !item.value){
                    alert("요소중 text입력요소중 값이 비어있는것 하나라도 발견의 경우");
                    return false;
                }
            }
            if(item.tagName=="TEXTAREA"){
                console.log('item.sring length:',item.value.length,item.value);
                if(item.length==0 || item.value==""){
                    alert("textarea 입력란이 비어있음");
                    return false;
                }
            }
            if(item.getAttribute("type")=='password'){
                password_values.push(item.value);//password,passreapeat password관련
            }

            if(item.getAttribute("type")=="radio"){
                console.log('radio valuess:',item,item.value,item.getAttribute("name"));   
                let name=item.getAttribute("name");
                let radiogroup_checked=document.querySelector(`[name='${name}']:checked`);
                console.log('radio names 관련 요소집합이였다면 그중에서 해당 그룹라디오가 체크되어있는지 여부:',radiogroup_checked);

                //console.log('radio name valuess:',document.querySelector(`[name='${name}']`).value);
                if(!radiogroup_checked || radiogroup_checked===null){
                    alert("요소중 라디오그룹중 체크안되어있는게 하나라도 있는경우");
                    return false;
                }
            }//radio group eleents1,2,3있다고할시(name이 그룹) 각 name별 그룹에서 미체크된 그룹 여부 확인.

            if(item.getAttribute("isvalid")=="false"){
                alert("validate요소중 값이 유효하지 않은것  하나라도 발견의 경우");
                return false;
            }
        }
        console.log("입력 password valuesss:",password_values);

        if(!array_is_allsame_elements(password_values)){
            alert("비밀번호부분을 확인해주세요!");
            return false;
        }
        alert("유효성 통과!");

        submit_target.setAttribute("isvalid","true");
        return true;
    }
}


let javascript_inputvalidate_keyboards=document.getElementsByClassName("javascript_inputvalidate_keyboard");//javascript_inputvalidate_keyboard
for(let s=0; s<javascript_inputvalidate_keyboards.length; s++){
    let item=javascript_inputvalidate_keyboards[s];

    item.onkeyup=inputform_keyboard_inputting_validation_trigger;
}

function inputform_keyboard_inputting_validation_trigger(event){
    console.log('inputform_keyboard_inputting_validation_trigger',event.target);

    var targetdatas=JSON.parse(event.target.getAttribute("targetdata"));
    var triggerfromTarget=event.target;
    var effectTarget=targetdatas['Target'];
    effectTarget=document.querySelector(`[targetindex*=${effectTarget}]`);
    
    console.log('triggerfrom_get:',triggerfromTarget,triggerfromTarget.value,triggerfromTarget.value.length);

    if(targetdatas['relTargetindex']){
        var trigger_with_relTargetstring=targetdatas['relTargetindex'];//password,passwaord repeat등등..
        var trigger_with_relTarget=document.querySelector(`[targetindex*=${trigger_with_relTargetstring}`);
        
        console.log('trigger_with_relTarget',trigger_with_relTarget);

    }

   // var target_effect=targetdatas['effect'];

    var triggerdata_validation_type=targetdatas['validationtype'];

    var isvalid_temp;

    switch(triggerdata_validation_type){
        case 'id':
            isvalid_temp=idcheck(triggerfromTarget.value);
        break;

        case 'password':
            isvalid_temp=isPassword(triggerfromTarget.value);
        break;

        case 'password_match':
            isvalid_temp=password_match(trigger_with_relTarget.value,triggerfromTarget.value);
        break;

        case 'name':
            isvalid_temp=isname(triggerfromTarget.value);
        break;

        case 'phone':
            isvalid_temp=isPhoneNumber(triggerfromTarget.value);
        break;

        case 'email':
            isvalid_temp=isEmail(triggerfromTarget.value);
        break;

        case 'birth':
            isvalid_temp=isbirth(triggerfromTarget.value);
        break;
    }
    console.log('isvalids dteapsss:',isvalid_temp);
    if(isvalid_temp){
        triggerfromTarget.setAttribute("isvalid","true");

        viewunview_common(effectTarget,"none");
          
    }else{
        triggerfromTarget.setAttribute("isvalid","false");

        viewunview_common(effectTarget,"block");
       
    }
}