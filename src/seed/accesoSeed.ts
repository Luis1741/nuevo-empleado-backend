import { Acceso } from "../models/Acceso";

export const seedAccesos = async () => {
  const count = await Acceso.count();
  if (count === 0) {
    await Acceso.bulkCreate([
      { nombre: "GitHub" },
      { nombre: "Jira" },
      { nombre: "Slack" },
      { nombre: "AWS" },
      { nombre: "Correo Corporativo" },
    ]);
    console.log("✅ Accesos disponibles creados");
  } else {
    console.log("ℹ️ Accesos ya existentes");
  }
};
