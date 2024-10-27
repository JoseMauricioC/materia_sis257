import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterpreteDto } from './dto/create-interprete.dto';
import { UpdateInterpreteDto } from './dto/update-interprete.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interprete } from './entities/interprete.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterpretesService {
  constructor(
    @InjectRepository(Interprete)
    private interpretesRepository: Repository<Interprete>,
  ) {}
  // create(createInterpreteDto: CreateInterpreteDto) {
  //   return 'This action adds a new interprete';
  // }
  async create(createInterpreteDto: CreateInterpreteDto): Promise<Interprete> {
    const existe = await this.interpretesRepository.findOneBy({
      nombre: createInterpreteDto.nombre.trim(),
      nacionalidad: createInterpreteDto.nacionalidad.trim(),
    });

    if (existe) throw new ConflictException('El intérprete ya existe');

    const interprete = new Interprete();
    interprete.nombre = createInterpreteDto.nombre.trim();
    interprete.nacionalidad = createInterpreteDto.nacionalidad.trim();
    return this.interpretesRepository.save(interprete);
  }

  // findAll() {
  //   return `This action returns all interpretes`;
  // }
  async findAll(): Promise<Interprete[]> {
    return this.interpretesRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} interprete`;
  // }
  async findOne(id: number): Promise<Interprete> {
    const interprete = await this.interpretesRepository.findOneBy({ id });
    if (!interprete) throw new NotFoundException('El intérprete no existe');
    return interprete;
  }

  // update(id: number, updateInterpreteDto: UpdateInterpreteDto) {
  //   return `This action updates a #${id} interprete`;
  // }
  async update(
    id: number,
    updateInterpreteDto: UpdateInterpreteDto,
  ): Promise<Interprete> {
    const interprete = await this.findOne(id);
    const interpreteUpdate = Object.assign(interprete, updateInterpreteDto);
    return this.interpretesRepository.save(interpreteUpdate);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} interprete`;
  // }
  async remove(id: number) {
    const interprete = await this.findOne(id);
    return this.interpretesRepository.softRemove(interprete);
  }
}
