import { Controller, Get } from '@nestjs/common';

import { FullfieldFavorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private _favouriteService: FavoritesService) {}

  @Get()
  getAll(): Promise<FullfieldFavorites> {
    return this._favouriteService.getAll();
  }
}
