import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name)
     private readonly _pokemonModel: Model<Pokemon>){
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
    try {
      const pokemon = await this._pokemonModel.create( createPokemonDto )
      return pokemon;
      
    } catch (error) {
      if(error.code === 11000){
        throw new BadRequestException(`Ya existe el pokemon en la Base de Datos! ${JSON.stringify(error.keyValue) }`)
      }
      console.log(error)
        throw new InternalServerErrorException(`No se puede crear pokemon`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon : Pokemon;

    if(!isNaN(+term)){ 
      pokemon = await this._pokemonModel.findOne({no: term})
    }

    if(!pokemon && isValidObjectId(term)){
      pokemon = await this._pokemonModel.findById(term); 
    }
    
    if(!pokemon) { 
      pokemon = await this._pokemonModel.findOne({name: term.toLowerCase().trim()})
    }
    
    if(!pokemon) throw new NotFoundException(`No existe ${term}`);

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
