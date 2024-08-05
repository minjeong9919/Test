import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { createBoxWithRoundedEdges } from './shapes/createBoxWithRoundedEdge.js';
import { LensContainer } from './components/LensContainer.js';
import { lens } from './components/lens.js';
import { viewFinder } from './components/viewFinder.js';
import { button } from './components/button.js';

class App {

	constructor() {

		const divContainer = document.querySelector( '#webgl-container' );
		this._divContainer = divContainer; // 다른 메서드에서 참조 가능하도록 하기 위함

		const renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		divContainer.appendChild( renderer.domElement );
		this._renderer = renderer;

		const scene = new THREE.Scene();
		scene.background = new THREE.Color( 0.1, 0.1, 0.1 );
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControls();

		// '_'로 시작하는 것은 해당 class 내에서만 사용되는 Private 이라고 지정
		// 개발자들간의 약속임!
		window.onresize = this.resize.bind( this );
		this.resize();
		// 창크키가 변경될 때마다 창 크기에 맞게 설정되도록
		// this가 app class의 객체를 가리키도록 bind로 묶어줌.
		requestAnimationFrame( this.render.bind( this ) );
		scene.environment = envMap;

	}

	_setupControls() {

		new OrbitControls( this._camera, this._divContainer );

	}

	_setupCamera() {

		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			100
		);
		camera.position.z = 7;
		this._camera = camera;

	}

	_setupLight() {

		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		this._scene.add( light );

		const ambientLight = new THREE.AmbientLight( 0xffffff ); // 추가: 부드러운 환경 조명
		this._scene.add( ambientLight );

	}

	_setupModel() {

		const camera = new THREE.Object3D();
		this._scene.add( camera );

		const bodyGeometry = createBoxWithRoundedEdges( 3, 2, 1, 0.15, 1 );
		const bodyMaterial = new THREE.MeshStandardMaterial( { color: 'gray', side: THREE.DoubleSide } );
		const bodyMesh = new THREE.Mesh( bodyGeometry, bodyMaterial );
		camera.add( bodyMesh );

		const lensContainer = new THREE.Object3D();
		lensContainer.position.y = 0.6;
		camera.add( lensContainer );

		const lensContainerMesh = LensContainer();
		lensContainer.add( lensContainerMesh );

		const lensMesh = lens();
		camera.add( lensMesh );

		const viewFinderMesh = viewFinder();
		lensContainer.add( viewFinderMesh );


		const buttonGeometry = button();
		camera.add( buttonGeometry );

	}

	resize() {

		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize( width, height );

	}

	render( time ) {

		this._renderer.render( this._scene, this._camera );
		this.update( time );
		requestAnimationFrame( this.render.bind( this ) );

	}

	update( time ) {

		time *= 0.001;
		// this._cube.rotation.x = time;
		// this._cube.rotation.y = time;

	}

}

window.onload = function () {

	new App();

};
