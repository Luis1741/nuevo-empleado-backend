import { Computador } from "../models/Computador";

export const seedComputadores = async () => {
  const count = await Computador.count();
  if (count === 0) {
    await Computador.bulkCreate([
      { nombre: "Dell Latitude", numeroSerie: "DLT-001" },
      { nombre: "HP EliteBook", numeroSerie: "HPE-002" },
      { nombre: "MacBook Pro", numeroSerie: "MBP-003" },
      { nombre: "Dell Latitude", numeroSerie: "DLT-004" },
      { nombre: "HP EliteBook", numeroSerie: "HPE-005" },
      { nombre: "MacBook Pro", numeroSerie: "MBP-006" },
      { nombre: "Dell Latitude", numeroSerie: "DLT-007" },
      { nombre: "HP EliteBook", numeroSerie: "HPE-008" },
      { nombre: "MacBook Pro", numeroSerie: "MBP-009" },
      { nombre: "Dell Latitude", numeroSerie: "DLT-010" },
      { nombre: "HP EliteBook", numeroSerie: "HPE-011" },
      { nombre: "MacBook Pro", numeroSerie: "MBP-012" },
    ]);
    console.log("✅ Computadores creados");
  } else {
    console.log("ℹ️ Computadores ya existentes");
  }
};
