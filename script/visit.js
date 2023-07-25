import { Int } from "./modal.js";

export function Visitor({
  id: visitID,
  doctor: visitDoctor,
  title: visitTitle,
  description: visitDesc,
  visitStatus = "Open",
  visitPriority = "Normal",
  visitPatient = "Patient",
}) {
  this.visitID = visitID;
  this.visitDoctor = visitDoctor;
  this.visitTitle = visitTitle;
  this.visitDesc = visitDesc;
  this.visitStatus = visitStatus;
  this.visitPriority = visitPriority;
  this.visitPatient = visitPatient;

  this.render = function () {
    const visitCardWrapperElem = document.createElement("div");

    const visitCardHTML = `
      <div class="card size border border-success border-3 rounded-2 card-item" data-id="${this.visitID}" id="id-${this.visitID}">
        <div class="card-header d-flex justify-content-between">
          ${this.visitDoctor}<button class="btn-close" type="button" aria-label="Close"></button>
        </div>

        <div class="card-body">
          <h5 class="text-primary">${this.visitTitle}</h5>
          <p class="card-text text-info">${this.visitDesc}</p>

          <ul class="list-group list-group-flush">
            <li class="list-group-item text-success card-patient"><strong>Patient</strong>: ${this.visitPatient}</li>
            <li class="list-group-item card-status"><strong>Status</strong>: ${this.visitStatus}</li>
            <li class="list-group-item card-priority"><strong>Priority</strong>: ${this.visitPriority}</li>
          </ul>
        </div>

        <div class="card-footer">
          <button class="btn btn-success btn-sm" type="button" id="btn-details">Details</button>
          <button class="btn btn-success btn-sm d-none" type="button" id="btn-less">Less</button
          ><button class="btn btn-info btn-sm ms-1" type="button" id="btn-edit">Edit</button>
        </div>
      </div>
    `;

    visitCardWrapperElem.insertAdjacentHTML("afterbegin", visitCardHTML);

    return visitCardWrapperElem.firstElementChild;
  };
}

export function Cardiologist({
  id: visitID,
  doctor: visitDoctor,
  title: visitTitle,
  description: visitDesc,
  visitStatus,
  visitPriority,
  visitPatient,
  visitBlood,
  visitWeight,
  visitDisease,
  visitAge,
}) {
  Visitor.call(this, {
    id: visitID,
    doctor: visitDoctor,
    title: visitTitle,
    description: visitDesc,
    visitStatus,
    visitPriority,
    visitPatient,
  });
  this.visitBlood = visitBlood;
  this.visitWeight = visitWeight;
  this.visitDisease = visitDisease;
  this.visitAge = visitAge;

  this.renderDetails = function () {
    const visitUlCardHTML = document.querySelector(
      `#id-${this.visitID} .list-group`
    );
    const btnDetail = document.querySelector(
      `#id-${this.visitID} #btn-details`
    );
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.add("d-none");
    btnLess.classList.remove("d-none");

    const visitDetailsHTML = `
      <li class="list-group-item card-blood"><strong>Blood Pressure</strong>: ${this.visitBlood}</li>
      <li class="list-group-item card-weight"><strong>Weight Index</strong>: ${this.visitWeight}</li>
      <li class="list-group-item card-disease"><strong>Heart Disease</strong>: ${this.visitDisease}</li>
      <li class="list-group-item card-age"><strong>Patient's age</strong>: ${this.visitAge}</li>
    `;

    visitUlCardHTML.insertAdjacentHTML("beforeend", visitDetailsHTML);
  };

  this.renderLess = function () {
    const visitUlCardHTML = document.querySelector(
      `#id-${this.visitID} .list-group`
    );
    const btnDetail = document.querySelector(
      `#id-${this.visitID} #btn-details`
    );
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.remove("d-none");
    btnLess.classList.add("d-none");

    document.querySelector(`#id-${this.visitID} .card-blood`).remove();
    document.querySelector(`#id-${this.visitID} .card-weight`).remove();
    document.querySelector(`#id-${this.visitID} .card-disease`).remove();
    document.querySelector(`#id-${this.visitID} .card-age`).remove();
  };

  this.renderNewForm = function () {
    const btnSubmit = document.querySelector("#btn-submit-newVisit");
    do {
      if (btnSubmit.previousSibling.id !== "visitPatient1") {
        btnSubmit.previousSibling.remove();
      }
    } while (btnSubmit.previousSibling.id !== "visitPatient1");

    const visitBlood = new Int({
      type: "text",
      classes: "form-control",
      id: "visitBlood1",
      name: "Blood Presure",
    });
    const visitWeight = new Int({
      type: "text",
      classes: "form-control",
      id: "visitWeight1",
      name: "Weight Index",
    });
    const visitDisease = new Int({
      type: "text",
      classes: "form-control",
      id: "visitDisease1",
      name: "Heart Disease",
    });
    const visitAge = new Int({
      type: "text",
      classes: "form-control",
      id: "visitAge1",
      name: "Patient's Age",
    });

    btnSubmit.before(visitBlood.render().label);
    btnSubmit.before(visitBlood.render().input);
    btnSubmit.before(visitWeight.render().label);
    btnSubmit.before(visitWeight.render().input);
    btnSubmit.before(visitDisease.render().label);
    btnSubmit.before(visitDisease.render().input);
    btnSubmit.before(visitAge.render().label);
    btnSubmit.before(visitAge.render().input);
  };
}

export function Dentist({
  id: visitID,
  doctor: visitDoctor,
  title: visitTitle,
  description: visitDesc,
  visitStatus,
  visitPriority,
  visitPatient,
  visitLastVisitDate,
}) {
  Visitor.call(this, {
    id: visitID,
    doctor: visitDoctor,
    title: visitTitle,
    description: visitDesc,
    visitStatus,
    visitPriority,
    visitPatient,
  });
  this.visitLastVisitDate = visitLastVisitDate;

  this.renderDetails = function () {
    const visitUlCardHTML = document.querySelector(
      `#id-${this.visitID} .list-group`
    );
    const btnDetail = document.querySelector(
      `#id-${this.visitID} #btn-details`
    );
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.add("d-none");
    btnLess.classList.remove("d-none");

    const visitDetailsHTML = `
      <li class="list-group-item card-lastdate"><strong>Last Visit Date</strong>: ${this.visitLastVisitDate}</li>
    `;

    visitUlCardHTML.insertAdjacentHTML("beforeend", visitDetailsHTML);
  };

  this.renderLess = function () {
    const visitUlCardHTML = document.querySelector(
      `#id-${this.visitID} .list-group`
    );
    const btnDetail = document.querySelector(
      `#id-${this.visitID} #btn-details`
    );
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.remove("d-none");
    btnLess.classList.add("d-none");

    document.querySelector(`#id-${this.visitID} .card-lastdate`).remove();
  };

  this.renderNewForm = function () {
    const btnSubmit = document.querySelector("#btn-submit-newVisit");
    do {
      if (btnSubmit.previousSibling.id !== "visitPatient1") {
        btnSubmit.previousSibling.remove();
      }
    } while (btnSubmit.previousSibling.id !== "visitPatient1");

    const visitLastVisitDate = new Int({
      type: "text",
      classes: "form-control",
      id: "visitLastVisitDate1",
      name: "Last Visit Date",
    });

    btnSubmit.before(visitLastVisitDate.render().label);
    btnSubmit.before(visitLastVisitDate.render().input);
  };
}

export function Therapist({
  id: visitID,
  doctor: visitDoctor,
  title: visitTitle,
  description: visitDesc,
  visitStatus,
  visitPriority,
  visitPatient,
  visitAge,
}) {
  Visitor.call(this, {
    id: visitID,
    doctor: visitDoctor,
    title: visitTitle,
    description: visitDesc,
    visitStatus,
    visitPriority,
    visitPatient,
  });
  this.visitAge = visitAge;

  this.renderDetails = function () {
    const visitUlCardHTML = document.querySelector(
      `#id-${this.visitID} .list-group`
    );
    const btnDetail = document.querySelector(
      `#id-${this.visitID} #btn-details`
    );
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.add("d-none");
    btnLess.classList.remove("d-none");

    const visitDetailsHTML = `
      <li class="list-group-item card-age"><strong>Patient's age</strong>: ${this.visitAge}</li>
    `;

    visitUlCardHTML.insertAdjacentHTML("beforeend", visitDetailsHTML);
  };

  this.renderLess = function () {
    const visitUlCardHTML = document.querySelector(
      `#id-${this.visitID} .list-group`
    );
    const btnDetail = document.querySelector(
      `#id-${this.visitID} #btn-details`
    );
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.remove("d-none");
    btnLess.classList.add("d-none");

    document.querySelector(`#id-${this.visitID} .card-age`).remove();
  };

  this.renderNewForm = function () {
    const btnSubmit = document.querySelector("#btn-submit-newVisit");
    do {
      if (btnSubmit.previousSibling.id !== "visitPatient1") {
        btnSubmit.previousSibling.remove();
      }
    } while (btnSubmit.previousSibling.id !== "visitPatient1");

    const visitAge = new Int({
      type: "text",
      classes: "form-control",
      id: "visitAge1",
      name: "Patient's Age",
    });

    btnSubmit.before(visitAge.render().label);
    btnSubmit.before(visitAge.render().input);
  };
}

export const doctors = {
  dentist: Dentist,
  cardiologist: Cardiologist,
  therapist: Therapist,
};

export const visitdoctor = ["Dentist", "Cardiologist", "Therapist"];
export const visitpriority = ["High", "Normal", "Low"];
export const visitstatus = ["Open", "Done"];
