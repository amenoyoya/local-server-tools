<template>
  <article class="panel is-success is-tile">
    <p class="panel-heading">{{ title }}</p>
    <div class="panel-block">
      <div class="field">
        <label class="label">{{ code }}</label>
        <FlashMessage></FlashMessage>
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
import Vue from 'vue'
import FlashMessage from '@smartweb/vue-flash-message'

Vue.use(FlashMessage, {
  name: '$flashMessage',
  tag: 'FlashMessage',
  time: 8000,
  icon: true
})

export default {
  props: ['title', 'str', 'code'],
  data() {
    return {
      // ClipboardJSインスタンス
      clipboard: new ClipboardJS('.copy-button')
    }
  },
  mounted() {
    const vue = this;
    // クリップボードイベント準備
    vue.clipboard.on('success', e => {
      e.clearSelection()

      vue.$flashMessage.show({
        status: 'success',
        title: 'Emoji Copied',
        message: e.text + ' is copied !'
      })
    })
    vue.clipboard.on('error', e => {
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