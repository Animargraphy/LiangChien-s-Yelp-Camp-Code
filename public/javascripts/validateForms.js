   // the following codes are copied from https://getbootstrap.com/docs/5.0/forms/validation/. Colt slightly revised them.
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict'
          
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.validated-form')
          
            // Loop over them and prevent submission
            Array.from(forms)
              .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                  }
          
                  form.classList.add('was-validated')
                }, false)
              })
          })()