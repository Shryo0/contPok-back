import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  counter: {
    type: Number,
    default: 0,
  },
  type: {
    required: true,
    type: String,
    enum: ["shiny", "mega"], // Adicionei enum com valores "shiny" e "mega"
  },
});

export const PokemonModel = mongoose.model("Pokemon", PokemonSchema);
