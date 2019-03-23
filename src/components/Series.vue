<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card
        color="#26c6da"
        dark
      >
        <v-card-title primary-title>
          <h2 class="headline font-weight-bold">Cálculos de funções por séries de potências</h2>
        </v-card-title>
        <v-divider dark></v-divider>
        <v-layout style="margin-top: 20px">
          <v-flex style="margin-left: 20px">
            <v-img
              src="https://image.flaticon.com/icons/svg/32/32306.svg"
              height="200px"
              contain
            ></v-img>
          </v-flex>
          <v-flex>
            <v-card-text class="headline">
              <form>
                <v-radio-group v-model="fn" row>
                  <span class="headline font-weight-bold" style="margin-right: 10px">f(x) = </span>
                  <v-radio value="e^x">
                    <template v-slot:label>
                      <strong class="text--black">e^x</strong>
                    </template>
                  </v-radio>
                  <v-radio value="sen(x)">
                    <template v-slot:label>
                      <strong class="text--black">sen(x)</strong>
                    </template>
                  </v-radio>
                  <v-radio value="cos(x)">
                    <template v-slot:label>
                      <strong class="text--black">cos(x)</strong>
                    </template>
                  </v-radio>
                  <v-radio value="ln(x)">
                    <template v-slot:label>
                      <strong class="text--black">ln(x)</strong>
                    </template>
                  </v-radio>
                </v-radio-group>

                <v-container>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-text-field
                        v-model="x"
                        name="x"
                        label="Valor de x"
                        type="number"
                        required
                        v-validate="'required'"
                        :error-messages="errors.collect('x')"
                        data-vv-name="x"
                      ></v-text-field>
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-text-field
                        v-model="n"
                        name="n"
                        label="Número de termos"
                        type="number"
                        step="any"
                        required
                        v-validate="'required'"
                        :error-messages="errors.collect('n')"
                        data-vv-name="n"
                      ></v-text-field>
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-btn @click="submit">Calcular</v-btn>
                      <v-btn @click="clear">Limpar</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </form>

              <div v-if="calculatedAns">
                <p>Valor de {{fn}} para x = {{x}} com série de {{n}} termos: {{calculatedAns}}</p>
                <p>
                  Valor de {{fn}} para x = {{x}} com série de {{n}} termos: {{computedAns}}
                </p>
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as math from 'mathjs';

export default {
  name: 'Series',
  data() {
    return {
      math,
      fn: 'e^x',
      x: '',
      n: '',
      calculatedAns: '',
      computedAns: '',
    };
  },

  mounted() {
    this.$validator.localize('ptbr', this.dictionary);
  },

  methods: {
    submit() {
      this.$validator.validateAll();
      switch (this.fn) {
        case 'e^x':
          this.calculatedAns = this.pow(this.x, this.n);
          this.computedAns = math.pow(math.e, this.x);
          break;
        case 'sen(x)':
          this.calculatedAns = this.sin(this.x, this.n);
          this.computedAns = math.sin(this.x);
          break;
        case 'cos(x)':
          this.calculatedAns = this.cos(this.x, this.n);
          this.computedAns = math.cos(this.x);
          break;
        case 'ln(x)':
          this.calculatedAns = this.log(this.x, this.n);
          this.computedAns = math.log(this.x);
          break;
        default:
          break;
      }
    },
    clear() {
      this.x = '';
      this.n = '';
      this.$validator.reset();
      this.calculatedAns = 0;
      this.computedAns = 0;
    },
    factorial(x) {
      return x ? x * this.factorial(x - 1) : 1;
    },
    pow(x, n) {
      let ans = 0;

      for (let k = 0; k < n - 1; k++) ans += math.pow(x, k) / this.factorial(k);

      return ans;
    },
    sin(x, n) {
      let ans = 0;
      const { pow } = math;

      for (let k = 0; k < n - 1; k++) {
        ans += (pow(-1, k) * pow(x, (2 * k) + 1)) / this.factorial((2 * k) + 1);
      }

      return ans;
    },
    cos(x, n) {
      let ans = 0;
      const { pow } = math;

      for (let k = 0; k < n - 1; k++) {
        ans += (pow(-1, k) * pow(x, 2 * k)) / this.factorial(2 * k);
      }

      return ans;
    },
    log(x, n) {
      let ans = 0;
      const { pow } = math;

      for (let k = 0; k < n - 1; k++) {
        ans += pow((x - 1) / (x + 1), (2 * k) + 1) / ((2 * k) + 1);
      }

      return 2 * ans;
    },
  },
};
</script>

<style scoped>

</style>
