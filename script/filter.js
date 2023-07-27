export default function () {
  const filter = document.querySelector(".filter");

  const displayCards = (title, status, priority) => {
  const cards = document.querySelectorAll(".card-item");

  const filteredCards = cards.filter((card) => {
    const cardTitle = card.querySelector("h5").innerText.toLowerCase();
    const cardStatus = card
      .querySelector(".card-status")
      .innerText.toLowerCase();
    const cardPriority = card
      .querySelector(".card-priority")
      .innerText.toLowerCase();

    return (
      (!title || cardTitle.includes(title)) &&
      (!status || cardStatus.includes(status)) &&
      (!priority || cardPriority.includes(priority))
    );
  });

  filteredCards.forEach((card) => {
    card.style.display = "";
  });
};

  filter.addEventListener("change", (e) => {
    const form = e.currentTarget;
    const inputElem = form.querySelector("#title-search");
    const title = inputElem.value;

    const statusElem = form.querySelector("#status-search");
    const status = statusElem.value.toLowerCase();

    const priorityElem = form.querySelector("#priority-search");
    const priority = priorityElem.value.toLowerCase();

    displayCards(title, status, priority);
  });

  filter.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
