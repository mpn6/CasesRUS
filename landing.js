var counter = 0;
var images = [];
var time = 3000;

//list of carousel images
images[0] = 'img/beepbop.png';
images[1] = 'img/tea.jpg';
images[2] = 'img/rose.png';


//change image
function changeImage(){
    document.slide.src = images[counter];

    if (counter < images.length - 1){
        counter++;
    }else{
        counter=0;
    }

    setTimeout(changeImage, time);
}

window.onload = changeImage;

