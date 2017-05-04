/**
 * Created by Rico on 4/26/2017.
 */

//these are the rgb values from the design file
const amEndColor = [255, 219, 151];
const amStartColor = [252, 0, 68];
const pmStartColor = [98, 147, 255];
const pmEndColor = [170, 77, 177];
const errorStartColor = [255, 0, 69];
const errorEndColor = [116, 0, 96];
//TODO need better base colors
const standardStartColor = [100, 252, 92];
const standardEndColor = [252, 219, 151];

//only run the color change interval is this is set to false
let colorIntervalTimer = false;


function setColors(colorFormat) {
	if (colorFormat === "am") {
		return {
			goalColor: amEndColor,
			endGoalColor: amStartColor,
			startColor: pmStartColor,
			endColor: pmEndColor
		}
	}
	
	if (colorFormat === "pm") {
		return {
			goalColor: pmStartColor,
			endGoalColor: pmEndColor,
			startColor: amEndColor,
			endColor: amStartColor
		}
	}
	
	if (colorFormat === "error") {
		return {
			goalColor: errorStartColor,
			endGoalColor: errorEndColor,
			startColor: amEndColor,
			endColor: amStartColor
		}
	}
	
	if(colorFormat === "default"){
		return {
			goalColor: pmStartColor,
			endGoalColor: pmEndColor,
			startColor: standardStartColor,
			endColor: standardEndColor
		}
	}
}



export function colorChange(timePeriod, AmPm, error) {
	// console.log("colorChange()", timePeriod, AmPm, error);
	
	let goalColor, endGoalColor;
	let startColor, endColor;
	
	let timeBody = document.getElementById(timePeriod);
	
	if (timeBody.classList.contains("am")) {
		({startColor, endColor} = setColors("pm"));
	} else if (timeBody.classList.contains("pm")) {
		({startColor, endColor} = setColors("am"));
	} else if(timeBody.classList.contains("error")){
		({startColor, endColor} = setColors("error"));
	} else {
		({startColor, endColor} = setColors("default"));
	}
	
	if (AmPm === "am") {
		if(timeBody.classList.contains("am")){
			// enableRadioButtons();
			return false;
		}
		timeBody.classList.remove("pm");
		timeBody.classList.add("am");
		({goalColor, endGoalColor} = setColors("am"));
		// canStartAnimation = false;
	}
	
	if (AmPm === "pm") {
		if(timeBody.classList.contains("pm")){
			// enableRadioButtons();
			return false;
		}
		timeBody.classList.remove("am");
		timeBody.classList.add("pm");
		({goalColor, endGoalColor} = setColors("pm"));
		// canStartAnimation = false;
	}
	
	
	if (error === true) {
		console.log("we're throwing an error!");
		/*if we are adding an error the start colors should be set to the A`m`Pm and change into the error colors*/
		if (timeBody.classList.contains("am")) {
			console.log("timebody has am class");
		} else if (timeBody.classList.contains("pm")) {
			console.log("timebody has pm class");
		}
		
		({goalColor, endGoalColor} = setColors("error"));
		
	} else if (error === false) {
		/*if we are getting rid of the error,
		 we need to know what to change into as the error fades away*/
		startColor = errorStartColor;
		endColor = errorEndColor;
		if (timeBody.classList.contains("am")) {
			goalColor = amEndColor;
			endGoalColor = amStartColor;
		} else if (timeBody.classList.contains("pm")) {
			goalColor = pmStartColor;
			endGoalColor = pmEndColor;
		}
	}
	
	function increaseColor() {
		console.log("increaseColor");
		let startFinished = true;
		let endFinished = true;
		
		//these will hold the rgb(#,#,#) value
		let startColorString = "";
		let endColorString = "";

		startColor = startColor.map((x, i) => {
			
			if (x < goalColor[i]) {
				x += 1;
				startFinished = false;
			} else if (x > goalColor[i]) {
				x -= 1;
				startFinished = false;
			}
			
			//if  we are at the end of the array don't add a coma
			startColorString += i < 2 ? `${x}, ` : `${x}`;
			
			return x;
		});
		
		endColor = endColor.map((x, i) => {
			
			if (x < endGoalColor[i]) {
				x += 1;
				endFinished = false;
			} else if (x > endGoalColor[i]) {
				x -= 1;
				endFinished = false;
				
			}
			
			//if  we are at the end of the array don't add a coma
			endColorString += i < 2 ? `${x}, ` : `${x}`;
			
			return x;
		});
		
		
		//TODO will probably need to add more vendor prefixes here
		timeBody.style.background = `-webkit-linear-gradient(top, rgb(${startColorString}) 0%,rgb(${endColorString}) 100%)`;
		timeBody.style.background = `-moz-linear-gradient(top, rgb(${startColorString}) 0%, rgb(${endColorString}) 100%)`;
		
		//if we have to increase the color value these are set to false
		//once the color values are the same we can clear the interval
		if (startFinished && endFinished) {
			clearInterval(colorIntervalTimer);
			colorIntervalTimer = false;
			
			// enableRadioButtons();
		}
	}
	
	
	if (colorIntervalTimer === false) {
		console.log("inside trying to start the interval");
		colorIntervalTimer = setInterval(increaseColor);
	}
	
}
