<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce of sauces"
            label-class="radio ingredients__input"
            input-class="visually-hidden"
            name="sauce"
            :key="sauce.id"
            :value="sauce.id"
            :selected-value="selectedValue"
            @input="setSouce"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="ingredient of ingredients"
              :key="ingredient.id"
            >
              <AppDrag
                :transfer-data="ingredient"
                :ingredients-counter="ingredientsCounter"
                :is-draggable="draggableChecking(ingredient)"
              >
                <span :class="`filling filling--${ingredient.class}`">{{
                  ingredient.name
                }}</span>
              </AppDrag>
              <ItemCounter
                :product="ingredient"
                :range="ingredientsCounter"
                counter-class="counter--orange ingredients__counter"
                @counterHandler="setIngredientCount"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import AppDrag from "@/common/components/AppDrag";
import { ingredientsCounter } from "@/static/consts.json";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    ItemCounter,
    RadioButton,
    AppDrag,
  },

  computed: {
    selectedValue() {
      return this.configuredPizza.sauceId ? this.configuredPizza.sauceId : null;
    },

    ingredientsCounter() {
      return ingredientsCounter;
    },

    ...mapGetters("PizzaConstructor", ["ingredients"]),
    ...mapState("PizzaConstructor", ["sauces", "configuredPizza"]),
  },

  methods: {
    draggableChecking(indgredient) {
      if (
        !indgredient.quantity ||
        indgredient.quantity < this.ingredientsCounter.max
      ) {
        return true;
      }
      return false;
    },

    ...mapActions("PizzaConstructor", ["setIngredientCount", "setSouce"]),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
@import "~@/assets/scss/blocks/ingredients.scss";
@import "~@/assets/scss/blocks/filling.scss";
</style>
