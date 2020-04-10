var months, date, budget_title, budget_income, budget_value, budget_expenses, add, item, incomeItems, expenseItems, desBox, valueBox, typeChecker /*, newID*/ , id;

init();




document.querySelector(add + 'btn').addEventListener("click", function() {
  var description, value, incomeOrExpense, newItem;
  description = desBox.value;
  value = parseFloat(valueBox.value);
  incomeOrExpense = typeChecker.value;
  if (description !== '' && value > 0) {
    newItem = new item(description, value);

    if (incomeOrExpense === 'inc') {

      newItem.calculateIncome();
      incomeItems.push(newItem);
    } else {

      if (((newItem.sumIncome() > newItem.sumExpense()) && (((newItem.sumExpense() + value).toFixed(2)) <= 4000) && newItem.sumIncome() >= value)) {

        expenseItems.push(newItem)

        newItem.calculateExpense();
      }
    }
  }
  clearTextBox();


});



/*function idMaker() {
  id = -1;
  return function() {
    return ++id;
  }
}*/

function clearTextBox() {
  desBox.value = '';
  valueBox.value = '';
  desBox.focus();

}


function init() {
  months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = new Date();
  incomeItems = [];
  expenseItems = [];
  budget_title = '.budget__title';
  budget_value = document.querySelector('.budget__value');
  budget_income = document.querySelector('.budget__income--value');
  budget_expenses = '.budget__expenses';
  add = '.add__';

  document.querySelector(budget_title + '--month').textContent = months[date.getMonth()] + ' ' + date.getFullYear();
  budget_value.textContent = '+ 0.00';
  budget_income.textContent = '+ 0.00';
  document.querySelector(budget_expenses + '--value').textContent = '- 0.00';
  document.querySelector(budget_expenses + '--percentage').textContent = '--';

  typeChecker = document.querySelector(add + 'type');
  valueBox = document.querySelector(add + 'value');
  desBox = document.querySelector(add + 'description');


  //  newID = idMaker();


  item = function(description, value) {
    this.description = description;
    this.value = value;
  }

  item.prototype.sumIncome = function() {
    var sum = 0;
    for (var i = 0; i < incomeItems.length; i++) {
      sum += incomeItems[i].value;
    }
    return sum;
  }

  item.prototype.sumExpense = function() {
    var sum = 0;
    for (var i = 0; i < expenseItems.length; i++) {
      sum += expenseItems[i].value;

    }

    return sum;
  }


  item.prototype.calculateIncome = function() {
    var totalIncome, length;
    length = incomeItems.length;
    if (length >= 1) {
      totalIncome = this.sumIncome();
      totalIncome += this.value;
      budget_income.textContent = '+' + totalIncome.toLocaleString("en", {
        useGrouping: false,
        minimumFractionDigits: 2
      });
      budget_value.textContent = budget_income.textContent;

    } else {
      budget_income.textContent = '+' + this.value.toLocaleString("en", {
        useGrouping: false,
        minimumFractionDigits: 2
      });
      budget_value.textContent = budget_income.textContent;

    }

  }

  item.prototype.calculateExpense = function() {
    var budget_expenseVal = document.querySelector(budget_expenses + '--value');
    var budget_expensePer = document.querySelector(budget_expenses + '--percentage');

    var totalIncome, currentExpense, percentage, currentBalance, itemPercentage; //, length;


    totalIncome = this.sumIncome(); //4000
    overallincome = this.sumExpense().toFixed(2); //3999,0.5=3999.5,0.4 = 3999.9,0.09= 3999.99,0.01= 4000
    if (totalIncome >= overallincome) {
      currentBalance = totalIncome - overallincome; //1,0.5,0.1,0.01,0

      percentage = Math.round((overallincome / totalIncome) * 100); // 3999/4000*100
      itemPercentage = Math.round((this.value / totalIncome) * 100); // to send to expense list fcuntion
      budget_expenseVal.textContent = '-' + overallincome.toLocaleString("en", {
        useGrouping: false,
        minimumFractionDigits: 2
      }); //3100
      budget_expensePer.textContent = percentage + ' %';


      if (totalIncome > 0) {
        budget_value.textContent = '+' + currentBalance.toLocaleString("en", {
          useGrouping: false,
          minimumFractionDigits: 2

        });
        if (currentBalance == 0) {
          init();
        }
      }

    } else {
      overallincome -= this.value;
      expenseItems.pop();
    }


  }


}