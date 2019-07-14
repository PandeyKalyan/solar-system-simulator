function drawPlanet(planetData, parent, scene) {
    let {name, texture, diameter, distanceFromSun} = {...planetData}
    var myMaterial = new BABYLON.StandardMaterial(name + "Material", scene);
        myMaterial.diffuseTexture = new BABYLON.Texture(texture, scene); //????????? ??????
        myMaterial.specularTexture = new BABYLON.Texture(texture, scene); //Blink
        myMaterial.emissiveTexture = new BABYLON.Texture(texture, scene); //???? ????????

        // create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation 
        console.log(diameter)
        var planetSphere = BABYLON.Mesh.CreateSphere(name+'sphere', 16, diameter/10, scene);
        // move the sphere upward 1/2 of its height
        // planetSphere.position.x = distanceFromSun;
        planetSphere.material = myMaterial;
        planetSphere.parent = parent
        return planetSphere;
}

export default drawPlanet