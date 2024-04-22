const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdownContainer select");
const flags = document.querySelectorAll(".img");
const exchangeBtn = document.querySelector(".exchangeBtn");


for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc =  `https://flagsapi.com/${countryCode}/shiny/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
}

exchangeBtn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amountContainer input");
    let amountValue = amount.value;
    if(amountValue < 0){
        amountValue = 1;
        amount.value = 1;
    }
    let fromcurr = document.querySelector(".from select").value.toLowerCase();
    let tocurr = document.querySelector(".to select").value;
    const URL = `https://open.er-api.com/v6/latest/${fromcurr}`;
    let response = await fetch(URL);
    let rates = await response.json();
    rates = rates['rates'];
    let exchnageValue = rates[tocurr];
    let message = document.querySelector(".messageContainer");
    message.innerText = `${amountValue} ${fromcurr.toUpperCase()} = ${(exchnageValue*amountValue).toFixed(2)} ${tocurr}`;
});
