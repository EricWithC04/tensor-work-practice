const matrix = [];

for (let i = 0; i < 10; i++) {
    let row = []
    for (let j = 0; j < 10; j++) {
        if (j + 1 == 10) {
            row.push(1)
        } else {
            row.push(j + 1)
        }
    }
    matrix.push(row)
}

async function verificarMemoria() {
    const maxTamanioBytes = 64 * 1024 * 1024;

    let tensor1 = tf.tensor2d(matrix);
    let tensor2 = tf.tensor2d(matrix);
    let tensorResultado = tf.tensor2d(matrix);

    let primerTensor = true

    const memoriaElemento = document.getElementById('memoria');

    while (true) {
        if (primerTensor) {
            tensorResultado = tensorResultado.mul(tensor1)
            tensor1 = tensor1.mul(tensor2)
        } else {
            tensorResultado = tensorResultado.mul(tensor2)
            tensor2 = tensor1.mul(tensor1)
        }

        const memoria = tf.memory();
        const memoriaMB = memoria.numBytes / (1024 * 1024);
        const mensaje = `Uso de memoria: ${memoriaMB.toFixed(2)} MB`;
        console.log(mensaje);

        memoriaElemento.innerHTML = mensaje;

        if (memoria.numBytes > maxTamanioBytes) {
            memoriaElemento.innerHTML += "<br>Se superó el límite de 64MB.";
            console.log("Se superó el límite de 64MB.");
            console.log("Liberando memoria...");
            document.getElementById('tensorResultante').innerHTML = tensorResultado.toString();
            tensorResultado.print()
            tensor1.dispose();
            tensor2.dispose();
            tensorResultado.dispose();
            break;
        }

        primerTensor = !primerTensor;

        await new Promise(resolve => setTimeout(resolve, 1));
    }
}

verificarMemoria();