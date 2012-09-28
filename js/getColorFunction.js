function getColorFunction( colorString, hslDifferences, mode ){

  // default mode: sass
  var mode = typeof mode !== 'undefined' ? mode : "sass";

  var colorFunction = colorString;

  // H
  if ( hslDifferences[0] !== 0 ) { // if hue changes
    var invH = hslDifferences[0] * -1;
    var hueFunction = ( mode == "sass" ) ? "adjust-hue" : "spin";
    colorFunction = hueFunction + "( " + colorFunction + ", " + invH + "deg )";
  }

  // S
  if ( hslDifferences[1] < 0 ) { // if second color is more saturated
    var absS = Math.abs( hslDifferences[1] );
    colorFunction = "saturate( " + colorFunction + ", " + absS + " )";
  } else if ( hslDifferences[1] > 0 ) { // if second color is less saturated
    colorFunction = "desaturate( " + colorFunction + ", " + hslDifferences[1] + " )";
  }

  // L
  if ( hslDifferences[2] < 0 ) { // if second color is lighter
    var absL = Math.abs( hslDifferences[2] );
    colorFunction = "lighten( " + colorFunction + ", " + absL + " )";
  } else if ( hslDifferences[2] > 0 ) { // if second color is darker
    colorFunction = "darken( " + colorFunction + ", " + hslDifferences[2] + " )";
  }

  console.log( hslDifferences );
  return( colorFunction );

}

function getColorDifferences( start, end ) {

  var differences = [];

  var startColor = Color( start );
  var endColor = Color( end );

  var startColorHSL = startColor.hslArray();
  var endColorHSL = endColor.hslArray();

  for ( var i = 0; i < 3; i++ ) {
    differences[i] = startColorHSL[i] - endColorHSL[i];
  }

  return( differences );

}

// #startColor
// #endColor

$(function(){
  $( ".colorInput" ).on( "change", function(){
    var startColor = document.getElementById( "startColor" ).value;
    var endColor = document.getElementById( "endColor" ).value;
    var differences = getColorDifferences( startColor, endColor );
    var outputText = getColorFunction( startColor, differences );
    $( "#functionOutput" ).text(outputText);
  });
});
