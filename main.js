


function agregarTransaccion() {
    var montoInput = document.querySelector('input[name="monto"]');
    var descripcionInput = document.querySelector('input[name="descripcion"]');
    var monto = montoInput.value;
    var descripcion = descripcionInput.value;

    if (monto && descripcion) {
        var tabcontent2 = document.querySelector('.tabcnt.tabcontent2');
        var transactionListEgresos = tabcontent2.querySelector('.transaction-list2');
        var transactionItemEgresos = document.createElement('label');
        transactionItemEgresos.classList.add('transaction-item');
        transactionItemEgresos.textContent = descripcion + ' - $' + monto;
        tabcontent2.appendChild(transactionItemEgresos); 
    }
}