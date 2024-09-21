import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ApiCommonOkResponse } from "../api-common-ok-response.decorator";
import { GetHelloResponse } from "./app.dto";
import { CommonOkResponseInterceptor } from "../api-common-ok-response.interceptor";

@Controller()
export class AppController {
	@Get()
	@ApiOperation({
		summary: "あいさつ取得",
		description: "あいさつを取得する。",
	})
	@ApiCommonOkResponse(GetHelloResponse, "object")
	@UseInterceptors(CommonOkResponseInterceptor)
	getHello(): GetHelloResponse {
		return {
			message: "Hello World!",
		};
	}
}
