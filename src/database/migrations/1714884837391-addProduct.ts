import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProduct1714884837391 implements MigrationInterface {
    name = 'AddProduct1714884837391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`color\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`size\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`status\` tinyint NOT NULL DEFAULT '1', \`price\` float NOT NULL, \`view\` int NOT NULL DEFAULT '0', \`sold\` int NOT NULL DEFAULT '0', \`isHidden\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`createdOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdByUserId\` varchar(255) NULL, \`lastModifiedOnDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`lastModifiedByUserId\` varchar(255) NULL, \`deletedAt\` datetime(6) NULL, \`status\` varchar(255) NOT NULL, \`userId\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_caabe91507b3379c7ba73637b8\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orderDetail\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`size\` varchar(255) NOT NULL, \`quantity\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`orderId\` varchar(36) NOT NULL, \`assetId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`categoryId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, INDEX \`IDX_559e1bc4d01ef1e56d75117ab9\` (\`categoryId\`), INDEX \`IDX_930110e92aed1778939fdbdb30\` (\`productId\`), PRIMARY KEY (\`categoryId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_color\` (\`colorId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, INDEX \`IDX_d76b385a61478aa9c5c6408f33\` (\`colorId\`), INDEX \`IDX_7a1cefb85fba910888cf9a1a63\` (\`productId\`), PRIMARY KEY (\`colorId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_size\` (\`sizeId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, INDEX \`IDX_6dfd25fe0076782b9eaa87c247\` (\`sizeId\`), INDEX \`IDX_013d7ffd083e76fcd6fe815017\` (\`productId\`), PRIMARY KEY (\`sizeId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_asset\` (\`productId\` varchar(36) NOT NULL, \`assetId\` varchar(36) NOT NULL, INDEX \`IDX_0d1294f5c22a56da7845ebab72\` (\`productId\`), INDEX \`IDX_5888ac17b317b93378494a1062\` (\`assetId\`), PRIMARY KEY (\`productId\`, \`assetId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orderDetail\` ADD CONSTRAINT \`FK_95fef828af9f890d14a37fa528e\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orderDetail\` ADD CONSTRAINT \`FK_d13bc344fe90a64b5a3f8e6aa2b\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_559e1bc4d01ef1e56d75117ab9c\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_930110e92aed1778939fdbdb302\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_color\` ADD CONSTRAINT \`FK_d76b385a61478aa9c5c6408f337\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_color\` ADD CONSTRAINT \`FK_7a1cefb85fba910888cf9a1a634\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_size\` ADD CONSTRAINT \`FK_6dfd25fe0076782b9eaa87c2474\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_size\` ADD CONSTRAINT \`FK_013d7ffd083e76fcd6fe815017c\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_asset\` ADD CONSTRAINT \`FK_0d1294f5c22a56da7845ebab72c\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_asset\` ADD CONSTRAINT \`FK_5888ac17b317b93378494a10620\` FOREIGN KEY (\`assetId\`) REFERENCES \`asset\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_asset\` DROP FOREIGN KEY \`FK_5888ac17b317b93378494a10620\``);
        await queryRunner.query(`ALTER TABLE \`product_asset\` DROP FOREIGN KEY \`FK_0d1294f5c22a56da7845ebab72c\``);
        await queryRunner.query(`ALTER TABLE \`product_size\` DROP FOREIGN KEY \`FK_013d7ffd083e76fcd6fe815017c\``);
        await queryRunner.query(`ALTER TABLE \`product_size\` DROP FOREIGN KEY \`FK_6dfd25fe0076782b9eaa87c2474\``);
        await queryRunner.query(`ALTER TABLE \`product_color\` DROP FOREIGN KEY \`FK_7a1cefb85fba910888cf9a1a634\``);
        await queryRunner.query(`ALTER TABLE \`product_color\` DROP FOREIGN KEY \`FK_d76b385a61478aa9c5c6408f337\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_930110e92aed1778939fdbdb302\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_559e1bc4d01ef1e56d75117ab9c\``);
        await queryRunner.query(`ALTER TABLE \`orderDetail\` DROP FOREIGN KEY \`FK_d13bc344fe90a64b5a3f8e6aa2b\``);
        await queryRunner.query(`ALTER TABLE \`orderDetail\` DROP FOREIGN KEY \`FK_95fef828af9f890d14a37fa528e\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`DROP INDEX \`IDX_5888ac17b317b93378494a1062\` ON \`product_asset\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d1294f5c22a56da7845ebab72\` ON \`product_asset\``);
        await queryRunner.query(`DROP TABLE \`product_asset\``);
        await queryRunner.query(`DROP INDEX \`IDX_013d7ffd083e76fcd6fe815017\` ON \`product_size\``);
        await queryRunner.query(`DROP INDEX \`IDX_6dfd25fe0076782b9eaa87c247\` ON \`product_size\``);
        await queryRunner.query(`DROP TABLE \`product_size\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a1cefb85fba910888cf9a1a63\` ON \`product_color\``);
        await queryRunner.query(`DROP INDEX \`IDX_d76b385a61478aa9c5c6408f33\` ON \`product_color\``);
        await queryRunner.query(`DROP TABLE \`product_color\``);
        await queryRunner.query(`DROP INDEX \`IDX_930110e92aed1778939fdbdb30\` ON \`product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_559e1bc4d01ef1e56d75117ab9\` ON \`product_category\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`DROP TABLE \`orderDetail\``);
        await queryRunner.query(`DROP INDEX \`REL_caabe91507b3379c7ba73637b8\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`size\``);
        await queryRunner.query(`DROP TABLE \`color\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
