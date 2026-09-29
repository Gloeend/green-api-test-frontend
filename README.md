Тестовое задание GREEN-API.

Vite, React 18, TypeScript (strict), Redux Toolkit для состояния, react-router, react-hook-form + zod для форм и проверки данных от API, Tailwind CSS. HTTP-запросы идут через нативный `fetch` с тонкой типизированной обёрткой. Тесты на Vitest.

## Запуск

Нужен Node.js 20.19+ или 22.12+ (этого требует Vite 7).

```bash
cp .env.example .env
npm i
npm run dev
```

В `.env` одна переменная: `VITE_GREEN_API_URL` — `apiUrl` по умолчанию на экране входа. Docker-сборка тоже берёт её из `.env`.

## Docker

Контейнер отдаёт production-сборку на `127.0.0.1:5174`, снаружи его закрывает nginx сервера с доменом и HTTPS.

```bash
cp .env.example .env
docker compose -f .docker/docker-compose.yml up -d --build
```
