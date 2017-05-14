how are we going to use the ampm-toggle module?
	It needs to be in charge of moving the toggle back and fourth
	needs to talk to gradients module and send info on what class to change
	needs to set classes on their prespective time inputs
	
	
	
How is the new gradients going to work?
    We have a function getNewColors() which will figure out start and end color based on classlist
    Should it also know the end goal colors? Probably
    This will then send an object with startColor, endColor, startGoalColor, endGoalColor and time-body
        This way the changeColor function only worries about changing colors and not figureing out what colors to use
	
	