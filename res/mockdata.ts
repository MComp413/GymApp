import { Exercise, Training } from "../src/constants/types";

interface IMock {
  trainingList: Training[],
  exerciseList: Exercise[]
};

export const mock: IMock = {
  trainingList: [
    {
      id: 1,
      name: "Treino A",
      details: "seg qui - Treino bacana"
    },
    {
      id: 2,
      name: "Treino B",
      details: "ter sex - Treino bacana"
    }
  ],
  exerciseList: [
    {
      id: 1,
      name: "Supino barra",
      details: "3x10 5kg - sup. peito",
      trainingId: 1
    },
    {
      id: 2,
      name: "Remada",
      details: "3x10 5kg - sup. costas",
      trainingId: 1
    },
    {
      id: 3,
      name: "Agachamento sumô",
      details: "3x10 2kg - inf",
      trainingId: 2
    },
    {
      id: 4,
      name: "Gêmeos em pé",
      details: "3x10 2kg - inf",
      trainingId: 2
    }
  ]
}