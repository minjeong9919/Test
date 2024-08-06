import * as THREE from 'three';

export const container = () => {

	const shape = new THREE.Shape();
	const bodyMaterial = new THREE.MeshStandardMaterial( { color: 'gray', side: THREE.DoubleSide } );

	const underLength = 0.6;
	const upperLength = 0.4;
	const diff = 0.2;
	const height = 0.4;
	const radius = 0.01;

	// Define the shape with rounded corners
	shape.moveTo( 0, radius );
	shape.lineTo( 0, height - radius );
	shape.quadraticCurveTo( 0, height, radius, height );
	shape.lineTo( upperLength - radius, height );
	shape.quadraticCurveTo( upperLength, height, upperLength, height - radius );
	shape.lineTo( underLength - radius, radius + diff );
	shape.quadraticCurveTo( underLength, radius + diff, underLength, diff );
	shape.lineTo( underLength, radius );
	shape.quadraticCurveTo( underLength, 0, underLength - radius, 0 );
	shape.lineTo( radius, 0 );
	shape.quadraticCurveTo( 0, 0, 0, radius );
	shape.lineTo( 0, radius );

	const extrudeSettings = {
	  steps: 7,
	  depth: 1,
	  bevelEnabled: true,
	  bevelThickness: 0.1,
	  bevelSize: 0.1,
	  bevelOffset: 0,
	  bevelSegments: 5
	};

	const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, bodyMaterial );
	mesh.position.y = 0.45;
	mesh.position.z = - 0.3;
	mesh.position.x = 0.5;
	mesh.rotateY( - Math.PI / 2 );


	return mesh;

};
