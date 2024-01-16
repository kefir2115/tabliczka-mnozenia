const check = document.querySelector(".check");
const good = document.querySelector(".correct");
const bad = document.querySelector(".incorrect");
const time = document.querySelector(".avgtime");
const equation = document.querySelector(".equation .begin");
const input = document.querySelector(".equation input");
const popup = document.querySelector(".popup");
const badlist = document.querySelector(".badlist");

let res = -1;
let begin = -1;
let end = -1;

let rating = {
    correct: 0,
    incorrect: 0,
    time: 0, // in seconds
    problematic: []
};

check.addEventListener("click", () => {
    let correct = res==input.value*1;
    if(correct) {
        rating.correct++;
    } else {
        rating.incorrect++;
        rating.problematic.push(equation.innerHTML+" "+res);
    }
    end = Date.now();
    pop(correct);
});
popup.querySelector("button").addEventListener("click", () => {
    let seconds = parseInt((end - begin)/100)/10;
    let total = rating.correct+rating.incorrect;
    let totalTime = total*rating.time;
    rating.time = (totalTime+seconds)/(total+1);
    roll();
    popup.removeAttribute("show");
});

function roll() {
    let num1 = Math.round(Math.random()*9)+1;
    let num2 = Math.round(Math.random()*9)+1;
    res = num1 * num2;

    input.value = "";
    equation.innerHTML = num1+"x"+num2+"=";
    begin = Date.now();
    update();
}
roll();

function update() {
    good.innerHTML = rating.correct;
    bad.innerHTML = rating.incorrect;
    time.innerHTML = parseInt(rating.time*10)/10;

    let total = rating.incorrect+rating.correct;
    badlist.innerHTML = "Błędy ("+rating.incorrect+") ("+((rating.incorrect/total*100)|0)+"%):<br>"+rating.problematic.join("<br>");
}
function pop(rate) {
    popup.setAttribute("rating", (rate?1:0)+"");
    popup.querySelector(".title").innerHTML = rate?"Dobrze!":"Źle!";
    popup.querySelector(".description").innerHTML = rate?"Oby tak dalej!":"Niestety nie, "+equation.innerHTML+res+"<br>Napisałaś "+input.value;
    popup.setAttribute("show", true);
}