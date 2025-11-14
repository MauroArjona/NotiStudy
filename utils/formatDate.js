export const getStringFechaActual = () => {
  const dias = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const fecha = new Date();
  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  return `${diaSemana} ${dia} de ${mes}`;
};

export const getStringFecha = (fechaStr) => { // Recibe un string
  const [dia, mes, anio] = fechaStr.split("-");
  const fecha = new Date(`20${anio}`, Number(mes) - 1, Number(dia));
  const dias = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const diaSemana = dias[fecha.getDay()];
  const diaNum = fecha.getDate();
  const mesNombre = meses[fecha.getMonth()];

  return `${diaSemana} ${diaNum} de ${mesNombre}`;
}; // DD-MM-AA → diaSemana DD de nombreMes

export const getFechaNumerica = () => { // Devuelve la fecha actual en formato DD-MM-AA
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = String(fecha.getFullYear()).slice(-2);
  return `${dia}-${mes}-${anio}`;
};

export const formatearFechaISO = (fechaISO) => {
  // Transforma fechaISO → "2025-10-28" → "28-10-25"
  if (!fechaISO) { return ""; };
  const [año, mes, dia] = fechaISO.split("-");
  const a = `${dia}-${mes}-${año.slice(-2)}`;
  return `${dia}-${mes}-${año.slice(-2)}`; 
}

//parseFecha("20-11-25")  →  Date(2025, 10, 20)
export const parseFecha = (fechaStr) => {
  // Espera formato "DD-MM-AA"
  const [dia, mes, anio] = fechaStr.split('-').map(Number);
  // Convertimos "25" → "2025"
  const fullYear = anio < 50 ? 2000 + anio : 1900 + anio; 
  return new Date(fullYear, mes - 1, dia); // meses empiezan en 0
}; 

export const formatearFecha = (fechaStr) => {
  // Admite ambos formatos: "DD-MM-AA" o "YYYY-MM-DD"
  let dia, mes, anio;
  if (fechaStr.includes('-')) {
    const partes = fechaStr.split('-');
    if (partes[0].length === 4) {
      // Formato YYYY-MM-DD
      [anio, mes, dia] = partes;
    } else {
      // Formato DD-MM-AA
      [dia, mes, anio] = partes;
      anio = anio.length === 2 ? `20${anio}` : anio; // convierte "25" → "2025"
    }
  }
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${anio}`; // → DD de NombreMes de AAAA
}; 

export const getStrFechaISO = (strFecha) => { // Recibe un string DD-MM-AA
  let [dia, mes, anio] = strFecha.split("-");
  if (anio.length === 2) {
    anio = "20" + anio; // Asume años 20xx
  }
  return `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
} // → String AAAA-MM-DD