<template>
  <v-container>

    <v-row class="section">
      
      <v-col cols="12" sm="4">
        <h3 class="subtitle">Como aderir à EV.G?</h3>
        <p>A adesão à Escola Virtual.Gov - EV.G se dá mediante assinatura de um Termo de Adesão ao Protocolo de Intenções.</p>
      </v-col>

      <v-col cols="12" sm="8">
        <p>O Protocolo de Intenções EV.G formalizou o compromisso das instituições em estabelecer bases de cooperação técnica e operacional para capacitação e aperfeiçoamento de servidores públicos na modalidade a distância, mediante centralização dos serviços de hospedagem de cursos.</p>

        <v-list class="d-flex flex-wrap links-bordered">

          <v-list-item v-for="(item, i) in documentosImportantes" :key="i" :href="item.href">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

        <h4>Instituições <strong>Participantes</strong></h4>
        <p>Conheça as instituições que já assinaram o Termo de Adesão da EV.G:</p>

        <v-list class="d-flex links-bordered">

          <v-list-item href="/instituicoes-participantes">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Instituições participantes da EV.G</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-col>

    </v-row>

    <v-row class="section">

      <v-col cols="12" sm="4">
        <h3 class="subtitle">Quais as Modalidades de Adesão?</h3>
        <p>Há quatro modalidades de adesão para instituições interessadas em fazer parte da Escola Virtual de Governo, a  depender de suas necessidades e características.</p>
      </v-col>

      <v-col cols="12" sm="8">
        <div class="box">
          <h4>Modalidades de Adesão</h4>
          <v-layout class="flex-wrap">
            <div>
                <h5>Conteudistas</h5>
                <p>São instituições dotadas de legitimidade técnica em assunto específico de sua competência. Essas instituições são responsáveis pela produção de cursos e costumam ter interesse nos serviços de hospedagem fornecidos pela EV.G. Os custos de desenvolvimento dos cursos ficam a cargo dessas instituições, que podem executar diretamente os recursos ou efetuar repasse para terceiros.</p>
            </div>
            <div>
                <h5>Certificadoras</h5>
                <p>São instituições que possuem legitimidade acadêmica para expedição de certificados para os cursos disponibilizados na EV.G. Essas instituições podem oferecer cursos de forma independente ou associada a alguma instituição conteudista que seja parceira no desenvolvimento do conteúdo. As instituições certificadoras costumam realizar repasse de recursos para a manutenção dos serviços de hospedagem, gestão acadêmica e gestão de dados.</p>
            </div>
            <div>
                <h5>Patrocinadoras</h5>
                <p>São instituições interessadas em apoiar e incentivar as ações da EV.G, associando sua marca à Escola. Essas instituições podem apoiar e financiar a EV.G por meio de iniciativas diversas, podendo incluir o repasse de recursos, a prestação de serviços necessários à manutenção e evolução da Escola, e o fornecimento de equipamentos, por exemplo. O apoio dessas instituições à EV.G é formalizado em termo próprio, estando sujeito à análise de viabilidade jurídica, política e ética.</p>
            </div>
            <div>
                <h5>Gestoras</h5>
                <p>São instituições interessadas em apoiar e incentivar as ações da EV.G, motivadas pelo interesse em dados estratégicos de capacitações ligadas a políticas públicas que estão sob sua competência institucional. Assim como as instituições patrocinadoras, as instituições gestoras poderão apoiar e financiar a EV.G por meio de iniciativas diversas, formalizadas em termo próprio e sujeitas à análise de viabilidade jurídica, política e ética.</p>
            </div>
          </v-layout>
          <v-container text-center>
            <v-btn tile href="https://drive.google.com/file/d/1BsMFYwbMPEZEELbhFcsr86jkgQowdLQo/view?usp=sharing" class="primary">
              Saiba mais <span class="hidden-xs-only">sobre as modalidades de adesão</span>
              <v-icon right>
                mdi-menu-right
              </v-icon>
            </v-btn>
          </v-container>
        </div>
      </v-col>

    </v-row>

    <v-row class="section">

      <v-col cols="12" sm="4">
        <h3 class="subtitle">Conheça o Passo a Passo da Adesão</h3>
      </v-col>

      <v-col cols="12" sm="8">
        <v-layout class="count-items evg-list flex-wrap">

          <v-card>
            <v-card-text>
              <p>As instituições interessadas em fazer parte da EV.G deverão acionar a Coordenação-Geral de Educação a Distância e a Assessoria de Articulação Institucional da Enap (<a href="mailto:parcerias.evg@enap.gov.br" class="inline">parcerias.evg@enap.gov.br</a> e <a href="mailto:asain@enap.gov.br" class="inline">asain@enap.gov.br</a>). O contato com essas unidades possibilitará às instituições conhecer melhor o Projeto e esclarecer eventuais dúvidas sobre os serviços oferecidos, sobre as modalidades de adesão e sobre questões práticas relacionadas à migração de cursos, acesso à dados, entre outras.</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>O passo seguinte é a organização da documentação a ser disponibilizada à equipe de apoio da EV.G:</p>
              <ul>
                  <li>Estatuto da instituição (ou documento equivalente);</li>
                  <li>Ato de nomeação/designação/eleição do signatário;</li>
                  <li>Documento que comprove os poderes de representação do signatário para firmar este tipo de instrumento em nome da instituição. (Exemplo: Portaria de delegação de competência ou indicação, no Estatuto, do dispositivo que prevê tal atribuição, etc.).</li>
                  <li>Logotipo em formato vetor (extensão .svg ou .ai).</li>
              </ul>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>A instituição também deve preencher o preâmbulo da minuta do <a href="https://drive.google.com/file/d/1LWlRfEdtizUjdka4Zfo4Z4ZdPmIvvSwL/view" class="inline">Termo de Adesão</a> (contendo nome da instituição, CNPJ, endereço, dados do responsável e outros). A documentação e a minuta do Termo preenchida devem ser encaminhadas à equipe de apoio da EV.G (<a href="mailto:parcerias.evg@enap.gov.br" class="inline">parcerias.evg@enap.gov.br</a>).</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>A instituição que estiver aderindo à EV.G deverá providenciar o cadastro da autoridade responsável pela assinatura do Termo de Adesão no Sei Enap, seguindo as <a href="https://www.escolavirtual.gov.br/documentos/orientacoes-para-cadastro-de-usuario-externo-sei-enap.pdf" class="inline">instruções para cadastro de usuário externo</a>.</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>A equipe de apoio da EV.G instruirá o processo no Sei Enap, elaborará o Termo de Adesão no Sistema e providenciará os trâmites internos.</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>A equipe de apoio da EV.G fará a disponibilização do documento para assinatura eletrônica do Presidente da Enap e da autoridade responsável pela instituição parceira.</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>Após assinatura do Termo de Adesão, a equipe da EV.G encaminhará o documento para a instituição parceira, a fim de viabilizar a publicação do extrato no Diário Oficial.</p>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-text>
              <p>Pronto! A instituição já está apta a disponibilizar seus cursos na EV.G. As orientações técnicas podem ser solicitadas à equipe de apoio.</p>
            </v-card-text>
          </v-card>

        </v-layout>

      </v-col>

    </v-row>

  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'AdesãoInstitucional',
  data: () => ({
    documentosImportantes: [
      {text: 'Protocolo de Intenções', icon: 'mdi-home', href: 'https://drive.google.com/file/d/1JzKK5PhWqtD8rb3Y-6b-Qii1KOHB4WoP/view?usp=sharing'},
      {text: 'Minuta de Termo de Adesão', icon: 'mdi-email', href: 'https://drive.google.com/a/enap.gov.br/file/d/1LWlRfEdtizUjdka4Zfo4Z4ZdPmIvvSwL/view?usp=sharing'},
    ],
  })
}
</script>
