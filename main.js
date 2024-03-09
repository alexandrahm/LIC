


function agregarTransaccion() {
    var montoInput = document.getElementById('monto');
    var descripcionInput = document.getElementById('descripcion');
    var monto = montoInput.value;
    var descripcion = descripcionInput.value;

    if (monto && descripcion) {
        var transactionList = document.querySelector('.transaction-list');
        var transactionItem = document.createElement('li');
        transactionItem.classList.add('transaction-item');
        transactionItem.textContent = descripcion + ' - $' + monto;
        transactionList.appendChild(transactionItem);

        // Limpiar los campos de entrada después de agregar la transacción
        montoInput.value = '';
        descripcionInput.value = '';
    }
}