<template>
  <article class="panel is-success is-tile">
    <p class="panel-heading">{{ title }}</p>
    <div class="panel-block">
      <div class="field">
        <label class="label">{{ code }}</label>
        <div class="controll is-center">
          <button class="button is-button is-size-3 copy-button" :data-clipboard-text="str">
            {{ str }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
const ClipboardJS = require('clipboard/dist/clipboard.min.js')

export default {
  props: ['title', 'str', 'code'],
  data() {
    return {
      // ClipboardJSインスタンス
      clipboard: new ClipboardJS('.copy-button')
    }
  },
  mounted() {
    // クリップボードイベント準備
    this.clipboard.on('success', e => {
      console.log('Action:', e.action)
      console.log('Text:', e.text)
      console.log('Trigger:', e.trigger)
      e.clearSelection()
    })
    this.clipboard.on('error', e => {
      console.log('Action:', e.action)
      console.log('Trigger:', e.trigger)
    })
  }
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