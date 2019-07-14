function revolvePlanet(alpha, planetData) {
    let {majorAxis, minorAxis} = {...planetData}
    return new BABYLON.Vector3(Math.sqrt(majorAxis * minorAxis/(minorAxis * Math.cos(alpha) * Math.cos(alpha) + majorAxis * Math.sin(alpha) * Math.sin(alpha))) * Math.cos(alpha), 0, Math.sqrt(majorAxis * minorAxis/(minorAxis * Math.cos(alpha) * Math.cos(alpha) + majorAxis * Math.sin(alpha) * Math.sin(alpha))) * Math.sin(alpha));
}

export default revolvePlanet