document.addEventListener('DOMContentLoaded', function() {
  const ruleList = document.getElementById('ruleList');
  const passwordInput = document.getElementById('passwordInput');
  const charCount = document.getElementById('charCount');

  //Update char count
  passwordInput.addEventListener('input', function() {
    charCount.textContent = passwordInput.value.length;
  });


    /* Create an array of active and inactive rules. Rule one starts active by default, and inactive rules are added to
     active rules after all of the active rules before it are satisfied at the same time. */

     let activeRuleCount = 1;

     let inactiveRules = [
      {
        text:"your password must contain a number.",
        satisfied:false
      },
      {
        text:"your password must contain an uppercase letter.",
        satisfied:false
      }
     ];

     let activeRules = [
      {
        text:"your password must be at least 5 characters long.",
        satisfied:false
      }
     ];

    //activate rule one
    activateRule(activeRuleCount);
    addRule(activeRules[0]);

    //Function to add rule text to list
    function addRule(rule) {
      const ruleItem = document.createElement('li');
      ruleItem.classList.add('rule-item');
      ruleItem.textContent = rule.text;

      //Set background color based on rule satisfaction
      ruleItem.style.backgroundColor = rule.satisfied ? '#a3e4b7' : '#f2a7a7';
  
      // Insert the new rule at the top of the list
      ruleList.insertBefore(ruleItem, ruleList.firstChild);
  
      // Trigger a reflow to enable the sliding animation
      ruleItem.getBoundingClientRect(); 
  
      // Apply CSS class to animate the sliding effect
      ruleItem.classList.add('slide-in');
    }


    //Functions to satisfy and unsatisfy rules
    function satisfyRule(rule) {
      rule.satisfied = true;
      updateRuleBackground(rule);
    }
    
    function unsatisfyRule(rule) {
      rule.satisfied = false;
      updateRuleBackground(rule);
    }



    //Function to update rule background colors
    function updateRuleBackground(rule) {
      const ruleItems = document.getElementsByClassName('rule-item');
      for (let i = 0; i < ruleItems.length; i++) {
        if (ruleItems[i].textContent === rule.text) {
          ruleItems[i].style.backgroundColor = rule.satisfied ? '#a3e4b7' : '#f2a7a7';
          break;
        }
      }
    }

    

    //Function to check if all active rules are satisfied
    function checkRules() {
      let allRulesSatisfied = true;
      for (let i = 0; i < activeRules.length; i++) {
        if(activeRules[i].satisfied==false){
          allRulesSatisfied = false;
          break;
        }
      }

      if(allRulesSatisfied==true){
        if(inactiveRules.length==0){
          console.log("all rules satisfied!");
        }

        else{
          let nextRule = inactiveRules.pop();
          activeRules.push(nextRule);
          addRule(nextRule);

          //increment active rule count and run its function
          activeRuleCount++;
          activateRule(activeRuleCount);
        }
      }
    }




    //function to activate rule functions
    function activateRule(ruleNumber){
      switch (ruleNumber) {
        case 1:
          ruleOne();
          checkRuleOne();
          break;
        case 2:
          ruleTwo();
          checkRuleTwo();
          break;
        case 3:
          ruleThree();
          checkRuleThree();
          break;
        default:
          console.log("Invalid number");
          break;
      }
    }

//******************************************RULES************************************************//


    //Rule 1: PW must be >= 5 char long
    function ruleOne() {
    const input = document.getElementById('passwordInput');
  
    input.addEventListener('input', checkRuleOne);  
  }

  function checkRuleOne() {
    const input = document.getElementById('passwordInput');
    const inputValue = input.value.trim();
      
      if (inputValue.length >= 5) {
        satisfyRule(activeRules[0]);
        checkRules();
      }

      else {
        unsatisfyRule(activeRules[0]);
      }
  }

  //Rule 2: PW must contain an uppercase letter
  function ruleTwo() {
    const input = document.getElementById('passwordInput');
    input.addEventListener('input', checkRuleTwo);
  }

  function checkRuleTwo() {
    const input = document.getElementById('passwordInput');
    const inputValue = input.value.trim();
      const containsUppercase = /[A-Z]/.test(inputValue);
  
      if (containsUppercase) {
        satisfyRule(activeRules[1]);
        console.log("test");
        checkRules();
      } else {
        unsatisfyRule(activeRules[1]);
      }
    }

  //Rule 3: PW must contain a number
  function ruleThree() {
    const input = document.getElementById('passwordInput');
  
    input.addEventListener('input', checkRuleThree);
  }

  function checkRuleThree() {
    const input = document.getElementById('passwordInput');
    const inputValue = input.value.trim();
      const containsNumber = /\d/.test(inputValue);
  
      if (containsNumber) {
        satisfyRule(activeRules[2]);
        checkRules();
      } else {
        unsatisfyRule(activeRules[2]);
      }
    }
});