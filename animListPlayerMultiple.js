import animBase from "./animBase$p.js";

let modelList=[
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character1/character1DanceRestFire3-3.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview1"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character2/character2danceRest9.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview2"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character3/character3DanceRest3.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview3"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character4/character4DanceRest3-4.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview4"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character5/character5DanceRest2.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview5"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character6/character6DanceRest5.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview6"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character7/character7DanceRest2.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview7"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character8/character8DanceRest.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview8"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/character0another/character0Human2.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview9"),
        'playflag':"idle"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/monsterVer3-2.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview10"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/monsterVer2-10.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview11"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/monsterVer3Female2.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview12"),
        'playflag':"defaultWoman_"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/cityhumanMale.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview13"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/cityhumanfeMale.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview14"),
        'playflag':"defaultwoman"
    }
]

for(let i=0; i<14; i++){
    let model_data=modelList[i];
    new animBase(model_data['src'],true,model_data);
}

let pageLoaders=document.getElementById("pageLoaders");
window.setInterval(()=>{
    if(modelList){
        //console.log('=====상태 animStATUS리스트====',modelList);
        let model_cnt=modelList.length;

        let loaded_cnt=0;

        for(let j=0; j<model_cnt; j++){
            let model_item=modelList[j];
            if(model_item['isloaded']){
                loaded_cnt++;
            }
        }

        if(loaded_cnt >=model_cnt){
            //console.log("모든 모델 로드완료!!");
            pageLoaders.style.display='none';
        }else{
            //console.log("아직 로드중==!!=======")
        }
    }
},100)
