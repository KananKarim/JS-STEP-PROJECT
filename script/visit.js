import { Input } from "./modal.js";

export function Visit({
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
      <div class="card size border border-1 rounded-2 card-item" data-id="${this.visitID}" id="id-${this.visitID}">
        <div class="card-header d-flex justify-content-between">
          ${this.visitDoctor}<button class="btn-close" type="button" aria-label="Close"></button>
        </div>

        <div class="card-body">
          <h5>${this.visitTitle}</h5>
          <p class="card-text">${this.visitDesc}</p>

          <ul class="list-group list-group-flush">
            <li class="list-group-item card-patient"><strong>Patient</strong>: ${this.visitPatient}</li>
            <li class="list-group-item card-status"><strong>Status</strong>: ${this.visitStatus}</li>
            <li class="list-group-item card-priority"><strong>Priority</strong>: ${this.visitPriority}</li>
          </ul>
        </div>

        <div class="card-footer">
          <button class="btn btn-primary btn-sm" type="button" id="btn-details">Details</button
          ><button class="btn btn-primary btn-sm d-none" type="button" id="btn-less">Less</button
          ><button class="btn btn-secondary btn-sm ms-1" type="button" id="btn-edit">Edit</button>
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
  Visit.call(this, {
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

    const visitBlood = new Input({
      type: "text",
      classes: "form-control",
      id: "visitBlood1",
      name: "Blood Presure",
    });
    const visitWeight = new Input({
      type: "text",
      classes: "form-control",
      id: "visitWeight1",
      name: "Weight Index",
    });
    const visitDisease = new Input({
      type: "text",
      classes: "form-control",
      id: "visitDisease1",
      name: "Heart Disease",
    });
    const visitAge = new Input({
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
  Visit.call(this, {
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

    const visitLastVisitDate = new Input({
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
  Visit.call(this, {
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

    const visitAge = new Input({
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

export const visitDoctors = ["Dentist", "Cardiologist", "Therapist"];
export const visitPriorities = ["High", "Normal", "Low"];
export const visitStatuses = ["Open", "Done"];
