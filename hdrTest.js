import * as THREE from 'three';
import  {OrbitControls}  from 'three/examples/jsm/controls/OrbitControls';
import {RGBELoader} from 'https://sinjaesung.github.io/webPageTest/three.js-master/examples/jsm/loaders/RGBELoader.js';

class App{
    constructor(){
        const divContainer = document.querySelector('#webgl-container');
        this._divContainer =divContainer;

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
        this._setupModel();
        this._setupControls();
        this._setupBackground();

        window.onresize= this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
    _setupBackground(){
        new RGBELoader().load('satara_night_4k.hdr',(texture)=>{
            texture.mapping=THREE.EquirectangularReflectionMapping;
            this._scene.background = texture;
            this._scene.environment= texture;
        });
    }
    _setupControls(){
        new OrbitControls(this._camera,this._divContainer);
    }
    _setupCamera(){
        const width=this._divContainer.clientWidth;
        const height=this._divContainer.clientHeight;

        const camera=new THREE.PerspectiveCamera(
            75,
            width/height,
            0.1,
            100
        );
        camera.position.z=3;
        this._camera=camera;
    }

    _setupLight(){
       
    }

    _setupModel(){
        const geometry=new THREE.TorusKnotGeometry(1,0.3,256,64,2,3);

        const material=new THREE.MeshStandardMaterial({color: 0xffffff});

        const cube=new THREE.Mesh(geometry,material);
        this._scene.add(cube);
       
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
        time *= 0.001;//sencond unitssss
        //this._cube.rotation.x = time;
        //this._cube.rotation.y= time;
    }
}

window.onload=function(){
    new App();
}