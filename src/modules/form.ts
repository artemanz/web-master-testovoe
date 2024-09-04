import { sendForm } from "@/api/sendForm";
import IMask from "imask";

const $modal = document.querySelector<HTMLElement>('[data-selector="modal"]')!;

const $registerForm = document.querySelector<HTMLFormElement>(
  '[data-selector="register-form"]',
)!;

const $formSubmitButton = document.querySelector<HTMLButtonElement>(
  '[data-selector="form-submit-button"]',
)!;

const $nameInput = {
  input: document.querySelector<HTMLInputElement>(
    '[data-selector="name-input"]',
  )!,
  message: document.querySelector<HTMLElement>(
    '[data-selector="name-input-msg"]',
  )!,
};
const $siteInput = {
  input: document.querySelector<HTMLInputElement>(
    '[data-selector="site-input"]',
  )!,
  message: document.querySelector<HTMLElement>(
    '[data-selector="site-input-msg"]',
  )!,
};

const $phoneInput = {
  input: document.querySelector<HTMLInputElement>(
    '[data-selector="phone-input"]',
  )!,
  message: document.querySelector<HTMLElement>(
    '[data-selector="phone-input-msg"]',
  )!,
};

const $personalDataCheck = document.querySelector<HTMLInputElement>(
  '[data-selector="personal-data-check"]',
)!;

const inputsArray = [$nameInput, $siteInput, $phoneInput];

const validateInputs = () => {
  const validPatterns = {
    name: /^[\p{L} ]+$/u,
    site: /.*/,
    phone: /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/,
  };

  const nameValue = $nameInput.input.value;
  const siteValue = $siteInput.input.value;
  const phoneValue = $phoneInput.input.value;
  const isNameValid =
    validPatterns.name.test(nameValue) && nameValue.length > 3;
  const isSiteValid =
    validPatterns.site.test(siteValue) && siteValue.length > 3;
  const isPhoneValid = validPatterns.phone.test(phoneValue);

  if (!isNameValid) $nameInput.message.style.display = "block";
  if (!isSiteValid) $siteInput.message.style.display = "block";
  if (!isPhoneValid) $phoneInput.message.style.display = "block";

  if (isNameValid && isSiteValid && isPhoneValid) {
    return true;
  } else {
    return false;
  }
};

const blurHandler = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.value = target.value.trim();
  target.value = target.value.replace(/ {2,}/g, " ");
};

const changeHandler = (target: {
  input: HTMLInputElement;
  message: HTMLElement;
}) => {
  target.message.style.display = "none";
};

const checkboxHandler = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) $formSubmitButton.disabled = false;
  else $formSubmitButton.disabled = true;
};

const submitHandler = async (e: Event) => {
  e.preventDefault();
  const data = {
    name: $nameInput.input.value,
    site: $siteInput.input.value,
    phone: $phoneInput.input.value,
  };

  const isInputsValid = validateInputs();

  if (isInputsValid) {
    $formSubmitButton.disabled = true;

    const res = await sendForm(data);

    if (!res.error) {
      $registerForm.reset();
      alert("Ваше обращение принято!");
      $modal.style.display = "none";
    } else {
      alert(res.error);
    }

    $formSubmitButton.disabled = false;
  }
};

export const initForm = () => {
  $formSubmitButton.disabled = true;

  IMask($phoneInput.input, {
    mask: "+{7} (000) 000-00-00",
  });

  inputsArray.forEach((input) => {
    input.input.addEventListener("blur", (e) => blurHandler(e));
    input.input.addEventListener("input", () => changeHandler(input));
  });

  $registerForm.addEventListener("submit", submitHandler);
  $personalDataCheck.addEventListener("change", checkboxHandler);
};
