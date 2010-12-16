/**
 * fort_choices.js
 *
 * This module contains premade forts that the player can choose when starting the game. It also
 * keeps track of any custom forts that are imported.
 */
$(function () {
    m3.fort_choices = function () {
        var fort_choices = {};

        // This contains each player's custom fort after they're imported.
        fort_choices.chosen_forts = [];

        // This sets the fort to be loaded into the level for a given player (0 or 1). Type determines
        // whether it is a custom or premade fort -- value should be either "custom" or "premade". Fort
        // should be the JSON string representing the fort if it's a custom fort, otherwise the index
        // of the premade fort.
        fort_choices.setFortChoice = function (player, type, fort) {
            if (type === "custom") {

                // If we receive invalid JSON, set the player's fort to the first premade fort.
                try {
                    this.chosen_forts[player] = JSON.parse(fort);
                }
                catch (error) {
                    this.chosen_forts[player] = this.premade[0].fort;
                }
            } else if (type === "premade") {
                this.chosen_forts[player] = this.premade[fort].fort;
            }
        };

        // These are the premade forts. Just add to the list if you want to add another fort.
        fort_choices.premade = [
            {
                id:   "Beginner",
                fort: {"pieces":[{"shape":"box","size":"long","type":"wood","x":194,"y":292,"angle":0},{"shape":"box","size":"short","type":"wood","x":469,"y":314,"angle":0},{"shape":"box","size":"short","type":"wood","x":469,"y":263,"angle":0},{"shape":"box","size":"short","type":"wood","x":526,"y":315,"angle":0},{"shape":"box","size":"short","type":"wood","x":526,"y":265,"angle":0},{"shape":"box","size":"long","type":"wood","x":497,"y":233,"angle":1.5875},{"shape":"triangle","size":"small","type":"wood","x":497,"y":222,"angle":0},{"shape":"box","size":"long","type":"wood","x":285,"y":291,"angle":0},{"shape":"box","size":"long","type":"wood","x":239,"y":235,"angle":1.5649999999999997},{"shape":"box","size":"long","type":"wood","x":196,"y":179,"angle":0},{"shape":"box","size":"long","type":"wood","x":284,"y":179,"angle":0},{"shape":"box","size":"long","type":"wood","x":240,"y":120,"angle":1.5975000000000001},{"shape":"box","size":"wide","type":"wood","x":199,"y":91,"angle":0},{"shape":"box","size":"square","type":"wood","x":276,"y":102,"angle":0}],"enemies":[{"type":"monkey","size":"large","x":496,"y":309,"angle":0},{"type":"monkey","size":"medium","x":242,"y":200,"angle":0},{"type":"monkey","size":"small","x":241,"y":85,"angle":0}]}
            },
            
            {
            	id:	  "Novice",
            	fort: {"pieces":[{"shape":"box","size":"long","type":"rock","x":439,"y":294,"angle":0},{"shape":"box","size":"long","type":"rock","x":430,"y":293,"angle":0},{"shape":"box","size":"long","type":"rock","x":394,"y":238,"angle":1.5875000000000004},{"shape":"box","size":"long","type":"rock","x":439,"y":183,"angle":0},{"shape":"box","size":"long","type":"rock","x":428,"y":184,"angle":0},{"shape":"box","size":"long","type":"rock","x":395,"y":127,"angle":1.5775000000000001},{"shape":"box","size":"long","type":"rock","x":349,"y":293,"angle":0},{"shape":"box","size":"long","type":"rock","x":350,"y":182,"angle":0},{"shape":"box","size":"wide","type":"rock","x":435,"y":103,"angle":0},{"shape":"box","size":"long","type":"rock","x":550,"y":300,"angle":-0.7674999999999994},{"shape":"box","size":"short","type":"rock","x":536,"y":319,"angle":0},{"shape":"box","size":"wide","type":"rock","x":190,"y":325,"angle":0},{"shape":"box","size":"wide","type":"rock","x":212,"y":325,"angle":0}],"enemies":[{"type":"monkey","size":"medium","x":389,"y":197,"angle":0},{"type":"monkey","size":"large","x":394,"y":90,"angle":0},{"type":"monkey","size":"small","x":494,"y":317,"angle":0},{"type":"monkey","size":"small","x":394,"y":316,"angle":0},{"type":"monkey","size":"large","x":205,"y":273,"angle":0}]}
            },
            
            {
                id:   "Manic",
                fort: {"pieces":[{"shape":"box","size":"long","type":"rock","x":99,"y":296,"angle":0},{"shape":"box","size":"long","type":"rock","x":213,"y":296,"angle":0},{"shape":"box","size":"long","type":"wood","x":156,"y":278,"angle":1.589999999999999},{"shape":"box","size":"long","type":"rock","x":213,"y":198,"angle":0},{"shape":"box","size":"long","type":"rock","x":99,"y":197,"angle":0},{"shape":"box","size":"long","type":"wood","x":156,"y":214,"angle":1.597499999999999},{"shape":"box","size":"long","type":"rock","x":156,"y":150,"angle":1.5624999999999993},{"shape":"box","size":"wide","type":"wood","x":119,"y":126,"angle":0},{"shape":"box","size":"wide","type":"wood","x":141,"y":126,"angle":0},{"shape":"box","size":"wide","type":"wood","x":169,"y":125,"angle":0},{"shape":"box","size":"wide","type":"wood","x":190,"y":125,"angle":0},{"shape":"triangle","size":"small","type":"wood","x":130,"y":99,"angle":0},{"shape":"triangle","size":"small","type":"wood","x":179,"y":98,"angle":0},{"shape":"box","size":"long","type":"rock","x":355,"y":297,"angle":-3.5424999999999986},{"shape":"box","size":"long","type":"rock","x":291,"y":304,"angle":0.6774999999999998},{"shape":"box","size":"square","type":"rock","x":230,"y":334,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":310,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":286,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":262,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":238,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":214,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":190,"angle":0},{"shape":"box","size":"square","type":"rock","x":230,"y":166,"angle":0},{"shape":"box","size":"long","type":"rock","x":343,"y":297,"angle":2.7824999999999998},{"shape":"box","size":"short","type":"rock","x":321,"y":323,"angle":0.6549999999999999},{"shape":"box","size":"square","type":"rock","x":230,"y":142,"angle":4.687500000000002},{"shape":"triangle","size":"small","type":"rock","x":230,"y":124,"angle":0}],"enemies":[{"type":"monkey","size":"large","x":181,"y":315,"angle":0},{"type":"monkey","size":"large","x":130,"y":315,"angle":0},{"type":"monkey","size":"small","x":131,"y":246,"angle":0},{"type":"monkey","size":"medium","x":181,"y":182,"angle":0},{"type":"monkey","size":"small","x":181,"y":247,"angle":0},{"type":"monkey","size":"medium","x":130,"y":182,"angle":0}]}
            }
        ];

        return fort_choices;
    }();
});
