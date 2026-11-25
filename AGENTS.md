# AGENTS.md

## Доступы и аккаунты

- GitHub: вход через Apple ID, привязанная почта **nady_po@mail.ru**, аккаунт nadya-poryadina
- Сайт: https://nadya-poryadina.github.io/portfolio/ (репозиторий nadya-poryadina/portfolio, ветка main)
- Пуш по SSH (ключ ~/.ssh/id_ed25519, remote git@github.com:...), токены не нужны
- Figma-токен: ~/.config/opencode/figma_token
- Playwright: /tmp/pw2 (playwright-core, браузер из ~/Library/Caches/ms-playwright)

## Конвенции работы

- Полное состояние проекта и незакрытые задачи: README-ИТОГИ.md (обновлять при фиксации)
- Тексты кейсов: .txt файлы в корне — источник правды, правки синхронизируем
- Стиль текстов: humanizer (живой язык, женский род, без длинных тире в переписанных местах)
- Метрики: только реальные цифры + источники в тексте; в итоге — текстом/списком
- Скрин сайта: /tmp/pw2/check*.js (chromium headless shell)
- Коммит-стиль: короткие русские сообщения вида «Кейс/раздел: что изменилось»
- В git user.email сейчас стоит дефолтный nada@MacBox-Air-Nada.local — не менять без запроса
