import Display from "./build/display.js"
import Time from "./build/time.js";
import peashooter from "./objects/peashooter.js";
import sunflower from "./objects/sunflower.js";
import repeater from "./objects/repeater.js";
import wallnut from "./objects/wallnut.js";

Display.setSize(innerWidth,innerWidth).init();

const plants = [peashooter,sunflower,repeater,wallnut];

function loop () {
  Time.update();
  
  plants.forEach(plant => {
    plant.update();
  })
  
  Display.clear();
  
  plants.forEach(plant => {
    plant.draw();
  })

  requestAnimationFrame(loop);
}

Time.start();

plants.forEach(plant => {
  plant.start();
})

window.onload = loop;

document.body.addEventListener("click",()=>{
  repeater.animations["shooting"].start();
  repeater.state = "shooting";
  
  peashooter.animations["shooting"].start();
  peashooter.state = "shooting";
  
  wallnut.animations["startDestroy"].start();
  wallnut.state = "startDestroy";
})
