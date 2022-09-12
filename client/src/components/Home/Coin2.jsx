import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import * as THREE from "three";
import {useNavigate } from "react-router-dom";
import { validate } from "../../Helpers/api";
import Libre from "../../utils/font/Libre.json"


export function Coin2(props) {
  const navigate = useNavigate();
	let x = 1.2 
	let z = 1.2
	let AnZ = Math.PI/2
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "arcade/source/coin_2.glb"
  );
  
  useEffect(() => {
	
    gltf.scene.scale.set(0.012, 0.012, 0.012);
  //  gltf.scene.position.set(1, 0.07, 1.2);
  gltf.scene.position.set(1.2, 0.07, 1.2);
	//gltf.scene.rotation.set(0, Math.PI/(4.4), 0); static
	gltf.scene.rotation.set(Math.PI/2 ,Math.PI , Math.PI/2); //motion + Math.PI/2
	
	
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;

      }
    });

	console.log(gltf);
  }, [gltf]);

  const timeout = (delay) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  };
  function Text3d(){
   const font = new THREE.FontLoader().parse(Libre);
   const textOptions = {
      font,
      size: 5,
      height: 1
   };
   return (
      <mesh>
         <textGeometry attach='geometry' args={['CLICK HERE', textOptions]} />
         <meshStandardMaterial attach='material' color="yellow" />
       </mesh>
    )
}
  const animate = (i) => {
	gltf.scene.position.set(1, 0.16, 1.2);
	gltf.scene.rotation.set(Math.PI + Math.PI/2 + Math.PI/20, 0, 0); 
	timeout(50).then(() => {
		gltf.scene.position.set(1, 0.16, 1.2);
		gltf.scene.rotation.set(Math.PI + Math.PI/2 - Math.PI/20, 0, 0); 
	}).then(() => {
	timeout(50).then(() => {
    	gltf.scene.position.set(1, 0.07, 1.2);
		gltf.scene.rotation.set(Math.PI + Math.PI/2, 0, 0);
	})})
  
  .then( async () => { 
    if(await validate()){
      return window.location.href = "http://localhost:3000/login/redirect";
    }
    
    window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1015646865775132682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foption&response_type=code&scope=guilds.join%20guilds.members.read%20guilds%20identify"})
	// // gltf.scene.position.set(0.3, 0.32, 0.3)
	// gltf.scene.rotation.set(Math.PI ,Math.PI/4 , Math.PI/2); 
  // https://discord.com/api/oauth2/authorize?client_id=1015646865775132682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Frefer&response_type=code&scope=identify%20guilds%20guilds.join%20guilds.members.read
	
  }
  
  return (
	<>
 <mesh onClick={() => animate()}><primitive object={gltf.scene} /></mesh>  

  </>
  
  );
}