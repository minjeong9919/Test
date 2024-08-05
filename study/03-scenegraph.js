import * as THREE from '../build/three.module.js';

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

		// '_'로 시작하는 것은 해당 class 내에서만 사용되는 Private 이라고 지정
		// 개발자들간의 약속임!
		console.log( 'd' );

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
		camera.position.z = 50;
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

		const solarSystem = new THREE.Object3D();
		this._scene.add( solarSystem );

		const radius = 1;
		const widthSegment = 12;
		const heightSegment = 12;
		const sphereGeometry = new THREE.SphereGeometry( radius, widthSegment, heightSegment );

		const sunMaterial = new THREE.MeshPhongMaterial( {
			emissive: 0xffff00, flatShading: true
		} );

		const sunMesh = new THREE.Mesh( sphereGeometry, sunMaterial );
		sunMesh.scale.set( 3, 3, 3 );
		solarSystem.add( sunMesh );


		const earthOrbit = new THREE.Object3D();
		solarSystem.add( earthOrbit );

		const earthMaterial = new THREE.MeshPhongMaterial( {
			color: 0x2233ff, emissive: 0x112244, flatShading: true,
		} );

		const earthMesh = new THREE.Mesh( sphereGeometry, earthMaterial );
		earthOrbit.position.x = 10;
		earthOrbit.add( earthMesh );


		const moonOrbit = new THREE.Object3D();
		moonOrbit.position.x = 2;
		earthOrbit.add( moonOrbit );

		const moonMaterial = new THREE.MeshPhongMaterial( {
			color: 0x888888, emissive: 0x222222, flatShading: true
		} );
		const moonMesh = new THREE.Mesh( sphereGeometry, moonMaterial );
		moonMesh.scale.set( 0.5, 0.5, 0.5 );
		moonOrbit.add( moonMesh );

		this._solarSystem = solarSystem;
		this._earthOrbit = earthOrbit;
		this._moonOrbit = moonOrbit;

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
		this._solarSystem.rotation.y = time / 2;
		this._earthOrbit.rotation.y = time * 2;
		this._moonOrbit.rotation.y = time * 5;
		// this._cube.rotation.x = time;
		// this._cube.rotation.y = time;

	}

}

window.onload = function () {

	new App();

};
