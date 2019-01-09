function addOldTableFromFile() {

    table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('src/models/rundtisch.fbx', function(object) {
        table.add(object);

        object.traverse(function(child) {
            if (child.isMesh) {
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    });

    scene.add(table);

    var tabletopGeometry = new THREE.BoxGeometry(130,3,70,10,1,5);
    var tabletopMesh = new THREE.Mesh(tabletopGeometry,new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
    }));
    tabletopMesh.position.set(0, 71.5, 0);
    //table.add(tabletopMesh);

    physics.addBox(tabletopMesh, 130, 3, 70, 0);
}
