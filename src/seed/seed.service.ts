import { Injectable } from '@nestjs/common';
// import axios, { AxiosAdapter, AxiosInstance }  from 'axios';
import { AxiosAdapter} from 'src/common/adapters/axios.adapter'
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  //private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ){

  }

  async executeSeed() {

    await this._pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert : {name: string, no: number}[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2];
      pokemonToInsert.push({name, no});
      //console.log({name, no})
    })

    await this._pokemonModel.insertMany(pokemonToInsert);
    return 'Seed ejecutado';
  }





  
  // async executeSeed2() {
  //   await this._pokemonModel.deleteMany({});
  //   const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

  //   const insertPromiseArray = [];

  //   data.results.forEach(({name, url}) => {
  //     const segments = url.split('/');
  //     const no = +segments[ segments.length - 2];
  //     insertPromiseArray.push(this._pokemonModel.create({name, no}));
  //     console.log({name, no})
  //   })

  //   await Promise.all(insertPromiseArray);
  //   return 'Seed ejecutado';
  // }

}
