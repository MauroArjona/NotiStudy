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

export const getFechaNumerica = () => { // Formato DD-MM-AA
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = String(fecha.getFullYear()).slice(-2);
  return `${dia}-${mes}-${anio}`;
};

export const formatearFechaISO = (fechaISO) => {
  // fechaISO → "2025-10-28"
  if (!fechaISO) return "";
  const [año, mes, dia] = fechaISO.split("-");
  return `${dia}-${mes}-${año.slice(-2)}`; // → "28-10-25"
}