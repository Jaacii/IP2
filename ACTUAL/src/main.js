// External Libraries
document.write('<script type="text/javascript" src="../lib/three.js-master/build/three.js"></script>');
document.write('<script type="text/javascript" src="../lib/dat.gui-master/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-master/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-master/examples/js/libs/tween.min.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-master/examples/js/libs/inflate.min.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-master/examples/js/libs/stats.min.js"></script>');
document.write('<script type="text/javascript" src="../lib/three.js-master/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="../lib/ThreeCSG-master_oldVersion/ThreeCSG.js"></script>');
document.write('<script type="text/javascript" src="../lib/cannon.js-master/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="../lib/howler.js-master/src/howler.core.js"></script>');

// Own Code

document.write('<script type="text/javascript" src="src/objects/addRadioFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addOldTableFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addBowlFromFile.js"></script>'); 
document.write('<script type="text/javascript" src="src/objects/addFloor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addLights.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');
//document.write('<script type="text/javascript" src="src/eventfunctions/setRadioSound.js"></script>');
//document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();

    physics = new Physics();
    physics.initialize(0, -200, 0, 1/120, true);

    var axes = new THREE.AxesHelper(20);
    //scene.add(axes);

/*    addRadioFromFile(); 
*/	
    addOldTableFromFile();

    addBowlFromFile();

   addFloor();    

    addLights();

    camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.set(0, 150, 150);
    camera.lookAt(0, 83, 0);

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0,83,0);
    orbitControls.update();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;
    document.getElementById("3d_content").appendChild(renderer.domElement);

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);    

    var clock = new THREE.Clock();

    function mainLoop() {

        stats.begin();

        var delta = clock.getDelta();

        physics.update(delta);

     /*   if (animationMixer != null)
            animationMixer.update(delta);*/

        renderer.render(scene, camera);

        stats.end();
        
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;

    window.addEventListener('radioStateChanged', setRadioSound);
    window.dispatchEvent(new Event('radioStateChanged'));
}

window.onload = main;
