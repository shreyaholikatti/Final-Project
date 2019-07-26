// function handle(e){
//     if(e.keyCode === 13){
//         e.preventDefault(); // Ensure it is only this code that rusn
 
//     }
// }

function myFunction(event) {
  var x = event.keyCode;
  if (x == 27) {  // 27 is the ESC key
    alert ("You pressed the Escape key!");
  }
}
