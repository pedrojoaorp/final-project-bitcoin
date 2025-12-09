# final-project-bitcoin
Por Daniel José Palmar de Assumpção () e Pedro João Reffatti Pinheiro (211026510)
## Introdução
Este projeto consiste da análise do protocolo de pagamentos x402, em conjunto com a implementação de um template de interface web que pode fazer requisições e até utilizar modelos LLM para realizar interações com este protocolo.
A implementação do projeto pode ser acessada por meio deste link: (https://final-project-bitcoin-three.vercel.app/). 
## Sobre x402
O protocolo x402 foi desenvolvido pela Coinbase para permitir pagamentos com stablecoins de maneira mais rápida e automática, implementado diretamente sobre o protocolo HTTP. O nome deriva do código de resposta 402 Payment Required (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) utilizado no protocolo, que já existe no protocolo HTTP, mas até o momento é utilizado de maneira infrequente e não padronizada. O uso proposto para este protocolo é, de acordo com a Coinbase, "permitir que os serviços monetizem APIs e conteúdo digital na blockchain, possibilitando que clientes, tanto humanos quanto máquinas, paguem programaticamente pelo acesso sem contas, sessões ou autenticação complexa".
### Funcionamento
Um pagamento utilizando o protocolo x402 segue os seguintes passos:
<img width="840" height="486" alt="image" src="https://github.com/user-attachments/assets/7e5bc0e6-9d79-4b67-94c9-eebf92cc7900" />
1. O cliente faz uma requisção para acessar algum recurso em um endpoint protegido. O cliente pode ser tanto um ser humano quanto qualquer outro programa.
2. O servidor retorna um código de status 402 com os detalhes do pagamento no corpo da resposta.
3. O cliente analisa os requisitos de pagamento e cria uma menagem útil de pagamento utilizando a própria carteira, contanto que a carteira seja compatível com EVM (Ethereum Virtual Machine)
4. O cliente reenvia a solicitação com a mensagem incluída no cabecçalo X-PAYMENT.
5. O servidor verifica o pagamento validando a assinatura enviada. Esta verificação pode ser feita localmente, ou por meio de um serviço facilitador terceiro, tal qual o facilitador fornecido pela própria Coinbase.
6. Se a validação for feita por meio do facilitador, ele verifica o pagamento em relação aos requisitos do esquema e da rede, retornando uma resposta de verificação.
7. Se o pagamento for válido, o servidor atende à solicitação original. Se for inválido, retorna outra resposta 402.
8. O servidor inicia a resolução do pagamento na blockchain, ou diretamente enviando a transação para a blockchain, ou com auxílio da função /settle fornecida pelo facilitador.
9. A transação é transmitida para a blockchain adequada para o pagamento e espera-se a confirmação da transação, por parte do facilitador, caso tenha sido usado, ou de quem está resolvendo o pagamento.
10. O facilitador (ou quem estiver resolvendo o pagamento) espera a confirmação da blockchain da realização do pagamento.
11. O servidor retorna uma resposta 200 OK para o cliente contendo o recurso requisitado, e os detalhes do pagamento realizado.
#### Sobre o facilitador
O facilitador é um serviço opcional no protocolo x402 que auxilia no processo de verificação e resolução de pagamentos entre clientes (compradores) e servidores (vendedores).
Sua função é verificar mensagens de pagamentos enviadas por clientes, e resolver pagamentos na blockchain no lugar dos servidores. A vantagem de utilizar um facilitador é que todas as complexidades que surgem ao interagir com a blockchain, como a verificação e validação de pagamentos em conexão com a rede, são resolvidas por ele, simplificando a interação tanto para o lado do cliente quanto para o do servidor. É relevante observar que o facilitador apenas executa e valida as transações com base nas assinaturas fornecidas pelo cliente, e portanto não tem contato com as quantias sendo transferidas entre comprador e vendedor em momento nenhum.
A Coinbase fornece um serviço de facilitador para ser utilizado em transações, mas é relevante observar que o papel do facilitador é opcional na transação, e outros serviços de facilitador que realizem a mesma função podem ser desenvolvidos por outras entidades, mantendo assim o aspecto descentralizado da transação.
## Explicando a implementação
## Conclusão
## Fontes
Template da implementação (x402 AI Starter): https://vercel.com/templates/next.js/x402-ai-starter
Informações sobre x402: https://www.x402.org/ // https://docs.cdp.coinbase.com/x402/welcome
