<template>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>gitemoji</title>
  </head>
  <body>
    <section class="section">
      <div class="container">
        <h1 class="title">gitemoji</h1>
        <p class="subtitle">Gitで使う絵文字テンプレート</p>
        <div class="tile is-parent" v-masonry transition-duration="0.3s" gutter="10">
          <div class="tile is-child" v-masonry-tile v-for="(emoji, index) in emojis" :key="'emoji_' + index">
            <emoji :title="emoji.title" :str="emoji.str" :code="emoji.code" />
          </div>
        </div>
        <FlashMessage></FlashMessage>
      </div>
    </section>
  </body>
  </html>
</template>

<script>
import 'bulma'
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import FlashMessage from '@smartweb/vue-flash-message'
import emoji from './emoji'

// vue-masonry 利用
Vue.use(VueMasonryPlugin)

// FlashMessage利用
Vue.use(FlashMessage, {
  name: '$flashMessage',
  tag: 'FlashMessage',
  time: 3000, // 3秒表示
  icon: true
})

export default {
  data() {
    return {
      emojis: [
        { title: 'initial commit', str: "🎉", code: ":party:" },
        { title: 'add', str: "🍱", code: ":bento:" },
        { title: 'fix', str: "🐛", code: ":bug:" },
        { title: 'develop', str: "✨", code: ":sparkles:" },
        { title: 'remove', str: "🔥", code: ":fire:" },
        { title: 'refactor', str: "🎨", code: ":palette:" },
        { title: 'hotfix', str: "🚑", code: ":ambulance:" },
        { title: 'typo', str: "📓", code: ":notebook:" },
        { title: 'change', str: "🔧", code: ":wrench:" },
        { title: 'update', str: "⏫", code: ":up_pointing:" },
        { title: 'downgrade', str: "⏬", code: ":down_pointing:" },
        { title: 'test', str: "👽", code: ":alien:" },
        { title: 'wip', str: "🚧", code: ":construction:" },
        { title: 'document', str: "📚", code: ":books:" },
        { title: 'release', str: "🔖", code: ":bookmark:" },
        { title: 'revert', str: "⌛", code: ":hourglass:" },
      ]
    }
  },
  components: {
    'emoji': emoji
  }
}
</script>

<style lang="scss" scoped>
.tile {
  &.is-child {
    padding-bottom: 10px;
  }
}
</style>