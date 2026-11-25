const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");
const cartCount = document.querySelector("#cart-count");
const cartLink = document.querySelector(".cart-link");
const cartMessage = document.querySelector("#cart-message");
const products = [...document.querySelectorAll(".product")];
const collectionFilters = document.querySelector(".collection-filters");
let itemCount = 0;
let messageTimeout;

document.querySelectorAll(".rating ion-icon").forEach((star) => {
  star.setAttribute("name", "star");
});

products.forEach((product) => {
  const name = product.querySelector(":scope > p").textContent.trim();
  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-button";
  favoriteButton.type = "button";
  favoriteButton.textContent = "♡";
  favoriteButton.setAttribute("aria-label", `Save ${name} to your wishlist`);
  favoriteButton.setAttribute("aria-pressed", "false");
  product.append(favoriteButton);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  siteNavigation.classList.toggle("is-open", !isOpen);
});

siteNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    siteNavigation.classList.remove("is-open");
  }
});

collectionFilters.addEventListener("click", (event) => {
  const filterButton = event.target.closest(".filter-chip");
  if (!filterButton) return;

  const filter = filterButton.dataset.filter;
  collectionFilters.querySelectorAll(".filter-chip").forEach((button) => {
    const isActive = button === filterButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  products.forEach((product) => {
    product.hidden = filter !== "all" && product.dataset.category !== filter;
  });

  document
    .querySelectorAll(".images-4, .next-4-images, .last-4-images")
    .forEach((grid) => {
      grid.hidden = !grid.querySelector(".product:not([hidden])");
    });
});

document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    const productName = button
      .closest(".product")
      .querySelector(":scope > p")
      .textContent.trim();
    button.setAttribute("aria-pressed", String(!isSaved));
    button.setAttribute(
      "aria-label",
      `${isSaved ? "Save" : "Remove"} ${productName} ${
        isSaved ? "to" : "from"
      } your wishlist`,
    );
    button.textContent = isSaved ? "♡" : "♥";
    cartMessage.textContent = isSaved
      ? `${productName} removed from your wishlist`
      : `${productName} saved to your wishlist`;
    cartMessage.hidden = false;
    window.clearTimeout(messageTimeout);
    messageTimeout = window.setTimeout(() => {
      cartMessage.hidden = true;
    }, 2400);
  });
});

document.querySelectorAll(".shop").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    itemCount += 1;
    cartCount.textContent = String(itemCount);
    cartLink.setAttribute(
      "aria-label",
      `Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`,
    );
    cartMessage.textContent = `${
      button.closest(".product").querySelector(":scope > p").textContent
    } added to your bag`;
    cartMessage.hidden = false;
    window.clearTimeout(messageTimeout);
    messageTimeout = window.setTimeout(() => {
      cartMessage.hidden = true;
    }, 2400);
  });
});
