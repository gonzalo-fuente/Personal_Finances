import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
import { ListTemplate } from "./classes/ListTemplate.js";
const form = document.querySelector(".new-item-form");
// inputs
const type = document.querySelector("#type");
const tofrom = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
// list template instance
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
// errors
const error = document.querySelector("#error");
// delete list item
ul.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className == "delete") {
        const li = target.parentElement;
        const ul = li.parentNode;
        ul.removeChild(li);
    }
});
// form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!tofrom.value || !details.value || !amount.value) {
        if (document.querySelector(".error")) {
            return;
        }
        const p = document.createElement("p");
        p.innerText = "*All fields are required";
        p.classList.add("error");
        error.appendChild(p);
        return;
    }
    let values;
    values = [tofrom.value, details.value, amount.valueAsNumber];
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    list.render(doc, type.value, "end");
    //Reset inputs
    tofrom.value = "";
    details.value = "";
    amount.value = "";
    if (document.querySelector(".error")) {
        error.removeChild(document.querySelector(".error"));
    }
});
