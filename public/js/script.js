(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Index page

let taxSwitch = document.getElementById("switchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (tax of taxInfo) {
    if (tax.style.display != "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
  }
});

const filterScroll = document.querySelector(".filter-scroll");
const leftArrow = document.querySelector(".filter-left");
const rightArrow = document.querySelector(".filter-right");

rightArrow.addEventListener("click", () => {
  filterScroll.scrollBy({
    left: 300,
    behavior: "smooth"
  });
});

leftArrow.addEventListener("click", () => {
  filterScroll.scrollBy({
    left: -300,
    behavior: "smooth"
  });
});

