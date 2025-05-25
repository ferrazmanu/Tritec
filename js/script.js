const API_URL = "https://api-tritec.criativocosmos.com";
const IMAGE_URL = "https://painel-tritec.criativocosmos.com/uploads";

// FORM
const phoneInput = document.getElementById("telefone");

const phoneMask = IMask(phoneInput, {
  mask: ["(00) 0000-0000", "(00) 00000-0000"],
});

const CNPJInput = document.getElementById("cnpj");

const CNPJInputMask = IMask(CNPJInput, {
  mask: ["00.000.000/0000-00"],
});

const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cleanCNPJValue = CNPJInputMask.unmaskedValue;
  const cleanPhoneValue = phoneMask.unmaskedValue;

  const body = {
    name: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    phone: cleanPhoneValue,
    subject: "Cadastro Revendedor Tritec",
    estado: document.getElementById("cidade").value.split("/")[1]?.trim() || "",
    cnpj: cleanCNPJValue,
    nomeEmpresa: document.getElementById("empresa").value,
    cidade: document.getElementById("cidade").value.split("/")[0]?.trim() || "",
  };

  try {
    const response = await fetch(`${API_URL}/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      showToast(
        "Solicitação enviada com sucesso! Em breve entraremos em contato!"
      );
      form.reset();
    } else {
      showToast("Erro ao enviar. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro de conexão. Verifique sua internet ou tente mais tarde.");
  }
});

// ANIMATION
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

// FETCH INFO

async function fetchInfo() {
  try {
    const response = await fetch(`${API_URL}/pages/home`);
    const data = await response.json();

    //HEAD INFO
    const headData = data.head;

    document.title = `Tritec | ${headData.pageTitle}`;

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = headData.metaDescription;
    document.head.appendChild(metaDescription);

    if (headData.imageOpenGraph) {
      const metaOG = document.createElement("meta");
      metaOG.setAttribute("property", "og:image");
      metaOG.content = headData.imageOpenGraph;
      document.head.appendChild(metaOG);
    }

    // if (headData.headScripts) {
    //   const script = document.createElement("script");
    //   script.text = headData.headScripts;
    //   document.head.appendChild(script);
    // }

    //TESTIMONIALS INFO
    const testimonials = data.depoimentos;
    const wrapper = document.getElementById("testimonials-wrapper");

    testimonials.forEach((item) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const imgSrc = `${IMAGE_URL}/${item.imagem}`;

      slide.innerHTML = `
        <div class="testimonial-box">
          <div class="title">
            <div class="image">
              <img src="${imgSrc}" alt="${item.titulo}" />
            </div>
            <div class="name">
              <span>${item.titulo}</span>
            </div>
          </div>
          <div class="testimonial-text">
            ${item.descricao}
          </div>
        </div>
      `;

      wrapper.appendChild(slide);
    });

    new Swiper(".swiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar dados do head:", error);
  }
}

fetchInfo();

// TOAST
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
