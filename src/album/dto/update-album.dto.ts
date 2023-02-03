import { PartialType } from '@nestjs/mapped-types';

import { CreateAlbumDTO } from './create-album.dto';

export class UpdateAlbumDTO extends PartialType(CreateAlbumDTO) {}
