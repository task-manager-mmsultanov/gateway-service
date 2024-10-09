import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    // const app = await NestFactory.create(AppModule)
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API for NestJS')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header'
            },
            'JWT-auth'
        )
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    })
    app.use(cookieParser())
    await app.listen(Number(process.env.PORT) || 3000)
}
bootstrap()
