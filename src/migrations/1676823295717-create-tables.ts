import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1676823295717 implements MigrationInterface {
  name = 'createTables1676823295717';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album_favorite_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, CONSTRAINT "REL_1e192ba10a4c7d0cb523065130" UNIQUE ("albumId"), CONSTRAINT "PK_cd486d5370361a6fe307109d96b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_favorite_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid, CONSTRAINT "REL_ce2a398c5c3ee29e4e1aa3de17" UNIQUE ("trackId"), CONSTRAINT "PK_50f596ac83743dbe72b6e4a43c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "albumId" uuid, "artistId" uuid, CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist_favorite_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid, CONSTRAINT "REL_3a4df8003e8debcbaac8c19ca8" UNIQUE ("artistId"), CONSTRAINT "PK_e1b2dab884f4a1276d178a3c221" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_favorite_entity" ADD CONSTRAINT "FK_1e192ba10a4c7d0cb5230651303" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_favorite_entity" ADD CONSTRAINT "FK_ce2a398c5c3ee29e4e1aa3de176" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_f75df6098780938c05b7a65d2ca" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" ADD CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artist_favorite_entity" ADD CONSTRAINT "FK_3a4df8003e8debcbaac8c19ca8f" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artist_favorite_entity" DROP CONSTRAINT "FK_3a4df8003e8debcbaac8c19ca8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_entity" DROP CONSTRAINT "FK_f75df6098780938c05b7a65d2ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track_favorite_entity" DROP CONSTRAINT "FK_ce2a398c5c3ee29e4e1aa3de176"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album_favorite_entity" DROP CONSTRAINT "FK_1e192ba10a4c7d0cb5230651303"`,
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
    await queryRunner.query(`DROP TABLE "artist_entity"`);
    await queryRunner.query(`DROP TABLE "artist_favorite_entity"`);
    await queryRunner.query(`DROP TABLE "album_entity"`);
    await queryRunner.query(`DROP TABLE "track_entity"`);
    await queryRunner.query(`DROP TABLE "track_favorite_entity"`);
    await queryRunner.query(`DROP TABLE "album_favorite_entity"`);
  }
}
