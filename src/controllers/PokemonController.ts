import { Body, Get, Patch, Delete, Post, Route } from "tsoa";
import { PokemonModel } from "../models/Pokemon";
import { JsonObject } from "swagger-ui-express";

@Route("api/pokemon")
export default class PokemonController {
    @Post("/create")
    public async create(@Body() body: { name: string; type: string }): Promise<string> {
      const { name, type } = body;
  
      if (!["shiny", "mega"].includes(type)) {
        return "Invalid type";
      }
  
      try {
        const newPokemon = new PokemonModel({ name, type });
        await newPokemon.save();
        return "OK";
      } catch (error: any) {
        return JSON.stringify(error);
      }
    }

  @Get("/getAll")
  public async all(): Promise<any> {
    try {
      const data = await PokemonModel.find();
      return data;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Patch("/update/:id")
  public async update(@Body() body: { id: string; name: string }): Promise<any> {
    try {
      const { id, name } = body;
      const result = await PokemonModel.findByIdAndUpdate(id, { name }, { new: true });

      return { result };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<any> {
    try {
      const data = await PokemonModel.findByIdAndDelete(id);
      return { data };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Patch("/incrementCounter/:id")
  public async incrementCounter(id: string): Promise<any> {
    try {
      const pokemon = await PokemonModel.findById(id);
      if (!pokemon) {
        return { error: "Pokemon not found" };
      }

      pokemon.counter += 1;
      await pokemon.save();

      return { counter: pokemon.counter };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Get("/getByType/:type")
  public async getByType(type: string): Promise<any> {
    try {
      const pokemons = await PokemonModel.find({ type });

      if (pokemons.length === 0) {
        return { error: "Pokémon not found for this type" };
      }

      return pokemons;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Get("/getPokemonWithHighestCounter")
  public async getPokemonWithHighestCounter(): Promise<any> {
    try {
      const pokemon = await PokemonModel.findOne().sort({ counter: -1 });
      return pokemon;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Get("/getShiny")
  public async getShiny(): Promise<any> {
    try {
      const shinyPokemons = await PokemonModel.find({ type: "shiny" });
      return shinyPokemons;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Get("/getMega")
  public async getMega(): Promise<any> {
    try {
      const megaPokemons = await PokemonModel.find({ type: "mega" });
      return megaPokemons;
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
