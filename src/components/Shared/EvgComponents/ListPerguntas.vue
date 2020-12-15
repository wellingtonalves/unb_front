<template>
  <v-container>
    <v-expansion-panels class="count-items evg-panels">
      <v-expansion-panel v-for="(item, i) in questions" :key="i">
        <v-expansion-panel-header>{{ item.question }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p v-html="item.answer"></p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
import questions from '@/util/constants/questions';
export default {
  name: 'perguntas',
  props: ['type'],
  data: () => ({
    constant: questions,
  }),
  computed: {
    questions() {
      return this.constant[this.type];
    },
  },
};
</script>
