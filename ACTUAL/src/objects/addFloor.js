function addFloor() {

    var floorGeometry = new THREE.PlaneGeometry(200,200);
    var floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0.0
    });
    var floorTexture = new THREE.TextureLoader().load('src/images/woodenground.jpeg');
    floorTexture.repeat.set(4, 4);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorMaterial.map = floorTexture;
    var floor = new THREE.Mesh(floorGeometry,floorMaterial);
    floor.rotation.x = -90 * DEG_TO_RAD;
    floor.receiveShadow = true;
    scene.add(floor);
}