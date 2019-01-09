function addRadioFromFile() {

    radio = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    animationMixer = null;

    fbxloader.load('src/models/Radio.fbx', function(object) {
        radio.add(object);

        animationMixer = new THREE.AnimationMixer(object);
        for (var i = 0; i < object.animations.length; i++) {
            var action = animationMixer.clipAction(object.animations[i]);
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
        }
        animationMixer.addEventListener('finished', setRadioSound);

        object.traverse(function(child) {
            if (child.name === "Korpus" || child.name === "Antenne" || child.name === "Griff") {
                child.castShadow = true;
            }
        });
    });

    radio.position.set(30, 83, 0);
    radio.rotation.y = -20 * DEG_TO_RAD;

    scene.add(radio);

    physics.addBox(radio, 30, 20, 8, 3);

    radioState = {
        powerOn: false,
        antennaOut: false,
        markerRight: false,
        volumeHigh: false
    }
}
