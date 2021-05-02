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
	num: "0.3.0.1",
	name: "\"Fuck it, I'm pushing the update NOW.\"",
}

let changelog = `<h1>Changelog:</h1><br>
	<h5>v0.3.0.1<h5>
		- Now it says "garbagewave" instead of "microwave" where it's supposed to be<br>
	<h3>v0.3</h3><br>
		- Microwave Layer is finished<br>
		- Infrared Layer (not finished yet) was added because I can and why not<br>
		- Added two side layers - 1 prestige layer and 1 """optinal""" layer<br>
		- Added every single SI prefixes below meter<br>
		- Four more version milestones were added in<br>
		- Three more challenges were added in<br>
		- A single clickable was added in<br>
		- Changed maxTickLength() from 3600 to 0.2 to fix some bugs<br>
		- Changed descriptions and etc. You name it<br>
		- Garbage generator now has uppercases (nice)<br>
		- And last, but not least... One more upgrade was added in<br>
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
		- Garbage mechanic is introduced to make this thing possible.<br><br>
		Fun fact: Did you know that v0.3 update added 35,000 symbols in both layers.js and mod.js (+19,453/+5,253) (no, this isn't Shenanigans Tree reference), which makes it two times heavier than v0.2. Pretty cool, huh?`

let winText = `Well done, you bastards. You've beaten The Electromagnetic Tree v0.3.0.1... Good luck getting up to near-infrared radiation softcap without any new content lmao`

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
	if(inChallenge("mw", 12)) baseSoftcapStrength = new Decimal(3.1415926535897932384626433832795)
    let base = new Decimal(100).div(player.ou.garbageLevel.add(layers.s.effect()).mul(10))
	if(hasMilestone("ou", 10)) base = new Decimal(100).div(player.ou.garbageLevel.add(layers.s.effect()).mul(15))
	else if(hasMilestone("ou", 3)) base = new Decimal(100).div(player.ou.garbageLevel.add(layers.s.effect()).mul(12.5))
	if(inChallenge("rw", 11) && hasMilestone("ou", 10)) base = base.div(player.ou.garbageLevel.add(layers.s.effect()).mul(15))
	else if(inChallenge("rw", 11) && hasMilestone("ou", 3)) base = base.div(player.ou.garbageLevel.add(layers.s.effect()).mul(12.5))
	else if(inChallenge("rw", 11)) base = base.div(player.ou.garbageLevel.add(layers.s.effect()).mul(10))
	let gain = new Decimal(player.points.div(base))
	if(hasUpgrade("ou", 14)) gain = gain.mul(2)
	if(hasUpgrade("ou", 15)) gain = gain.mul(player.ou.garbagePoints.add(20).log(20))
	if(hasMilestone("ou", 4)) gain = gain.mul(new Decimal(player.ou.milestones.length).root(3))
	if(hasMilestone("ou", 5)) gain = gain.mul(new Decimal(player.ou.upgrades.length).root(2))
	if(hasMilestone("ou", 6) && inChallenge("mw", 12)) gain = gain.mul(new Decimal(player.ou.garbagePoints).root(10).div(3.1415926535897932384626433832795))
	else if(hasMilestone("ou", 6)) gain = gain.mul(new Decimal(player.ou.garbagePoints).root(10))
	if(hasMilestone("ou", 9) && player.s.points.gte(1)) gain = gain.mul(allChallenges().root(4))
	if(hasMilestone("ou", 11)) gain = gain.mul(player.m.buyables[11].add(player.m.buyables[12].mag).div(100).add(1))
	if(hasChallenge("rw", 22)) gain = gain.mul(9001)
	if(hasChallenge("mw", 11)) gain = gain.mul(player.ou.garbagePoints.add(1).root(42))
	if(player.m.unlocked == true) gain = gain.add(gain.mul(layers.m.effect().div(100)))
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
	if(player.points.gte(19986163866666.666666666666666667)) gain = gain.div(player.points.root(new Decimal(9).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(36974403153333.333333333333333333)) gain = gain.div(player.points.root(new Decimal(8).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(99930819333333.333333333333333335)) gain = gain.div(player.points.root(new Decimal(7.2).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(99930819333333.333333333333333335)) gain = gain.div(player.points.root(new Decimal(6.2).sub(1).div(baseSoftcapStrength).add(1)))
	if(player.points.gte(213851953373333.33333333333333334) && (!hasChallenge("rw", 11) && !inChallenge("rw", 11))) gain = new Decimal(0)
	if((inChallenge("rw", 11) || inChallenge("rw", 22)) && player.points.gte(1)) gain = gain.div(player.points.root(new Decimal(2).sub(1).div(baseSoftcapStrength).add(1)))
	if(inChallenge("rw", 12)) gain = gain.mul(3)
	if(inChallenge("mw", 11)) gain = gain.root(3)
	if(inChallenge("mw", 12)) gain = gain.div(new Decimal(3.1415926535897932384626433832795).pow(3.1415926535897932384626433832795))
	if(player.points.gte(299792458000000000000000000000000000000000) || player.ou.clickables[11] == "on" || (!hasChallenge("rw", 11) && !inChallenge("rw", 11) && player.points.gte(2.99792458))) gain = new Decimal(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {if(player.points.lte(299792458)) return "Current wavelength: "+format(new Decimal(299792458).div(player.points))+"m"
	            else if(player.points.lte(2997924580)) return "Current wavelength: "+format(new Decimal(2997924580).div(player.points))+"dm"
				else if(player.points.lte(29979245800)) return "Current wavelength: "+format(new Decimal(29979245800).div(player.points))+"cm"
				else if(player.points.lte(299792458000)) return "Current wavelength: "+format(new Decimal(299792458000).div(player.points))+"mm"
				else if(player.points.lte(299792458000000)) return "Current wavelength: "+format(new Decimal(299792458000000).div(player.points))+"μm"
				else if(player.points.lte(299792458000000000)) return "Current wavelength: "+format(new Decimal(299792458000000000).div(player.points))+"nm"
				else if(player.points.lte(299792458000000000000)) return "Current wavelength: "+format(new Decimal(299792458000000000000).div(player.points))+"pm"
				else if(player.points.lte(299792458000000000000000)) return "Current wavelength: "+format(new Decimal(299792458000000000000000).div(player.points))+"fm"
				else if(player.points.lte(299792458000000000000000000)) return "Current wavelength: "+format(new Decimal(299792458000000000000000000).div(player.points))+"am"
				else if(player.points.lte(299792458000000000000000000000)) return "Current wavelength: "+format(new Decimal(299792458000000000000000000000).div(player.points))+"zm"
				else if(player.points.lte(29979245800000000000000000000000000)) return "Current wavelength: "+format(new Decimal(299792458000000000000000000000000).div(player.points))+"ym"}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points == new Decimal(360000000000) && player.s.points.gte(2)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(0.2) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function allChallenges() {
	return new Decimal(player.rw.challenges[11] + player.rw.challenges[12] + player.rw.challenges[21] + player.rw.challenges[22] + player.rw.challenges[31] + player.mw.challenges[11] + player.mw.challenges[12])
}

function infraredTracker() {
	let funny = player.points.gte(213851953373333.33333333333333334) ? new Decimal(5) : player.points.gte(99930819333333.333333333333333335) ? new Decimal(4) : player.points.gte(36974403153333.333333333333333333) ? new Decimal(3) : player.points.gte(19986163866666.666666666666666667) ? new Decimal(2) : player.points.gte(299792458000) ? new Decimal(1) : new Decimal(0)
	if(hasUpgrade("i", 11)) return new Decimal(funny.mul(1.93).add(1).toFixed(1))
	else return new Decimal(1)
}
