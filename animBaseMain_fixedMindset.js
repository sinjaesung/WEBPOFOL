import * as THREE from 'https://sinjaesung.github.io/webPageTest/three.js-master/build/three.module.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'https://sinjaesung.github.io/webPageTest/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'https://sinjaesung.github.io/webPageTest/three.js-master/examples/jsm/loaders/RGBELoader.js';

class animBaseDetail{
    constructor(){
        const divContainer=document.querySelector('#transformAnimateTarget3_');
        console.log("load시점 divContainer:",divContainer)
        this._divContainer=divContainer;

        const renderer=new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        this._renderer=renderer;

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure=1;

        const scene=new THREE.Scene();
        this._scene=scene;
        this._setupCamera();
        this._setupLight();

        this.pageLoadersMainWrap=document.getElementById("pageLoadersMainWrap");

        let characterList=[
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character1/character1DanceRestFire3-3.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character2/character2danceRest9.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character3/character3DanceRest3.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character4/character4DanceRest3-4.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character5/character5DanceRest2.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character6/character6DanceRest5.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character7/character7DanceRest2.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character8/character8DanceRest.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character0another/character0Human2.glb',
                'isloaded':false,
                'playflag':'idle'
            }
        ]
        let transformList=[
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character1/character1_transform12.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character2/character2Transform.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character3/character3Transform.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character4/character4Transform.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character5/character5Transform.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character6/character6transform.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character7/character7Transform2.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character8/character8transform.glb',
                'isloaded':false,
                'playflag':'idle'
            },
            {
                'src':'https://sinjaesung.github.io/3DASSETtest/character0another/character0HumanTransform.glb',
                'isloaded':false,
                'playflag':'idle'
            }
        ]
        this.animMixer_array=[];
        this.characterList=characterList;
        this.transformList=transformList;
        this._setupModel(this.characterList,this.transformList);
        this._setupBackground()
        //this._setupControls();
        window.onresize= this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

        //this._setupControls()
    }
    _setupBackground(){
        new RGBELoader().load('https://sinjaesung.github.io/3DASSETtest/garden_nook_4k.hdr',(texture)=>{
            texture.mapping=THREE.EquirectangularReflectionMapping;
            this._scene.background = texture;
            this._scene.environment= texture;
        });
    }
    _setupCamera(){
        const width=this._divContainer.clientWidth;
        const height=this._divContainer.clientHeight;

        const camera=new THREE.PerspectiveCamera(
            40,
            width / height,
            0.1,
            10000
        );
        camera.position.set(0.9,3.2,9);
        let targetview=new THREE.Vector3(0,0,0);
        camera.lookAt(targetview);
        this._camera = camera;
    }
    _addPointLight(x,y,z,helperColor){
        const color=0xffffff;
        const intensity=0.5;

        const pointLight=new THREE.PointLight(color,intensity,2000);
        pointLight.position.set(x,y,z);

        this._scene.add(pointLight);

        const pointLightHelper=new THREE.PointLightHelper(pointLight,10,helperColor);
        this._scene.add(pointLightHelper);

    }
    _setupLight(){
        
        const ambientLight=new THREE.AmbientLight(0xffffff,0.7);
        this._scene.add(ambientLight);

       this._addPointLight(500,150,500,0xff0000);
       this._addPointLight(-500,150,500,0xffff00);
       this._addPointLight(-500,150,-500,0x00ff00);
       this._addPointLight(500,150,-500,0x0000ff);

       this._addPointLight(0,0,0,0xffffff);

    }
    _setupControls(){
        new OrbitControls(this._camera,this._divContainer);
    }
   
    _setupModel(characterList,transformList){
        
        console.log("this characterList transformList??:",characterList,transformList);

        const axisHelper=new THREE.AxesHelper(1000);
        this._scene.add(axisHelper);
        
        for(let c=0; c<characterList.length; c++){
            let c_item=characterList[c];
            let src=c_item['src'];

            new GLTFLoader().load(src,(gltf)=>{
                const model=gltf.scene;
                this._scene.add(model);
    
                console.log("각 characterModel gltf info:",gltf,model);

                let basis_length=1.2;
                let pos_y=0;
                let pos_x=0 + (basis_length*Math.cos(40*c));
                let pos_z=0 + (basis_length*Math.sin(40*c));
                console.log("각 charactderModel 지정 posx,y,z:",pos_x,pos_y,pos_z);
                model.position.set(pos_x,pos_y,pos_z);

                let mixer=new THREE.AnimationMixer(model);
                const clips=gltf.animations;
                const animationMaps={};
                console.log("characterModel animtaaitonss:",clips);
            
                if(model.children && model.children[0]){
                    let model_3dObject=model.children[0];
                    model_3dObject.traverse(child=>{
                        if(child instanceof THREE.Mesh){
                            child.castShadow=true;
                            child.receiveShadow=true;
    
                            child.frustumCulled=false
                        }
                    })
                }

                this.animMixer_array.push(mixer);
                clips.forEach(function(clip){
                    console.log("anim clip:",clip);
                    const name=clip.name;
                    console.log("what?:",mixer.clipAction(clip));
                    animationMaps[name]=mixer.clipAction(clip);

                    //const action=mixer.clipAction(clip);
                    //action.play();
                });
                console.log("animationMaps:",animationMaps);
                const alwaysAnimationAction=animationMaps[c_item['playflag']];
                console.log("alwaasgjasgasg:",alwaysAnimationAction)
                alwaysAnimationAction.play();//각 모델별로 애니메이션 실행되고 이후론 바꿀일은 없기에 따로 처리는 관련해서 필요없다.

                c_item['isloaded']=true;
                
            },undefined,function(error){
                console.log('load error:',error);
            });
        }
        for(let c=0; c<transformList.length; c++){
            let c_item=transformList[c];
            let src=c_item['src'];

            new GLTFLoader().load(src,(gltf)=>{
                const model=gltf.scene;
                this._scene.add(model);
    
                console.log("각 transformcharacterModel gltf info:",gltf,model);

                let basis_length=3;
                if(src.indexOf("character6")!=-1){
                    basis_length=4.1
                }
                let pos_y=0;
                let pos_x=0 + (basis_length*Math.cos(40*c));
                let pos_z=0 + (basis_length*Math.sin(40*c));
                console.log("각 transformcharactderModel 지정 posx,y,z:",pos_x,pos_y,pos_z);
                model.position.set(pos_x,pos_y,pos_z);

                let mixer=new THREE.AnimationMixer(model);
                const clips=gltf.animations;
                const animationMaps={};
                console.log("transformcharacterModel animtaaitonss:",clips);
            
                if(model.children && model.children[0]){
                    let model_3dObject=model.children[0];
                    model_3dObject.traverse(child=>{
                        if(child instanceof THREE.Mesh){
                            child.castShadow=true;
                            child.receiveShadow=true;
    
                            child.frustumCulled=false
                        }
                    })
                }

                this.animMixer_array.push(mixer);
                clips.forEach(function(clip){
                    console.log("anim clip:",clip);
                    const name=clip.name;
                    console.log("what?:",mixer.clipAction(clip));
                    animationMaps[name]=mixer.clipAction(clip);

                    //const action=mixer.clipAction(clip);
                    //action.play();
                });
                console.log("animationMaps:",animationMaps);
                const alwaysAnimationAction=animationMaps[c_item['playflag']];
                console.log("alwaasgjasgasg:",alwaysAnimationAction)
                alwaysAnimationAction.play();//각 모델별로 애니메이션 실행되고 이후론 바꿀일은 없기에 따로 처리는 관련해서 필요없다.

                c_item['isloaded']=true;
                
            },undefined,function(error){
                console.log('load error:',error);
            });
        }
    }
    resize(){
        const width=this._divContainer.clientWidth;
        const height=this._divContainer.clientHeight;
        
        this._camera.aspect= width/height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width,height);
       
    }
    render(time){
        this._renderer.render(this._scene,this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){

        time *= 0.001; 
    
        //console.log("this.aniationMixerGroups status:",this.animMixer_array);

        const deltaTime=time - this._previousTime;
        for(let s=0; s<this.animMixer_array.length; s++){
            let mixer=this.animMixer_array[s];
            if(mixer){
                mixer.update(deltaTime);
            }
        }
        let cond_cnt=18;

        let now_loadcnt=0;
        for(let a=0;a<this.characterList.length; a++){
            let c_item=this.characterList[a];
            if(c_item['isloaded']){
                now_loadcnt++;
            }
        }
        for(let e=0;e<this.transformList.length;e++){
            let e_item=this.transformList[e];
            if(e_item['isloaded']){
                now_loadcnt++;
            }
        }
        if(now_loadcnt >= cond_cnt){
            this.pageLoadersMainWrap.style.display='none';
        }

        this._previousTime=time;
    }
}
window.onload=()=>{
    new animBaseDetail();
}