import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PaginationQueryDto {
	@ApiProperty({
		description: "pagination size",
		example: 20,
	})
	@IsString()
	@IsOptional()
	limit: number;

	@ApiProperty({
		description: "pagination offset",
		example: 0,
	})
	@IsString()
	@IsOptional()
	offset: number;
}

export class PaginationResponseDto {
	@Expose()
	@ApiProperty({
		description: "pagination size",
		example: 20,
	})
	@IsString()
	@IsNotEmpty()
	total: number;

	@Expose()
	@ApiProperty({
		description: "pagination size",
		example: 20,
	})
	@IsString()
	@IsNotEmpty()
	limit: number;

	@Expose()
	@ApiProperty({
		description: "pagination offset",
		example: 0,
	})
	@IsString()
	@IsNotEmpty()
	offset: number;
}
