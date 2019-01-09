function addBowlFromFile() {

    bowl = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('src/models/lamperichtig.fbx', function(object) {
        bowl.add(object);

        object.traverse(function(child) {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide;
                child.castShadow = true;
            }
        });
    });

    bowl.position.set(-30, 73, 0);

    scene.add(bowl);

    var bowlGeometry = new THREE.CylinderGeometry(20,11,13,32,8);
    var bowlMesh = new THREE.Mesh(bowlGeometry,new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
    }));
    bowlMesh.position.set(0, 6.5, 0);
    //bowl.add(bowlMesh);

    physics.addCylinder(bowl, 20, 11, 13, true, 1);
}
