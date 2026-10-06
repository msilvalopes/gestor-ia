# Configuração de Coverage com NYC/Istanbul

## Instalação

```bash
npm install --save-dev nyc
```

## Configuração

O NYC é configurado através do arquivo `.nycrc` que define:
- Arquivos incluídos no coverage
- Arquivos excluídos do coverage
- Tipos de relatórios gerados (text-summary, html)
- Opções adicionais como cache e all

## Comandos úteis

```bash
# Executar testes com coverage
npm run test:coverage

# Gerar relatório HTML
nyc report --reporter=html
```

## Arquivo de configuração

O arquivo `.nycrc` define:
- `include`: Arquivos que devem ser incluídos no coverage
- `exclude`: Arquivos que devem ser excluídos do coverage
- `reporter`: Tipos de relatórios a serem gerados
- `all`: Executar todos os arquivos, mesmo os não testados
- `cache`: Desativar cache para garantir resultados consistentes