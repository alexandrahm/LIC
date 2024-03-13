
const elements = {
  monthYear: document.getElementById("mesAnio"),
  transactionType: document.getElementById("tipo"),
  description: document.getElementById("descripcion"),
  amount: document.getElementById("monto"),
  addButton: document.getElementById("agregar"),
  incomeTab: document.getElementById("ing"),
  expenseTab: document.getElementById("egr"),
  tabItems: document.getElementById("items"),
  items: document.getElementsByClassName("item"),
  budget: document.getElementById("presupuesto"),
  incomes: document.getElementById("ingresos"),
  expenses: document.getElementById("egresos"),
  percentage: document.getElementById("porcentaje"),
};

const itemArray = [];
let totalExpenses = 0,
  totalIncomes = 0;
let isActive = true;

const initializeDate = () => {
  const date = new Date();
  elements.monthYear.innerHTML = `${date.toLocaleString("es-ES", { month: "long" })} ${date.getFullYear()}`;
};

const addItem = (type, description, amount) => {
  const item = document.createElement('div');
  item.className = 'item';
  if (type === 'ingreso') {
    item.innerHTML = `<span>${description}</span><span>+ ${amount}</span>`;
    totalIncomes += parseInt(amount);
  } else {
    const expenseDetail = (parseInt(amount) * 100) / totalIncomes;
    item.innerHTML = `<span>${description}</span><span>- ${amount} <b style="padding: 0.1rem; background-color: red; margin-left: 1rem;">${Math.round(expenseDetail)}%</b></span>`;
    totalExpenses += parseInt(amount); // Aquí se mantiene el valor positivo para los cálculos internos
  }
  elements.tabItems.appendChild(item);
};



const updateDisplay = () => {
  const budgetCalc = totalIncomes - totalExpenses;
  let expensePercentage = 0; 
  if (totalIncomes !== 0) {
      expensePercentage = (totalExpenses * 100) / totalIncomes;
  }
  elements.budget.innerHTML = `${budgetCalc >= 0 ? '+' : ''}${budgetCalc.toFixed(2)}`;
  elements.incomes.innerHTML = `Ingresos: +${totalIncomes.toFixed(2)}`;
  elements.expenses.innerHTML = `Egresos: -${totalExpenses.toFixed(2)}`;
  elements.percentage.innerHTML = `Porcentaje de gastos: <span id="porcentajeResaltado">${Math.round(expensePercentage)}%</span>`;
};




const clearInputFields = () => {
  elements.description.value = '';
  elements.amount.value = '';
};

const loadItems = (type) => {
  Array.from(elements.items).forEach(item => item.remove());
  itemArray.forEach(item => {
    if (item.tipo === type || type === 'all') addItem(item.tipo, item.descripcion, item.monto);
  });
};

initializeDate();

elements.addButton.onclick = function (e) {
  e.preventDefault();
  const { transactionType, description, amount } = elements;
  if (description.value !== '' && amount.value !== '') {
    transactionType[1].disabled = false;
    itemArray.push({ tipo: transactionType.value, descripcion: description.value, monto: amount.value });
    addItem(transactionType.value, description.value, amount.value);
    clearInputFields();
    updateDisplay();
  }
};

elements.incomeTab.onclick = function () {
  if (!isActive) {
    isActive = true;
    loadItems('ingreso');
    elements.incomeTab.style.backgroundColor = 'white';
    elements.expenseTab.style.backgroundColor = 'rgb(151, 147, 147)';
  }
};

elements.expenseTab.onclick = function () {
  if (isActive) {
    isActive = false;
    loadItems('egreso');
    elements.expenseTab.style.backgroundColor = 'white';
    elements.incomeTab.style.backgroundColor = 'rgb(151, 147, 147)';
  }
};

console.log(itemArray);