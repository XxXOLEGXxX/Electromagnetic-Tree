let modInfo = {
	name: "The Electromagnetic Tree",
	id: "electromagnetism",
	author: "Holy Broly#0530",
	pointsName: "hertz",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (3.4067324772727272727272727272727e-19), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Literally nothing, kinda",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Mod was created on April 10th with two layers.<br>
		- Garbage mechanic is introduced to make this thing possible.`

let winText = `Congrats for beating TET v0.1... Yep, that's all there is for now.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	if(hasUpgrade("ou", 11)) return true
	else return false
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

    let base = new Decimal(100).div(player.ou.garbageLevel.mul(10))
	if(hasMilestone("ou", 3)) base = new Decimal(100).div(player.ou.garbageLevel.mul(12.5))
	if(inChallenge("rw", 11)) base = base.div(player.ou.garbageLevel.mul(12.5))
	let gain = new Decimal(player.points.div(base))
	if(hasMilestone("ou", 4)) gain = gain.mul(new Decimal(player.ou.milestones.length).root(3))
	if(player.points.gte(2.99792458)) gain = gain.div(player.points.root(21))
	if(player.points.gte(29.9792458)) gain = gain.div(player.points.root(20))
	if(player.points.gte(299.792458)) gain = gain.div(player.points.root(19))
	if(player.points.gte(2997.92458)) gain = gain.div(player.points.root(18))
	if(player.points.gte(29979.2458)) gain = gain.div(player.points.root(17))
	if(player.points.gte(299792.458)) gain = gain.div(player.points.root(16))
	if(player.points.gte(2997924.58)) gain = gain.div(player.points.root(15))
	if(player.points.gte(29979245.8)) gain = gain.div(player.points.root(14))
	if(player.points.gte(299792458)) gain = gain.div(player.points.root(13))
	if(inChallenge("rw", 11) && player.points.gte(1)) gain = gain.div(player.points.root(2))
	if(player.points.gte(2.99792458) && (!hasChallenge("rw", 11) && !inChallenge("rw", 11))) gain = new Decimal(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return "Current wavelength: "+format(new Decimal(299792458).div(player.points))+"m"}
]

// Determines when the game "ends"
function isEndgame() {
	return hasMilestone("ou", 5)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}