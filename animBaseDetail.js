import * as THREE from 'https://sinjaesung.github.io/webPageTest/three.js-master/build/three.module.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'https://sinjaesung.github.io/webPageTest/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'https://sinjaesung.github.io/webPageTest/three.js-master/examples/jsm/loaders/RGBELoader.js';

class animBaseDetail{
    constructor(characterSrc,isAnim=true,model_data){
        const divContainer=document.querySelector('#webgl-container');
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
        this._setupModel(characterSrc,isAnim,model_data);
        this._setupBackground(model_data)
        //this._setupControls();
        window.onresize= this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

        this._setupControls()
    }
    _setupBackground(model_data){
        new RGBELoader().load(model_data['background'],(texture)=>{
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
        camera.position.set(0.2,0,2)
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
    _zoomFit(object3D,camera){//모델가 카메라는 기본값으로 기본적으로 0,0,0 / 0,0,2 거리만큼 떨어져있게된다.
        const box=new THREE.Box3().setFromObject(object3D);

        const sizeBox = box.getSize(new THREE.Vector3()).length();// 모델경계바운딩밗 대각선길이

        const centerBox= box.getCenter(new THREE.Vector3());//바운딩박스 origin좌표중심좌표
        console.log("모델 box바운딩정보:",box);;
        console.log("사이즈박스 대각선길이?:",sizeBox);
        const halfSizeModel = sizeBox *0.5;//모델대각가장큰크기값 절반값

        const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);//카메라fov각도의절반값
        console.log("모델크기절반사이즈와 fov절반값",halfSizeModel,halfFov)

        let distance= halfSizeModel / Math.tan(halfFov);//이공식적용 하면 대수적성질에 의해 tan(fov절반)을 나누면 모델크기절반* 적당거리/모델크기절반=적당거리가 나옴.
        console.log("계산된 distance값:",distance);
        distance = (distance/1.3);
        //모델중심에서 카메라 위치로 향한ㄴ 방향 단위백테 계산
        console.log("모델중심점:",centerBox);
        const direction = (new THREE.Vector3()).subVectors(
            camera.position,centerBox).normalize();
        
        //단위방향벡터 방향ㅇ로 모델 중심 위치에서 distnace거리에 대한 위치
        const position=direction.multiplyScalar(distance).add(centerBox);
        camera.position.copy(position);
        console.log("지정된 position camerapos값:",position)

        camera.near =sizeBox / 100;
        camera.far=sizeBox * 100;

        camera.updateProjectionMatrix();

        camera.lookAt(centerBox.x,centerBox.y,centerBox.z);
    }
    _setupModel(characterSrc,isAnim,model_data){
        /*const geometry= new THREE.BoxGeometry(1,1,1);

        const material=new THREE.MeshPhongMaterial({color:0x44a88});
        const cube=new THREE.Mesh(geometry,material);

        this._scene.add(cube);
        this._cube = cube;*/
        let description=document.getElementById("AnimdetailDescription");

        const axisHelper=new THREE.AxesHelper(1000);
        this._scene.add(axisHelper);
        
        const loader=new GLTFLoader();
        let mixer;
        let transformsrc=model_data['transformsrc'];

        loader.load(characterSrc,(gltf)=>{
            const model=gltf.scene;
            this._scene.add(model);

            this._zoomFit(model,this._camera)
            console.log("gltf info:",gltf);
            console.log("isAnim??:",isAnim);
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
            if(isAnim){
                mixer=new THREE.AnimationMixer(model);
                const clips=gltf.animations;
                const animationMaps={};
                console.log("animtaaitonss:",clips);
            // const clip=THREE.AnimationClip.findByName(clips,'HeadAction');
            // const action=mixer.clipAction(clip);
                //this._mixer=mixer;
                //action.play();
                this._mixer=mixer;
                clips.forEach(function(clip){
                    console.log("{anim clip:",clip);
                    const name=clip.name;
                    console.log("what?:",mixer.clipAction(clip));
                    animationMaps[name]=mixer.clipAction(clip);

                    //const action=mixer.clipAction(clip);
                    //action.play();
                });
                console.log("animationMaps:",animationMaps);
                const alwaysAnimationAction=animationMaps[model_data['playflag']];
                console.log("alwaasgjasgasg:",alwaysAnimationAction)
                alwaysAnimationAction.play();

                model_data['isloaded']=true;

                description.innerHTML = model_data['description']
            }
            
        },undefined,function(error){
            console.log('load error:',error);
        });

        if(transformsrc){
            loader.load(transformsrc,(gltf)=>{
                const model=gltf.scene;
                this._scene.add(model);
                model.position.set(0,0,-0.5)

                console.log("transform gltf info:",gltf);
                console.log("isAnim??:",isAnim);
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
                if(isAnim){
                    mixer=new THREE.AnimationMixer(model);
                    const clips=gltf.animations;
                    const animationMaps={};
                    console.log("animtaaitonss:",clips);
                // const clip=THREE.AnimationClip.findByName(clips,'HeadAction');
                // const action=mixer.clipAction(clip);
                    //this._mixer=mixer;
                    //action.play();
                    this._transformmixer=mixer;
                    clips.forEach(function(clip){
                        console.log("{anim clip:",clip);
                        const name=clip.name;
                        console.log("what?:",mixer.clipAction(clip));
                        animationMaps[name]=mixer.clipAction(clip);
    
                        //const action=mixer.clipAction(clip);
                        //action.play();
                    });
                    console.log("animationMaps:",animationMaps);
                    const alwaysAnimationAction=animationMaps[model_data['playflag']];
                    console.log("alwaasgjasgasg:",alwaysAnimationAction)
                    alwaysAnimationAction.play();
    
                    model_data['isloaded']=true;
    
                }
                
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

        time *= 0.001; //second unit
       // console.log("update cubeingss:",time)
        //this._cube.rotation.x=time;
        //this._cube.rotation.y=time;
        if(this._mixer){
            const deltaTime=time - this._previousTime;
            this._mixer.update(deltaTime);
        }
        if(this._transformmixer){
            const deltaTime2=time - this._previousTime;
            this._transformmixer.update(deltaTime2);
        }

        this._previousTime=time;
    }
}
export default animBaseDetail;