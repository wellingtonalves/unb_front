<template>
  <v-carousel hide-delimiters v-model="carouselModel" interval="6000" cycle>
    <v-carousel-item v-for="index in slides" :key="index">
      <v-responsive dark>
        <v-row no-gutters justify="space-around">
          <v-col class="d-flex justify-center">
            <div class="desktop-scroll scroll">
              <div class="content-desktop">
                <v-row>
                  <v-col>
                    <slot name="items"></slot>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-responsive>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  props: ['carouselData', 'perSlide'],
  data: () => ({
    carouselItems: [],
    slides: [],
    carouselModel: 0,
  }),
  watch: {
    carouselModel(val) {
      this.$emit('model', val);
    },
    carouselItems(val) {
      this.$emit('values', val);
    },
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.carouselItems = this.chunkCarousel(this.carouselData, this.perSlide);
      this.countSlides(this.carouselItems);
    },
    countSlides(arr) {
      this.slides = Array.from({length: arr.length}, (_, i) => i + 1);
    },
    chunkCarousel(array, chunkSize) {
      let chunkCount = Math.ceil(array.length / chunkSize);
      let newCarousel = new Array(chunkCount);
      for (let i = 0, start = 0, end = chunkSize; i < chunkCount; ++i) {
        newCarousel[i] = array.slice(start, end);
        start = end;
        end += chunkSize;
      }
      return newCarousel;
    },
  },
};
</script>