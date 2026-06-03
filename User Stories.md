Abaixo está uma versão bem completa e sequencial das **User Stories** para o desenvolvimento do app de Sudoku em React Native com análise cognitiva.

# User Stories — App Sudoku com Análise Cognitiva

## Épico 1 — Estrutura inicial do aplicativo

### US001 — Criar estrutura base do projeto React Native

**Como** desenvolvedor,
**quero** criar a estrutura inicial do projeto em React Native,
**para** iniciar o desenvolvimento do aplicativo de Sudoku de forma organizada.

**Critérios de aceitação:**

* O projeto deve ser criado em React Native.
* Deve possuir uma estrutura inicial de pastas para telas, componentes, serviços, estilos, tipos e utilitários.
* O app deve executar corretamente em Android e/ou iOS.
* Deve existir uma tela inicial provisória para validar a execução do projeto.

**Prioridade:** Alta

---

### US002 — Configurar navegação entre telas

**Como** usuário,
**quero** navegar entre as telas do aplicativo,
**para** acessar login, perfil, seleção de dificuldade, jogo e relatório.

**Critérios de aceitação:**

* O app deve possuir navegação entre telas.
* As telas principais devem ser: Login, Perfil, Seleção de Dificuldade, Jogo Sudoku, Resultado/Relatório e Exportação.
* O usuário não deve acessar telas internas sem estar autenticado.
* Deve ser possível voltar para telas anteriores quando fizer sentido.

**Prioridade:** Alta

---

### US003 — Criar identidade visual básica do app

**Como** usuário,
**quero** visualizar uma interface clara e organizada,
**para** conseguir jogar Sudoku e acompanhar minhas informações cognitivas com facilidade.

**Critérios de aceitação:**

* O app deve possuir cores, botões e fontes padronizadas.
* As telas devem ser responsivas.
* A interface deve ser simples, sem excesso de informações.
* Elementos importantes devem ter destaque visual.

**Prioridade:** Média

---

## Épico 2 — Login com número de registro

### US004 — Criar tela de login

**Como** usuário,
**quero** inserir meu número de registro/matrícula,
**para** acessar minha conta no aplicativo.

**Critérios de aceitação:**

* A tela deve possuir um campo para digitar o número de registro.
* A tela deve possuir um botão de login.
* O campo não deve aceitar envio vazio.
* O app deve exibir mensagem de erro caso o número não seja informado.

**Prioridade:** Alta

---

### US005 — Validar formato do número de registro

**Como** sistema,
**quero** validar o formato do número de registro,
**para** evitar consultas inválidas.

**Critérios de aceitação:**

* O sistema deve verificar se o campo possui apenas caracteres permitidos.
* Caso o registro tenha tamanho mínimo ou máximo, essa regra deve ser validada.
* Se o formato for inválido, o usuário deve receber uma mensagem clara.
* O login não deve prosseguir com dados inválidos.

**Prioridade:** Alta

---

### US006 — Consultar status da conta pelo número de registro

**Como** usuário,
**quero** que o app consulte meu número de registro,
**para** saber se minha conta está ativa ou inativa.

**Critérios de aceitação:**

* O app deve enviar o número de registro para uma fonte de validação.
* O sistema deve retornar se a conta está ativa ou inativa.
* Se a conta estiver ativa, o usuário deve acessar o app.
* Se a conta estiver inativa, o acesso deve ser bloqueado.
* O app deve exibir uma mensagem explicando o motivo do bloqueio.

**Prioridade:** Alta

---

### US007 — Bloquear login de conta inativa

**Como** sistema,
**quero** impedir o login de usuários com conta inativa,
**para** garantir que apenas participantes autorizados usem o app.

**Critérios de aceitação:**

* Usuários inativos não devem acessar o perfil.
* Deve aparecer uma mensagem como: “Conta inativa. Procure o responsável pelo cadastro.”
* O usuário deve poder tentar inserir outro número de registro.
* Nenhum dado de partida deve ser criado para contas inativas.

**Prioridade:** Alta

---

### US008 — Exibir carregamento durante validação do login

**Como** usuário,
**quero** ver um indicador de carregamento durante o login,
**para** saber que o sistema está processando minha solicitação.

**Critérios de aceitação:**

* Ao clicar em login, deve aparecer um loading.
* O botão deve ser temporariamente desativado para evitar múltiplos envios.
* O loading deve desaparecer após sucesso ou erro.
* Erros de conexão devem ser informados ao usuário.

**Prioridade:** Média

---

### US009 — Salvar sessão do usuário autenticado

**Como** usuário,
**quero** permanecer logado após autenticação,
**para** não precisar inserir meu registro toda vez que abrir o app.

**Critérios de aceitação:**

* O app deve salvar a sessão localmente.
* Ao abrir o app novamente, o usuário ativo deve ser direcionado ao perfil.
* Caso a conta seja invalidada posteriormente, o app deve bloquear o acesso após nova verificação.
* Deve existir opção de sair da conta.

**Prioridade:** Média

---

### US010 — Criar opção de logout

**Como** usuário,
**quero** sair da minha conta,
**para** permitir que outro usuário acesse o app no mesmo dispositivo.

**Critérios de aceitação:**

* Deve existir um botão “Sair”.
* Ao sair, os dados da sessão devem ser apagados.
* O usuário deve retornar para a tela de login.
* O app não deve permitir retorno ao perfil sem novo login.

**Prioridade:** Média

---

## Épico 3 — Perfil do usuário

### US011 — Exibir dados básicos do perfil

**Como** usuário,
**quero** visualizar meu nome e número de matrícula,
**para** confirmar que estou acessando a conta correta.

**Critérios de aceitação:**

* A tela de perfil deve exibir nome do usuário.
* A tela deve exibir número de matrícula/registro.
* Os dados devem vir da validação do login.
* Caso algum dado não esteja disponível, o sistema deve exibir uma mensagem adequada.

**Prioridade:** Alta

---

### US012 — Exibir status da conta no perfil

**Como** usuário,
**quero** visualizar se minha conta está ativa,
**para** ter confirmação da minha autorização de uso.

**Critérios de aceitação:**

* A tela deve mostrar o status “Ativa”.
* Usuários inativos não devem chegar ao perfil.
* O status deve ser apresentado de forma clara.
* O app deve atualizar o status ao fazer login.

**Prioridade:** Média

---

### US013 — Criar botão para iniciar nova partida

**Como** usuário,
**quero** iniciar uma nova partida a partir do perfil,
**para** começar a atividade de Sudoku.

**Critérios de aceitação:**

* O perfil deve ter um botão “Iniciar Sudoku”.
* Ao clicar, o usuário deve ser levado para a seleção de dificuldade.
* O botão deve estar disponível apenas para usuários ativos.
* A navegação deve funcionar corretamente.

**Prioridade:** Alta

---

### US014 — Exibir histórico resumido de partidas

**Como** usuário,
**quero** ver um resumo das minhas partidas anteriores,
**para** acompanhar minha evolução.

**Critérios de aceitação:**

* O perfil deve mostrar quantidade de partidas realizadas.
* Deve mostrar a última dificuldade jogada.
* Deve mostrar data da última partida.
* Pode mostrar tempo médio de resolução.
* Caso não existam partidas, deve aparecer uma mensagem como “Nenhuma partida realizada”.

**Prioridade:** Média

---

## Épico 4 — Seleção de dificuldade

### US015 — Criar tela de seleção de dificuldade

**Como** usuário,
**quero** escolher entre fácil, médio e difícil,
**para** jogar Sudoku no nível adequado.

**Critérios de aceitação:**

* A tela deve apresentar três opções: Fácil, Médio e Difícil.
* Cada dificuldade deve ser selecionável.
* Deve existir um botão para confirmar e iniciar a partida.
* O app não deve iniciar sem uma dificuldade selecionada.

**Prioridade:** Alta

---

### US016 — Explicar cada nível de dificuldade

**Como** usuário,
**quero** entender a diferença entre os níveis de dificuldade,
**para** escolher o nível mais adequado.

**Critérios de aceitação:**

* A dificuldade Fácil deve indicar maior quantidade de números preenchidos.
* A dificuldade Média deve indicar desafio intermediário.
* A dificuldade Difícil deve indicar menor quantidade de pistas.
* A explicação deve ser curta e clara.

**Prioridade:** Média

---

### US017 — Registrar dificuldade escolhida

**Como** sistema,
**quero** salvar a dificuldade selecionada pelo usuário,
**para** relacionar os dados cognitivos ao nível de desafio.

**Critérios de aceitação:**

* A dificuldade deve ser salva no início da partida.
* O relatório final deve conter a dificuldade jogada.
* O histórico de partidas deve armazenar essa informação.
* A dificuldade deve influenciar a geração do tabuleiro.

**Prioridade:** Alta

---

## Épico 5 — Geração do Sudoku

### US018 — Gerar tabuleiro Sudoku válido

**Como** usuário,
**quero** jogar em um tabuleiro Sudoku válido,
**para** ter uma experiência correta e justa.

**Critérios de aceitação:**

* O tabuleiro deve seguir as regras do Sudoku.
* Não pode haver números repetidos em linhas, colunas ou blocos 3x3.
* O tabuleiro deve possuir uma solução válida.
* O tabuleiro não deve gerar estados impossíveis.

**Prioridade:** Alta

---

### US019 — Gerar tabuleiro conforme dificuldade

**Como** usuário,
**quero** que o nível escolhido altere a complexidade do Sudoku,
**para** jogar partidas coerentes com minha escolha.

**Critérios de aceitação:**

* Fácil deve ter mais números preenchidos inicialmente.
* Médio deve ter quantidade intermediária de pistas.
* Difícil deve ter menos pistas.
* O sistema deve registrar a quantidade de casas vazias.
* O nível deve impactar a análise final.

**Prioridade:** Alta

---

### US020 — Garantir solução única do Sudoku

**Como** sistema,
**quero** gerar Sudokus com solução única,
**para** evitar ambiguidades durante a partida.

**Critérios de aceitação:**

* Cada tabuleiro deve possuir apenas uma solução correta.
* O sistema deve validar o tabuleiro gerado.
* Se houver múltiplas soluções, o tabuleiro deve ser descartado.
* A partida só deve iniciar com tabuleiro válido.

**Prioridade:** Alta

---

### US021 — Armazenar solução correta da partida

**Como** sistema,
**quero** armazenar a solução correta do Sudoku,
**para** validar as jogadas do usuário.

**Critérios de aceitação:**

* A solução deve ser associada à partida atual.
* O usuário não deve visualizar a solução durante o jogo.
* A solução deve ser usada para validar acertos e erros.
* A solução pode ser usada no relatório final para análise.

**Prioridade:** Alta

---

## Épico 6 — Tela do jogo Sudoku

### US022 — Exibir tabuleiro 9x9

**Como** usuário,
**quero** visualizar o tabuleiro Sudoku em formato 9x9,
**para** jogar de maneira tradicional.

**Critérios de aceitação:**

* O tabuleiro deve possuir 81 casas.
* As casas devem ser organizadas em 9 linhas e 9 colunas.
* Os blocos 3x3 devem ser visualmente separados.
* Casas fixas e casas editáveis devem ter aparência diferente.

**Prioridade:** Alta

---

### US023 — Selecionar uma célula do tabuleiro

**Como** usuário,
**quero** tocar em uma célula,
**para** inserir ou alterar um número.

**Critérios de aceitação:**

* Ao tocar em uma célula editável, ela deve ficar selecionada.
* Casas fixas não devem aceitar edição.
* A célula selecionada deve ter destaque visual.
* O sistema deve registrar qual célula foi selecionada.

**Prioridade:** Alta

---

### US024 — Inserir número em uma célula

**Como** usuário,
**quero** inserir números de 1 a 9,
**para** preencher o Sudoku.

**Critérios de aceitação:**

* Deve existir um teclado numérico de 1 a 9.
* O número deve ser inserido na célula selecionada.
* Apenas células editáveis devem aceitar números.
* A inserção deve ser registrada para análise cognitiva.

**Prioridade:** Alta

---

### US025 — Apagar número inserido

**Como** usuário,
**quero** apagar um número inserido,
**para** corrigir uma jogada.

**Critérios de aceitação:**

* Deve existir uma opção de apagar.
* Apenas números inseridos pelo usuário podem ser apagados.
* Números fixos do tabuleiro não podem ser apagados.
* A ação de apagar deve ser registrada.

**Prioridade:** Alta

---

### US026 — Destacar linha, coluna e bloco da célula selecionada

**Como** usuário,
**quero** visualizar a linha, coluna e bloco relacionados à célula selecionada,
**para** facilitar minha análise do jogo.

**Critérios de aceitação:**

* Ao selecionar uma célula, sua linha deve ser destacada.
* Sua coluna deve ser destacada.
* Seu bloco 3x3 deve ser destacado.
* O destaque deve melhorar a leitura sem revelar respostas.

**Prioridade:** Média

---

### US027 — Destacar números iguais no tabuleiro

**Como** usuário,
**quero** visualizar números iguais ao selecionado,
**para** identificar padrões com mais facilidade.

**Critérios de aceitação:**

* Ao selecionar um número, todos os números iguais devem ser destacados.
* O destaque não deve mostrar se estão certos ou errados, a menos que essa opção seja ativada.
* O recurso deve ajudar na percepção de padrões.
* A interação pode ser usada como dado para análise.

**Prioridade:** Média

---

### US028 — Validar conflitos no tabuleiro

**Como** usuário,
**quero** ser avisado quando inserir um número que entra em conflito,
**para** perceber possíveis erros.

**Critérios de aceitação:**

* O sistema deve identificar números repetidos em linha.
* O sistema deve identificar números repetidos em coluna.
* O sistema deve identificar números repetidos em bloco 3x3.
* O conflito deve ser destacado visualmente.
* O erro deve ser registrado para análise cognitiva.

**Prioridade:** Alta

---

### US029 — Registrar jogadas corretas

**Como** sistema,
**quero** registrar jogadas corretas do usuário,
**para** calcular desempenho durante a partida.

**Critérios de aceitação:**

* Cada jogada correta deve ser salva.
* Deve registrar número inserido, célula, horário e tempo desde o início.
* Deve registrar a dificuldade da partida.
* Os dados devem ser usados no relatório.

**Prioridade:** Alta

---

### US030 — Registrar jogadas incorretas

**Como** sistema,
**quero** registrar jogadas incorretas,
**para** avaliar erros, impulsividade e monitoramento cognitivo.

**Critérios de aceitação:**

* Cada jogada incorreta deve ser salva.
* Deve registrar célula, número inserido, número correto e horário.
* Deve registrar se o usuário corrigiu o erro depois.
* Deve contabilizar erros repetidos na mesma célula.

**Prioridade:** Alta

---

### US031 — Registrar tempo total da partida

**Como** sistema,
**quero** medir o tempo total da partida,
**para** avaliar velocidade de processamento e persistência.

**Critérios de aceitação:**

* O tempo deve começar ao iniciar a partida.
* O tempo deve parar ao concluir ou abandonar a partida.
* O relatório deve exibir o tempo total.
* O tempo deve ser salvo no histórico.

**Prioridade:** Alta

---

### US032 — Registrar tempo por jogada

**Como** sistema,
**quero** medir o tempo entre uma jogada e outra,
**para** analisar velocidade de raciocínio e tomada de decisão.

**Critérios de aceitação:**

* Cada jogada deve registrar o tempo desde a jogada anterior.
* O sistema deve calcular tempo médio por jogada.
* O sistema deve identificar longos períodos sem ação.
* Os dados devem alimentar a análise cognitiva.

**Prioridade:** Alta

---

### US033 — Permitir pausar a partida

**Como** usuário,
**quero** pausar a partida,
**para** interromper temporariamente o jogo sem prejudicar a análise.

**Critérios de aceitação:**

* Deve existir botão de pausa.
* Durante a pausa, o cronômetro da partida deve parar ou registrar tempo pausado separadamente.
* O tabuleiro pode ficar oculto durante a pausa.
* O relatório deve indicar se houve pausas.

**Prioridade:** Média

---

### US034 — Abandonar partida

**Como** usuário,
**quero** poder abandonar uma partida,
**para** encerrar a atividade quando não quiser continuar.

**Critérios de aceitação:**

* Deve existir opção de abandonar partida.
* O sistema deve pedir confirmação.
* A partida abandonada deve ser registrada.
* O relatório deve indicar abandono, tempo jogado e progresso alcançado.

**Prioridade:** Média

---

### US035 — Finalizar partida automaticamente

**Como** sistema,
**quero** detectar quando o Sudoku foi concluído,
**para** finalizar a partida e gerar os dados de análise.

**Critérios de aceitação:**

* O sistema deve verificar se todas as células foram preenchidas.
* O sistema deve validar se a solução está correta.
* Se estiver correta, a partida deve ser concluída.
* O usuário deve ser direcionado para a tela de resultado.
* Os dados finais devem ser salvos.

**Prioridade:** Alta

---

## Épico 7 — Coleta de dados cognitivos durante o jogo

### US036 — Coletar dados para memória de trabalho

**Como** sistema,
**quero** registrar comportamentos relacionados à memória de trabalho,
**para** avaliar a capacidade do usuário de manter informações temporárias durante o jogo.

**Critérios de aceitação:**

* Registrar tempo gasto antes de inserir números em células complexas.
* Registrar mudanças frequentes em uma mesma célula.
* Registrar uso de marcações, caso existam.
* Registrar retorno repetido às mesmas regiões do tabuleiro.
* O relatório deve gerar uma interpretação sobre memória de trabalho.

**Prioridade:** Alta

---

### US037 — Coletar dados para memória recente

**Como** sistema,
**quero** observar se o usuário repete erros recentes,
**para** analisar possíveis dificuldades de retenção.

**Critérios de aceitação:**

* Registrar erros repetidos no mesmo número ou célula.
* Registrar se o usuário repete uma tentativa incorreta pouco tempo depois.
* Registrar se o usuário corrige um erro e depois volta a cometê-lo.
* O relatório deve indicar padrões de repetição.

**Prioridade:** Alta

---

### US038 — Coletar dados para atenção e concentração

**Como** sistema,
**quero** registrar pausas, inatividade e mudanças dispersas no tabuleiro,
**para** analisar atenção e concentração.

**Critérios de aceitação:**

* Registrar períodos longos sem interação.
* Registrar alternância excessiva entre áreas distantes do tabuleiro.
* Registrar número de toques sem inserção de valor.
* Calcular uma métrica de foco durante a partida.

**Prioridade:** Alta

---

### US039 — Coletar dados para função executiva

**Como** sistema,
**quero** registrar estratégia, sequência de ações e correções,
**para** avaliar planejamento e controle cognitivo.

**Critérios de aceitação:**

* Registrar ordem das jogadas.
* Registrar se o usuário corrige erros de forma autônoma.
* Registrar se o usuário utiliza uma sequência lógica.
* Calcular indicadores de organização estratégica.

**Prioridade:** Alta

---

### US040 — Coletar dados para planejamento

**Como** sistema,
**quero** identificar se o usuário segue uma ordem organizada,
**para** avaliar sua capacidade de planejamento.

**Critérios de aceitação:**

* Registrar se o usuário resolve por linha, coluna, bloco ou número.
* Registrar mudanças bruscas de região.
* Registrar quantidade de células analisadas antes de uma jogada.
* O relatório deve indicar se houve padrão planejado ou aleatório.

**Prioridade:** Alta

---

### US041 — Coletar dados para raciocínio lógico

**Como** sistema,
**quero** analisar a proporção entre jogadas corretas e incorretas,
**para** estimar a qualidade do raciocínio lógico.

**Critérios de aceitação:**

* Calcular percentual de acertos.
* Calcular percentual de erros.
* Registrar erros que violam regras básicas do Sudoku.
* Diferenciar erro por conflito visível de erro por solução final incorreta.

**Prioridade:** Alta

---

### US042 — Coletar dados para resolução de problemas

**Como** sistema,
**quero** medir como o usuário avança diante de dificuldade,
**para** avaliar sua capacidade de resolver problemas.

**Critérios de aceitação:**

* Registrar tempo para resolver partes mais difíceis.
* Registrar se o usuário abandona regiões complexas.
* Registrar se retorna posteriormente e resolve corretamente.
* Calcular progresso ao longo do tempo.

**Prioridade:** Alta

---

### US043 — Coletar dados para flexibilidade cognitiva

**Como** sistema,
**quero** registrar mudanças de estratégia,
**para** avaliar se o usuário consegue adaptar o raciocínio.

**Critérios de aceitação:**

* Registrar alternância entre análise por linha, coluna, bloco e número.
* Identificar se o usuário fica preso em uma única região.
* Registrar se muda de estratégia após erros.
* O relatório deve descrever nível de flexibilidade observado.

**Prioridade:** Alta

---

### US044 — Coletar dados para controle inibitório

**Como** sistema,
**quero** registrar jogadas impulsivas,
**para** analisar controle inibitório.

**Critérios de aceitação:**

* Registrar jogadas feitas em tempo muito curto.
* Registrar erros cometidos logo após seleção da célula.
* Registrar tentativas aleatórias repetidas.
* O relatório deve indicar possível impulsividade na tomada de decisão.

**Prioridade:** Alta

---

### US045 — Coletar dados para monitoramento de erros

**Como** sistema,
**quero** registrar se o usuário percebe e corrige erros,
**para** avaliar automonitoramento.

**Critérios de aceitação:**

* Registrar erros corrigidos pelo próprio usuário.
* Registrar tempo entre erro e correção.
* Registrar erros mantidos até o fim da partida.
* O relatório deve indicar capacidade de revisão e autocorreção.

**Prioridade:** Alta

---

### US046 — Coletar dados para velocidade de processamento

**Como** sistema,
**quero** medir o ritmo de resolução da partida,
**para** avaliar velocidade de processamento cognitivo.

**Critérios de aceitação:**

* Calcular tempo médio por jogada.
* Calcular tempo médio por célula correta.
* Comparar tempo entre início, meio e fim da partida.
* Indicar lentidão ou melhora no ritmo durante o jogo.

**Prioridade:** Alta

---

### US047 — Coletar dados para habilidade visuoespacial

**Como** sistema,
**quero** registrar erros relacionados a linhas, colunas e blocos,
**para** avaliar habilidade visuoespacial.

**Critérios de aceitação:**

* Registrar conflitos por linha.
* Registrar conflitos por coluna.
* Registrar conflitos por bloco 3x3.
* Identificar padrões de confusão espacial.
* O relatório deve apontar dificuldades visuoespaciais observáveis.

**Prioridade:** Alta

---

### US048 — Coletar dados para organização da tarefa

**Como** sistema,
**quero** analisar a ordem de execução do jogo,
**para** avaliar organização durante a atividade.

**Critérios de aceitação:**

* Registrar sequência de células selecionadas.
* Registrar se o usuário segue regiões próximas.
* Registrar dispersão no tabuleiro.
* Gerar indicador de organização da tarefa.

**Prioridade:** Alta

---

### US049 — Coletar dados para tomada de decisão

**Como** sistema,
**quero** registrar o tempo e a precisão das escolhas,
**para** avaliar tomada de decisão.

**Critérios de aceitação:**

* Registrar tempo entre selecionar célula e inserir número.
* Registrar acerto ou erro da decisão.
* Registrar decisões rápidas incorretas.
* Registrar decisões demoradas corretas.
* O relatório deve interpretar equilíbrio entre velocidade e precisão.

**Prioridade:** Alta

---

### US050 — Coletar dados para aprendizagem de estratégias

**Como** sistema,
**quero** comparar o desempenho do usuário ao longo da partida,
**para** avaliar se ele aprende e melhora sua estratégia.

**Critérios de aceitação:**

* Comparar taxa de erros no início, meio e fim.
* Comparar tempo médio por jogada ao longo da partida.
* Verificar se erros repetidos diminuem.
* O relatório deve indicar sinais de aprendizagem durante a atividade.

**Prioridade:** Média

---

### US051 — Coletar dados para retenção de instruções

**Como** sistema,
**quero** verificar se o usuário respeita as regras do Sudoku após instruções iniciais,
**para** avaliar retenção de instruções.

**Critérios de aceitação:**

* O app deve apresentar instruções antes da partida.
* O sistema deve registrar violações básicas das regras.
* O sistema deve registrar se erros simples continuam ocorrendo.
* O relatório deve relacionar erros básicos à retenção de instruções.

**Prioridade:** Média

---

### US052 — Coletar dados para percepção de padrões

**Como** sistema,
**quero** observar se o usuário identifica padrões numéricos no tabuleiro,
**para** avaliar percepção de padrões.

**Critérios de aceitação:**

* Registrar quando o usuário resolve várias células relacionadas ao mesmo número.
* Registrar uso de destaque de números iguais.
* Registrar resolução por blocos ou sequências.
* O relatório deve indicar capacidade de identificar padrões.

**Prioridade:** Média

---

### US053 — Coletar dados para persistência e tolerância à frustração

**Como** sistema,
**quero** registrar comportamento diante de erros e dificuldades,
**para** avaliar persistência e tolerância à frustração.

**Critérios de aceitação:**

* Registrar abandono de partida.
* Registrar aumento de erros após longos períodos.
* Registrar pausas após erros consecutivos.
* Registrar se o usuário continua tentando após dificuldades.
* O relatório deve indicar nível de persistência observado.

**Prioridade:** Média

---

### US054 — Coletar dados para linguagem e explicação do raciocínio

**Como** usuário,
**quero** poder explicar meu raciocínio ao final da partida,
**para** que o relatório inclua uma análise qualitativa da linguagem e da explicação.

**Critérios de aceitação:**

* Ao final da partida, o app deve exibir uma pergunta como: “Explique brevemente como você resolveu o Sudoku.”
* O usuário deve poder escrever uma resposta.
* O texto deve ser salvo junto à partida.
* O relatório deve incluir esse campo.
* O app pode avaliar se a resposta foi completa, curta, confusa ou coerente.

**Prioridade:** Média

---

### US055 — Coletar dados para autonomia durante a atividade

**Como** sistema,
**quero** registrar o uso de ajuda, dicas ou intervenções,
**para** avaliar autonomia durante a atividade.

**Critérios de aceitação:**

* O app deve registrar se o usuário pediu ajuda.
* Deve registrar uso de dicas, caso existam.
* Deve registrar se a partida foi concluída sem auxílio.
* O relatório deve indicar nível de autonomia.

**Prioridade:** Média

---

## Épico 8 — Recursos de apoio ao jogador

### US056 — Criar tela de instruções antes da partida

**Como** usuário,
**quero** ler instruções antes de jogar,
**para** entender as regras e reduzir erros por desconhecimento.

**Critérios de aceitação:**

* A tela deve explicar regras básicas do Sudoku.
* Deve informar que linhas, colunas e blocos 3x3 não podem repetir números.
* Deve explicar como inserir e apagar números.
* O usuário deve confirmar que entendeu antes de iniciar.

**Prioridade:** Alta

---

### US057 — Registrar confirmação das instruções

**Como** sistema,
**quero** registrar que o usuário visualizou as instruções,
**para** relacionar erros posteriores à retenção de instruções.

**Critérios de aceitação:**

* O sistema deve salvar data e horário da confirmação.
* A confirmação deve ser vinculada à partida.
* O relatório deve indicar que as instruções foram apresentadas.
* Caso o usuário pule as instruções, isso deve ser registrado.

**Prioridade:** Média

---

### US058 — Criar sistema opcional de dicas

**Como** usuário,
**quero** solicitar dicas durante a partida,
**para** continuar jogando quando estiver travado.

**Critérios de aceitação:**

* Deve existir botão de dica.
* A dica não deve necessariamente entregar a resposta diretamente.
* O uso de dica deve ser registrado.
* A quantidade de dicas deve aparecer no relatório.
* O uso de dica deve impactar a análise de autonomia.

**Prioridade:** Baixa

---

### US059 — Registrar quantidade de dicas usadas

**Como** sistema,
**quero** contabilizar as dicas usadas,
**para** analisar autonomia e resolução de problemas.

**Critérios de aceitação:**

* Cada dica solicitada deve ser registrada.
* Deve registrar o momento da partida em que a dica foi usada.
* Deve registrar a célula ou região relacionada, se aplicável.
* O relatório deve mostrar total de dicas.

**Prioridade:** Baixa

---

### US060 — Criar opção de anotações/candidatos

**Como** usuário,
**quero** anotar possíveis números em uma célula,
**para** organizar meu raciocínio durante a resolução.

**Critérios de aceitação:**

* O usuário deve conseguir inserir candidatos pequenos em uma célula.
* As anotações devem ser diferentes de respostas definitivas.
* O uso de anotações deve ser registrado.
* O relatório pode usar esses dados para memória de trabalho e planejamento.

**Prioridade:** Média

---

## Épico 9 — Armazenamento de dados da partida

### US061 — Criar modelo de dados do usuário

**Como** desenvolvedor,
**quero** definir o modelo de dados do usuário,
**para** armazenar nome, registro e status da conta.

**Critérios de aceitação:**

* O modelo deve conter id, nome, matrícula/registro e status.
* Deve conter data de criação ou atualização, se aplicável.
* Deve ser possível buscar usuário pelo número de registro.
* O modelo deve ser reutilizável no app.

**Prioridade:** Alta

---

### US062 — Criar modelo de dados da partida

**Como** desenvolvedor,
**quero** definir o modelo de dados da partida,
**para** registrar todas as informações necessárias para análise.

**Critérios de aceitação:**

* O modelo deve conter id da partida.
* Deve conter id do usuário.
* Deve conter dificuldade.
* Deve conter data e horário de início e fim.
* Deve conter status: concluída, abandonada ou em andamento.
* Deve conter tempo total.

**Prioridade:** Alta

---

### US063 — Criar modelo de dados das jogadas

**Como** desenvolvedor,
**quero** definir o modelo de jogadas,
**para** registrar cada ação realizada no Sudoku.

**Critérios de aceitação:**

* Cada jogada deve ter célula, número inserido e horário.
* Deve registrar se a jogada foi correta ou incorreta.
* Deve registrar ação: inserir, apagar, alterar, dica ou pausa.
* Deve registrar tempo desde o início da partida.
* Deve registrar tempo desde a última ação.

**Prioridade:** Alta

---

### US064 — Salvar partida localmente

**Como** sistema,
**quero** salvar os dados da partida no dispositivo,
**para** não perder informações caso o app seja fechado.

**Critérios de aceitação:**

* Os dados devem ser persistidos localmente.
* Se o app fechar, a partida deve poder ser recuperada.
* O sistema deve evitar perda de jogadas já registradas.
* O usuário deve poder continuar ou encerrar a partida recuperada.

**Prioridade:** Alta

---

### US065 — Salvar relatório final da partida

**Como** sistema,
**quero** salvar o relatório gerado ao final da partida,
**para** permitir consulta e exportação posterior.

**Critérios de aceitação:**

* O relatório deve ser vinculado à partida.
* Deve conter dados quantitativos e qualitativos.
* Deve conter os tópicos de análise cognitiva.
* Deve ser acessível pelo histórico do usuário.

**Prioridade:** Alta

---

## Épico 10 — Cálculo das métricas cognitivas

### US066 — Calcular indicador de memória de trabalho

**Como** sistema,
**quero** calcular um indicador de memória de trabalho,
**para** representar a capacidade do usuário de manter hipóteses durante o jogo.

**Critérios de aceitação:**

* O cálculo deve considerar alterações em células.
* Deve considerar retorno repetido a uma mesma região.
* Deve considerar uso de anotações/candidatos.
* O resultado deve ser apresentado no relatório.

**Prioridade:** Alta

---

### US067 — Calcular indicador de memória recente

**Como** sistema,
**quero** calcular um indicador de memória recente,
**para** identificar repetições de erros recentes.

**Critérios de aceitação:**

* O cálculo deve considerar erros repetidos em curto intervalo.
* Deve considerar repetição do mesmo número errado.
* Deve considerar reincidência após correção.
* O relatório deve apresentar a interpretação.

**Prioridade:** Alta

---

### US068 — Calcular indicador de atenção e concentração

**Como** sistema,
**quero** calcular um indicador de atenção,
**para** avaliar continuidade e foco durante a partida.

**Critérios de aceitação:**

* O cálculo deve considerar períodos de inatividade.
* Deve considerar toques sem jogada.
* Deve considerar dispersão entre regiões do tabuleiro.
* Deve gerar uma classificação ou pontuação.

**Prioridade:** Alta

---

### US069 — Calcular indicador de função executiva

**Como** sistema,
**quero** calcular um indicador de função executiva,
**para** avaliar planejamento, correção e adaptação durante o jogo.

**Critérios de aceitação:**

* O cálculo deve considerar sequência das jogadas.
* Deve considerar correção de erros.
* Deve considerar mudança de estratégia.
* Deve considerar eficiência na resolução.

**Prioridade:** Alta

---

### US070 — Calcular indicador de planejamento

**Como** sistema,
**quero** calcular um indicador de planejamento,
**para** analisar se o usuário seguiu uma estratégia organizada.

**Critérios de aceitação:**

* Deve identificar padrões de resolução por região.
* Deve identificar resolução aleatória ou estruturada.
* Deve considerar continuidade entre jogadas próximas.
* Deve aparecer no relatório.

**Prioridade:** Alta

---

### US071 — Calcular indicador de raciocínio lógico

**Como** sistema,
**quero** calcular um indicador de raciocínio lógico,
**para** avaliar a precisão das escolhas do usuário.

**Critérios de aceitação:**

* Deve considerar percentual de acertos.
* Deve considerar erros contra regras básicas.
* Deve considerar correções posteriores.
* Deve gerar análise textual no relatório.

**Prioridade:** Alta

---

### US072 — Calcular indicador de resolução de problemas

**Como** sistema,
**quero** calcular um indicador de resolução de problemas,
**para** avaliar como o usuário lida com desafios durante o Sudoku.

**Critérios de aceitação:**

* Deve considerar avanço após erros.
* Deve considerar resolução de células difíceis.
* Deve considerar persistência em regiões complexas.
* Deve considerar conclusão ou abandono da partida.

**Prioridade:** Alta

---

### US073 — Calcular indicador de flexibilidade cognitiva

**Como** sistema,
**quero** calcular um indicador de flexibilidade cognitiva,
**para** avaliar adaptação de estratégia.

**Critérios de aceitação:**

* Deve identificar mudança de abordagem durante a partida.
* Deve identificar insistência em estratégias ineficientes.
* Deve considerar reação após erros.
* Deve aparecer no relatório final.

**Prioridade:** Alta

---

### US074 — Calcular indicador de controle inibitório

**Como** sistema,
**quero** calcular um indicador de controle inibitório,
**para** avaliar impulsividade durante as jogadas.

**Critérios de aceitação:**

* Deve considerar jogadas muito rápidas e erradas.
* Deve considerar tentativas repetidas sem análise.
* Deve considerar inserção de números conflitantes.
* Deve gerar uma interpretação no relatório.

**Prioridade:** Alta

---

### US075 — Calcular indicador de monitoramento de erros

**Como** sistema,
**quero** calcular um indicador de monitoramento de erros,
**para** avaliar se o usuário percebe e corrige seus próprios erros.

**Critérios de aceitação:**

* Deve considerar erros corrigidos.
* Deve considerar tempo até correção.
* Deve considerar erros mantidos até o fim.
* Deve indicar nível de autocorreção.

**Prioridade:** Alta

---

### US076 — Calcular indicador de velocidade de processamento

**Como** sistema,
**quero** calcular um indicador de velocidade de processamento,
**para** avaliar o ritmo de resposta do usuário.

**Critérios de aceitação:**

* Deve considerar tempo médio por jogada.
* Deve considerar tempo total.
* Deve considerar variação de ritmo.
* Deve comparar início, meio e fim da partida.

**Prioridade:** Alta

---

### US077 — Calcular indicador de habilidade visuoespacial

**Como** sistema,
**quero** calcular um indicador visuoespacial,
**para** identificar dificuldades com linhas, colunas e blocos.

**Critérios de aceitação:**

* Deve considerar conflitos espaciais.
* Deve diferenciar erros por linha, coluna e bloco.
* Deve identificar concentração de erros em regiões específicas.
* Deve gerar comentário interpretativo.

**Prioridade:** Alta

---

### US078 — Calcular indicador de organização da tarefa

**Como** sistema,
**quero** calcular um indicador de organização,
**para** avaliar a forma como o usuário conduz a atividade.

**Critérios de aceitação:**

* Deve considerar sequência de ações.
* Deve considerar alternância entre áreas.
* Deve considerar abandono de células incompletas.
* Deve indicar se houve organização alta, média ou baixa.

**Prioridade:** Alta

---

### US079 — Calcular indicador de tomada de decisão

**Como** sistema,
**quero** calcular um indicador de tomada de decisão,
**para** avaliar equilíbrio entre velocidade e precisão.

**Critérios de aceitação:**

* Deve considerar tempo de decisão.
* Deve considerar taxa de acerto.
* Deve considerar decisões rápidas incorretas.
* Deve considerar decisões demoradas corretas.
* Deve gerar análise textual.

**Prioridade:** Alta

---

### US080 — Calcular indicador de aprendizagem de estratégias

**Como** sistema,
**quero** calcular um indicador de aprendizagem,
**para** observar evolução durante a partida.

**Critérios de aceitação:**

* Deve comparar erros no início, meio e fim.
* Deve comparar tempo médio por jogada ao longo da partida.
* Deve verificar melhora progressiva.
* Deve aparecer no relatório.

**Prioridade:** Média

---

### US081 — Calcular indicador de retenção de instruções

**Como** sistema,
**quero** calcular um indicador de retenção de instruções,
**para** avaliar se o usuário manteve as regras aprendidas no início.

**Critérios de aceitação:**

* Deve considerar violações básicas de regra.
* Deve considerar repetição dessas violações.
* Deve considerar se erros diminuem após feedback visual.
* Deve gerar comentário no relatório.

**Prioridade:** Média

---

### US082 — Calcular indicador de percepção de padrões

**Como** sistema,
**quero** calcular um indicador de percepção de padrões,
**para** avaliar identificação de sequências e relações no tabuleiro.

**Critérios de aceitação:**

* Deve considerar jogadas relacionadas ao mesmo número.
* Deve considerar resolução por blocos.
* Deve considerar sequência lógica de preenchimento.
* Deve aparecer no relatório.

**Prioridade:** Média

---

### US083 — Calcular indicador de persistência e tolerância à frustração

**Como** sistema,
**quero** calcular um indicador de persistência,
**para** avaliar comportamento diante de dificuldade.

**Critérios de aceitação:**

* Deve considerar abandono ou conclusão.
* Deve considerar continuidade após erros.
* Deve considerar pausas após erros consecutivos.
* Deve considerar tempo ativo de jogo.
* Deve gerar interpretação no relatório.

**Prioridade:** Média

---

### US084 — Calcular indicador de linguagem e explicação do raciocínio

**Como** sistema,
**quero** analisar a explicação escrita pelo usuário,
**para** registrar aspectos qualitativos da linguagem e do raciocínio.

**Critérios de aceitação:**

* O relatório deve incluir a explicação escrita.
* O sistema pode indicar se a explicação foi ausente, curta, coerente ou detalhada.
* O campo deve ser tratado como dado qualitativo, não diagnóstico.
* O relatório deve deixar claro que a análise é observacional.

**Prioridade:** Média

---

### US085 — Calcular indicador de autonomia durante a atividade

**Como** sistema,
**quero** calcular um indicador de autonomia,
**para** avaliar o quanto o usuário precisou de apoio.

**Critérios de aceitação:**

* Deve considerar uso de dicas.
* Deve considerar uso de ajuda.
* Deve considerar conclusão sem intervenção.
* Deve considerar abandono.
* Deve aparecer no relatório final.

**Prioridade:** Média

---

## Épico 11 — Tela de resultado da partida

### US086 — Exibir resultado geral da partida

**Como** usuário,
**quero** visualizar um resumo ao concluir o Sudoku,
**para** entender meu desempenho geral.

**Critérios de aceitação:**

* A tela deve mostrar se a partida foi concluída ou abandonada.
* Deve mostrar dificuldade.
* Deve mostrar tempo total.
* Deve mostrar número de acertos e erros.
* Deve mostrar percentual de conclusão.

**Prioridade:** Alta

---

### US087 — Exibir métricas cognitivas resumidas

**Como** usuário,
**quero** visualizar um resumo das métricas cognitivas,
**para** entender os principais resultados observados.

**Critérios de aceitação:**

* A tela deve listar os tópicos cognitivos avaliados.
* Cada tópico deve ter um resumo curto.
* Deve evitar linguagem diagnóstica definitiva.
* Deve indicar que os resultados são observacionais.

**Prioridade:** Alta

---

### US088 — Exibir detalhes de desempenho

**Como** usuário,
**quero** visualizar detalhes sobre minhas ações no jogo,
**para** compreender melhor meu desempenho.

**Critérios de aceitação:**

* Deve exibir total de jogadas.
* Deve exibir total de correções.
* Deve exibir erros repetidos.
* Deve exibir tempo médio por jogada.
* Deve exibir uso de dicas e pausas.

**Prioridade:** Média

---

## Épico 12 — Exportação de dados

### US089 — Criar botão Export Data

**Como** usuário,
**quero** ter um botão “Export Data”,
**para** gerar um relatório com os dados da partida.

**Critérios de aceitação:**

* O botão deve aparecer na tela de resultado.
* O botão deve gerar um relatório da partida.
* O botão deve estar disponível após partida concluída ou abandonada.
* O usuário deve receber feedback após clicar.

**Prioridade:** Alta

---

### US090 — Gerar relatório com dados do usuário

**Como** sistema,
**quero** incluir dados do usuário no relatório,
**para** identificar quem realizou a atividade.

**Critérios de aceitação:**

* O relatório deve conter nome do usuário.
* Deve conter número de matrícula/registro.
* Deve conter status da conta no momento da partida.
* Deve conter data e horário da atividade.

**Prioridade:** Alta

---

### US091 — Gerar relatório com dados da partida

**Como** sistema,
**quero** incluir dados da partida no relatório,
**para** documentar o contexto da análise.

**Critérios de aceitação:**

* O relatório deve conter dificuldade.
* O relatorio deve conter uma parte sobre a media de todas as partidas, com grafico de evolucao e outros com informacao relevante
* Deve conter tempo total.
* Deve conter status da partida.
* Deve conter quantidade de acertos.
* Deve conter quantidade de erros.
* Deve conter uso de dicas, pausas e abandono, se houver.

**Prioridade:** Alta

---

### US092 — Incluir tópico de memória de trabalho no relatório

**Como** avaliador,
**quero** visualizar a análise de memória de trabalho,
**para** observar a capacidade de manter informações temporárias durante o Sudoku.

**Critérios de aceitação:**

* O relatório deve conter seção “Memória de trabalho”.
* Deve apresentar dados relacionados.
* Deve conter interpretação textual.
* Deve evitar diagnóstico clínico direto.

**Prioridade:** Alta

---

### US093 — Incluir tópico de memória recente no relatório

**Como** avaliador,
**quero** visualizar a análise de memória recente,
**para** observar repetição de erros e retenção de informações recentes.

**Critérios de aceitação:**

* O relatório deve conter seção “Memória recente”.
* Deve apresentar erros repetidos.
* Deve indicar reincidências.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US094 — Incluir tópico de atenção e concentração no relatório

**Como** avaliador,
**quero** visualizar a análise de atenção e concentração,
**para** entender o nível de foco durante a atividade.

**Critérios de aceitação:**

* O relatório deve conter seção “Atenção e concentração”.
* Deve apresentar pausas e períodos de inatividade.
* Deve apresentar dispersão de ações.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US095 — Incluir tópico de função executiva no relatório

**Como** avaliador,
**quero** visualizar a análise de função executiva,
**para** avaliar planejamento, controle e adaptação.

**Critérios de aceitação:**

* O relatório deve conter seção “Função executiva”.
* Deve apresentar dados de estratégia, correção e organização.
* Deve conter interpretação observacional.
* Deve relacionar o desempenho ao jogo.

**Prioridade:** Alta

---

### US096 — Incluir tópico de planejamento no relatório

**Como** avaliador,
**quero** visualizar a análise de planejamento,
**para** entender se o usuário seguiu uma estratégia organizada.

**Critérios de aceitação:**

* O relatório deve conter seção “Planejamento”.
* Deve apresentar padrões de ordem das jogadas.
* Deve indicar se houve resolução organizada ou dispersa.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US097 — Incluir tópico de raciocínio lógico no relatório

**Como** avaliador,
**quero** visualizar a análise de raciocínio lógico,
**para** avaliar a coerência das escolhas feitas no Sudoku.

**Critérios de aceitação:**

* O relatório deve conter seção “Raciocínio lógico”.
* Deve apresentar taxa de acertos e erros.
* Deve apresentar conflitos cometidos.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US098 — Incluir tópico de resolução de problemas no relatório

**Como** avaliador,
**quero** visualizar a análise de resolução de problemas,
**para** observar como o usuário lidou com desafios.

**Critérios de aceitação:**

* O relatório deve conter seção “Resolução de problemas”.
* Deve apresentar avanço durante a partida.
* Deve indicar resposta a dificuldades.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US099 — Incluir tópico de flexibilidade cognitiva no relatório

**Como** avaliador,
**quero** visualizar a análise de flexibilidade cognitiva,
**para** entender se o usuário adaptou estratégias.

**Critérios de aceitação:**

* O relatório deve conter seção “Flexibilidade cognitiva”.
* Deve apresentar mudanças de estratégia.
* Deve indicar rigidez ou adaptação.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US100 — Incluir tópico de controle inibitório no relatório

**Como** avaliador,
**quero** visualizar a análise de controle inibitório,
**para** observar impulsividade ou cautela nas respostas.

**Critérios de aceitação:**

* O relatório deve conter seção “Controle inibitório”.
* Deve apresentar jogadas rápidas incorretas.
* Deve apresentar tentativas repetidas.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US101 — Incluir tópico de monitoramento de erros no relatório

**Como** avaliador,
**quero** visualizar a análise de monitoramento de erros,
**para** observar autocorreção e revisão.

**Critérios de aceitação:**

* O relatório deve conter seção “Monitoramento de erros”.
* Deve apresentar erros corrigidos.
* Deve apresentar tempo médio até correção.
* Deve apresentar erros mantidos.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US102 — Incluir tópico de velocidade de processamento no relatório

**Como** avaliador,
**quero** visualizar a análise de velocidade de processamento,
**para** observar ritmo e tempo de resposta.

**Critérios de aceitação:**

* O relatório deve conter seção “Velocidade de processamento”.
* Deve apresentar tempo total.
* Deve apresentar tempo médio por jogada.
* Deve apresentar variação de ritmo.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US103 — Incluir tópico de habilidade visuoespacial no relatório

**Como** avaliador,
**quero** visualizar a análise de habilidade visuoespacial,
**para** observar dificuldades com linhas, colunas e blocos.

**Critérios de aceitação:**

* O relatório deve conter seção “Habilidade visuoespacial”.
* Deve apresentar conflitos por linha, coluna e bloco.
* Deve identificar padrões de erro espacial.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US104 — Incluir tópico de organização da tarefa no relatório

**Como** avaliador,
**quero** visualizar a análise de organização da tarefa,
**para** entender como o usuário conduziu a atividade.

**Critérios de aceitação:**

* O relatório deve conter seção “Organização da tarefa”.
* Deve apresentar sequência e dispersão de ações.
* Deve indicar organização alta, média ou baixa.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US105 — Incluir tópico de tomada de decisão no relatório

**Como** avaliador,
**quero** visualizar a análise de tomada de decisão,
**para** avaliar velocidade, precisão e segurança nas escolhas.

**Critérios de aceitação:**

* O relatório deve conter seção “Tomada de decisão”.
* Deve apresentar tempo médio de decisão.
* Deve relacionar rapidez e acerto.
* Deve conter interpretação textual.

**Prioridade:** Alta

---

### US106 — Incluir tópico de aprendizagem de estratégias no relatório

**Como** avaliador,
**quero** visualizar a análise de aprendizagem de estratégias,
**para** observar se houve melhora durante a partida.

**Critérios de aceitação:**

* O relatório deve conter seção “Aprendizagem de estratégias”.
* Deve comparar início, meio e fim da partida.
* Deve indicar melhora, estabilidade ou piora.
* Deve conter interpretação textual.

**Prioridade:** Média

---

### US107 — Incluir tópico de retenção de instruções no relatório

**Como** avaliador,
**quero** visualizar a análise de retenção de instruções,
**para** observar se o usuário manteve as regras durante o jogo.

**Critérios de aceitação:**

* O relatório deve conter seção “Retenção de instruções”.
* Deve relacionar instruções vistas e erros básicos.
* Deve indicar repetição ou redução de violações.
* Deve conter interpretação textual.

**Prioridade:** Média

---

### US108 — Incluir tópico de percepção de padrões no relatório

**Como** avaliador,
**quero** visualizar a análise de percepção de padrões,
**para** observar identificação de relações no tabuleiro.

**Critérios de aceitação:**

* O relatório deve conter seção “Percepção de padrões”.
* Deve apresentar sequências de resolução relacionadas.
* Deve considerar uso de destaques e padrões numéricos.
* Deve conter interpretação textual.

**Prioridade:** Média

---

### US109 — Incluir tópico de persistência e tolerância à frustração no relatório

**Como** avaliador,
**quero** visualizar a análise de persistência,
**para** observar como o usuário reagiu a erros e dificuldade.

**Critérios de aceitação:**

* O relatório deve conter seção “Persistência e tolerância à frustração”.
* Deve apresentar abandono ou conclusão.
* Deve apresentar comportamento após erros.
* Deve conter interpretação textual.

**Prioridade:** Média

---

### US110 — Incluir tópico de linguagem e explicação do raciocínio no relatório

**Como** avaliador,
**quero** visualizar a explicação do raciocínio do usuário,
**para** analisar qualitativamente sua comunicação sobre a estratégia usada.

**Critérios de aceitação:**

* O relatório deve conter seção “Linguagem e explicação do raciocínio”.
* Deve incluir o texto escrito pelo usuário.
* Deve apresentar uma observação qualitativa.
* Deve evitar conclusões clínicas definitivas.

**Prioridade:** Média

---

### US111 — Incluir tópico de autonomia durante a atividade no relatório

**Como** avaliador,
**quero** visualizar a análise de autonomia,
**para** entender se o usuário precisou de ajuda.

**Critérios de aceitação:**

* O relatório deve conter seção “Autonomia durante a atividade”.
* Deve apresentar uso de dicas.
* Deve apresentar conclusão independente ou dependente de apoio.
* Deve conter interpretação textual.

**Prioridade:** Média

---

### US112 — Exportar relatório em formato JSON

**Como** desenvolvedor ou avaliador,
**quero** exportar os dados em JSON,
**para** permitir análise técnica posterior.

**Critérios de aceitação:**

* O arquivo JSON deve conter usuário, partida, jogadas e métricas.
* O JSON deve ser estruturado e legível.
* O arquivo deve poder ser compartilhado.
* O nome do arquivo deve conter matrícula e data da partida.

**Prioridade:** Alta

---

### US113 — Exportar relatório em formato PDF

**Como** avaliador,
**quero** exportar o relatório em PDF,
**para** apresentar os resultados de forma organizada.

**Critérios de aceitação:**

* O PDF deve conter identificação do usuário.
* Deve conter dados da partida.
* Deve conter todas as seções cognitivas.
* Deve conter observação de que o relatório é apenas uma análise observacional.
* O PDF deve poder ser compartilhado ou salvo.

**Prioridade:** Média

---

### US114 — Compartilhar relatório exportado

**Como** usuário ou avaliador,
**quero** compartilhar o relatório gerado,
**para** enviar os dados para análise externa.

**Critérios de aceitação:**

* O app deve abrir opções de compartilhamento do dispositivo.
* Deve permitir compartilhar PDF ou JSON.
* Deve tratar erro caso o compartilhamento falhe.
* O usuário deve receber confirmação de sucesso.

**Prioridade:** Média

---

## Épico 13 — Histórico e consulta de dados

### US115 — Listar partidas anteriores

**Como** usuário,
**quero** visualizar minhas partidas anteriores,
**para** acompanhar minha evolução.

**Critérios de aceitação:**

* Deve existir uma tela de histórico.
* Cada partida deve mostrar data, dificuldade, tempo e status.
* O usuário deve poder selecionar uma partida.
* O app deve carregar os detalhes da partida selecionada.

**Prioridade:** Média

---

### US116 — Visualizar relatório de uma partida anterior

**Como** usuário,
**quero** abrir relatórios de partidas anteriores,
**para** consultar dados já registrados.

**Critérios de aceitação:**

* O usuário deve conseguir abrir um relatório salvo.
* O relatório deve conter os dados originais da partida.
* Deve ser possível exportar novamente.
* O app deve preservar a integridade dos dados.

**Prioridade:** Média

---

### US117 — Comparar partidas anteriores

**Como** avaliador,
**quero** comparar partidas do mesmo usuário,
**para** observar evolução ou mudança de desempenho.

**Critérios de aceitação:**

* O sistema deve comparar tempo total.
* Deve comparar taxa de acertos e erros.
* Deve comparar métricas cognitivas.
* Deve permitir comparação por dificuldade.
* Deve apresentar resumo textual da evolução.

**Prioridade:** Baixa

---

## Épico 14 — Segurança, privacidade e ética

### US118 — Exibir aviso de não diagnóstico

**Como** usuário,
**quero** ser informado de que o app não fornece diagnóstico médico,
**para** entender os limites da análise.

**Critérios de aceitação:**

* O aviso deve aparecer antes da primeira partida.
* O relatório deve conter o mesmo aviso.
* O texto deve informar que os dados são observacionais.
* Deve recomendar avaliação profissional em caso de suspeita clínica.

**Prioridade:** Alta

---

### US119 — Solicitar consentimento para coleta de dados

**Como** usuário,
**quero** aceitar a coleta de dados da partida,
**para** autorizar o uso das informações geradas durante o jogo.

**Critérios de aceitação:**

* Antes da partida, o app deve explicar quais dados serão coletados.
* O usuário deve aceitar para continuar.
* A aceitação deve ser registrada.
* Sem consentimento, a partida com análise não deve iniciar.

**Prioridade:** Alta

---

### US120 — Proteger dados pessoais do usuário

**Como** sistema,
**quero** proteger dados pessoais e cognitivos,
**para** preservar a privacidade do usuário.

**Critérios de aceitação:**

* Dados sensíveis devem ser armazenados de forma segura.
* O app não deve expor dados de outros usuários.
* O relatório deve ser acessível apenas ao usuário autenticado ou avaliador autorizado.
* O sistema deve evitar vazamento de dados em logs.

**Prioridade:** Alta

---

### US121 — Permitir exclusão de dados locais

**Como** usuário,
**quero** apagar meus dados do dispositivo,
**para** controlar minhas informações.

**Critérios de aceitação:**

* Deve existir opção para apagar histórico local.
* O sistema deve pedir confirmação.
* Após exclusão, os dados não devem aparecer no histórico.
* A sessão pode ser mantida ou encerrada, conforme escolha do usuário.

**Prioridade:** Média

---

## Épico 15 — Testes e validação

### US122 — Testar fluxo completo de login

**Como** desenvolvedor,
**quero** testar o fluxo de login,
**para** garantir que contas ativas e inativas sejam tratadas corretamente.

**Critérios de aceitação:**

* Login com conta ativa deve funcionar.
* Login com conta inativa deve bloquear acesso.
* Registro inválido deve exibir erro.
* Erro de conexão deve ser tratado.

**Prioridade:** Alta

---

### US123 — Testar geração de Sudoku

**Como** desenvolvedor,
**quero** testar a geração dos tabuleiros,
**para** garantir que todos sejam válidos.

**Critérios de aceitação:**

* Tabuleiros devem respeitar regras do Sudoku.
* Cada tabuleiro deve ter solução.
* O nível de dificuldade deve alterar a quantidade de pistas.
* Tabuleiros inválidos não devem ser exibidos.

**Prioridade:** Alta

---

### US124 — Testar registro de jogadas

**Como** desenvolvedor,
**quero** testar o registro de ações do usuário,
**para** garantir que os dados cognitivos sejam coletados corretamente.

**Critérios de aceitação:**

* Inserções devem ser registradas.
* Erros devem ser registrados.
* Correções devem ser registradas.
* Pausas, dicas e abandono devem ser registrados.
* Os dados devem aparecer no relatório.

**Prioridade:** Alta

---

### US125 — Testar geração do relatório

**Como** desenvolvedor,
**quero** testar a geração do relatório,
**para** garantir que todas as seções cognitivas estejam presentes.

**Critérios de aceitação:**

* O relatório deve conter dados do usuário.
* Deve conter dados da partida.
* Deve conter todos os 20 tópicos cognitivos.
* Deve conter aviso de não diagnóstico.
* Deve ser exportável.

**Prioridade:** Alta

---

### US126 — Testar experiência do usuário

**Como** usuário,
**quero** utilizar o app sem confusão,
**para** realizar a atividade de Sudoku com facilidade.

**Critérios de aceitação:**

* O fluxo deve ser claro.
* Os botões devem ser compreensíveis.
* O tabuleiro deve ser legível.
* Mensagens de erro devem ser fáceis de entender.
* O usuário deve conseguir completar uma partida sem ajuda externa.

**Prioridade:** Média

---

## Épico 16 — Sequência recomendada de desenvolvimento

### Fase 1 — Base do app

1. US001 — Criar estrutura base do projeto React Native
2. US002 — Configurar navegação entre telas
3. US003 — Criar identidade visual básica

### Fase 2 — Login e perfil

4. US004 — Criar tela de login
5. US005 — Validar formato do número de registro
6. US006 — Consultar status da conta
7. US007 — Bloquear login de conta inativa
8. US008 — Exibir carregamento no login
9. US009 — Salvar sessão
10. US010 — Criar logout
11. US011 — Exibir dados do perfil
12. US012 — Exibir status da conta
13. US013 — Botão iniciar nova partida

### Fase 3 — Sudoku básico

14. US015 — Seleção de dificuldade
15. US017 — Registrar dificuldade
16. US018 — Gerar tabuleiro válido
17. US019 — Gerar por dificuldade
18. US020 — Garantir solução única
19. US021 — Armazenar solução
20. US022 — Exibir tabuleiro
21. US023 — Selecionar célula
22. US024 — Inserir número
23. US025 — Apagar número
24. US028 — Validar conflitos
25. US035 — Finalizar partida

### Fase 4 — Registro de dados da partida

26. US029 — Registrar jogadas corretas
27. US030 — Registrar jogadas incorretas
28. US031 — Registrar tempo total
29. US032 — Registrar tempo por jogada
30. US033 — Pausar partida
31. US034 — Abandonar partida
32. US061 — Modelo de usuário
33. US062 — Modelo de partida
34. US063 — Modelo de jogadas
35. US064 — Salvar partida localmente

### Fase 5 — Coleta cognitiva

36. US036 a US055 — Coletar dados dos 20 tópicos cognitivos

### Fase 6 — Cálculo de métricas

37. US066 a US085 — Calcular indicadores dos 20 tópicos cognitivos

### Fase 7 — Resultado e relatório

38. US086 — Exibir resultado geral
39. US087 — Exibir métricas cognitivas resumidas
40. US088 — Exibir detalhes de desempenho
41. US089 — Criar botão Export Data
42. US090 a US111 — Montar relatório completo

### Fase 8 — Exportação

43. US112 — Exportar JSON
44. US113 — Exportar PDF
45. US114 — Compartilhar relatório

### Fase 9 — Histórico

46. US014 — Histórico resumido no perfil
47. US115 — Listar partidas anteriores
48. US116 — Visualizar relatório anterior
49. US117 — Comparar partidas

### Fase 10 — Segurança e validação

50. US118 — Aviso de não diagnóstico
51. US119 — Consentimento de coleta
52. US120 — Proteção de dados
53. US121 — Exclusão de dados
54. US122 a US126 — Testes finais

## Observação importante para o projeto

O aplicativo pode coletar dados relacionados ao desempenho cognitivo durante o Sudoku, mas não deve afirmar que diagnostica Alzheimer ou demência. O correto é apresentar o relatório como uma análise observacional da atividade, indicando padrões de desempenho em memória, atenção, raciocínio, planejamento, velocidade e autonomia. Para qualquer suspeita clínica, o relatório deve recomendar avaliação com profissional de saúde qualificado.
