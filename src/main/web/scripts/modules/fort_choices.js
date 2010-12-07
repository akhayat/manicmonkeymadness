/**
 * premade_forts.js
 * 
 * This module contains premade forts that the player can choose when starting the game. It also
 * keeps track of any custom forts that are imported.
 * 
 */

$(function() {
    m3.fort_choices = function() {
        var fort_choices = {};
        
        // This contains each player's custom fort after they're imported.
        fort_choices.chosen_forts = [];
        
        // This sets the fort to be loaded into the level for a given player (0 or 1). Type determines
        // whether it is a custom or premade fort -- value should be either "custom" or "premade". Fort
        // should be the JSON string representing the fort if it's a custom fort, otherwise the index
        // of the premade fort.
        fort_choices.setFortChoice = function(player, type, fort) {
            if (type === "custom") {
                // If we receive invalid JSON, set the player's fort to the first premade fort.
                try {
                    this.chosen_forts[player] = JSON.parse(fort);
                }
                catch(error) {
                    this.chosen_forts[player] = this.premade[0].fort;
                }
            }
            else if (type === "premade") {
                this.chosen_forts[player] = this.premade[fort].fort;
            }
        };
        
        // These are the premade forts. Just add to the list if you want to add another fort.
        fort_choices.premade = [
            {
                id:   "Original",
                fort: {"pieces":[{"shape":"box","size":"long","type":"rock","x":99,"y":296,"angle":0},{"shape":"box","size":"long","type":"rock","x":213,"y":296,"angle":0},{"shape":"box","size":"long","type":"wood","x":156,"y":278,"angle":1.589999999999999},{"shape":"box","size":"long","type":"rock","x":213,"y":198,"angle":0},{"shape":"box","size":"long","type":"rock","x":99,"y":197,"angle":0},{"shape":"box","size":"long","type":"wood","x":156,"y":214,"angle":1.597499999999999},{"shape":"box","size":"long","type":"rock","x":156,"y":150,"angle":1.5624999999999993},{"shape":"box","size":"wide","type":"wood","x":119,"y":126,"angle":0},{"shape":"box","size":"wide","type":"wood","x":141,"y":126,"angle":0},{"shape":"box","size":"wide","type":"wood","x":169,"y":125,"angle":0},{"shape":"box","size":"wide","type":"wood","x":190,"y":125,"angle":0},{"shape":"triangle","size":"small","type":"wood","x":130,"y":99,"angle":0},{"shape":"triangle","size":"small","type":"wood","x":179,"y":98,"angle":0},{"shape":"box","size":"long","type":"rock","x":355,"y":297,"angle":-3.5424999999999986},{"shape":"box","size":"long","type":"rock","x":291,"y":304,"angle":0.6774999999999998},{"shape":"box","size":"square","type":"rock","x":230,"y":334,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":310,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":286,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":262,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":238,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":214,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":190,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":166,"angle":0},{"shape":"box","size":"long","type":"rock","x":343,"y":297,"angle":2.7824999999999998},{"shape":"box","size":"short","type":"rock","x":321,"y":323,"angle":0.6549999999999999},{"shape":"box","size":"square","type":"rock","x":230,"y":142,"angle":4.687500000000002},{"shape":"triangle","size":"small","type":"rock","x":230,"y":124,"angle":0}],"enemies":[{"type":"monkey","size":"large","x":181,"y":315,"angle":0},{"type":"monkey","size":"large","x":130,"y":315,"angle":0},{"type":"monkey","size":"small","x":131,"y":246,"angle":0},{"type":"monkey","size":"medium","x":181,"y":182,"angle":0},{"type":"monkey","size":"small","x":181,"y":247,"angle":0},{"type":"monkey","size":"medium","x":130,"y":182,"angle":0}]}
            },
            
            {
                id:   "Alternate",
                fort: {"pieces":[{"shape":"box","size":"long","type":"wood","x":216,"y":291,"angle":0},{"shape":"box","size":"long","type":"rock","x":500,"y":292,"angle":0},{"shape":"box","size":"long","type":"rock","x":487,"y":292,"angle":0},{"shape":"box","size":"long","type":"rock","x":690,"y":60,"angle":0},{"shape":"box","size":"long","type":"wood","x":230,"y":292,"angle":0},{"shape":"box","size":"long","type":"rock","x":475,"y":292,"angle":0},{"shape":"box","size":"long","type":"wood","x":244,"y":292,"angle":0},{"shape":"box","size":"long","type":"rock","x":462,"y":291,"angle":0},{"shape":"box","size":"long","type":"rock","x":532,"y":294,"angle":-0.44500000000000023},{"shape":"box","size":"long","type":"rock","x":549,"y":295,"angle":-0.4424999999999999},{"shape":"box","size":"long","type":"rock","x":566,"y":296,"angle":-0.44499999999999995},{"shape":"box","size":"short","type":"rock","x":516,"y":316,"angle":0.22249999999999998},{"shape":"box","size":"long","type":"rock","x":493,"y":234,"angle":1.6099999999999988},{"shape":"box","size":"long","type":"rock","x":493,"y":222,"angle":1.6149999999999993},{"shape":"box","size":"long","type":"rock","x":472,"y":209,"angle":1.664999999999999},{"shape":"box","size":"long","type":"rock","x":386,"y":292,"angle":0},{"shape":"box","size":"long","type":"rock","x":311,"y":294,"angle":0},{"shape":"box","size":"short","type":"rock","x":386,"y":216,"angle":0},{"shape":"box","size":"short","type":"rock","x":310,"y":218,"angle":0},{"shape":"box","size":"long","type":"rock","x":415,"y":188,"angle":1.7699999999999991},{"shape":"box","size":"long","type":"rock","x":312,"y":184,"angle":1.4924999999999988},{"shape":"box","size":"long","type":"rock","x":357,"y":168,"angle":1.5499999999999992},{"shape":"box","size":"short","type":"wood","x":244,"y":217,"angle":0},{"shape":"box","size":"short","type":"wood","x":230,"y":216,"angle":0},{"shape":"box","size":"short","type":"wood","x":216,"y":215,"angle":0},{"shape":"box","size":"long","type":"rock","x":253,"y":178,"angle":1.449999999999999},{"shape":"box","size":"long","type":"rock","x":458,"y":185,"angle":-1.3299999999999992},{"shape":"box","size":"long","type":"rock","x":460,"y":173,"angle":1.819999999999999},{"shape":"box","size":"long","type":"rock","x":304,"y":158,"angle":1.494999999999999},{"shape":"box","size":"long","type":"rock","x":385,"y":147,"angle":1.6649999999999994},{"shape":"box","size":"long","type":"rock","x":584,"y":297,"angle":-0.385},{"shape":"box","size":"long","type":"rock","x":397,"y":292,"angle":0},{"shape":"box","size":"short","type":"rock","x":396,"y":216,"angle":0},{"shape":"box","size":"short","type":"rock","x":322,"y":218,"angle":0},{"shape":"box","size":"long","type":"rock","x":322,"y":294,"angle":0},{"shape":"box","size":"short","type":"rock","x":429,"y":283,"angle":1.552499999999999},{"shape":"box","size":"short","type":"rock","x":355,"y":281,"angle":1.6174999999999988},{"shape":"box","size":"short","type":"rock","x":277,"y":283,"angle":1.614999999999999},{"shape":"box","size":"long","type":"rock","x":409,"y":137,"angle":-1.4724999999999995}],"enemies":[{"type":"monkey","size":"medium","x":432,"y":315,"angle":0},{"type":"monkey","size":"medium","x":356,"y":315,"angle":0},{"type":"monkey","size":"medium","x":278,"y":316,"angle":0},{"type":"monkey","size":"small","x":422,"y":251,"angle":0},{"type":"monkey","size":"small","x":355,"y":250,"angle":0},{"type":"monkey","size":"small","x":279,"y":252,"angle":0}]}
            }
        ];
        
        return fort_choices;
    }();
});
