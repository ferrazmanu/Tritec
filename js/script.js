// FORM LOGIC
const telefoneInput = document.getElementById("telefone");

const telefoneMask = IMask(telefoneInput, {
  mask: ["(00) 0000-0000", "(00) 00000-0000"],
});

const CNPJInput = document.getElementById("cnpj");

const CNPJInputMask = IMask(CNPJInput, {
  mask: ["00.000.000/0000-00"],
});

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cleanCNPJValue = cnpjInput.masked.unmaskedValue;

  const nome = form.nome.value;
  const empresa = form.empresa.value;
  const cnpj = form.cnpj.value;
  const cidade = form.cidade.value;
  const telefone = form.telefone.value;
  const email = form.email.value;

  console.log({ nome, empresa, cnpj, cidade, telefone, email });

  alert("Formulário enviado com sucesso!");
  form.reset();
});

// CAROUSEL LOGIC
const swiper = new Swiper(".swiper", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ANIMATION LOGIC
function setupAnimationObserver(
  triggerClass,
  animationClass,
  options = { threshold: 0.1 }
) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      }
    });
  }, options);

  const elements = document.querySelectorAll(`.${triggerClass}`);
  elements.forEach((el) => observer.observe(el));
}

setupAnimationObserver("animate-from-left", "animation-from-left-start");
setupAnimationObserver("animate-from-bottom", "animation-from-bottom-start");
setupAnimationObserver("animate-open", "animation-open");
