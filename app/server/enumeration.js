/**
 * Created by Jon Snow on 3/17/2017.
 */

export function Enumeration( enumLabels) {
    var i=0, LBL="";
    this.MAX = enumLabels.length;
    this.labels = enumLabels;
    // generate the enum literals as capitalized keys/properties
    for (i=1; i <= enumLabels.length; i++) {
        LBL = enumLabels[i-1].toUpperCase();
        this[LBL] = new Label(enumLabels[i-1]);
    }
    // prevent any runtime change to the enumeration
    Object.freeze( this);
};
function Label(givenString){
    var string = givenString;
    this.toString = function () {
        return string;
    }
}