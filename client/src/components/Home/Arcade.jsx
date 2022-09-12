import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";


export function Arcade() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "arcade/source/arcade2.glb"
  );
  
  useEffect(() => {
    gltf.scene.scale.set(0.035, 0.035, 0.035);
    gltf.scene.position.set(0, -0.05, 0);
	//gltf.scene.rotation.set(0, Math.PI/(4.4), 0); static
	gltf.scene.rotation.set(0, 45 , 0); //motion
	
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;

      }
    });
  }, [gltf]);

  

  return <primitive object={gltf.scene} />;
}
