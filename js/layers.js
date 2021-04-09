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
    }},
	tabFormat: [["display-text",
				function() {return "Welcome to the Observable Universe"},
				{"color": "white", "font-size": "32px", "text-shadow": "0 0 16px var(--points)"}],
				"blank", "blank", "blank", ["upgrade", 11], "blank", ["bar", "bigBar"], "blank",
				["display-text",
				function() {return hasUpgrade("ou", 11) ? "Current amount of garbages: "+format(player.ou.garbagePoints)+"<br/>Current version: "+formatWhole(player.ou.garbageLevel)+"<br/>Amount of garbages required for the next update: "+format(player.ou.garbageRequirement) : ""},
				{"color": "white", "font-size": "16px"}], "blank", "buyables", "blank", ["row", ["column", ["upgrade", 12], ["upgrade", 13]]], "blank", "milestones"],
	update(diff){
		let garbageGain = new Decimal(diff)
		if(hasUpgrade("ou", 12)) garbageGain = garbageGain.mul(player.ou.garbagePoints.add(10).log(10))
		if(hasUpgrade("ou", 13)) garbageGain = garbageGain.mul(3)
		if(hasUpgrade("ou", 11)) player.ou.garbagePoints = player.ou.garbagePoints.add(garbageGain)
		if(player.ou.garbagePoints.gte(player.ou.garbageRequirement)) {player.ou.garbagePoints = player.ou.garbagePoints.sub(player.ou.garbageRequirement)
																	   player.ou.garbageLevel = player.ou.garbageLevel.add(0.1)
																	   player.ou.garbageRequirement = player.ou.garbageRequirement.mul(3).pow(1.1)}
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
			fullDisplay: `<h3>Hertz Generator</h3><br>
						 Produces hertz and, therefore, shrinks down wavelength<br><br>
						<h4>Requirement: 8.80e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points)<=8.81e+26},
			onPurchase() {return player.ou.garbageLevel = new Decimal(0.1)}
		},
		12: {
			fullDisplay: `<h3>Cosmic Garbage</h3><br>
						 Garbage boosts garbage generator's gain<br>
						 [Hertz Reset]<br><br>
						<h4>Requirement: 6.50e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points)<=6.5e+26},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 1)}
		},
		13: {
			fullDisplay: `<h3>Better Garbage Generator</h3><br>
						 Garbage generator generates thrice as much<br>
						 [Hertz Reset]<br><br>
						<h4>Requirement: 1.75e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points)<=1.75e+26},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 4)}
		},
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
			requirementDescription: "Version v0.1",
			effectDescription: "Obtain Hertz Generator, duh.<br/>Reward: Garbage generator and manual garbage collecting",
			done() { return player.ou.garbageLevel.gte(0.1) },
			unlocked() {return hasUpgrade("ou", 11)}
		},
		1: {
			requirementDescription: "Version v0.2",
			effectDescription: "Reach v0.2.<br/>Reward: Unlocks one upgrade",
			done() { return player.ou.garbageLevel.gte(0.2) },
			unlocked() {return hasUpgrade("ou", 11)}
		},
		2: {
			requirementDescription: "Version v0.3",
			effectDescription: "Reach v0.3.<br/>Reward: 2x Manual garbage collecting power",
			done() { return player.ou.garbageLevel.gte(0.3) },
			unlocked() {return hasMilestone("ou", 1)}
		},
		3: {
			requirementDescription: "Version v0.4",
			effectDescription: "Reach v0.4.<br/>Reward: Hertz Generator's formula is a slightly better",
			done() { return player.ou.garbageLevel.gte(0.4) },
			unlocked() {return hasMilestone("ou", 2)}
		},
		4: {
			requirementDescription: "Version v0.5",
			effectDescription() {return "Reach v0.5.<br/>Reward: Unlocks one more upgrade and Hertz Generator works better based on versions achieved so far.<br/>Currently: x"+format(new Decimal(player.ou.milestones.length).root(3))},
			done() { return player.ou.garbageLevel.gte(0.5) },
			unlocked() {return hasMilestone("ou", 3)}
		},
		5: {
			requirementDescription: "Version v0.6",
			effectDescription: "Reach v0.6.<br/>Reward: Current Endgame",
			done() { return player.ou.garbageLevel.gte(0.6) },
			unlocked() {return hasMilestone("ou", 3)}
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
			content: [["display-text", function() {return player.points.gte(2.99792458) && !hasChallenge("rw", 11) ? "EXTREMELY Low Frequency (ELF) hardcap: 2.99 hertz" : player.points.gte(2.99792458) ? "Extremely Low Frequency (ELF) softcap: 2.99 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29.9792458) ? "Super Low Frequency (SLF) softcap: 29.97 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299.792458) ? "Ultra Low Frequency (ULF) softcap: 299.79 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(2997.92458) ? "Very Low Frequency (VLF) softcap: 2,997.92 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29979.2458) ? "Low Frequency (LF) softcap: 29,979.24 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299792.458) ? "Medium Frequency (MF) softcap: 299,792.45 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(2997924.58) ? "High Frequency (HF) softcap: 2,997,924.58 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29979245.8) ? "Very High Frequency (VHF) softcap: 29,979,245.8 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299792458) ? "Ultra High Frequency (UHF) softcap: 299,792,458 hertz" : ""}]]
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
			done() { return player.points.gte(2.99792458) },
			unlocked() {return false}
		}
	},
	challenges: {
		rows: 1,
		cols: 1,
		11: {
			name: "Enter The Spectrum",
			challengeDescription: "γ softcap is triggers at 1 hertz, but HG version's boost exponented by 2",
			rewardDescription: "ELF's hardcap is softcapped",
			currencyDisplayName: "hertz",
			goal: new Decimal(100),
		},
	},
    layerShown(){return hasMilestone("rw", 0)},
	tooltip: "Radiowaves"
})
