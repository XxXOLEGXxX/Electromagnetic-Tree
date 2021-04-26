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
	num: "0.2",
	name: "DOUBLE (almost) EVERYTHING!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2</h3><br>
        - Radiowave Layer is finished.<br>
		- Three challenges were added in.<br>
		- Three more functional version milestones were added in.<br>
		- Two more upgrades were added in.<br>
		- Changed some titles and descriptions (again).<br>
	<h4>v0.1.1</h3>
		- Changed some titles and descriptions to make more sense.<br>
		- Made it so 6th milestone wouldn't appear after achieving 4th.<br>
	<h3>v0.1</h3><br>
		- Mod was created on April 10th with two layers.<br>
		- Garbage mechanic is introduced to make this thing possible.`

let winText = `Congrats for beating TET v0.2... Yep, that's all there is for now. Don't think you can farm versions now jajajajajajajajaja-`

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
	
	let baseSoftcapStrength = new Decimal(1)
	if(inChallenge("rw", 12) || inChallenge("rw", 22)) baseSoftcapStrength = new Decimal(9)
    let base = new Decimal(100).div(player.ou.garbageLevel.mul(10))
	if(hasMilestone("ou", 3)) base = new Decimal(100).div(player.ou.garbageLevel.mul(12.5))
	if(inChallenge("rw", 11)) base = base.div(player.ou.garbageLevel.mul(12.5))
	let gain = new Decimal(player.points.div(base))
	if(hasUpgrade("ou", 14)) gain = gain.mul(2)
	if(hasUpgrade("ou", 15)) gain = gain.mul(player.ou.garbagePoints.add(20).log(20))
	if(hasMilestone("ou", 4)) gain = gain.mul(new Decimal(player.ou.milestones.length).root(3))
	if(hasMilestone("ou", 5)) gain = gain.mul(new Decimal(player.ou.upgrades.length).root(2))
	if(hasMilestone("ou", 6)) gain = gain.mul(new Decimal(player.ou.garbagePoints).root(10))
	if(hasChallenge("rw", 22)) gain = gain.mul(9001)
	if(player.points.gte(2.99792458)) gain = gain.div(player.points.root(new Decimal(21).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(29.9792458)) gain = gain.div(player.points.root(new Decimal(20).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(299.792458)) gain = gain.div(player.points.root(new Decimal(19).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(2997.92458)) gain = gain.div(player.points.root(new Decimal(18).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(29979.2458)) gain = gain.div(player.points.root(new Decimal(17).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(299792.458)) gain = gain.div(player.points.root(new Decimal(16).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(2997924.58)) gain = gain.div(player.points.root(new Decimal(15).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(29979245.8)) gain = gain.div(player.points.root(new Decimal(14).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(299792458)) gain = gain.div(player.points.root(new Decimal(13).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(2997924580)) gain = gain.div(player.points.root(new Decimal(12).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(29979245800)) gain = gain.div(player.points.root(new Decimal(11).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(299792458000)) gain = gain.div(player.points.root(new Decimal(10).sub(1).div(baseSoftcapStrength).add(1)))
	if((inChallenge("rw", 11) || inChallenge("rw", 22)) && player.points.gte(1)) gain = gain.div(player.points.root(new Decimal(2).sub(1).div(baseSoftcapStrength).add(1)))
	if(inChallenge("rw", 12)) gain = gain.mul(3)
	if(player.points.gte(2.99792458) && (!hasChallenge("rw", 11) && !inChallenge("rw", 11))) gain = new Decimal(0)
	if(player.points.gte(2997924580)) gain = new Decimal(0)
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
	return hasMilestone("mw", 0)
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
