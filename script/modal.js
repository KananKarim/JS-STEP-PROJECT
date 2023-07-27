import { visitdoctor, visitpriority, visitstatus } from "./visit.js";

export function Int({ type, classes, id, name }) {
  const input = document.createElement("input");
  input.classList.add(classes);
  input.id = id;
  input.type = type;

  const label = document.createElement("label");
  label.classList.add("form-label");
  label.setAttribute("for", id);
  label.innerText = name;

  return { label, input };
}

export function Select({ classes, id, name, options }) {
  const select = document.createElement("select");
  select.classList.add(classes);
  select.id = id;
  select.name = name;

  const label = document.createElement("label");
  label.classList.add("form-label");
  label.setAttribute("for", id);
  label.innerText = name;

  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "default");
  defaultOption.innerHTML = "...";
  select.append(defaultOption);

  options.forEach((option) => {
    const elementOption = document.createElement("option");
    elementOption.setAttribute("value", option);
    elementOption.innerHTML = option;
    select.append(elementOption);
  });

  return { label, select };
}

export function Form({ id, classes, action }) {
  this.id = id;
  this.classes = classes;
  this.action = action;

  this.renderAuthorization = function () {
    const inputEmail = Int({
      type: "email",
      classes: "form-control",
      id: "exampleInputEmail1",
      name: "E-mail",
    });
    const inputPassword = Int({
      type: "password",
      classes: "form-control",
      id: "exampleInputPassword1",
      name: "Password",
    });

    let tagForm = document.createElement("form");
    tagForm.classList.add(this.classes);
    tagForm.setAttribute("id", this.id);

  
    let tagButton = document.createElement("button");
    tagButton.classList.add(
      "btn",
      "btn-outline-danger",
      "authorization-btn"
    );
    tagButton.setAttribute("id", "btn-submit");
    tagButton.setAttribute("type", "submit");
    tagButton.innerText = "Submit";
    tagButton.style.marginTop="20px"

    tagForm.append(inputEmail.label);
    tagForm.append(inputEmail.input);
    tagForm.append(inputPassword.label);
    tagForm.append(inputPassword.input);

    tagForm.append(tagButton);

    return tagForm.outerHTML;
  };

  this.renderNewVisit = function () {
    const inputDoctor = Select({
      classes: "form-control",
      id: "doctorList1",
      name: "Doctor",
      options: visitdoctor,
    });
    const inputTitle = Int({
      type: "text",
      classes: "form-control",
      id: "visitTitle1",
      name: "Title",
    });
    const inputDesc = Int({
      type: "text",
      classes: "form-control",
      id: "visitDesc1",
      name: "Description",
    });
    const inputStatus = Select({
      classes: "form-control",
      id: "visitStatus1",
      name: "Status",
      options: visitstatus,
    });
    const inputPriority = Select({
      classes: "form-control",
      id: "visitPriority1",
      name: "Priority",
      options: visitpriority,
    });
    const inputPatient = Int({
      type: "text",
      classes: "form-control",
      id: "visitPatient1",
      name: "Patient",
    });

    let tagForm = document.createElement("form");
    tagForm.classList.add(this.classes);
    tagForm.setAttribute("id", this.id);

    let tagButton = document.createElement("button");
    tagButton.classList.add("btn", "btn-outline-secondary");
    tagButton.setAttribute("id", "btn-submit-newVisit");
    tagButton.setAttribute("type", "submit");
    tagButton.innerText = "Submit";
    

    tagForm.append(inputDoctor.label);
    tagForm.append(inputDoctor.select);
    tagForm.append(inputTitle.label);
    tagForm.append(inputTitle.input);
    tagForm.append(inputDesc.label);
    tagForm.append(inputDesc.input);
    tagForm.append(inputStatus.label);
    tagForm.append(inputStatus.select);
    tagForm.append(inputPriority.label);
    tagForm.append(inputPriority.select);
    tagForm.append(inputPatient.label);
    tagForm.append(inputPatient.input);

    tagForm.append(tagButton);

    return tagForm.outerHTML;
  };
}

export function Modal({ headerModal, closeBtn = false, form }) {
  this.headerModal = headerModal;
  this.closeBtn = closeBtn;
  this.form = form;

  this.attachListener = function () {
    document.body.addEventListener("click", (e) => {
      let modal = e.target.classList.contains("modal");
      let close = e.target.classList.contains("btn-close");
      if ((modal && this.closeBtn) || close) {
        this.close();
      }
    });
  };

  this.close = function () {
    this.background.remove();
    document.body.classList.remove("modal-open");
    document.body.classList.remove("overflow");
    this.modal.remove();
  };

  this.renderBackground = function () {
    this.background = document.createElement("div");
    this.background.classList.add("modal-backdrop");
    document.body.append(this.background);
  };

  this.render = function () {
    document.body.classList.add("modal-open");
    document.body.classList.add("overflow");

    this.modal = document.createElement("div");
    this.modal.classList.add("modal");

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    this.modal.append(modalDialog);

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.append(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.append(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.innerText = this.headerModal;
    modalHeader.append(modalTitle);

    let closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "Close");
    modalHeader.append(closeButton);

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.append(modalBody);

    modalBody.innerHTML = this.form;

    this.modal.style.display = "block";

    this.renderBackground();
    this.attachListener();
    return this.modal;
  };

  this.getToken = function (initBtn, initialEmptyContentTitle, btnToActivate) {
    return new Promise((resolve, reject) => {
      initBtn.addEventListener("click", (e) => {
        const authorizeModalElem = this.render();
        authorizeModalElem.querySelector("#exampleInputEmail1").value =
          "kanan12345@mail.ru";
        authorizeModalElem.querySelector("#exampleInputPassword1").value =
          "1234554321";
        document.body.append(authorizeModalElem);
        initialEmptyContentTitle.style.display = "none";
        const btnSubmit = authorizeModalElem.querySelector("#btn-submit");
        btnSubmit.addEventListener("click", async (e) => {
          e.preventDefault();
          const email = document.querySelector("#exampleInputEmail1").value;
          const pass = document.querySelector("#exampleInputPassword1").value;

          const response = await fetch(
            "https://ajax.test-danit.com/api/v2/cards/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: `${email}`, password: `${pass}` }),
            }
          );

          const token = response.ok ? await response.text() : false;

          if (token) {
            this.close();
            initBtn.style.display = "none";
            btnToActivate.style.display = "block";
            resolve(token);
          } else {
            alert("Incorrect email or password!");
          }
        });
      });
    });
  };
}

export default Modal;
