/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
	DirectionalLight,
	HemisphereLight,
	PMREMGenerator,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	sRGBEncoding,
} from 'three';

/** Comment this out when you replace local asset with S3 loading asset, workshop three step two*/
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
/** Uncomment this import for workshop three step two, */
// import {loadAsset} from './fetchurl';

export const setupScene = () => {
	const scene = new Scene();

	const camera = new PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		0.1,
		5000,
	);

	scene.add(new HemisphereLight(0x606060, 0x404040));

	const light = new DirectionalLight(0xffffff);
	light.position.set(1, 1, 1).normalize();
	scene.add(light);

	const renderer = new WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = sRGBEncoding;
	renderer.xr.enabled = true;
	document.body.appendChild(renderer.domElement);

	const pmremGenerator = new PMREMGenerator(renderer);
	pmremGenerator.compileEquirectangularShader();

	new EXRLoader().load('assets/venice_sunset_1k.exr', (texture) => {
		const envMap = pmremGenerator.fromEquirectangular(texture).texture;
		pmremGenerator.dispose();
		scene.environment = envMap;
	});

	/** Uncomment this to change this asset loading from  local asset to loading from S3
	 * workshop three step two */
	// loadAsset('exr', 'assets/venice_sunset_1k.exr', (texture) => {
	// 	const envMap = pmremGenerator.fromEquirectangular(texture).texture;
	// 	pmremGenerator.dispose();
	// 	scene.environment = envMap;
	// })

    /** Uncomment this to change this asset loading from  local asset to loading from S3
	 * workshop three step two */
	// loadAsset('gltf','assets/flappybird.glb', (gltf) => {
	// 	scene.add(gltf.scene);
	// })

	new GLTFLoader().load('assets/flappybird.glb', (gltf) => {
	scene.add(gltf.scene);
	});

	window.addEventListener('resize', function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	});

	return { scene, camera, renderer };
};

