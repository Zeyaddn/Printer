window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease";
      setTimeout(() => loader.style.display = "none", 500);
    }, 5000); 
  });




  const fileInput = document.getElementById("fileInput");
  const fileInfo = document.getElementById("fileInfo");
  const removeBtn = document.getElementById("removeBtn");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      fileInfo.textContent = ` ${file.name} تم التحميل الملف بنجاح`;
      removeBtn.style.display = "inline-block";
    }
  });

  removeBtn.addEventListener("click", () => {
    fileInput.value = ""; // يمسح الملف من input
    fileInfo.textContent = "";
    removeBtn.style.display = "none";
  });





