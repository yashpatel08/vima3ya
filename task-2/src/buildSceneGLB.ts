import type * as THREEType from "three";

type THREE = typeof THREEType;

export async function buildSceneGLB(THREE: THREE): Promise<Blob> {
    const { GLTFExporter } =
        await import("three/examples/jsm/exporters/GLTFExporter.js");

    const scene = new THREE.Scene();

    // Materials
    const coreMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.7,
        roughness: 0.2,
        flatShading: true,
    });

    const ringMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.55,
    });

    const satelliteMat = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        metalness: 0.6,
        roughness: 0.3,
        flatShading: true,
    });

    // Core
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), coreMat);
    scene.add(core);

    // Rings
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.7, 0.06, 16, 80),
        ringMat,
    );
    torus.rotation.x = Math.PI / 2.5;
    scene.add(torus);

    const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.7, 0.04, 16, 80),
        ringMat,
    );
    torus2.rotation.x = Math.PI / 2.5;
    torus2.rotation.y = Math.PI / 2;
    scene.add(torus2);

    // Satellites
    const positions = [
        new THREE.Vector3(2.2, 0.4, 0),
        new THREE.Vector3(-2.2, -0.4, 0),
        new THREE.Vector3(0, 0.4, 2.2),
        new THREE.Vector3(0, -0.4, -2.2),
    ];

    positions.forEach((pos, i) => {
        const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.18 - i * 0.02, 0),
            satelliteMat,
        );
        mesh.position.copy(pos);
        scene.add(mesh);
    });

    // Lights (only supported ones)
    const light1 = new THREE.DirectionalLight(0xffffff, 2);
    light1.position.set(5, 8, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x00e5ff, 1.2);
    light2.position.set(-5, -3, -5);
    scene.add(light2);

    scene.updateMatrixWorld(true);

    return new Promise((resolve, reject) => {
        const exporter = new GLTFExporter();

        exporter.parse(
            scene,
            (result) => {
                if (result instanceof ArrayBuffer) {
                    const blob = new Blob([result], { type: "model/gltf-binary" });
                    console.log("GLB size:", blob.size);
                    resolve(blob);
                } else {
                    reject(new Error("Not binary GLB"));
                }
            },
            (err) => reject(err),
            { binary: true },
        );
    });
}
