addLayer("ou", {
    name: "Observe", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OU", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		garbagePoints: new Decimal(0),
		garbageLevel: new Decimal(0),
		garbageRequirement: new Decimal(10),
		yeeter: new Decimal(6.66),
		bigBrain: new Decimal(0),
    }},
	tabFormat: [["display-text",
				function() {return "Welcome to the Observable Universe"},
				{"color": "white", "font-size": "32px", "text-shadow": "0 0 16px var(--points)"}],
				"blank", "blank", "blank", ["upgrade", 11], "blank", ["bar", "bigBar"], "blank",
				["display-text",
				function() {return hasUpgrade("ou", 11) ? "Current amount of garbages: "+format(player.ou.garbagePoints)+"<br/>Current version: "+format(player.ou.garbageLevel)+"<br/>Amount of garbages required for the next update: "+format(player.ou.garbageRequirement) : ""},
				{"color": "white", "font-size": "16px"}], "blank", "buyables", "blank", ["row", ["column", ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]], "blank", "milestones"],
	update(diff){
		let garbageGain = new Decimal(diff)
		if(hasUpgrade("ou", 12)) garbageGain = garbageGain.mul(player.ou.garbagePoints.add(10).log(10))
		if(hasUpgrade("ou", 13)) garbageGain = garbageGain.mul(3)
		if(hasChallenge("rw",12)) garbageGain = garbageGain.mul(new Decimal(1).add(player.ou.garbageLevel.mul(2)).pow(new Decimal(1).add(player.ou.garbageLevel)))
		if(hasChallenge("rw",21)) garbageGain = garbageGain.mul(50)
		if(hasMilestone("ou",6)) garbageGain = garbageGain.mul(2)
		if(hasMilestone("ou",7)) garbageGain = garbageGain.mul(4)
		if(hasUpgrade("ou", 11)) player.ou.garbagePoints = player.ou.garbagePoints.add(garbageGain)
		if(player.ou.garbagePoints.gte(player.ou.garbageRequirement))    {if(player.ou.garbageLevel.eq(0.6)&&!hasChallenge("rw",21)||player.ou.garbageLevel.eq(0.8)) {
																			 player.ou.garbagePoints = player.ou.garbageRequirement}
			                                                           else {player.ou.garbagePoints = player.ou.garbagePoints.sub(player.ou.garbageRequirement)
																		     player.ou.garbageLevel = player.ou.garbageLevel.add(0.1).mul(10).round().div(10)
																			 player.ou.garbageRequirement = player.ou.garbageRequirement.mul(3).pow(1.1)}}
		if(inChallenge("rw",21) || inChallenge("rw", 22)) player.points = player.points.sub(player.points.mul(new Decimal(diff*500/100).div(player.ou.garbagePoints.add(10).log(10))))
		if(!inChallenge("rw",22)) player.ou.yeeter = new Decimal(6.66)
		if(inChallenge("rw",22)) {player.ou.yeeter = player.ou.yeeter.add(diff)
								  if(player.ou.yeeter.gte(6.66)){player.ou.garbagePoints = player.ou.garbagePoints.root(2)
		                          if(player.points.lt(1)) {player.ou.bigBrain = player.points
									                       player.points.div(player.ou.bigBrain.pow(2)).root(2).mul(player.ou.bigBrain.pow(2))}
							      else player.points = player.points.root(2)
							      player.ou.yeeter = new Decimal(0)}}
	},
    color: "#1F1F1F",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
	upgrades:{
		rows: 1,
		cols: 5,
		11: {
			fullDisplay: `<h3>Wavelength Shrinker</h3><br>
						 Shrinks wavelength and, therefore, increases hertz<br><br>
						<h4>Requirement: 8.80e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(8.81e+26)},
			onPurchase() {return player.ou.garbageLevel = new Decimal(0.1)}
		},
		12: {
			fullDisplay: `<h3>Cosmic Garbage</h3><br>
						 Garbage boosts garbage generator's gain<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 6.50e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(6.5e+26)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 1)}
		},
		13: {
			fullDisplay: `<h3>Better Garbage Generator</h3><br>
						 Garbage generator generates thrice as much<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 1.75e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(1.75e+26)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 4)}
		},
		14: {
			fullDisplay: `<h3>Hertz Booster</h3><br>
						 Wavelength Shirnker works twice as much<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 1.38e17m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(1.38e+17)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasChallenge("rw", 11)}
		},
		15: {
			fullDisplay: `<h3>Wave Garbage</h3><br>
						 "Cosmic Garbage" affects Wavelength Shrinker at reduced rate<br><br>
						<h4>Cost: 10,000 garbages<br>`,
			canAfford() {return player.ou.garbagePoints.gte(10000)},
			onPurchase() {return player.ou.garbagePoints = player.ou.garbagePoints.sub(10000)},
			unlocked() {return hasChallenge("rw", 12)}
		}
	},
	bars: {
		bigBar: {
			direction: RIGHT,
			width: 200,
			height: 50,
			progress() {return player.ou.garbagePoints.div(player.ou.garbageRequirement)},
			unlocked() {return hasUpgrade("ou", 11)}
		},
	},
	milestones: {
		0: {
			requirementDescription: "Version 0.1",
			effectDescription: "Obtain Wavelength Shrinker, duh.<br/>Reward: Garbage generator and manual garbage collecting",
			done() { return player.ou.garbageLevel.gte(0.1) },
			unlocked() {return hasUpgrade("ou", 11)}
		},
		1: {
			requirementDescription: "Version 0.2",
			effectDescription: "Reach v0.2<br/>Reward: Unlocks one upgrade",
			done() { return player.ou.garbageLevel.gte(0.2) },
			unlocked() {return hasUpgrade("ou", 11)}
		},
		2: {
			requirementDescription: "Version 0.3",
			effectDescription: "Reach v0.3<br/>Reward: 2x Manual garbage collecting power",
			done() { return player.ou.garbageLevel.gte(0.3) },
			unlocked() {return hasMilestone("ou", 1)}
		},
		3: {
			requirementDescription: "Version 0.4",
			effectDescription: "Reach v0.4<br/>Reward: Wavelength Shrinker's formula is slightly better",
			done() { return player.ou.garbageLevel.gte(0.4) },
			unlocked() {return hasMilestone("ou", 2)}
		},
		4: {
			requirementDescription: "Version 0.5",
			effectDescription() {return "Reach v0.5<br/>Reward: Unlocks one more upgrade and Wavelength Shrinker works better based on versions achieved so far<br/>Currently: x"+format(new Decimal(player.ou.milestones.length).root(3))},
			done() { return player.ou.garbageLevel.gte(0.5) },
			unlocked() {return hasMilestone("ou", 3)}
		},
		5: {
			requirementDescription: "Version 0.6",
			effectDescription() {return "Reach v0.6<br/>Reward: Wavelength Shrinker works better based on bought upgrades<br/>Currently: x"+format(new Decimal(player.ou.upgrades.length).root(2))},
			done() { return player.ou.garbageLevel.gte(0.6) },
			unlocked() {return hasMilestone("ou", 4)}
		},
		6: {
			requirementDescription: "Version 0.7",
			effectDescription() {return "Reach v0.7 and complete 3rd Radio-Challenge <br/>Reward: Super garbage generator goes into second super form cuz why not (2x garbage gain increase) and Wavelength Shrinker works better based on amount of garbages you currently have<br/>Currently: x"+format(new Decimal(player.ou.garbagePoints).root(10))},
			done() { return player.ou.garbageLevel.gte(0.7) && hasChallenge("rw", 21) },
			unlocked() {return hasMilestone("ou", 5)}
		},
		7: {
			requirementDescription: "Version 0.8",
			effectDescription() {return "Reach v0.8<br/>Reward: Super garbage generator 2 goes into third super form (4x garbage gain increase)"},
			done() { return player.ou.garbageLevel.gte(0.8) },
			unlocked() {return hasMilestone("ou", 6)}
		},
	},
	buyables: {
		rows: 1,
		cols: 1,
		11: {
			display() { return "Collect some garbage" },
			canAfford() { return true },
			buy() {
				let base = new Decimal(1)
				if(player.ou.garbageLevel.gte(0.3)) base = new Decimal(2)
				player.ou.garbagePoints = player.ou.garbagePoints.add(base)
			},
			unlocked() {return hasUpgrade("ou", 11)},
			style() { return {
				"height": "83px",
				"width": "292px",
				"font-size": "20px"
			}}
		},
	},
    layerShown(){return true},
	tooltip: "Observable Universe"
})

addLayer("rw", {
    name: "radio lmao", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RW", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	milestonePopups: false,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	tabFormat: {
		"Radiocaps": {
			content: [["display-text", function() {return player.points.gte(2.99792458) && !hasChallenge("rw", 11) && !inChallenge("rw", 11) ? "EXTREMELY Low Frequency (ELF) hardcap: 2.99 hertz" : player.points.gte(2.99792458) ? "Extremely Low Frequency (ELF) softcap: 2.99 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29.9792458) ? "Super Low Frequency (SLF) softcap: 29.97 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299.792458) ? "Ultra Low Frequency (ULF) softcap: 299.79 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(2997.92458) ? "Very Low Frequency (VLF) softcap: 2,997.92 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29979.2458) ? "Low Frequency (LF) softcap: 29,979.24 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299792,458) ? "Medium Frequency (MF) softcap: 299,792.45 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(2997924.58) ? "High Frequency (HF) softcap: 2,997,924.58 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29979245.8) ? "Very High Frequency (VHF) softcap: 29,979,245.8 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299792458) ? "Ultra High Frequency (UHF) softcap: 299,792,458 hertz" : ""}]]
		},
		"Challenges": {
			content: [["display-text", function() {return !hasMilestone("rw", 1) ? "Next challenge unlocks at 10,000m" : !hasMilestone("rw", 2) ? "Next challenge unlocks at 750m" : !hasMilestone("rw", 3) ? "Next challenge unlocks at 50m" : ""}],
					  "challenges"],
		},
	},
    color: "#1F1F1F",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	milestones: {
		0: {
			done() { return player.points.gte(2.99792458) },
			unlocked() {return false}
		},
		1: {
			done() { return player.points.gte(29979.2458) },
			unlocked() {return false}
		},
		2: {
			done() { return player.points.gte(399723.277) },
			unlocked() {return false}
		},
		3: {
			done() { return player.points.gte(5995849.16) },
			unlocked() {return false}
		}
	},
	challenges: {
		rows: 2,
		cols: 2,
		11: {
			name: "Enter The Spectrum",
			challengeDescription: "γ softcap is triggers at 1 hertz, but WS version's boosts are exponented by 2",
			rewardDescription: "ELF's hardcap is softcapped and unlocks one more upgrade",
			currencyDisplayName: "hertz",
			goal: new Decimal(100),
		},
		12: {
			name: "T i m e . . .",
			challengeDescription: "Wavelength Shrinker goes thrice as fast, but softcaps are nine times stronger",
			rewardDescription() {return "Wavelength Shrinker's versions boosts garbage generator's production and unlocks one more upgrade<br/>Currently: x("+format(new Decimal(1).add(player.ou.garbageLevel.mul(2)))+"^"+format(new Decimal(1).add(player.ou.garbageLevel))+")"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 1)},
			goal: new Decimal(360),
		},
		21: {
			name() {return hasChallenge("rw", 21) ? "Mega Garbodor is<br/>real" : "Mega Garbodor is<br/>a lie...?"},
			challengeDescription() {return "Wavelength gets "+format(new Decimal(500).div(player.ou.garbagePoints.add(10).log(10)))+"% longer per second based on how little garbage you have"},
			rewardDescription() {return "Garbage generator goes into it's super form (50x garbage gain increase)"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 2)},
			goal: new Decimal(30),
		},
		22: {
			name: "YES<br/>This. Is. Antimatter. Dimensions. Reference.",
			challengeDescription() {return "All 3 challenges are applied at once, but all buffs within the challenges are nullified both hertz and garbage points are root squared and then again every 6.66 seconds"},
			rewardDescription() {return "WAVELENGTH SHRINKER GETS OVER 9000 TIMES BETTER!!!!!1111ELEVEN1"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 3)},
			goal: new Decimal(7.8),
		},
	},
    layerShown(){return hasMilestone("rw", 0)},
	tooltip: "Radiowaves"
})

addLayer("mw", {
    name: "microsoft", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MW", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	milestonePopups: false,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	tabFormat: {
		"Microcaps": {
			content: [["display-text", function() {return player.points.gte(2997924580) ? "No U Frequency (NUF) hardcap: 2.99e9 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29979245800) ? "Extremely High Frequency (EHF) softcap: 2.99e10 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299792458000) ? "Tremendously High Frequency (THF) softcap: 2.99e11 hertz" : ""}],
						]
		},
		"Challenges": {
			content: ["challenges"],
		},
	},
    color: "#1F1F1F",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
	milestones: {
		0: {
			done() { return player.points.gte(2997924580) },
			unlocked() {return false}
		}
	},
    layerShown(){return hasMilestone("mw", 0)},
	tooltip: "Microwaves"
})

