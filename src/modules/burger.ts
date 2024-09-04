const $headerBurger = document.querySelector<HTMLElement>(
  "[data-selector=header-burger]",
)!;
const $headerMobileMenu = document.querySelector<HTMLElement>(
  "[data-selector=header-mobile-menu]",
)!;

export const initHeaderBurger = () => {
  const handlePageClick = () => {
    $headerMobileMenu.classList.replace("-visible", "-hidden");
    document.removeEventListener("click", handlePageClick);
  };

  const showMobileMenu = () => {
    $headerMobileMenu.classList.replace("-hidden", "-visible");
    setTimeout(() => {
      document.addEventListener("click", handlePageClick);
    });
  };

  const hideMobileMenu = () => {
    $headerMobileMenu.classList.replace("-visible", "-hidden");
    document.removeEventListener("click", handlePageClick);
  };

  if (
    !$headerMobileMenu.classList.contains("-visible") &&
    !$headerMobileMenu.classList.contains("-hidden")
  )
    $headerMobileMenu.classList.add("-hidden");

  if ($headerMobileMenu.classList.contains("-visible"))
    document.addEventListener("click", handlePageClick);

  $headerBurger.addEventListener("click", () => {
    if ($headerMobileMenu.classList.contains("-hidden")) showMobileMenu();
    else hideMobileMenu();
  });
};
