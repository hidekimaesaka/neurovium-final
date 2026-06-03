# Neurovium

Aplicativo Android para atividade de Sudoku cognitivo com fluxo simplificado para uso por idosos.

## Instalar o APK no Android

1. Baixe o arquivo `neurovium-release.apk` deste repositório.
2. Envie o APK para o celular, por cabo USB, WhatsApp, Drive, e-mail ou outro método.
3. No celular, toque no arquivo `neurovium-release.apk`.
4. Se o Android bloquear, toque em **Configurações** e permita instalar apps desta fonte.
5. Volte para o APK e toque em **Instalar**.
6. Abra o app **Neurovium**.

## Uso

1. Informe o nome do usuário apenas uma vez.
2. Toque em **Iniciar Sudoku**.
3. Escolha a dificuldade.
4. Jogue usando o tabuleiro e os botões numéricos.
5. Ao terminar, veja o resumo e escolha **Sair** ou **Jogar novamente**.
6. Na tela inicial, toque em **Exportar dados** para gerar o relatório.

## APK

O APK pronto para instalação está na raiz do projeto:

```text
neurovium-release.apk
```

## Desenvolvimento

Instalar dependências:

```bash
npm install
```

Rodar no navegador:

```bash
npm run web
```

Gerar APK release:

```bash
cd android
./gradlew assembleRelease
```

O APK gerado fica em:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## Observação

Este APK está assinado com a configuração local atual do projeto. Para publicar na Google Play, gere uma chave de release própria e prefira publicar um arquivo `.aab`.
