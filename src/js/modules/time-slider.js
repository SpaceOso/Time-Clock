/**
 * Created by Rico on 5/7/2017.
 */

import * as Gradients from "./gradients";


let startSlider = document.getElementById('start-slider');
let endSlider = document.getElementById('end-slider');

startSlider.addEventListener("click", function () {
    console.log("start slider has been clicked");

    let amPm = addClassToSlider(startSlider);

    Gradients.colorChange("start-body", amPm, false);

});

endSlider.addEventListener('click', function () {

    let amPm = addClassToSlider(endSlider);

    Gradients.colorChange("end-body", amPm, false);

});

function addClassToSlider(slider){

  if(!slider.classList.contains('pm-setting')) {
      slider.classList.add('pm-setting');
      return 'pm';
  } else {
      slider.classList.remove('pm-setting');
      return 'am';
  }

}