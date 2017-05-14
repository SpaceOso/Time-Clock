/**
 * Created by Rico on 4/26/2017.
 */

//these are the rgb values from the design file
// const amEndColor = [255, 219, 151];
const amEndColor = [252, 0, 68];
// const amStartColor = [252, 0, 68];
const amStartColor = [255, 219, 151];
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
	
	if (colorFormat === "default") {
		return {
			goalColor: pmStartColor,
			endGoalColor: pmEndColor,
			startColor: standardStartColor,
			endColor: standardEndColor
		}
	}
}

export function removeError(timeInput){
	console.log("removeError():", timeInput);
	let colorInfo = {};
	
	let goalColor, endGoalColor;
	let startColor, endColor;
	
	let timeBody = document.getElementById(timeInput);
	
	let amOrPm = timeBody.classList.contains("pm") ? "pm" : "am";
	
	({goalColor, endGoalColor} = setColors(amOrPm));
	
	({startColor, endColor} = setColors("error"));
	
	colorInfo.goalColor = goalColor;
	colorInfo.endGoalColor = endGoalColor;
	colorInfo.startColor = startColor;
	colorInfo.endColor = endColor;
	
	console.log(JSON.stringify(colorInfo));
	colorChange(timeInput, colorInfo);

}

export function addError(timeInput) {
	
	let colorInfo = {};
	
	let goalColor, endGoalColor;
	let startColor, endColor;
	
	let timeBody = document.getElementById(timeInput);
	
	({goalColor, endGoalColor} = setColors("error"));
	colorInfo.goalColor = goalColor;
	colorInfo.endGoalColor = endGoalColor;
	
	/*if we are getting rid of the error,
	 we need to know what to change into as the error fades away*/
	//TODO only run this code if it previously had an error
	// startColor = errorStartColor;
	// endColor = errorEndColor;
	if (timeBody.classList.contains("am")) {
		startColor = amEndColor;
		endColor = amStartColor;
	} else if (timeBody.classList.contains("pm")) {
		startColor = pmStartColor;
		endColor = pmEndColor;
	}
	
	colorInfo.startColor = startColor;
	colorInfo.endColor = endColor;
	
	colorChange(timeInput, colorInfo);
	
}

export function animateGradient(timeInput, amPm) {
	
	let goalColor, endGoalColor;
	let startColor, endColor;
	
	let wasThereAnError = false;
	
	let timeBody = document.getElementById(timeInput);
	
	let colorInfo = {};
	
	//we want the opposite since we are going to switch to that
	if (timeBody.classList.contains("am")) {
		({startColor, endColor} = setColors("pm"));
	} else if (timeBody.classList.contains("pm")) {
		({startColor, endColor} = setColors("am"));
	}
	
	colorInfo.startColor = startColor;
	colorInfo.endColor = endColor;
	
	if (amPm === "am") {
		// if(timeBody.classList.contains("am")){
		// 	return false;
		// }
		timeBody.classList.remove("pm");
		timeBody.classList.add("am");
		({goalColor, endGoalColor} = setColors("am"));
		// canStartAnimation = false;
	}
	
	if (amPm === "pm") {
		// if(timeBody.classList.contains("pm")){
		// 	return false;
		// }
		timeBody.classList.remove("am");
		timeBody.classList.add("pm");
		({goalColor, endGoalColor} = setColors("pm"));
		// canStartAnimation = false;
	}
	
	colorInfo.goalColor = goalColor;
	colorInfo.endGoalColor = endGoalColor;
	
	colorChange(timeInput, colorInfo);
	
}

function colorChange(timeInput, colorInfo) {
	
	let goalColor, endGoalColor;
	let startColor, endColor;
	
	let wasThereAnError = false;
	
	let timeBody = document.getElementById(timeInput);
	
	({startColor, endColor, goalColor, endGoalColor} = colorInfo);
	
	
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
		}
	}
	
	
	if (colorIntervalTimer === false) {
		console.log("inside trying to start the interval");
		colorIntervalTimer = setInterval(increaseColor);
	}
	
}
