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
		camera.position.z = 3;
		this._camera = camera;

	}

	_setupControls() {

		new OrbitControls( this._camera, this._divContainer );

	}

	_setupLight() {

		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		this._scene.add( light );

	}

	_setupModel() {

		/**1.point */
		// const vertices = [];
		// // x,y,z의 좌표를 -5 ~ 5 사이의 난소값을 랜덤으로 선택
		// for ( let i = 0; i < 10000; i ++ ) {

		// 	const x = THREE.MathUtils.randFloatSpread( 5 );
		// 	const y = THREE.MathUtils.randFloatSpread( 5 );
		// 	const z = THREE.MathUtils.randFloatSpread( 5 );

		// 	vertices.push( x, y, z );

		// }

		// const geomtry = new THREE.BufferGeometry();
		// geomtry.setAttribute(
		// 	'position',
		// 	new THREE.Float32BufferAttribute( vertices, 3 )
		// );
		// const sprite = new THREE.TextureLoader().load(
		// 	'../examples/textures/sprites/disc.png'
		// );

		// const material = new THREE.PointsMaterial( {
		// 	map: sprite,
		// 	// alphaTest: 0.5, // 해당 값보다 클때마다 픽셀이 렌더링되도록
		// 	color: '#00ffff',
		// 	size: 1,
		// 	sizeAttenuation: false, // 카메라와의 거리에 따라 크기가 조절되는지 (원근법)
		// } );

		// const points = new THREE.Points( geomtry, material );
		// this._scene.add( points );

		/**2.line */
		// const vertices = [
		// 	- 1, 1, 0,
		// 	1, 1, 0,
		// 	- 1, - 1, 0,
		// 	- 1, - 1, 0,
		// 	1, - 1, 0,
		// ];

		// const geometry = new THREE.BufferGeometry();
		// geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

		// const material = new THREE.LineBasicMaterial( {
		// 	color: 0xff0000
		// } );

		// const line = new THREE.LineLoop( geometry, material );
		// this._scene.add( line );

		/**Mesh */
		const material = new THREE.MeshPhysicalMaterial( {
			emissive: 0x000000,
			roughness: 1,
			metalness: 0,
			clearcoat: 1,
			clearcoatRoughness: 0,
			wireframe: false,
			flatShading: false,

		} );

		const box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), material );
		box.position.set( - 1, 0, 0 );
		this._scene.add( box );

		const sphere = new THREE.Mesh( new THREE.SphereGeometry( 0.7, 32, 32 ), material );
		sphere.position.set( 1, 0, 0 );
		this._scene.add( sphere );


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
