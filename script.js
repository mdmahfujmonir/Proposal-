/* ==========================================
   CONTINUE 4A
   DOM + STEP NAVIGATION + HEARTS + NO BUTTON
========================================== */

document.addEventListener("DOMContentLoaded", () => {

const steps = document.querySelectorAll(".card");

function showStep(id){

steps.forEach(step=>step.classList.remove("active"));

const target=document.getElementById(id);

if(target){

target.classList.add("active");

window.scrollTo({
top:0,
behavior:"smooth"
});

}

}

/* ==========================================
      GLOBAL VARIABLES
========================================== */

let selectedDate="";
let selectedTime="";
let selectedFood="";

let yesScale=1;
let noScale=1;

/* ==========================================
      ELEMENTS
========================================== */

const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const surveyBtn=document.getElementById("surveyBtn");
const hearts=document.getElementById("hearts");

/* ==========================================
      FLOATING HEARTS
========================================== */

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

const emojis=["💖","💕","💗","💞","❤️","🌸"];

heart.innerHTML=
emojis[Math.floor(Math.random()*emojis.length)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=
(18+Math.random()*18)+"px";

heart.style.animationDuration=
(5+Math.random()*5)+"s";

hearts.appendChild(heart);

setTimeout(()=>{

heart.remove();

},10000);

}

setInterval(createHeart,450);

/* ==========================================
      YES BUTTON
========================================== */

yesBtn.addEventListener("click",()=>{

showStep("step3");

});

/* ==========================================
      NO BUTTON TELEPORT
========================================== */

function moveNoButton(){

const area=document.querySelector(".buttonArea");

const maxX=area.clientWidth-noBtn.offsetWidth;

const maxY=area.clientHeight-noBtn.offsetHeight;

const x=Math.random()*maxX;

const y=Math.random()*maxY;

noBtn.style.left=x+"px";
noBtn.style.top=y+"px";
noBtn.style.right="auto";

yesScale+=0.10;

noScale=Math.max(0.35,noScale-0.05);

yesBtn.style.transform=`scale(${yesScale})`;

noBtn.style.transform=`scale(${noScale})`;

}

noBtn.addEventListener("mouseenter",moveNoButton);

noBtn.addEventListener("touchstart",(e)=>{

e.preventDefault();

moveNoButton();

},{passive:false});

/* ==========================================
      BACKUP
========================================== */

noBtn.addEventListener("click",(e)=>{

e.preventDefault();

showStep("step2");

});

/* ==========================================
      SURVEY
========================================== */

surveyBtn.addEventListener("click",()=>{

alert(
"Invalid Input!\n\nError 404: Single Status Not Found.\n\nRedirecting to YES... 😈"
);

showStep("step3");

});

/* ==========================================
      STEP 3
========================================== */

document
.getElementById("step3Btn")
.addEventListener("click",()=>{

showStep("step4");

});
/* ==========================================
      STEP 4 - CAPTCHA
========================================== */

const captcha=document.getElementById("captcha");
const loader=document.querySelector(".loader");
const loaderBar=document.getElementById("loaderBar");
const captchaStatus=document.getElementById("captchaStatus");
const captchaBtn=document.getElementById("captchaBtn");

captcha.addEventListener("change",()=>{

loader.style.display="block";

loaderBar.style.width="0%";

captchaBtn.disabled=true;

captchaStatus.innerHTML="Analyzing your loyalty status... 🤖";

setTimeout(()=>{
loaderBar.style.width="30%";
},200);

setTimeout(()=>{
loaderBar.style.width="65%";
},700);

setTimeout(()=>{

loaderBar.style.width="100%";

captchaStatus.innerHTML="✅ Human Verified! Loyalty Level: 100%";

captchaBtn.disabled=false;

},1500);

});

captchaBtn.addEventListener("click",()=>{

showStep("step5");

});


/* ==========================================
      STEP 5
========================================== */

const dateInput=document.getElementById("dateInput");
const timeInput=document.getElementById("timeInput");
const step5Btn=document.getElementById("step5Btn");

step5Btn.addEventListener("click",()=>{

if(dateInput.value===""){

alert("📅 Please select a date.");

return;

}

if(timeInput.value===""){

alert("🕒 Please select a time.");

return;

}

selectedDate=dateInput.value;
selectedTime=timeInput.value;

showStep("step6");

});
/* ==========================================
      STEP 6 - FOOD SELECTION
========================================== */

const foodCards = document.querySelectorAll(".food");
const warning = document.getElementById("warning");
const contractBtn = document.getElementById("contractBtn");

foodCards.forEach(card => {

    card.addEventListener("click", () => {

        foodCards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        selectedFood = card.dataset.food;

        if (selectedFood.includes("Sushi")) {

            warning.innerHTML =
            "⚠️ Pocket Status: Critical Condition 💸<br>Please order extra fries instead 😂";

        } else {

            warning.innerHTML =
            "✅ Excellent choice! My wallet approves. 😎";

        }

    });

});

contractBtn.addEventListener("click", () => {

    if (selectedFood === "") {

        alert("🍕 Please choose something first!");

        return;

    }

    showStep("step7");

    startContract();

});

/* ==========================================
      STEP 7 LOADING
========================================== */

const progress = document.getElementById("progress");
const loadingText = document.getElementById("loadingText");
const contract = document.getElementById("contract");

const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");
const finalFood = document.getElementById("finalFood");

function startContract(){

    progress.style.width="0%";

    contract.style.display="none";

    const texts=[

        "Generating Contract... 📄",

        "Syncing Google Calendar... 📅",

        "Checking Romance Level... 💖",

        "Preparing Date Plan... 🥰",

        "Success! 🎉"

    ];

    let value=0;

    let i=0;

    loadingText.innerHTML=texts[0];

    const timer=setInterval(()=>{

        value+=20;

        progress.style.width=value+"%";

        if(i<texts.length-1){

            i++;

            loadingText.innerHTML=texts[i];

        }

        if(value>=100){

            clearInterval(timer);

            setTimeout(()=>{

                finalDate.innerHTML=selectedDate;
                finalTime.innerHTML=selectedTime;
                finalFood.innerHTML=selectedFood;

                contract.style.display="block";

                launchConfetti();

                launchFireworks();
 
                startLoveMeter();

            },500);

        }

    },500);

}
/* ==========================================
      COPY PLAN
========================================== */

const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", async () => {

    const plan = `💖 It's a Date!

📅 Date: ${selectedDate}
🕒 Time: ${selectedTime}
🍕 Food: ${selectedFood}

No cancellation allowed 😤

Penalty:
💪 100 Pull-ups
OR
🍔 Buy the next 3 meals 😂`;

    try{

        await navigator.clipboard.writeText(plan);

        alert("✅ Plan copied successfully!");

    }catch{

        alert(plan);

    }

});


/* ==========================================
      WHATSAPP SHARE
========================================== */

const whatsappBtn=document.getElementById("whatsappBtn");

whatsappBtn.addEventListener("click",()=>{

const msg=encodeURIComponent(

`💖 It's a Date!

📅 ${selectedDate}

🕒 ${selectedTime}

🍕 ${selectedFood}

Let's make it memorable! ❤️`

);

window.open(

"https://wa.me/?text="+msg,

"_blank"

);

});


/* ==========================================
      CONFETTI
========================================== */

function launchConfetti(){

for(let i=0;i<100;i++){

const confetti=document.createElement("div");

confetti.innerHTML=Math.random()>0.5?"🎉":"💖";

confetti.style.position="fixed";

confetti.style.left=Math.random()*100+"vw";

confetti.style.top="-30px";

confetti.style.fontSize=(18+Math.random()*18)+"px";

confetti.style.pointerEvents="none";

confetti.style.zIndex="9999";

document.body.appendChild(confetti);

const duration=2500+Math.random()*2000;

confetti.animate([

{

transform:"translateY(0) rotate(0deg)",

opacity:1

},

{

transform:`translateY(${window.innerHeight+100}px) rotate(${720+Math.random()*720}deg)`,

opacity:0

}

],{

duration:duration,

easing:"linear"

});

setTimeout(()=>{

confetti.remove();

},duration);

}

}


/* ==========================================
      SHOW CONFETTI
========================================== */

const observer=new MutationObserver(()=>{

if(contract.style.display==="block"){

launchConfetti();

}

});

observer.observe(contract,{

attributes:true,

attributeFilter:["style"]

});


/* ==========================================
      END DOMCONTENTLOADED
========================================== */

});
/* =====================================
      AI LOVE METER
===================================== */

function startLoveMeter(){

const fill=document.getElementById("loveFill");

const percent=document.getElementById("lovePercent");

const text=document.getElementById("loveText");

let value=0;

const messages=[

"Scanning heart frequency... ❤️",

"Checking eye contact... 👀",

"Calculating chemistry... 🥺",

"Consulting Cupid... 🏹",

"Perfect Match Found! 💖"

];

let msg=0;

const timer=setInterval(()=>{

value++;

fill.style.width=value+"%";

percent.innerHTML=value+"%";

if(value%20===0 && msg<messages.length){

text.innerHTML=messages[msg];

msg++;

}

if(value>=97){

clearInterval(timer);

text.innerHTML="💍 AI says: You two are dangerously cute together.";

}

/* =====================================
   PREMIUM FIREWORKS
===================================== */

function launchFireworks(){

const colors=[

"#ff4f94",

"#ff9ec7",

"#FFD93D",

"#7ED957",

"#5DA9FF",

"#A66CFF"

];

for(let i=0;i<40;i++){

const fw=document.createElement("div");

fw.className="firework";

fw.style.left=Math.random()*100+"vw";

fw.style.top=Math.random()*70+"vh";

fw.style.background=

colors[Math.floor(Math.random()*colors.length)];

document.body.appendChild(fw);

setTimeout(()=>{

fw.remove();

},1700);

}

const flash=document.createElement("div");

flash.className="flash";

document.body.appendChild(flash);

setTimeout(()=>{

flash.remove();

},500);

}},30);

}/* =====================================
   BACKGROUND EFFECTS
===================================== */

const balloons=document.getElementById("balloons");
const stars=document.getElementById("stars");
const petals=document.getElementById("petals");

/* Balloons */

function createBalloon(){

const balloon=document.createElement("div");

balloon.className="balloon";

const list=["🎈","🎈","🎈","🎈","🎉"];

balloon.innerHTML=list[
Math.floor(Math.random()*list.length)
];

balloon.style.left=Math.random()*100+"vw";

balloon.style.animationDuration=
(8+Math.random()*6)+"s";

balloons.appendChild(balloon);

setTimeout(()=>{

balloon.remove();

},14000);

}

setInterval(createBalloon,2200);

/* Petals */

function createPetal(){

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=
(6+Math.random()*4)+"s";

petals.appendChild(petal);

setTimeout(()=>{

petal.remove();

},10000);

}

setInterval(createPetal,900);

/* Stars */

for(let i=0;i<40;i++){

const star=document.createElement("div");

star.className="star";

star.innerHTML="✨";

star.style.left=Math.random()*100+"vw";

star.style.top=Math.random()*100+"vh";

star.style.animationDelay=
Math.random()*2+"s";

stars.appendChild(star);

}
/* =====================================
   STEP PROGRESS
===================================== */

function updateStepProgress(step){

const percent=Math.round((step/7)*100);

document.getElementById("stepLabel").innerHTML=
`Step ${step} of 7`;

document.getElementById("stepPercent").innerHTML=
percent+"%";

document.getElementById("stepProgressFill").style.width=
percent+"%";

}