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
		camera.position.z = 15;
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

		const shape = new THREE.Shape();

		const x = - 2.5, y = - 5;
		shape.moveTo( x + 2.5, y + 2.5 );
		shape.bezierCurveTo( x + 2.5, y + 2.5, x + 2, y, x, y );
		shape.bezierCurveTo( x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5 );
		shape.bezierCurveTo( x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5 );
		shape.bezierCurveTo( x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5 );
		shape.bezierCurveTo( x + 8, y + 3.5, x + 8, y, x + 5, y );
		shape.bezierCurveTo( x + 3.5, y, x + 2.5, y, x + 2.5, y + 2.5 );

		const geometry = new THREE.ShapeGeometry( shape );
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

	// _setupModel() {

	// 	const shape = new THREE.Shape();
	// 	shape.moveTo( 0, 0 );
	// 	shape.bezierCurveTo( 0.5, 0.5 );
	// 	shape.bezierCurveTo( 1.1 );
	// 	// shape.bezierCurveTo( 0.5, 0.5 );
	// 	// shape.lineTo( - 1, 1 );
	// 	// shape.lineTo( 1, 1 );

	// 	const geometry = new THREE.BufferGeometry();
	// 	const points = shape.getPoints();
	// 	geometry.setFromPoints( points );

	// 	const material = new THREE.LineBasicMaterial( { color: 0xffff00 } );
	// 	const line = new THREE.Line( geometry, material );

	// 	this._scene.add( line );

	// }

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
