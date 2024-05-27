document.addEventListener('click', function(e) {
    var isOpen = e.target.nextElementSibling.classList.contains('show');
    // Close all dropdowns
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove('show');
    }
    // If the target was a dropdown toggle and wasn't open, open it.
    if (e.target.matches('.dropdown-toggle') && !isOpen) {
        e.target.nextElementSibling.classList.toggle('show');
    }
});
  
document.querySelector('.search button').addEventListener('click', function() {
    var searchValue = document.querySelector('.search input[type="text"]').value.trim();
    if (searchValue) {
        console.log('Search for:', searchValue);
        // Implement search functionality here
    }
});

// JavaScript to handle modal opening and closing
// JavaScript to handle modal opening and closing
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('paymentModal');
    const btns = document.querySelectorAll('.btn-request-buy'); // Select all buttons
    const closeBtn = document.querySelector('.close'); // The close button
  
    // Function to open the modal
    const openModal = () => {
      modal.style.display = 'block';
    };
  
    // Function to close the modal
    const closeModal = () => {
      modal.style.display = 'none';
    };
  
    // Attach open modal event to all buttons
    btns.forEach(btn => {
      btn.addEventListener('click', openModal);
    });
  
    // Close modal event for the close button
    closeBtn.addEventListener('click', closeModal);
  
    // Close modal if user clicks outside of it
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  });
  
  
  