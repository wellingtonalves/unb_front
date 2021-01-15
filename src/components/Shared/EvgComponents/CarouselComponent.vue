<template>
  <v-carousel hide-delimiters v-model="carouselModel" interval="6000" cycle>
    <v-carousel-item v-for="index in arrCount" :key="index">
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
    arrCount: [],
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
    this.carouselItems = this.chunkCarousel(this.carouselData, this.perSlide);
    this.countSlides(this.carouselItems);
  },
  methods: {
    countSlides(arr) {
      this.arrCount = Array.from({length: arr.length}, (_, i) => i + 1);
    },
    chunkCarousel(array, chunkSize) {
      let chunkCount = Math.ceil(array.length / chunkSize);
      let chunks = new Array(chunkCount);
      for (let i = 0, j = 0, k = chunkSize; i < chunkCount; ++i) {
        chunks[i] = array.slice(j, k);
        j = k;
        k += chunkSize;
      }
      return chunks;
    },
  },
};
</script>