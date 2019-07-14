function generatePlanetPath(planet, scene) {
    let {majorAxis, minorAxis} = {...planet}
    var tes = 60;
    var pi2 = Math.PI * 2;
    var step = pi2 / tes;
    var path = [];
    for (var i = 0; i < pi2; i += step ) {
        var x = Math.sqrt(majorAxis * minorAxis/(minorAxis * Math.cos(i) * Math.cos(i) + majorAxis * Math.sin(i) * Math.sin(i))) * Math.cos(i);
        var z = Math.sqrt(majorAxis * minorAxis/(minorAxis * Math.cos(i) * Math.cos(i) + majorAxis * Math.sin(i) * Math.sin(i))) * Math.sin(i);
        var y = 0;
        path.push( new BABYLON.Vector3(x, y, z) );
    }
    path.push(path[0]);
    var mySinusCurve = BABYLON.Mesh.CreateLines("circle", path, scene)
    return mySinusCurve
}

export default generatePlanetPath