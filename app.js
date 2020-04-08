var months, date, budget_title, budget_income, budget_value, budget_expenses, add, item, incomeItems, desBox, valueBox, typeChecker;

init();



document.querySelector(add + 'btn').addEventListener("click", function() {
  var description = desBox.value;
  var value = parseInt(valueBox.value);
  var incomeOrExpense = typeChecker.value;


  if (incomeOrExpense === 'inc') {
    var newItem = new item(description, value);
    newItem.calculateIncome();
    incomeItems.push(newItem);
  }

  clearTextBox();


});

function clearTextBox() {
  desBox.value = '';
  valueBox.value = '';
  desBox.focus();

}

function init() {
  months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = new Date();
  incomeItems = [];
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

  function sumIncome() {
    var sum = 0;
    for (var i = 0; i < incomeItems.length; i++) {
      sum += incomeItems[i].value;
    }
    return sum;
  }

  item = function(description, value) {
    this.description = description;
    this.value = value;
  }

  item.prototype.calculateIncome = function() {
    var totalIncome, length;
    length = incomeItems.length;
    if (length >= 1) {
      totalIncome = sumIncome();
      totalIncome += this.value;
      budget_income.textContent = '+' + totalIncome.toLocaleString() + '.00';
      budget_value.textContent = budget_income.textContent;

    } else {
      budget_income.textContent = '+' + this.value.toLocaleString() + '.00';
      budget_value.textContent = budget_income.textContent;

    }



  }


}