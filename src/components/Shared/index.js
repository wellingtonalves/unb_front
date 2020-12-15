import Vue from 'vue'

import CardComponent from './CardComponent';
import FormSkeletonComponent from './FormSkeletonComponent';
import FilterExpansionPanel from './FilterExpansionPanel';
import SnackBarComponent from './SnackBarComponent';
import DialogDeleteComponent from './DialogDeleteComponent';
import ListCursosCards from './EvgComponents/ListCursosCards';
import ListProgramasCards from './EvgComponents/ListProgramasCards';
import ListPerguntas from './EvgComponents/ListPerguntas';
import SearchCurso from './EvgComponents/SearchCurso';

Vue.component('card-default', CardComponent);
Vue.component('form-skeleton', FormSkeletonComponent);
Vue.component('filter-expansion-panel', FilterExpansionPanel);
Vue.component('snack-bar-component', SnackBarComponent);
Vue.component('dialog-delete-component', DialogDeleteComponent);
Vue.component('list-cursos-cards', ListCursosCards);
Vue.component('list-programas-cards', ListProgramasCards);
Vue.component('list-perguntas', ListPerguntas);
Vue.component('search-curso', SearchCurso);