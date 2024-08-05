import * as THREE from 'three';

const meterial = new THREE.MeshStandardMaterial( { color: '#3d3d3d', side: THREE.DoubleSide } );
const lensContainer = new THREE.Object3D();

const outerHoleMesh = () => {

	const extrudeSettings = {
		depth: 0.05,
		bevelEnabled: false,
	};

	const circleShape = new THREE.Shape();
	circleShape.absarc( 0, 0, 0.2 );

	const circleHole = new THREE.Shape();
	circleHole.absarc( 0, 0, 0.15 );

	circleShape.holes = [ circleHole ];

	const geometry = new THREE.ExtrudeGeometry( circleShape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, meterial );
	mesh.position.z = - 0.48;
	mesh.position.y = 0.65;

	lensContainer.add( mesh );

};

const innerHoleMesh = () => {

	const extrudeSettings = {
		depth: 0.03,
		bevelEnabled: false,
	};

	const circleShape = new THREE.Shape();
	circleShape.absarc( 0, 0, 0.15 );

	const circleHole = new THREE.Shape();
	circleHole.absarc( 0, 0, 0.1 );

	circleShape.holes = [ circleHole ];

	const geometry = new THREE.ExtrudeGeometry( circleShape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, meterial );
	mesh.position.z = - 0.43;
	mesh.position.y = 0.65;

	lensContainer.add( mesh );

};

const glass = () => {

	const glassMeterial = new THREE.MeshStandardMaterial( { metalness: 0,
		metalness: 0,
		roughness: 0.1,
		envMapIntensity: 1,
		clearcoat: 1,
		clearcoatRoughness: 0,
		transmission: 1,
		opacity: 0.3,
		reflectivity: 0.5,
		thickness: 0.1,
		ior: 1.5,
	} );

	const extrudeSettings = {
		depth: 0.05,
		bevelEnabled: false,
	};

	const circleShape = new THREE.Shape();
	circleShape.absarc( 0, 0, 0.1 );


	const geometry = new THREE.ExtrudeGeometry( circleShape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, glassMeterial );
	mesh.position.z = - 0.45;
	mesh.position.y = 0.65;

	lensContainer.add( mesh );

};

export const viewFinder = () => {

	innerHoleMesh();
	outerHoleMesh();
	glass();


	return lensContainer;

};
