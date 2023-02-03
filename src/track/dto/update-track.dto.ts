import { PartialType } from '@nestjs/mapped-types';

import { CreateTrackDTO } from './create-track.dto';

export class UpdateTrackDTO extends PartialType(CreateTrackDTO) {}
