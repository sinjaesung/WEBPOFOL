import animBase from "./animBase$p.js";

let modelList=[
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/HumanTypePistolMan.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview2"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/HumanTypeKnifeMan.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview3"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/HumanTypeShotGunMan.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview4"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/HumanTypeSwordMan.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview5"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/HumanTypeRocketMan.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview6"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/FarCreatedMonster2(blueNoair).glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview7"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/FarCreatedMonster(redAir).glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview8"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/Tank.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview9"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/terrain/evil/evilCoreman.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview10"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/MechanicTypeBoss1.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview11"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/MechanicTypeBoss2.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview12"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/helicopter.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview13"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/AirPlane1.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview14"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/MechanicTypeKing.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview15"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/EvilGod.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview16"),
        'playflag':"default"
    },
    {
        'src':'https://sinjaesung.github.io/3DASSETtest/mob/GodAi.glb',
        'isloaded':false,
        'viewcontainer':document.getElementById("characterview17"),
        'playflag':"default"
    }
]

for(let i=0; i<16; i++){
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
