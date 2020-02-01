<template>
  <article class="panel is-success is-tile">
    <p class="panel-heading">{{ title }}</p>
    <div class="panel-block">
      <div class="field">
        <label class="label">{{ code }}</label>
        <div class="controll is-center">
          <button class="button is-button is-size-3">{{ str }}</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ['title', 'str', 'code']
}
</script>

<style lang="scss" scoped>
article.is-tile {
  width: 320px;
  height: 200px;
}
.controll {
  &.is-center {
    padding: 5px 10px;
  }
  .button {
    width: 280px;
  }
}
</style>