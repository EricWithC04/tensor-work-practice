const matriz = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
    [2, 3, 4, 5, 6, 7, 8, 9, 1, 2],
    [3, 4, 5, 6, 7, 8, 9, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 1, 2, 3, 4, 5, 6, 7, 8],
    [9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
];

async function verificarMemoria() {
    const maxTamanioBytes = 64 * 1024 * 1024;

    let tensor1 = tf.tensor2d(matriz);
    let tensor2 = tf.tensor2d(matriz);
    let tensorResultado = tf.tensor2d(matriz);

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
        console.log(tensorResultado);

        memoriaElemento.innerHTML = mensaje;

        if (memoria.numBytes > maxTamanioBytes) {
            memoriaElemento.innerHTML += "<br>Se superó el límite de 64MB.";
            console.log("Se superó el límite de 64MB.");
            console.log("Liberando memoria...");
            tensor1.dispose();
            tensor2.dispose();
            break;
        }

        primerTensor = !primerTensor;

        await new Promise(resolve => setTimeout(resolve, 1));
    }
}

verificarMemoria();