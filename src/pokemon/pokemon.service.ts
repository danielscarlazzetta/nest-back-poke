import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private default_limit: number;

  constructor(

    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,
    private readonly _configServices: ConfigService,) {

    this.default_limit = _configServices.get<number>('default_limit');

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
    try {
      const pokemon = await this._pokemonModel.create(createPokemonDto)
      return pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const { limit = this.default_limit,
            offset = 0 } = paginationDto;

    return this._pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v');
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this._pokemonModel.findOne({ no: term })
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this._pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this._pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }

    if (!pokemon) throw new NotFoundException(`No existe ${term}`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    //const result = await this._pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this._pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`No existe el id "${id}" en la base de datos`);

    return;

  }


  private handleExceptions(error: any) {

    if (error.code === 11000) {
      throw new BadRequestException(`Ya existe el pokemon en la Base de Datos! ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Error con pokemon`);
  }

}
