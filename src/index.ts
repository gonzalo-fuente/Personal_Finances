import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { HasFormatter } from "./interfaces/HasFormatter.js";

const form = document.querySelector(".new-item-form") as HTMLFormElement;

// inputs
const type = document.querySelector("#type") as HTMLInputElement;
const tofrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

// list template instance
const ul = document.querySelector("ul")!;
const list = new ListTemplate(ul);

// errors
const error = document.querySelector("#error") as HTMLDivElement;

// delete list item
ul.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLDivElement;
  if (target.className == "delete") {
    const li = target.parentElement as HTMLLIElement;
    const ul = li.parentNode as HTMLUListElement;
    ul.removeChild(li);
  }
});

// form submit
form.addEventListener("submit", (e: Event) => {
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

  let values: [string, string, number];
  values = [tofrom.value, details.value, amount.valueAsNumber];

  let doc: HasFormatter;
  if (type.value === "invoice") {
    doc = new Invoice(...values);
  } else {
    doc = new Payment(...values);
  }

  list.render(doc, type.value, "end");

  //Reset inputs
  tofrom.value = "";
  details.value = "";
  amount.value = "";
  if (document.querySelector(".error")) {
    error.removeChild(document.querySelector(".error")!);
  }
});
