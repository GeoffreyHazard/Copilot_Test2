// find all the images without alternate text
// and give them a red border
function process() {
    var images = document.getElementsByTagName("img");
    var count = 0;
    for (var i=0; i<images.length; i++) {
        if (images[i].alt == "") {
            images[i].style.border = "1px solid red";
            count++;
        }
    }
    alert(count + " images without alternate text found.");
}