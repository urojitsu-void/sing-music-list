import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { PrismaModule } from "../prisma/prisma.module";
import { SpotifyModule } from "../spotify/spotify.module";
import { AppController } from "./app.controller";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../../../../frontend/dist"),
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		SpotifyModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
