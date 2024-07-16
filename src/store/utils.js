function generarCodigo6() {
    const codigo = Math.floor(100000 + Math.random() * 900000);
  
    return codigo.toString()
}

export {
    generarCodigo6
}