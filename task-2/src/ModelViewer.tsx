import React, { useEffect, useRef, useState } from "react";

interface Props {
    url: string;
}

const ModelViewer: React.FC<Props> = ({ url }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let renderer: any, scene: any, camera: any, controls: any;

        async function init() {
            const THREE = await import("three");

            const { OrbitControls } = await import(
                "three/examples/jsm/controls/OrbitControls.js"
            );

            const { GLTFLoader } = await import(
                "three/examples/jsm/loaders/GLTFLoader.js"
            );

            const { DRACOLoader } = await import(
                "three/examples/jsm/loaders/DRACOLoader.js"
            );

            const mount = mountRef.current!;
            const width = mount.clientWidth;
            const height = mount.clientHeight;

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            mount.appendChild(renderer.domElement);

            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x050507);

            // Camera
            camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
            camera.position.set(0, 2, 6);

            // Controls
            controls = new OrbitControls(camera, renderer.domElement);

            // Light
            const light = new THREE.DirectionalLight(0xffffff, 2);
            light.position.set(5, 5, 5);
            scene.add(light);

            // DRACO setup
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath(
                "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
            );

            const loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader);

            // ⏱ Start timing
            const start = performance.now();

            loader.load(
                url,
                (gltf) => {
                    scene.add(gltf.scene);

                    console.log(
                        `Model loaded in ${(performance.now() - start).toFixed(2)}ms`
                    );

                    setLoading(false);
                },
                (xhr) => {
                    if (xhr.total) {
                        setProgress(Math.round((xhr.loaded / xhr.total) * 100));
                    }
                },
                (error) => {
                    console.error("Error loading model:", error);
                }
            );

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }

            animate();
        }

        init();

        return () => {
            renderer?.dispose();
        };
    }, [url]);

    return (
        <div className="w-full h-screen relative" ref={mountRef}>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black">
                    <div className="animate-spin w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full mb-4" />
                    <p>Loading... {progress}%</p>
                </div>
            )}
        </div>
    );
};

export default ModelViewer;