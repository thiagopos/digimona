const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });

const digimonSchema = {
  type: "object",
  properties: {
    nome: {
      type: "string",
      pattern: "^[A-Za-zÀ-ÿÇç]{1}[A-Za-zÀ-ÿÇç ]{3,19}$",
      minLength: 4,
      maxLength: 20
    },
    tipo: {
      type: "string",
      pattern: "^[A-Za-zÀ-ÿÇç]{1}[A-Za-zÀ-ÿÇç ]{3,14}$",
      minLength: 4,
      maxLength: 15
    }
  },
  required: ["nome", "tipo"],
  additionalProperties: false
};

const validateDigimon = ajv.compile(digimonSchema);

module.exports = validateDigimon;
