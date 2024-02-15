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
        text:"Your password must include a roman numeral.",
        satisfied:false
      },
      {
        text:"Your password must include a month of the year.",
        satisfied:false
      },
      {
        text:"the digits in your password must add up to 25.",
        satisfied:false
      },
      {
        text:"your password must contain a special character.",
        satisfied:false
      },
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
        case 4:
          ruleFour();
          checkRuleFour();
          break;
        case 5:
          ruleFive();
          checkRuleFive();
          break;
        case 6:
          ruleSix();
          checkRuleSix();
          break;
        case 7:
          ruleSeven();
          checkRuleSeven();
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

    //Rule 4: PW must contain a special char
    function ruleFour() {
      const input = document.getElementById('passwordInput');
      
      input.addEventListener('input', checkRuleFour);
    }
    
    function checkRuleFour() {
      const input = document.getElementById('passwordInput');
      const inputValue = input.value.trim();
      const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue);
      
      if (containsSpecialChar) {
        satisfyRule(activeRules[3]);
        checkRules();
      } else {
        unsatisfyRule(activeRules[3]);
      }
    }

    //Rule 5: Digits in PW must add up to 25
    function ruleFive() {
      const input = document.getElementById('passwordInput');
      
      input.addEventListener('input', checkRuleFive);
    }
    
    function checkRuleFive() {
      const input = document.getElementById('passwordInput');
      const inputValue = input.value.trim();
      let sum = 0;
    
      for (let i = 0; i < inputValue.length; i++) {
        if (!isNaN(parseInt(inputValue[i]))) {
          sum += parseInt(inputValue[i]);
        }
      }
    
      if (sum === 25) {
        satisfyRule(activeRules[4]);
        checkRules();
      } else {
        unsatisfyRule(activeRules[4]);
      }
    }

    //Rule 6: PW must contain a month
    function ruleSix() {
      const input = document.getElementById('passwordInput');
      
      input.addEventListener('input', checkRuleSix);
    }
    
    function checkRuleSix() {
      const input = document.getElementById('passwordInput');
      const inputValue = input.value.trim().toLowerCase();
      const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    
      for (let i = 0; i < months.length; i++) {
        if (inputValue.includes(months[i])) {
          satisfyRule(activeRules[5]);
          checkRules();
          return;
        }
      }
      unsatisfyRule(activeRules[5]);
    }

    //Rule 7: PW must contain a roman numeral
    function ruleSeven() {
      const input = document.getElementById('passwordInput');
      
      input.addEventListener('input', checkRuleSeven);
    }
    
    function checkRuleSeven() {
      const input = document.getElementById('passwordInput');
      const inputValue = input.value.trim();
      const numerals = ['I', 'V', 'X', 'L', 'D', 'C', 'M'];

      for(let i = 0; i < numerals.length; i++){
        if (inputValue.includes(numerals[i])) {
          satisfyRule(activeRules[6]);
          checkRules();
          return;
        }
      }
      unsatisfyRule(activeRules[6]);
    }
});