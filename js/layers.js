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
		display1: new Decimal(0),
		display2: new Decimal(0),
		clickables: {[11]: "off"},
		funnyTimer: new Decimal(0),
    }},
	tabFormat: [["display-text",
				function() {return "Welcome to the Observable Universe"},
				{"color": "white", "font-size": "32px", "text-shadow": "0 0 16px var(--points)"}],
				"blank", "blank", "blank", ["upgrade", 11], "blank", ["bar", "bigBar"], "blank",
				["display-text",
				function() {return hasUpgrade("ou", 11) && player.s.points.gte(1) ? "Current amount of garbages: "+format(player.ou.garbagePoints)+"<br/>Current version: "+format(player.ou.garbageLevel)+"(+"+format(layers.s.effect())+")<br/>Amount of garbages required for the next update: "+format(player.ou.garbageRequirement) : hasUpgrade("ou", 11) ? "Current amount of garbages: "+format(player.ou.garbagePoints)+"<br/>Current version: "+format(player.ou.garbageLevel)+"<br/>Amount of garbages required for the next update: "+format(player.ou.garbageRequirement) : ""},
				{"color": "white", "font-size": "16px"}],
				["display-text",
				function() {return (player.s.points.gte(1) || player.m.points.gt(0)) && hasUpgrade("ou", 11) ? "Total boost from the Outside to WS's effeciency: +"+format(getWSEffeciency())+"%" : ""},
				{"color": "white", "font-size": "16px"}],
				["display-text",
				function() {return (player.s.points.gte(2) || player.m.gps.gt(0)) && hasUpgrade("ou", 11) ? "Total boost from the Outside to GG's effeciency: +"+format(player.m.garbageWaves.mul(100).root(2))+"%" : ""},
				{"color": "white", "font-size": "16px"}], "blank", "buyables", "blank", ["row", ["column", ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15]]], "blank", ["clickable", 11], "blank", "milestones"],
	update(diff){
		let garbageGain = new Decimal(diff)
		player.ou.display1 = new Decimal(diff)
		player.ou.display2 = new Decimal(diff)
		if(hasMilestone("s", 2) && hasUpgrade("ou", 12)) garbageGain = garbageGain.mul(player.ou.garbagePoints.add(10).log(10).pow(2))
		else if(hasUpgrade("ou", 12)) garbageGain = garbageGain.mul(player.ou.garbagePoints.add(10).log(10))
		if(hasUpgrade("ou", 13) && hasMilestone("ou", 13) && hasMilestone("s", 2)) garbageGain = garbageGain.mul(729)
		else if(hasUpgrade("ou", 13) && hasMilestone("ou", 13)) garbageGain = garbageGain.mul(27)
		else if(hasUpgrade("ou", 13) && hasMilestone("s", 2)) garbageGain = garbageGain.mul(9)
		else if(hasUpgrade("ou", 13)) garbageGain = garbageGain.mul(3)
		if(hasChallenge("rw",12)) garbageGain = garbageGain.mul(new Decimal(1).add(player.ou.garbageLevel.add(layers.s.effect()).mul(2)).pow(new Decimal(1).add(player.ou.garbageLevel.add(layers.s.effect()))))
		if(hasChallenge("rw",21)) garbageGain = garbageGain.mul(50)
		if(hasMilestone("ou",6)) garbageGain = garbageGain.mul(2)
		if(hasMilestone("ou", 6) && inChallenge("mw", 12) && hasChallenge("i", 11)) garbageGain = garbageGain.mul(new Decimal(player.ou.garbagePoints).root(10).div(3.1415926535897932384626433832795))
		else if(hasMilestone("ou", 6) && hasChallenge("i", 11)) garbageGain = garbageGain.mul(new Decimal(player.ou.garbagePoints).root(10))
		if(hasMilestone("ou",7)) garbageGain = garbageGain.mul(4)
		if(hasMilestone("ou",8)) garbageGain = garbageGain.mul(10)
		if(player.ou.clickables[11] == "on") { garbageGain = garbageGain.mul(player.ou.garbageLevel.add(layers.s.effect()).add(1))
		if(hasMilestone("ou", 10)) garbageGain = garbageGain.mul(player.ou.garbageLevel.add(layers.s.effect()).mul(1.5).add(1))
		else if(hasMilestone("ou", 3)) garbageGain = garbageGain.mul(player.ou.garbageLevel.add(layers.s.effect()).mul(1.25).add(1))
		if(inChallenge("rw", 11) && hasMilestone("ou", 10)) garbageGain = garbageGain.mul(player.ou.garbageLevel.add(layers.s.effect()).mul(1.5).add(1))
		else if(inChallenge("rw", 11) && hasMilestone("ou", 3)) garbageGain = garbageGain.mul(player.ou.garbageLevel.add(layers.s.effect()).mul(1.25).add(1))
		if(hasMilestone("ou", 11)) garbageGain = garbageGain.mul(player.m.buyables[11].add(player.m.buyables[12].mag).div(100).add(1))
		else if(inChallenge("rw", 11)) garbageGain = garbageGain.mul(player.ou.garbageLevel.add(layers.s.effect()).add(1))}
		if(hasMilestone("ou", 12)) garbageGain = garbageGain.pow(1.01)
		if(hasUpgrade("i", 22)) garbageGain = garbageGain.mul(infraredTracker().mag)
		if(hasChallenge("mw", 11)) garbageGain = garbageGain.mul(player.points.add(1).root(21))
		if(hasChallenge("mw", 12)) garbageGain = garbageGain.mul(new Decimal(3.1415926535897932384626433832795).pow(3.1415926535897932384626433832795))
		if(player.m.unlocked == true) garbageGain = garbageGain.add(garbageGain.mul(layers.m.effect2().div(100)))
		if(inChallenge("mw", 12)) garbageGain = garbageGain.div(3.1415926535897932384626433832795)
		if(hasUpgrade("ou", 11)) player.ou.garbagePoints = player.ou.garbagePoints.add(garbageGain)
		if(player.ou.garbagePoints.gte(player.ou.garbageRequirement))    {if((player.ou.garbageLevel.eq(0.6)&&!hasChallenge("rw",21))) {
																			 player.ou.garbagePoints = player.ou.garbageRequirement}
			                                                           else {player.ou.garbagePoints = player.ou.garbagePoints.sub(player.ou.garbageRequirement)
																		     player.ou.garbageLevel = new Decimal(player.ou.garbageLevel.add(0.1).toFixed(1))
																			 player.ou.garbageRequirement = player.ou.garbageRequirement.mul(3).pow(1.1)}}
		if(inChallenge("rw",21) || inChallenge("rw", 22)) player.points = player.points.sub(player.points.mul(new Decimal(diff*4.99).div(player.ou.garbagePoints.add(10).log(10))))
		if(!inChallenge("rw",22)) player.ou.yeeter = new Decimal(6.66)
		if(inChallenge("rw",22)) {player.ou.yeeter = player.ou.yeeter.add(diff)
								  if(player.ou.yeeter.gte(6.66)){player.ou.garbagePoints = player.ou.garbagePoints.root(2)
		                          if(player.points.lt(1)) {player.ou.bigBrain = player.points
									                       player.points.div(player.ou.bigBrain.pow(2)).root(2).mul(player.ou.bigBrain.pow(2))}
							      else player.points = player.points.root(2)
							      player.ou.yeeter = new Decimal(0)}}
		if(inChallenge("rw",31)) player.points = player.points.sub(player.points.mul(new Decimal(diff*4.99)))
		if(inChallenge("mw",11)) player.points = player.points.div(new Decimal(1).add(player.points.mul(60).root(60).div(60)))
		if(inChallenge("mw",12)) player.points = player.points.sub(player.points.mul(new Decimal(diff*1.9634954084936207740391521145497)))
		if(player.ou.clickables[11] == "on" && hasUpgrade("ou", 11)) player.ou.funnyTimer = player.ou.funnyTimer.sub(diff)
		if(player.ou.funnyTimer.lt(0)) {player.ou.funnyTimer = new Decimal(0)
										player.ou.clickables[11] = "off"}
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
			onPurchase() {player.ou.garbageLevel = new Decimal(0.1)},
			},
		12: {
			fullDisplay: `<h3>Cosmic Garbage</h3><br>
						 Garbage boosts Garbage Generator's gain<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 6.50e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(6.5e+26)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 1)},
		},
		13: {
			fullDisplay: `<h3>Better Garbage Generator</h3><br>
						 Garbage Generator generates thrice as much<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 1.75e26m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(1.75e+26)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 4)},
		},
		14: {
			fullDisplay: `<h3>Hertz Booster</h3><br>
						 Wavelength Shirnker works twice as much<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 1.38e17m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(1.38e+17)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasChallenge("rw", 11)},
		},
		15: {
			fullDisplay: `<h3>Wave Garbage</h3><br>
						 "Cosmic Garbage" affects Wavelength Shrinker at reduced rate<br><br>
						<h4>Cost: 10,000 garbages<br>`,
			canAfford() {return player.ou.garbagePoints.gte(10000)},
			onPurchase() {return player.ou.garbagePoints = player.ou.garbagePoints.sub(10000)},
			unlocked() {return hasChallenge("rw", 12)},
			
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
			effectDescription: "Obtain Wavelength Shrinker, duh.<br/>Reward: Unlocks Garbage Generator and manual garbage collecting",
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
			effectDescription() {return "Reach v0.5<br/>Reward: Unlocks one more upgrade and Wavelength Shrinker works better based on version milestones achieved so far<br/>Currently: x"+format(new Decimal(player.ou.milestones.length).root(3))},
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
			effectDescription() {return inChallenge("mw", 12) ? "Reach v0.7 [3rd Radio-Challenge completion required] <br/>Reward: Garbage Generator goes into second super form cuz why not (2x garbage gain increase) and Wavelength Shrinker works better based on amount of garbages you currently have<br/>Currently: x"+format(new Decimal(player.ou.garbagePoints).root(10).div(3.1415926535897932384626433832795)) : "Reach v0.7 [3rd Radio-Challenge completion required] <br/>Reward: Garbage Generator goes into second super form cuz why not (2x garbage gain increase) and Wavelength Shrinker works better based on amount of garbages you currently have<br/>Currently: x"+format(new Decimal(player.ou.garbagePoints).root(10))},
			done() { return player.ou.garbageLevel.gte(0.7) && hasChallenge("rw", 21) },
			unlocked() {return hasMilestone("ou", 5)}
		},
		7: {
			requirementDescription: "Version 0.8",
			effectDescription() {return "Reach v0.8<br/>Reward: Garbage Generator goes into third super form (4x garbage gain increase)"},
			done() { return player.ou.garbageLevel.gte(0.8) },
			unlocked() {return hasMilestone("ou", 6)}
		},
		8: {
			requirementDescription: "Version 0.9",
			effectDescription() {return "Reach v0.9<br/>Reward: Garbage Generator rejects the manual garbage collecting (and logic) and becomes monke (10x garbage gain increase)"},
			done() { return player.ou.garbageLevel.gte(0.9) },
			unlocked() {return hasMilestone("ou", 7)}
		},
		9: {
			requirementDescription: "Version 1.0",
			effectDescription() {return player.s.points.gte(1) ? "Reach v1.0<br/>Reward: Wavelength Shrinker works better based on completed challenges<br/>Currently: x"+format(allChallenges().root(3)) : player.ou.garbageLevel.gte(1) || player.s.unlocked ? "Reach v1.0<br/>Reward: Unlocks first prestige layer" : "Reach v1.0<br/>Reward: ???"},
			done() { return player.ou.garbageLevel.gte(1) },
			unlocked() {return hasMilestone("ou", 8)}
		},
		10: {
			requirementDescription: "Version 1.1",
			effectDescription() {return "Reach v1.1<br/>Reward: Wavelength Shrinker's formula is slightly better"},
			done() { return player.ou.garbageLevel.gte(1.1) },
			unlocked() {return hasMilestone("ou", 9)}
		},
		11: {
			requirementDescription: "Version 1.2",
			effectDescription() {return "Reach v1.2<br/>Reward: Wavelength Shrinker and Garbage Generator works "+formatWhole(player.m.buyables[11].add(player.m.buyables[12].mag))+"% better based on bought microwaves"},
			done() { return player.ou.garbageLevel.gte(1.2) },
			unlocked() {return hasMilestone("ou", 9)}
		},
		12: {
			requirementDescription: "Version 1.3",
			effectDescription() {return "Reach v1.3<br/>Reward: Garbage Generator is boosted by ^1.01"},
			done() { return player.ou.garbageLevel.gte(1.3) },
			unlocked() {return hasMilestone("ou", 9)}
		},
		13: {
			requirementDescription: "Version 1.4",
			effectDescription() {return "Reach v1.4<br/>Reward: Better Garbage Generator's effect is cubed"},
			done() { return player.ou.garbageLevel.gte(1.4) },
			unlocked() {return hasMilestone("ou", 9)}
		},
		14: {
			requirementDescription: "Version 1.5",
			effectDescription() {return "Reach v1.5<br/>Reward: We ran out of ideas for every minor update, so here's the last minor update reward...<br><br>Brings back manual garbage collecting"},
			done() { return player.ou.garbageLevel.gte(1.5) },
			unlocked() {return hasMilestone("ou", 9)}
		},
	},
	buyables: {
		rows: 1,
		cols: 2,
		11: {
			display() { return "Collect some garbage" },
			canAfford() { return true },
			buy() {
				let base = new Decimal(1)
				if(player.ou.garbageLevel.gte(0.3)) base = new Decimal(2)
				player.ou.garbagePoints = player.ou.garbagePoints.add(base)
			},
			unlocked() {return (hasUpgrade("ou", 11)&&!hasMilestone("ou", 8)) || hasMilestone("ou", 14)},
			style() { return {
				"height": "83px",
				"width": "292px",
				"font-size": "20px"
			}}
		}
	},
	clickables: {
		11: {
			title: "Garbagewave Transformation", // Optional, displayed at the top in a larger font
            display() { // Everything else displayed in the buyable button after the title
                if(player.ou.funnyTimer.eq(0)) return "Applies versions onto GG, but WS becomes broken for 60 seconds"
				else return "Is currently active...<br/>"+format(player.ou.funnyTimer)+" second(s) left"
            },
			unlocked() { return player.s.points.gte(2) && hasUpgrade("ou", 11) }, 
            canClick() {
                return getClickableState(this.layer, this.id) !== "on"},
            onClick() { 
                switch(getClickableState(this.layer, this.id)){
                    case "off":
                        player[this.layer].clickables[this.id] = "on"
						player.ou.funnyTimer = new Decimal(60)
                        break;
                    case "on":
                        player[this.layer].clickables[this.id] = "off"
                        break;
                    default:
                        player[this.layer].clickables[this.id] = "off"
                        break;

                }
            },
			style() { return {
				"width": "200px",
				"font-size": "12px",
			}}
		}
	},
    layerShown(){return true},
	tooltip: "Observable Universe"
})
		
addLayer("m", {
    name: "microwave", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	milestonePopups: false,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		mps: new Decimal(0),
		garbageWaves: new Decimal(0),
		gps: new Decimal(0),
		switch1: new Decimal(0),
		switch2: new Decimal(0),
    }},
	update(diff){
		if(player.m.switch1.eq(0)){player.m.points = player.m.points.add(layers.m.buyables[11].effect().mul(layers.m.buyables[11].effect2()).mul(new Decimal(diff)))
								   player.m.mps = layers.m.buyables[11].effect().mul(layers.m.buyables[11].effect2())}
		else if(hasChallenge("i", 12)){player.m.points = player.m.points.add(layers.m.buyables[11].effect().mul(layers.m.buyables[11].effect2()).mul(new Decimal(diff)).div(2))
										player.m.mps = layers.m.buyables[11].effect().mul(layers.m.buyables[11].effect2()).div(2)}
		else player.m.mps = new Decimal(0)
		if(player.m.switch2.eq(0)){player.m.garbageWaves = player.m.garbageWaves.add(layers.m.buyables[12].effect().mul(layers.m.buyables[12].effect2()).mul(new Decimal(diff)))
								   player.m.gps = layers.m.buyables[12].effect().mul(layers.m.buyables[12].effect2())}
		else if(hasChallenge("i", 12)){player.m.garbageWaves = player.m.garbageWaves.add(layers.m.buyables[12].effect().mul(layers.m.buyables[12].effect2()).mul(new Decimal(diff)).div(2))
									   player.m.gps = layers.m.buyables[12].effect().mul(layers.m.buyables[12].effect2()).div(2)}
		else player.m.gps = new Decimal(0)
	},
	effect(){ return player.m.points.mul(100).root(3) },
	effect2(){ return player.m.garbageWaves.mul(100).root(2) },
	tabFormat: [["display-text",
				function() {return "Welcome to the Microwaveverse"},
				{"color": "white", "font-size": "32px", "text-shadow": "0 0 16px var(--points)"}], "blank", "blank", "buyables", "blank",
				["display-text",
				function() {return "You have "+format(player.m.points)+" microwave points, boosting Wavelength Shrinker's effeciency by "+format(layers.m.effect())+"%"},
				{"color": "white", "font-size": "24px"}], "blank",
				["display-text",
				function() {return player.m.points.gt(0) ? "You're generating "+format(player.m.mps)+" microwave points per second" : ""},
				{"color": "white", "font-size": "16px"}], "blank",
				["display-text",
				function() {return player.s.points.gte(2) ? "You have "+format(player.m.garbageWaves)+" garbagewave points, boosting Garbage Generator's effeciency by "+format(layers.m.effect2())+"%" : ""},
				{"color": "white", "font-size": "24px"}], "blank",
				["display-text",
				function() {return player.m.garbageWaves.gt(0) ? "You're generating "+format(player.m.gps)+" garbagewave points per second" : ""},
				{"color": "white", "font-size": "16px"}]],
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
    row: "side", // Row the layer is in on the tree (0 is the first row)
	buyables: {
		rows: 2,
		cols: 2,
		11: {
			cost() { return new Decimal(2450000000).mul(new Decimal(10).pow(player.m.buyables[11])) },
			display() { return "Microwavewaves<br/>Strength: "+format(layers.m.buyables[11].effect2())+"<br/>Amount: "+formatWhole(player.m.buyables[11])+"<br/>Cost: "+format(this.cost()) },
			canAfford() { return player.points.gte(this.cost()) },
			effect() { return player.m.buyables[11] },
			effect2() { return new Decimal(1).mul(player.m.buyables[11].root(2)).mul(infraredTracker().mag) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.m.buyables[11] = player.m.buyables[11].add(1)
			},
			unlocked() {return hasChallenge("rw", 31) || player.m.unlocked},
			style() { return {
				"height": "154px",
				"width": "234px",
				"font-size": "20px"
			}}
		},
		12: {
			cost() { return new Decimal(2450000000).mul(new Decimal(10).pow(player.m.buyables[12])) },
			display() { return "Garbagewaves<br/>Strength: "+format(layers.m.buyables[12].effect2())+"<br/>Amount: "+formatWhole(player.m.buyables[12])+"<br/>Cost: "+format(this.cost()) },
			canAfford() { return player.points.gte(this.cost()) },
			effect() { return player.m.buyables[12] },
			effect2() { return new Decimal(1).mul(player.m.buyables[12].root(3)).mul(infraredTracker().mag) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.m.buyables[12] = player.m.buyables[12].add(1)
			},
			unlocked() {return (hasChallenge("rw", 31) || player.m.unlocked) && player.s.points.gte(2)},
			style() { return {
				"height": "154px",
				"width": "234px",
				"font-size": "20px"
			}}
		},
		21: {
			display() { return player.m.switch1.eq(0) ? "Turn off Microwavewaves" : "Turn on Microwavewaves" },
			canAfford() { return true },
			buy() {
				if(player.m.switch1.eq(0)) player.m.switch1 = player.m.switch1.add(1)
				else if(player.m.switch1.eq(1)) player.m.switch1 = player.m.switch1.sub(1)
			},
			unlocked() {return hasUpgrade("i", 12)},
			style() { return {
				"height": "77px",
				"width": "234px",
				"font-size": "20px"
			}}
		},
		22: {
			display() { return player.m.switch2.eq(0) ? "Turn off Garbagewaves" : "Turn on Garbagewaves" },
			canAfford() { return true },
			buy() {
				if(player.m.switch2.eq(0)) player.m.switch2 = player.m.switch2.add(1)
				else if(player.m.switch2.eq(1)) player.m.switch2 = player.m.switch2.sub(1)
			},
			unlocked() {return hasUpgrade("i", 12)},
			style() { return {
				"height": "77px",
				"width": "234px",
				"font-size": "20px"
			}}
		},
	},
    layerShown(){return hasChallenge("rw", 31)},
	tooltip: "Microwaveverse"
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
			content: [["display-text", function() {return !hasMilestone("rw", 1) ? "Next challenge unlocks at 10,000m" : !hasMilestone("rw", 2) ? "Next challenge unlocks at 750m" : !hasMilestone("rw", 3) ? "Next challenge unlocks at 50m" : !hasMilestone("rw", 4) ? "Next challenge unlocks at 1.22dm" :""}],
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
		},
		4: {
			done() { return player.points.gte(2450000000) },
			unlocked() {return false}
		}
	},
	challenges: {
		rows: 3,
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
			rewardDescription() {return "Wavelength Shrinker's versions boosts Garbage Generator's production and unlocks one more upgrade<br/>Currently: x("+format(new Decimal(1).add(player.ou.garbageLevel.add(layers.s.effect()).mul(2)))+"^"+format(new Decimal(1).add(player.ou.garbageLevel.add(layers.s.effect())))+")"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 1)},
			goal: new Decimal(360),
		},
		21: {
			name() {return hasChallenge("rw", 21) ? "Mega Garbodor is<br/>real" : "Mega Garbodor is<br/>a lie...?"},
			challengeDescription() {return "Wavelength gets "+format(new Decimal(499).mul(player.ou.display1).div(player.ou.garbagePoints.add(10).log(10)))+"% longer per pick based on how little garbage you have"},
			rewardDescription() {return "Garbage Generator goes into it's super form (50x garbage gain increase)"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 2)},
			goal: new Decimal(30),
		},
		22: {
			name: "YES<br/>This. Is. Antimatter. Dimensions. Reference.",
			challengeDescription() {return "All 3 challenges are applied at once, but all buffs within the challenges are nullified, both hertz and garbage points are root squared and then again every 6.66 seconds"},
			rewardDescription() {return "WAVELENGTH SHRINKER GETS OVER 9000 TIMES BETTER!!!!!1111ELEVEN1"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 3)},
			goal: new Decimal(7.8),
		},
		31: {
			name: "MMMMMMMMMMMMMMMMMMMM-<br/>BEEP! BEEP! BEEP! BEEP!",
			challengeDescription() {return "Your wave is absorbing microwave's waves VIOLENTLY, getting "+format(new Decimal(499).mul(player.ou.display2))+"% longer every tick"},
			rewardDescription() {return "Unlocks the Microwaveverse"},
			currencyDisplayName: "hertz",
			unlocked() {return hasMilestone("rw", 4)},
			goal: new Decimal(1000000000),
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
			content: [["display-text", function() {return player.points.gte(2997924580) ? "Super High Frequency (SHF) softcap: 2.99e9 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(29979245800) ? "Extremely High Frequency (EHF) softcap: 2.99e10 hertz" : ""}],
					  ["display-text", function() {return player.points.gte(299792458000) ? "Tremendously High Frequency (THF) softcap: 2.99e11 hertz" : ""}],
						]
		},
		"Challenges": {
			content: [["display-text", function() {return !hasMilestone("mw", 1) ? "Next challenge unlocks at 1cm" : !hasMilestone("mw", 2) ? "Next challenge unlocks at 2mm" :  ""}],
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
			done() { return player.points.gte(2997924580) },
			unlocked() {return false}
		},
		1: {
			done() { return player.points.gte(29979245800) },
			unlocked() {return false}
		},
		2: {
			done() { return player.points.gte(149896229000) },
			unlocked() {return false}
		}
	},
	challenges: {
		rows: 1,
		cols: 2,
		11: {
			name: "Spacetime Terror",
			challengeDescription() {return "The space and time has been reshapen to slow you down by alot, cube rooting your Wavelength Shrinker's effeciency and shortens your wavelength "+format(new Decimal(1).add(player.points.mul(60).root(60).div(60)))+" times every tick"},
			rewardDescription() {return "Garbage and wavelength boosts each other at reduced rate<br/>Currently:<br/>Garbage: "+format(player.points.add(1).root(21))+"x, Wavelength: "+format(player.ou.garbagePoints.add(1).root(42))+"x"},
			currencyDisplayName: "hertz",
			unlocked(){return hasMilestone("mw", 1)},
			goal: new Decimal(1234),
		},
		12: {
			name: "\"PI THIS, PI THAT!\"",
			challengeDescription() {return "Garbage Generator's effeciency is divided by 𝜋, softcaps are 𝜋 times stronger, \"Version 0.7\"'s effect is 𝜋 rooted, wavelength gets about 𝜋% longer per tick and Wavelength Shrinker's effeciency is divided by 𝜋 𝜋 times because I hate you"},
			rewardDescription() {return "Garbage Generator works (𝜋^𝜋)x better"},
			currencyDisplayName: "hertz",
			unlocked(){return hasMilestone("mw", 2)},
			goal: new Decimal(209439.51023931954923084289221863),
		},
	},
    layerShown(){return hasMilestone("mw", 0)},
	tooltip: "Microwaves"
})

addLayer("s", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

	symbol: "S",
    color: "#FFFFFF",                       // The color for this layer, which affects many elements.
    resource: "spectrum resets",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).
	effect() {return player.s.points.pow(2).add(player.s.points).div(2).div(10)},
	effectDescription() {return "giving Wavelength Shrinker an extra non-physical "+format(layers.s.effect())+" version"},

    baseResource: "hertz",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires() {return player.s.points.eq(3) ? new Decimal(999999999).pow(999999999).pow(999999999) : player.s.points.eq(2) ? new Decimal(22422771727.748691099476439790576) : player.s.points.eq(1) ? new Decimal(36000000000) : new Decimal(50000000000)},              // The amount of the base needed to  gain 1 of the prestige currency.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).
	base: 10,

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
	milestones: {
		0: {
			requirementDescription: "1 spectrum reset",
			effectDescription: "Keeps 5th Radio-Challenge (IF it's completed) and microwaves on spectrum reset",
			done() { return player.s.points.gte(1) },
			unlocked() {return true}
		},
		1: {
			requirementDescription: "2 spectrum resets",
			effectDescription: "Unlocks the Garbagewave and \"Garbagelength Transformation\" clickable",
			done() { return player.s.points.gte(2) },
			unlocked() {return hasMilestone("s", 0)}
		},
		2: {
			requirementDescription: "3 spectrum resets",
			effectDescription: "2nd, 3rd, 4th and 5th Observable Universe upgrades's effect are squared",
			done() { return player.s.points.gte(3) },
			unlocked() {return hasMilestone("s", 1)}
		}
	},
	doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row == "side") {
			player.m.switch1 = new Decimal(0)
			player.m.switch2 = new Decimal(0)
			player.i.challenges[11] = 0
			player.i.upgrades = []
			player.i.milestones = []
			player.mw.challenges[11] = 0
			player.mw.challenges[12] = 0
			player.mw.milestones = []
			player.rw.challenges[11] = 0
			player.rw.challenges[12] = 0
			player.rw.challenges[21] = 0
			player.rw.challenges[22] = 0
			player.rw.milestones = ["4"]
			player.ou.garbageRequirement = new Decimal(10)
			player.ou.garbageLevel = new Decimal(0)
			player.ou.garbagePoints = new Decimal(0)
			player.ou.milestones = []
			player.ou.upgrades = []
			player.points = modInfo.initialStartPoints
			player[layer].activeChallenge = null
		}
	},

    layerShown() { return player.ou.garbageLevel.gte(1) || hasMilestone("s", 0) }            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("i", {
    name: "red sus", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	milestonePopups: false,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	tabFormat: {
		"Infra-caps": {
			content: [["display-text", function() {return player.points.gte(299792458000) ? "Far-infrared radiation/THF softcap: 2.99e11 hertz" : ""},
				      {"font-size": "24px"}], "blank",
					  ["display-text", function() {return player.points.gte(19986163866666.666666666666666667) ? "Long-wavelength infrared radiation softcap: 1.99e13 hertz" : ""},
				      {"font-size": "18px"}], "blank",
					  ["display-text", function() {return player.points.gte(36974403153333.333333333333333333) ? "Mid-infrared radiation softcap: 3.69e13 hertz" : ""},
				      {"font-size": "24px"}], "blank",
					  ["display-text", function() {return player.points.gte(99930819333333.333333333333333335) ? "Short-infrared radiation softcap: 9.99e13 hertz" : ""},
				      {"font-size": "18px"}], "blank",
					  ["display-text", function() {return player.points.gte(213851953373333.33333333333333334) ? "Near-infrared radiation softcap: 2.13e14 hertz" : ""},
				      {"font-size": "24px"}]],
		},
		"Upgrades": {
			content: ["upgrades"],
		},
		"Challenges": {
			content: [["display-text", function() {return hasMilestone("i", 2) ? "" : hasMilestone("i", 1) ? "Next challenge unlocks at 200μm" : "Next challenge unlocks at 640μm"}], "challenges"],
		},
	},
    color() {return player.points.gte(213851953373333.33333333333333334) ? "#DA0505" : player.points.gte(99930819333333.333333333333333335) ? "#B40A0A" : player.points.gte(36974403153333.333333333333333333) ? "#8F0F0F" : player.points.gte(19986163866666.666666666666666667) ? "#6A1515" : player.points.gte(299792458000) ? "#441A1A" : "#1F1F1F"},
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
	upgrades:{
		rows: 2,
		cols: 3,
		11: {
			fullDisplay: `<h3>Heat Acceleration</h3><br>
						 Microwaves additionally gains 193% more strength per active infrared softcap<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 967.74μm<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(0.00096774)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 1)},
			style() { return {
				"height": "130px"
			}}
		},
		12: {
			fullDisplay: `<h3>Remote Control</h3><br>
						 Now you can turn off microwaves's production to boost Wavelength Shrinker based on bought microwaves<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 725.64μm<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(0.00072564)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 1)},
			style() { return {
				"height": "130px"
			}}
		},
		13: {
			fullDisplay: `<h3>Heat Radiation</h3><br>
						 Wavelength Shrinker gains additional +10% boost to it's production per infrared upgrade<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 849.54μm<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(0.00084954)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return hasMilestone("ou", 1)},
			style() { return {
				"height": "130px"
			}}
		},
		21: {
			fullDisplay: `<h3>Night Vision</h3><br>
						 Wavelength Shrinker works twice better in challenges<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 90m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(90)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return inChallenge("i", 11) || hasUpgrade("i", 21)},
			style() { return {
				"height": "130px"
			}}
		},
		22: {
			fullDisplay: `<h3>In-fried Car-bag-e</h3><br>
						 Heat Acceleration boosts Garbage Generator<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 6m<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(6)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return inChallenge("i", 11) || hasUpgrade("i", 22)},
			style() { return {
				"height": "130px"
			}}
		},
		23: {
			fullDisplay: `<h3>Infrared Cooling</h3><br>
						 Weakens Infra-caps's root by +0.5<br>
						 [Wavelength Reset]<br><br>
						<h4>Requirement: 2cm<br>`,
			canAfford() {return new Decimal(299792458).div(player.points).lte(0.02)},
			onPurchase() {return player.points = modInfo.initialStartPoints},
			unlocked() {return inChallenge("i", 11) || hasUpgrade("i", 23)},
			style() { return {
				"height": "130px"
			}}
		},
	},
	challenges: {
		rows: 1,
		cols: 2,
		11: {
			name: "Chu Chu Real Slow",
			challengeDescription(){return "WS's effeciency is slowed down by "+format(new Decimal(16777216).root(player.ou.garbagePoints.add(1).root(256)))+" times based on how little garbage you have. You get to buy 3 more Infrared upgrades within this challenge"},
			rewardDescription: "\"Version 0.7\" milestone affects Garbage Generator",
			currencyDisplayName: "hertz",
			goal: new Decimal(299792458/13),
			unlocked() {return hasMilestone("i", 1)}
		},
		12: {
			name: "Ugh...",
			challengeDescription(){return "WS's effeciency is slowed down by "+format(new Decimal(16777216).pow(player.points.add(1).root(69)))+" times based on how much points you have"},
			rewardDescription: "Turning off microwaves halves production instead",
			currencyDisplayName: "hertz",
			goal: new Decimal(13020000),
			unlocked() {return hasMilestone("i", 2)}
		},
	},
	milestones: {
		0: {
			done() { return player.points.gte(299792458000) },
			unlocked() {return false}
		},
		1: {
			done() { return player.points.gte(468425715625) },
			unlocked() {return false}
		},
		2: {
			done() { return player.points.gte(1498962290000) },
			unlocked() {return false}
		},
	},
    layerShown(){return hasMilestone("i", 0)},
	tooltip: "Infrared Radiations"
})
