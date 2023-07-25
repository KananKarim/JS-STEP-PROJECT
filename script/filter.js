export default function () {
  const filter = document.querySelector(".filter");

  const showFilteredCards = (title, status, priority) => {
    const cards = document.querySelectorAll(".card-item");

    for (const card of cards) {
      const cardTitle = card.querySelector("h5").innerText.toLowerCase();
      const cardStatus = card
        .querySelector(".card-status")
        .innerText.toLowerCase();
      const cardPriority = card
        .querySelector(".card-priority")
        .innerText.toLowerCase();

      if (
        (!title || cardTitle.includes(title)) &&
        (!status || cardStatus.includes(status)) &&
        (!priority || cardPriority.includes(priority))
      ) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  };

  filter.addEventListener("change", (e) => {
    const form = e.currentTarget;
    const inputElem = form.querySelector("#title-search");
    const title = inputElem.value;

    const statusElem = form.querySelector("#status-search");
    const status = statusElem.value.toLowerCase();

    const priorityElem = form.querySelector("#priority-search");
    const priority = priorityElem.value.toLowerCase();

    showFilteredCards(title, status, priority);
  });

  filter.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
