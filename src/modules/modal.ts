const $modalTrigger = document.querySelector<HTMLButtonElement>(
  '[data-selector="form-modal-trigger"]',
)!;

const $modal = document.querySelector<HTMLElement>('[data-selector="modal"]')!;

const $modalClose = document.querySelector<HTMLElement>(
  '[data-selector="modal-close"]',
)!;
const $modalBackdrop = document.querySelector<HTMLElement>(
  '[data-selector="modal-backdrop"]',
)!;

const hideModal = () => ($modal.style.display = "none");
const showModal = () => ($modal.style.display = "grid");

export const initModal = () => {
  $modalTrigger.addEventListener("click", showModal);
  $modalClose.addEventListener("click", hideModal);
  $modalBackdrop.addEventListener("click", hideModal);
};
