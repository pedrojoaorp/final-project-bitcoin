# final-project-bitcoin
Por Daniel José de Assumpção Palmar (211068379) e Pedro João Reffatti Pinheiro (211026510)

| [Pt-br](https://pedrojoaorp.github.io/final-project-bitcoin/#introdu%C3%A7%C3%A3o) | [Eng](https://pedrojoaorp.github.io/final-project-bitcoin/#english) |

## Introdução
Este projeto consiste da análise do protocolo de pagamentos x402, em conjunto com a implementação de um template de interface web que pode fazer requisições com este protocolo.
A implementação do projeto pode ser acessada por meio deste [site](https://final-project-bitcoin-three.vercel.app/). 
## Sobre x402
O protocolo x402 foi desenvolvido pela Coinbase para permitir pagamentos com criptoativos de maneira mais rápida e automática, implementado diretamente sobre o protocolo HTTP. O nome deriva do código de resposta [402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) utilizado no protocolo, que já existe no protocolo HTTP, mas até o momento é utilizado de maneira infrequente e não padronizada. De acordo com a Coinbase, o uso proposto para esta ferramente é:
> Permitir que os serviços monetizem APIs e conteúdo digital na blockchain, possibilitando que clientes, tanto humanos quanto máquinas, paguem programaticamente pelo acesso sem contas, sessões ou autenticação complexa.

### Funcionamento
Um pagamento utilizando o protocolo x402 segue os seguintes passos: (fonte da imagem: Coinbase)
[^1]
<img width="840" height="486" alt="image" src="https://github.com/user-attachments/assets/7e5bc0e6-9d79-4b67-94c9-eebf92cc7900" />
 [^1]: [Coinbase](https://docs.cdp.coinbase.com/x402/welcome) . 
1. O cliente faz uma requisção para acessar algum recurso em um endpoint protegido. O cliente pode ser tanto um ser humano quanto qualquer outro programa.
2. O servidor retorna um código de *status 402* com os detalhes do pagamento no corpo da resposta.
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

A Coinbase fornece um serviço de *facilitador* para ser utilizado em transações, mas é relevante observar que o papel do facilitador é opcional na transação, e outros serviços de facilitador que realizem a mesma função podem ser desenvolvidos por outras entidades, mantendo assim o aspecto descentralizado da transação.
## Explicando a implementação
O projeto foi realizado em Next em typescript, inclui uma demonstração do protocolo x402 com base no template cujo link está no fim da página. A demonstração inclui um ambiente teste onde podem ser realizadas tarefas pré-criadas(jobs) que podem utilizar transações feitas com o protocolo x402, explicitando ao usuário as requisições de api feitas pelo cliente e suas respectivas respostas do servidor que compõem uma transação. Apesar do template também incluir a possibilidade de conexão com chats LLM que conseguem interagir com o protocolo, essa funcionalidade foi removida a fim de simplificar a demonstração.

A primeira tarefa consiste em fazer uma requisição para receber o resultado de uma soma, que está bloqueado atrás de uma paywall.

<img width="683" height="1841" alt="image" src="https://github.com/user-attachments/assets/84af1897-7e52-4fe0-89f8-38e5c5ecb016" />

Por meio da demonstração podemos ver as requisições que compõem uma transação. Analisando as requisições feitas, verificamos que a transação segue a ordem esperada:
1. Primeiro, o cliente envia uma requisição sem informação nenhuma;
2. O servidor retorna o código 402 com os dados do pagamento no corpo da resposta;
3. O cliente envia outra requisição contendo a mensagem assinada confirmando o pagamento;
4. Por último, o servidor retorna o código 200 e o conteúdo de interesse para o cliente.

A segunda tarefa(webscraping) consiste na tentativa de acessar um site cujo conteúdo está bloqueado por uma paywall (como um artigo de notícia, por exemplo). Novamente, as requisições seguem a ordem esperada, exceto que o conteúdo entregue para o cliente na resposta final é uma documento HTML.
## Conclusão
O protocolo x402 é uma proposta muito interessante para uma implementação de pagamentos nativa para o ambiente da Web. Marc Andreessen, co-fundador do Netscape, falou que considera o pecado original da Internet ser o fato de que monetização não foi implementada de maneira nativa e embutida no que conhecemos como a Internet hoje em dia. A existência e inutilização do código de resposta 402 Payment Required reflete esse aspecto, e o protocolo x402 conseguiu, com ajuda da blockchain encontrar uma maneira que pode ser considerada verdadeiramente nativa da Web e descentralizada como a Web de processar pagamentos, e monetizar o conteúdo da Internet sem sair do ambiente da Internet. 

---

### English

## Introduction

This project consists of the analysis of the x402 payment protocol, along with the implementation of a web interface template capable of making requests using this protocol.
The implementation of the project can be accessed through this [site](https://final-project-bitcoin-three.vercel.app/).

## About x402

The x402 protocol was developed by Coinbase to enable payments with crypto assets in a faster and more automated way, implemented directly on top of the HTTP protocol. The name comes from the response code [402 Payment Required](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402) used in the protocol, which already exists in HTTP but is currently used infrequently and without standardization. According to Coinbase, the proposed use for this tool is:

> To enable services to monetize APIs and digital content on the blockchain, allowing clients—both humans and machines—to programmatically pay for access without accounts, sessions, or complex authentication.

### How it works

A payment using the x402 protocol follows the steps below: (image source: Coinbase)
[^1] <img width="840" height="486" alt="image" src="https://github.com/user-attachments/assets/7e5bc0e6-9d79-4b67-94c9-eebf92cc7900" />

1. The client makes a request to access some resource on a protected endpoint. The client may be a human or any other program.
2. The server returns a *402 status code* with payment details in the response body.
3. The client analyzes the payment requirements and creates a payment payload using its own wallet, as long as the wallet is compatible with EVM (Ethereum Virtual Machine).
4. The client resends the request with the message included in the X-PAYMENT header.
5. The server verifies the payment by validating the signature sent. This verification can be done locally or via a third-party facilitator service, such as the facilitator provided by Coinbase.
6. If the validation is performed through the facilitator, it checks the payment against the scheme and network requirements, returning a verification response.
7. If the payment is valid, the server fulfills the original request. If it is invalid, it returns another 402 response.
8. The server begins settling the payment on the blockchain, either by directly sending the transaction to the blockchain or with the help of the /settle function provided by the facilitator.
9. The transaction is broadcast to the appropriate blockchain for the payment, and confirmation is awaited—either by the facilitator, if used, or by whoever is settling the payment.
10. The facilitator (or whoever is settling the payment) waits for blockchain confirmation that the payment has been completed.
11. The server returns a 200 OK response to the client containing the requested resource and the payment details.

#### About the facilitator

The facilitator is an optional service in the x402 protocol that assists in the process of verifying and settling payments between clients (buyers) and servers (sellers).

Its role is to verify payment messages sent by clients and settle payments on the blockchain on behalf of servers. The advantage of using a facilitator is that all complexities involved in interacting with the blockchain—such as verifying and validating payments in connection with the network—are handled by it, simplifying interaction for both client and server. It is important to note that the facilitator only executes and validates transactions based on the signatures provided by the client, and therefore never has access to the amounts being transferred between buyer and seller.

Coinbase provides a *facilitator* service for transactions, but it is important to note that the facilitator role is optional, and other facilitator services that perform the same function may be developed by other entities, thus preserving the decentralized nature of the transaction.

## Explaining the implementation

The project includes a demonstration of the x402 protocol based on the template whose link is at the end of the page. The demonstration includes a test environment where predefined tasks (jobs) can be executed using transactions made with the x402 protocol, showing the user the request/response flow that composes a transaction. Although the template also includes the ability to connect with LLM chats that can interact with the protocol, this functionality was removed to simplify the demonstration.

The first task consists of making a request to obtain the result of a sum, which is locked behind a paywall.

<img width="683" height="1841" alt="image" src="https://github.com/user-attachments/assets/84af1897-7e52-4fe0-89f8-38e5c5ecb016" />

Through the demonstration we can see the requests that form a transaction. Analyzing the requests made, we verify that the transaction follows the expected order:

1. First, the client sends a request with no information;
2. The server returns a 402 code with the payment data in the response body;
3. The client sends another request containing the signed message confirming the payment;
4. Finally, the server returns the 200 code and the content of interest for the client.

The second task(webscraping) consists of attempting to access a website whose content is paywalled (such as a news article, for example). Again, the requests follow the expected order, except that the content delivered to the client in the final response is an HTML document.

## Conclusion

The x402 protocol is a very interesting proposal for implementing native Web payments. Marc Andreessen, co-founder of Netscape, once said that he considers the original sin of the Internet to be the fact that monetization was not implemented natively and built into what we know as the Internet today. The existence and lack of usage of the 402 Payment Required response code reflects this, and the x402 protocol—leveraging blockchain—has found a method that can be considered truly Web-native and decentralized for processing payments and monetizing Internet content without leaving the Web environment.

## Fontes
Template da implementação (x402 AI Starter): https://vercel.com/templates/next.js/x402-ai-starter

Informações sobre x402: https://www.x402.org/ // https://docs.cdp.coinbase.com/x402/welcome
