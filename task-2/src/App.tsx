import { useEffect } from "react";
import ModelViewer from "./ModelViewer";

export default function App() {
  useEffect(() => {
    async function generate() {
      const THREE = await import("three");
      const { buildSceneGLB } = await import("./buildSceneGLB");

      const blob = await buildSceneGLB(THREE);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "model.glb";
      a.click();

      console.log("Downloaded real GLB");
    }

    generate();
  }, []);
  return (
    <div className="h-screen">
      <ModelViewer url="/model-compressed.glb" />
    </div>
  );
}