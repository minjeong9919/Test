import * as THREE from '../build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

class App {

	constructor() {

		const divContainer = document.querySelector( '#webgl-container' );
		this._divContainer = divContainer; // 다른 메서드에서 참조 가능하도록 하기 위함

		const renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		divContainer.appendChild( renderer.domElement );
		this._renderer = renderer;

		const scene = new THREE.Scene();
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
		camera.position.z = 2;
		this._camera = camera;

	}

	_setupLight() {

		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		this._scene.add( light );

	}

	_setupModel() {

		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const fillMaterial = new THREE.MeshPhongMaterial( { color: 'gray' } );
		const cube = new THREE.Mesh( geometry, fillMaterial );

		const lineMaterial = new THREE.LineBasicMaterial( { color: 'red' } );
		const line = new THREE.LineSegments( new THREE.WireframeGeometry( geometry ), lineMaterial );

		const group = new THREE.Group();
		group.add( cube );
		group.add( line );


		this._scene.add( group );
		this._cube = group;

	}

	_setupControls() {

		new OrbitControls( this._camera, this._divContainer );

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
		// 자동으로 돌아가기
		// this._cube.rotation.x = time;
		// this._cube.rotation.y = time;

	}

}

window.onload = function () {

	new App();

};
