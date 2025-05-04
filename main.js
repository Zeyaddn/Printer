window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.5s ease";
      setTimeout(() => loader.style.display = "none", 500);
    }, 5000); 
  });

//end Loader

//start Upload File and message and name file

  const fileInput = document.getElementById("fileInput");
  const fileInfo = document.getElementById("fileInfo");
  const removeBtn = document.getElementById("removeBtn");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      fileInfo.textContent = ` ${file.name}  Upload Succesfully  `;
      removeBtn.style.display = "inline-block";
    }
  });

  removeBtn.addEventListener("click", () => {
    fileInput.value = ""; 
    fileInfo.textContent = "";
    removeBtn.style.display = "none";
  });

   // File input name and message
   document.getElementById("fileInput").addEventListener("change", function () {
    const file = this.files[0];
    const info = document.getElementById("fileInfo");
    const removeBtn = document.getElementById("removeBtn");
    if (file) {
      info.textContent = file.name + " Upload Successfully";
      removeBtn.style.display = "block";
    }
  });

  document.getElementById("removeBtn").addEventListener("click", function () {
    const input = document.getElementById("fileInput");
    input.value = "";
    document.getElementById("fileInfo").textContent = "";
    this.style.display = "none";
  });

//end Upload File and message



 //start setting number of paper 
  function showPrintSettings() {
    document.getElementById("uploadSection").style.display = "none";
    document.getElementById("printSettingsSection").style.display = "block";
  }

  function updateCopies(change) {
    const input = document.getElementById("copyCount");
    let value = parseInt(input.value);
    if (value + change >= 1) {
      input.value = value + change;
    }
  }
//end setting number of paper 


 

// Function to handle the Next button click
function nextSection() {
  const fileInput = document.getElementById('fileInput');
  const errorMessage = document.getElementById('errorMessage');

  if (!fileInput.files.length) {
    // Error message with effect
    errorMessage.style.display = 'block';
    errorMessage.classList.remove('slide-out');
    errorMessage.classList.add('slide-in');
  } else {
    // hide error message
    if (errorMessage.classList.contains('slide-in')) {
      errorMessage.classList.remove('slide-in');
      errorMessage.classList.add('slide-out');
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 500);
    }

    // أكمل التنقل
    document.getElementById('uploadSection').classList.add('flip');
    setTimeout(function () {
      document.getElementById('uploadSection').classList.add('hide');
      document.getElementById('printSettingsSection').classList.add('show');
      document.getElementById('uploadSection').style.display = 'none';
      document.getElementById('printSettingsSection').style.display = 'block';
    }, 100); 
  }
}

function closeError() {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.classList.remove('slide-in');
  errorMessage.classList.add('slide-out');
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 500);
}



function goBackToUpload() {
  // إخفاء قسم إعدادات الطباعة
  document.getElementById('printSettingsSection').style.display = 'none';

  // إظهار قسم رفع الملف
  document.getElementById('uploadSection').style.display = '';
  
  // إزالة الكلاسات الإضافية لو كنت ضايف تأثيرات CSS (اختياري)
  document.getElementById('uploadSection').classList.remove('hide');
  document.getElementById('printSettingsSection').classList.remove('show');
}


//===============================end the loader and print setting=================================





  function showPaymentSection() {
    document.getElementById("printSettingsSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "block";
  }

  function goBackToPrintSettings() {
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("printSettingsSection").style.display = "block";
  }



  function updateCopies(change) {
    const copyInput = document.getElementById("copyCount");
    let current = parseInt(copyInput.value);
    current = Math.max(1, current + change);
    copyInput.value = current;
  }






  function processPayment(button) {
    // تعطيل الزر مؤقتًا وعرض التحميل
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';

    setTimeout(() => {
      // تشغيل صوت النجاح
      let sound = document.getElementById("successSound");
      if (sound) sound.play().catch(e => console.log("Sound error:", e));

      // إظهار رسالة النجاح
      const msg = document.getElementById("successMessage");
      msg.style.display = "block";
      msg.classList.add("show");

      // إظهار زر Confirm Order
      document.getElementById("confirmBtn").style.display = "inline-block";

      // تغيير الزر لحالة النجاح
      button.innerHTML = 'Paid ✔️';
    }, 2000);
  }

  function closeSuccess() {
    const msg = document.getElementById("successMessage");
    msg.style.display = "none";
    msg.classList.remove("show");
  }

  function goToNextStep() {
    alert("تم تأكيد الطلب بنجاح ✅");
    // هنا تقدر تنقل المستخدم للخطوة التالية
  }

  let paymentDone = false;

  function handlePayment(method) {
    if (paymentDone) return;
  
    const inputId = method === 'vodafone' ? 'vodafoneNumber' : 'instapayNumber';
    const btnId = method === 'vodafone' ? 'vodafonePayBtn' : 'instapayPayBtn';
    const otherInputId = method === 'vodafone' ? 'instapayNumber' : 'vodafoneNumber';
    const otherBtnId = method === 'vodafone' ? 'instapayPayBtn' : 'vodafonePayBtn';
    const otherVerifyBtnId = method === 'vodafone' ? 'instapayVerifyBtn' : 'vodafoneVerifyBtn';
  
    const number = document.getElementById(inputId).value.trim();
    const btn = document.getElementById(btnId);
  
    if (number === '') {
      showError("من فضلك أدخل رقمك أولاً قبل الدفع.");
      return;
    }
  
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
  
    setTimeout(() => {
      
      document.getElementById("successSound").play().catch(() => {});
  
      btn.innerHTML = '<i class="bi bi-check-circle-fill me-1 text-success"></i> Paid';
  
      paymentDone = true;
  
      // تعطيل الوسيلة التانية تمامًا
      document.getElementById(otherBtnId).disabled = true;
      document.getElementById(otherVerifyBtnId).disabled = true;
      document.getElementById(otherInputId).disabled = true;
  
      // إضافة طبقة شفافة أو مؤثر بصري للتمييز
      const otherBox = method === 'vodafone' 
        ? document.querySelector('#paymentSection .col-md-6:nth-child(2)')
        : document.querySelector('#paymentSection .col-md-6:nth-child(1)');
      otherBox.style.opacity = '0.5';
      otherBox.style.pointerEvents = 'none';
  
      // Show success alert
     // Show success alert with payment message
const success = document.getElementById("successMessage");
success.innerHTML = `
  <button type="button" class="btn-close" onclick="closeSuccess()" aria-label="Close"></button>
  <strong>تم الدفع بنجاح!</strong> يمكنك الآن تأكيد الطلب.
`;
success.style.display = "block";
success.classList.add("show");

      // Show confirm button
      document.getElementById("confirmBtn").style.display = "inline-block";
    }, 2000);
  }
  function disableMethod(method) {
    const inputId = method === 'vodafone' ? 'vodafoneNumber' : 'instapayNumber';
    const payBtnId = method === 'vodafone' ? 'vodafonePayBtn' : 'instapayPayBtn';
    const verifyBtnId = method === 'vodafone' ? 'vodafoneVerifyBtn' : 'instapayVerifyBtn';
  
    document.getElementById(inputId).disabled = true;
    document.getElementById(payBtnId).disabled = true;
    document.getElementById(verifyBtnId).disabled = true;
  }
  
  function closeSuccess() {
    const success = document.getElementById("successMessage");
    success.style.display = "none";
    success.classList.remove("show");
  }

  function showError(message) {
    const errorBox = document.createElement('div');
    errorBox.className = "alert alert-danger alert-dismissible fade show";
    errorBox.style.position = "fixed";
    errorBox.style.top = "20px";
    errorBox.style.right = "20px";
    errorBox.style.zIndex = "1060";
    errorBox.innerHTML = `
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      <strong>خطأ!</strong> ${message}
    `;
    document.body.appendChild(errorBox);
    setTimeout(() => {
      errorBox.remove();
    }, 4000);
  }


  let currentMethod = null;

  function startVerification(method) {
    const btnId = method === 'vodafone' ? 'vodafoneVerifyBtn' : 'instapayVerifyBtn';
    const button = document.getElementById(btnId);
  
    button.innerText = 'Wait...';
    button.disabled = true;
  
    setTimeout(() => {
      button.innerText = 'Verification'; // ممكن نسيبه أو نخليه hidden بعدين
      button.style.display = 'none';
      button.disabled = false;
  
      showOtpForm(method);
    }, 1500);
  }
  

  function showOtpForm(method) {
    currentMethod = method;
    document.getElementById("otpForm").style.display = "flex";
    document.getElementById("overlayBlur").style.display = "block"; // إظهار الخلفية الضبابية
  }
  
  function closeOtpForm() {
    document.getElementById("otpForm").style.display = "none";
    document.getElementById("overlayBlur").style.display = "none"; // إخفاء الخلفية الضبابية
  }
  
  function clearOtp() {
    const inputs = document.querySelectorAll('#otpForm .input-fields input');
    inputs.forEach(input => input.value = '');
  }
  
  function verifyOtp() {
    // نتحقق أن المستخدم كتب أرقام
    const inputs = document.querySelectorAll('#otpForm .input-fields input');
    let hasInput = false;
    inputs.forEach(input => {
      if (input.value.trim() !== '') {
        hasInput = true;
      }
    });
  
    if (!hasInput) {
      showError("من فضلك أدخل كود التحقق.");
      return;
    }
  
    // إظهار رسالة النجاح
    const success = document.getElementById("successMessage");
    success.innerHTML = `
      <button type="button" class="btn-close" onclick="closeSuccess()" aria-label="Close"></button>
      <strong>تم التحقق بنجاح!</strong> يمكنك الآن المتابعة للدفع.
    `;
    success.style.display = "block";
    success.classList.add("show");
  
    // إظهار زر الدفع الخاص بالوسيلة المحددة
    if (currentMethod === 'vodafone') {
      document.getElementById("vodafonePayBtn").style.display = "inline-block";
    } else if (currentMethod === 'instapay') {
      document.getElementById("instapayPayBtn").style.display = "inline-block";
    }
  
    // إغلاق الفورم
    closeOtpForm();
  }
  
  function handleInputChange(method) {
    const inputId = method === 'vodafone' ? 'vodafoneNumber' : 'instapayNumber';
    const verifyBtnId = method === 'vodafone' ? 'vodafoneVerifyBtn' : 'instapayVerifyBtn';
  
    const number = document.getElementById(inputId).value.trim();
    const verifyBtn = document.getElementById(verifyBtnId);
  
    if (number.length === 11 && number.match(/^\d{11}$/)) {
      verifyBtn.style.display = "inline-block";
    } else {
      verifyBtn.style.display = "none";
    }
  }
  