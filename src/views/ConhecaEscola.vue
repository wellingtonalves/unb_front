<template>
  <v-layout wrap>

    <section class="conheca-escola">

      <video controls autoplay poster="../assets/img/poster-video.png">
        <source src="https://cdn.escolavirtual.gov.br/divulgacao/pitch/pitch01divulgacaoEVG.mp4" type="video/mp4">
        Seu navegador não tem suporte para vídeos.
      </video>

      <div class="columns featured">
        <p>O projeto consiste em um conjunto de serviços disponibilizados em um <strong>Portal Único de Governo</strong>. Para o servidor ou cidadão que busca capacitação no serviço público, o Portal oferece um catálogo de cursos unificado das principais escolas de governo e centros de capacitação da Administração Pública.</p>
        <p>Além disso, o servidor ou cidadão tem acesso a um cadastro e login únicos para a realização de suas capacitações, bem como um <strong>histórico escolar unificado</strong>. Para as instituições vinculadas, o Portal oferece uma série de serviços, a depender do tipo de associação da instituição com o projeto. Dentre os serviços oferecidos, estão a hospedagem de cursos, gestão acadêmica das ofertas e consolidação e tratamento de dados.</p>
        <p>Em suma, a solução pretende centralizar o que pode ser centralizado para que se tenha a economia de escala (hospedagem, gestão acadêmica, emissão de certificado, histórico escolar), sem inibir a descentralização do que deve permanecer descentralizado (autonomia para criar cursos e definir metodologias educacionais, gestão e análise de resultados, definição de políticas de capacitação) para que seja garantido o processo criativo e colaborativo permanente.</p>
      </div>

    </section>

    <section class="servicos-oferecidos mt-16">
      <h3 class="subtitle mb-8">Serviços Oferecidos</h3>

      <v-card>
        <v-img src="../assets/img/servicos-2.jpg"></v-img>
        <v-card-title>Gestão Acadêmica</v-card-title>
        <v-card-subtitle>Secretaria Virtual</v-card-subtitle>

        <v-card-text>
          Este é o coração da Escola Virtual.Gov! Por meio dela, instituições gerenciam seus cursos, a abertura de turmas e o andamento das inscrições. É o local onde servidores e cidadãos têm acesso ao catálogo unificado, calendário de turmas, histórico escolar e emissão de certificado. Tudo por meio de um acesso único e simplificado.
        </v-card-text>

        <v-card-actions>
          <v-btn tile href="/login">
            Acesse
            <v-icon right>
              mdi-menu-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card>
        <v-img src="../assets/img/servicos-1.png"></v-img>
        <v-card-title>Estatísticas</v-card-title>
        <v-card-subtitle>Em Números</v-card-subtitle>

        <v-card-text>
          Disponibiliza dados e informações relativas à capacitação de servidores públicos, temas de maior interesse, distribuição nacional das capacitações, entre outros indicadores, de forma aberta, tempestiva e dinâmica. O acesso facilitado a dados reais e precisos permite não apenas o controle social, mas também a análise de informações de acordo com as mais variadas necessidades.
        </v-card-text>

        <v-card-actions>
          <v-btn tile href="https://emnumeros.escolavirtual.gov.br">
            Conheça
            <v-icon right>
              mdi-menu-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card>
        <v-img src="../assets/img/servicos-mooc.jpg"></v-img>
        <v-card-title>Ambiente Virtual</v-card-title>
        <v-card-subtitle>MOOC</v-card-subtitle>

        <v-card-text>
          Seguindo as tendências educacionais mais recentes, a Escola Virtual.Gov oferece uma plataforma MOOC que sustenta a oferta de cursos de curta e média duração, abertos e gratuitos, como alternativa de formação mais aderente ao desenvolvimento rápido de competências para o trabalho.
        </v-card-text>

        <v-card-actions>
          <v-btn tile href="https://mooc.escolavirtual.gov.br">
            Acesse
            <v-icon right>
              mdi-menu-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card>
        <v-img src="../assets/img/servicos-3.png"></v-img>
        <v-card-title>Ambiente Virtual</v-card-title>
        <v-card-subtitle>SPOC</v-card-subtitle>

        <v-card-text>
          Voltado para grupos menores e personalizados, combina recursos e tecnologia virtual com engajamento pessoal entre professores e alunos. Suporta cursos oferecidos em formato misto, baseados na metodologia de “sala de aula invertida” ou “flipped classroom”.
        </v-card-text>

        <v-card-actions>
          <v-btn tile href="https://spoc.escolavirtual.gov.br">
            Acesse
            <v-icon right>
              mdi-menu-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

    </section>

    <section class="historia mt-16">
      <h3 class="subtitle mb-8">História da Escola Virtual de Governo</h3>
      <div class="columns">
          <p>No período entre 2013 e 2016, a Enap conseguiu uma série de avanços no campo da educação a distância. Entre esses avanços, é possível mencionar o significativo aumento da quantidade de cursos ofertados (100%) e dos certificados emitidos (400%), bem como a internalização dos serviços de hospedagem e administração do seu ambiente virtual de aprendizagem, de produção multimídia e de planejamento educacional.</p>

          <p>No mesmo período, ao contrário do que aconteceu com a Enap, muitas escolas de governo e centros de capacitação experimentaram um cenário de restrições e oscilações no que se refere à infraestrutura e à disponibilidade de recursos e de pessoal. Vivendo esse contexto de restrições orçamentárias, algumas instituições federais buscaram a Enap como alternativa para hospedagem de seus cursos, enquanto outras instituições, principalmente estaduais e municipais, limitaram-se a ofertar cursos cedidos, sem obter avanços no desenvolvimento de novos cursos e no campo da inovação.</p>

          <p>Diante desse cenário, a Escola Virtual de Governo surgiu, em 2017, como uma proposta para superar a fragmentação dos serviços de hospedagem e gestão acadêmica, buscando garantir a continuidade dos serviços de capacitação a distância do serviço público e solucionar problemas estruturantes que tenham origem na oferta descentralizada de cursos.</p>

          <p><a href="http://repositorio.enap.gov.br/handle/1/3080">Saiba mais sobre o surgimento da Escola Virtual de Governo</a>.</p>

          <p>As primeiras adesões à Escola Virtual de Governo aconteceram em uma cerimônia realizada na Enap no dia 6 de dezembro de 2017. Na ocasião, sete instituições se reuniram para promover a assinatura de um Protocolo de Intenções.</p>

          <p>Depois da assinatura do Protocolo de Intenções, outras instituições já aderiram à EV.G. Para isso, as instituições formalizaram a parceria por meio da assinatura de um Termo de Adesão ao Protocolo de Intenções. O processo de adesão é contínuo e está aberto, para saber mais consulte o espaço de Adesão Institucional.</p>
      </div>
    </section>

  </v-layout>
</template>

<style scoped>
section.conheca-escola video {
  background-image: url(../assets/img/bg-mockup.png);
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: auto;
  padding: 55px 165px 100px;
  position: relative;
  width: 100%;
}
section.conheca-escola .featured {
  font-size: 120%;
  font-weight: 300;
  margin-top: 30px;
  padding: 20px 200px 0;
  position: relative;
}
section.conheca-escola .featured:after,
section.conheca-escola .featured:before {
  color: var(--v-contrast-base);
  font-size: 8rem;
  font-weight: 300;
  position: absolute;
  top: -10px;
}
section.conheca-escola .featured:after {
  content: "}";
  right: 100px;
}
section.conheca-escola .featured:before {
  content: "{";
  left: 100px;
}
section.conheca-escola .featured strong {
  font-weight: 700;
}
section.servicos-oferecidos .v-card {
  background-color: transparent;
  box-shadow: 0 0 0;
  display: inline-block;
}
section.servicos-oferecidos .v-card + .v-card {
  margin-top: 32px;
}
section.servicos-oferecidos .v-image {
  box-shadow: 0 0 15px rgba(0, 0, 0, .2);
  float: left;
  margin: 0 40px 40px 0;
  position: relative;
  width: 400px;
  z-index: 1;
}
section.servicos-oferecidos .v-card__title {
  color: var(--v-primary-base);
  font-size: 1rem;
  font-weight: 500;
  padding: 0;
  text-transform: uppercase;
}
section.servicos-oferecidos .v-card__subtitle {
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 10px;
  padding-bottom: 22px;
  padding-top: 16px;
  position: relative;
}
section.servicos-oferecidos .v-card__subtitle::before {
  background: var(--v-contrast-base);
  content: "";
  height: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60%;
}
section.servicos-oferecidos .v-card__text {
  font-size: 1rem;
  padding-right: 160px;
}
section.servicos-oferecidos .v-card__actions {
  padding: 0;
}
section.servicos-oferecidos .v-card__actions .v-btn {
  background-color: var(--v-contrast-base) !important;
  color: var(--v-white-base);
}

@media (max-width: 600px) {
  section.conheca-escola video {
    padding-bottom: 140px;
  }
  section.conheca-escola .featured {
    padding: 20px 0 0;
  }
  section.conheca-escola .featured:after,
  section.conheca-escola .featured:before {
    display: none;
  }
}
</style>
