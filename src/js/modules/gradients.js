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

//only run the color change interval is this is set to false
let colorIntervalTimer = false;
let canStartAnimation = true;
//The AM or PM radio buttons for both time inputs
let radioButtons = document.querySelectorAll("input[type='radio']");

for (let radio of radioButtons) {
	radio.addEventListener("click", function (event) {
		setTimeClasses(event);
	})
}

function setTimeClasses(event) {
	
	// console.log(canStartAnimation);
	// if(canStartAnimation !== false){
	// 	console.log("can't run returning!");
	// 	return false;
	// }
	
	console.log("setTimeClasses()", canStartAnimation);
	console.log("event.target.id", event.target.id);
	if (canStartAnimation) {
		//when the user clicks on either the AM or PM buttons
		let body, timePeriod;
		
		if (event.target.name === "start-time-frame") {
			body = "start-body";
			if (event.target.id === "start-am") {
				timePeriod = "am";
				document.getElementById('start-pm').disabled = true;
			}
			
			if (event.target.id === "start-pm") {
				timePeriod = "pm";
				document.getElementById('start-am').disabled = true;
			}
		}
		
		if (event.target.name === "end-time-frame") {
			body = "end-body";
			if (event.target.id === "end-am") {
				timePeriod = "am";
				document.getElementById('end-pm').disabled = true;
			}
			
			if (event.target.id === "end-pm") {
				timePeriod = "pm";
				document.getElementById('end-am').disabled = true;
			}
		}
		
		console.log("so we made it to the end");
		console.log("body", body, "timePeriod", timePeriod);
		colorChange(body, timePeriod);
	}
}


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
			goalColor: pmStartColor,
			endGoalColor: pmEndColor,
			startColor: amEndColor,
			endColor: amStartColor
		}
	}
}

export function colorChange(timePeriod, AmPm, error) {
	console.log("colorChange()", timePeriod, error);
	
	let goalColor, endGoalColor;
	let startColor, endColor;
	
	
	let timeBody = document.getElementById(timePeriod);
	
	if (AmPm === "am" && !timeBody.classList.contains('am')) {
		timeBody.classList.remove("pm");
		timeBody.classList.add("am");
		({goalColor, endGoalColor, startColor, endColor} = setColors("am"));
		canStartAnimation = false;
	}
	
	if (AmPm === "pm" && !timeBody.classList.contains('pm')) {
		timeBody.classList.remove("am");
		timeBody.classList.add("pm");
		({goalColor, endGoalColor, startColor, endColor} = setColors("pm"));
		canStartAnimation = false;
	}
	
	
	if (error === true) {
		/*if we are adding an error the start colors should be set to the AmPm and change into the error colors*/
		if (timeBody.classList.contains("am")) {
			console.log("timebody has am class");
			startColor = amEndColor;
			endColor = amStartColor;
		} else if (timeBody.classList.contains("pm")) {
			console.log("timebody has pm class");
			startColor = pmStartColor;
			endColor = pmEndColor;
		}
		
		goalColor = errorStartColor;
		endGoalColor = errorEndColor;
		
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
		
		console.log("increaseColor:", canStartAnimation);
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
			
			radioButtons.forEach(button => {
				document.getElementById(button.id).disabled = false;
			});
			
			canStartAnimation = true;
		}
		
	}
	
	
	if (colorIntervalTimer === false) {
		console.log("inside trying to start the interval");
		colorIntervalTimer = setInterval(increaseColor);
	}
	
}
