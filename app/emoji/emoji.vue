<template>
  <article class="panel is-success is-tile">
    <p class="panel-heading">{{ title }}</p>
    <div class="panel-block">
      <div class="field">
        <label class="label">{{ code }}</label>
        <div class="controll is-center">
          <button class="button is-button is-size-3 copy-button" @click.prevent="copyText(str)">
            {{ str }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
/**
 * function: クリップボードに text コピー
 * 1. textarea要素を作成し、value に text セット
 * 2. textarea要素を document.body に追加
 * 3. textarea要素を選択状態にする
 * 4. execCommand: copy を実行
 * 5. textarea要素を削除
 */
const copyToClipboard = text => {
  const elem = document.createElement('textarea')
  elem.value =text
  document.body.appendChild(elem)
  elem.select()
  document.execCommand('copy')
  document.body.removeChild(elem)
} 

export default {
  props: ['title', 'str', 'code'],
  methods: {
    // 絵文字コピー
    copyText(text) {
      copyToClipboard(text)
      this.$flashMessage.show({
        status: 'success',
        title: 'Emoji Copied',
        message: text + ' is copied !'
      })
    }
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