// const URL="https://cat-fact.herokuapp.com/facts";
// const factPara=document.querySelector("p");
// const btn=document.querySelector("#btn");

// const getFacts=async ()=>{
//     console.log("getting data....");
//     let response=await fetch(URL);
//     // console.log(response);//JSON format
//     data=await response.json();
//     console.log(data);
//     factPara.innerText=data[2].text;
// }

// function getFacts(){
//     fetch(URL)
//     .then((response)=>{
//         return response.json();
//     })
//     .then((data)=>{
//         console.log(data);
//         factPara.innerText=data[2].text;
//     })
// }

// btn.addEventListener("click",getFacts);




// ---------------------------------------------------

const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies/";


const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");




const updateExhangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    json = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    console.log(json);
    let response=await fetch(json);
    console.log(response);
    let data=await response.json();
    console.log(data);
    rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value}= ${finalAmt} ${toCurr.value}`;
}




for(let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);//target is where the change has occured
})
}


const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newSrc;
}



btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExhangeRate();
});


window.addEventListener("load",()=>{
    updateExhangeRate();
})