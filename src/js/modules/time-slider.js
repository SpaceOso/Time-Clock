/**
 * Created by Rico on 5/7/2017.
 */

import * as Gradients from "./gradients";


let startSlider = document.getElementById('start-slider');
let endSlider = document.getElementById('end-slider');
let clickable = true;

startSlider.addEventListener("click", function () {

    console.log("clickable", clickable);
    if(!clickable){
        return false;
    }
    let amPm = addClassToSlider(startSlider);
    Gradients.animateGradient("start-body", amPm, false);
    clickable = false;
    setTimeout(makeClickable, 800);
});

endSlider.addEventListener('click', function () {

    if(!clickable){
        return false;
    }
    let amPm = addClassToSlider(endSlider);
    Gradients.animateGradient("end-body", amPm, false);
    clickable = false;
    setTimeout(makeClickable, 800);

});

//will return either am or pm depending on the current class assigned to the time input
function addClassToSlider(slider){

  if(!slider.classList.contains('pm-setting')) {
      slider.classList.add('pm-setting');
      return 'pm';
  } else {
      slider.classList.remove('pm-setting');
      return 'am';
  }

}

function makeClickable(){
    clickable = true;
    
}