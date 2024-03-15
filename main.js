
function agregarTransaccion() {
    var montoInput = document.querySelector('input[name="monto"]')
    var descripcionInput = document.querySelector('input[name="descripcion"]')
    var monto = parseFloat(montoInput.value) // Convertir el monto a número
    var monto = montoInput.value
    var descripcion = descripcionInput.value
    var tipoTransaccion = document.querySelector('.ingreso-egresodrop')//guardando elemento para extraer su value

    if (monto && descripcion) {
        var tabcontent2 = document.querySelector('.tabcnt.tabcontent2')//tab de egresos
        var tabcontent1 = document.querySelector('.tabcnt.tabcontent1')//tab de ingresos
        var transactionListIngresos = tabcontent1.querySelector('.transaction-list1')
        var transactionListEgresos = tabcontent2.querySelector('.transaction-list2')

        var transactionItem = document.createElement('label')
        transactionItem.classList.add('transaction-item')
        transactionItem.textContent = descripcion + ' - $' + monto

        if (tipoTransaccion.value === "Egreso") {// mandar el transactionItem a Egresos
            transactionListEgresos.appendChild(transactionItem)
        } else if (tipoTransaccion.value === "Ingreso") {// mandar el transactionItem a Ingresos
            transactionListIngresos.appendChild(transactionItem)
        }else {
    console.error("No se encontró el elemento transactionList")// en caso no se encuentre el valor eleccionado
    }
  }
  calcularTotal()
}

function calcularTotal() {
  var totalIngresos = 0
  var totalEgresos = 0

  // Calcular total de ingresos
  var transactionListIngresos = document.querySelectorAll('.transaction-list1 .transaction-item')
  transactionListIngresos.forEach(function(item) {
      var monto = parseFloat(item.textContent.split('$')[1])
      totalIngresos += monto
  });

  // Calcular total de egresos
  var transactionListEgresos = document.querySelectorAll('.transaction-list2 .transaction-item')
  transactionListEgresos.forEach(function(item) {
      var monto = parseFloat(item.textContent.split('$')[1])
      totalEgresos += monto
  });

  // Mostrar los totales
  var labelIngresos = document.querySelector('.border.border-dark')
  var labelEgresos = document.querySelector('.border.border-white')
  labelIngresos.textContent = "Ingresos: + $" + totalIngresos.toFixed(2)
  labelEgresos.textContent = "Egresos: - $" + totalEgresos.toFixed(2)

  // Calcular el presupuesto disponible
  var presupuestoDisponible = totalIngresos - totalEgresos
  var presupuestoDisponibleLabel = document.querySelector('.text-body-emphasis')
  presupuestoDisponibleLabel.textContent = "Presupuesto de marzo 2024: $" + presupuestoDisponible.toFixed(2)

    // Calcular el porcentaje de gastos
  var porcentajeGastos = (totalEgresos * 100) / totalIngresos//según la guía
  var porcentajeGastosLabel = document.querySelector('.back-dark')
  porcentajeGastosLabel.textContent = porcentajeGastos.toFixed(2) + "%"
}
