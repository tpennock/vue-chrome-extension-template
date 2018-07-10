<template>
  <div id="content">
    <iframe width="100%" height="100%" frameborder="0" src="https://skedgit-develop.herokuapp.com/iframe" />
  </div>
</template>
<script>
  export default {
    data: () => ({
    }),
    computed: { },
    created () { },
    mounted () { },
    methods: { }
  }
</script>
<style lang="scss">
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  #content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
</style>