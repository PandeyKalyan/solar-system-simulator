import planetData from './planetData.js'
import drawPlanet from './drawPlanets.js'
import pathGenerator from './pathGenerator.js'
import revolvePlanet from './revolvePlanets.js';

function createSun(scene) {
    var myMaterial = new BABYLON.StandardMaterial("sunMaterial", scene);
    myMaterial.diffuseTexture = new BABYLON.Texture('../images/texture/sun.jpg', scene); //????????? ??????
    myMaterial.specularTexture = new BABYLON.Texture('../images/texture/sun.jpg', scene); //Blink
    myMaterial.emissiveTexture = new BABYLON.Texture('../images/texture/sun.jpg', scene); //???? ????????

    // create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation 
    var sunSphere = BABYLON.Mesh.CreateSphere('sunSphere', 16, 0.5, scene);
    // move the sphere upward 1/2 of its height
    sunSphere.material = myMaterial;
    return sunSphere;
}

function createMoon(scene) {
    var myMaterial = new BABYLON.StandardMaterial("moonMaterial", scene);
    myMaterial.diffuseTexture = new BABYLON.Texture('../images/texture/sun.jpg', scene); //????????? ??????
    myMaterial.specularTexture = new BABYLON.Texture('../images/texture/sun.jpg', scene); //Blink
    myMaterial.emissiveTexture = new BABYLON.Texture('../images/texture/sun.jpg', scene); //???? ????????

    // create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation 
    var moonSphere = BABYLON.Mesh.CreateSphere('moonSphere', 16, 0.34, scene);
    // move the sphere upward 1/2 of its height
    moonSphere.material = myMaterial;
    moonSphere.position.x = 10
    return moonSphere;
}

window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function(){
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)

        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 20, -25));
        camera.attachControl(canvas, true);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        let {mercury, venus, earth, mars} = {...planetData};

        var sunObject = createSun(scene)

        var mercuryObject = drawPlanet(mercury, sunObject, scene)
        var venusObject = drawPlanet(venus, sunObject, scene)
        var earthObject = drawPlanet(earth, sunObject, scene)
        var marsObject = drawPlanet(mars, sunObject, scene)
        // var moonObject = createMoon(scene)

        
        // create a built-in "ground" shape;
        // var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
        
        // return the created scene
        var mercuryPath = pathGenerator(mercury, scene)
        var venusPath = pathGenerator(venus, scene)
        var earthPath = pathGenerator(earth, scene)
        var marsPath = pathGenerator(mars, scene)
        
        var alphaMercury = 0
        var alphaVenus = 0
        var alphaEarth = 0
        var alphaMars = 0
        var alphaMoon = 0
        // moonObject.parent = earthObject
        
        scene.registerBeforeRender(function () {
            mercuryObject.rotate(BABYLON.Axis.Y, 0.2/58.6, BABYLON.Space.WORLD);
            venusObject.rotate(BABYLON.Axis.Y, 0.2/243, BABYLON.Space.WORLD);
            earthObject.rotate(BABYLON.Axis.Y, 0.2, BABYLON.Space.WORLD);
            marsObject.rotate(BABYLON.Axis.Y, 0.2/1.03, BABYLON.Space.WORLD);
            // moonObject.rotate(BABYLON.Axis.Y, 0.2, BABYLON.Space.WORLD);
            // sunObject.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.WORLD);
            mercuryObject.position = revolvePlanet(alphaMercury, mercury)
            venusObject.position = revolvePlanet(alphaVenus, venus)
            earthObject.position = revolvePlanet(alphaEarth, earth)
            marsObject.position = revolvePlanet(alphaMars, mars)
            // moonObject.position = BABYLON.Vector3(6, earthObject.position.y, 6);
            alphaMercury += .2/88
            alphaVenus += .2/225
            alphaEarth += .2/365
            alphaMars += .2/686
            // alphaMoon += .2/27.3
            
        });
        return scene;
    }

    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});