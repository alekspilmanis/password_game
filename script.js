document.addEventListener('DOMContentLoaded', function() {
    const addHintBtn = document.getElementById('addHintBtn');
    const hintInput = document.getElementById('hintInput');
    const hintList = document.getElementById('hintList');
  
    addHintBtn.addEventListener('click', function() {
      const hint = hintInput.value.trim();
      if (hint !== '') {
        addHint(hint);
        hintInput.value = '';
      }
    });
  
    function addHint(hintText) {
      const hintItem = document.createElement('li');
      hintItem.classList.add('hint-item');
      hintItem.textContent = hintText;
  
      // Insert the new hint at the top of the list
      hintList.insertBefore(hintItem, hintList.firstChild);
  
      // Trigger a reflow to enable the sliding animation
      hintItem.getBoundingClientRect(); 
  
      // Apply CSS class to animate the sliding effect
      hintItem.classList.add('slide-in');
    }
  });
  