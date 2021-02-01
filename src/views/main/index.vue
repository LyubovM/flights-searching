<template>
  <div>
    <div :class="$style.containerWithBg">
      <h1 :class="$style.title">Your travel begins now</h1>
    </div>
    <div :class="$style.mainInfo">
      <div :class="$style.subtitle">Search the most suitable flights</div>
      <search-box />
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/search-box';

export default {
  name: 'Main',
  components: {
    SearchBox,
  },
};
</script>

<style lang="scss" module>
  @import '@/components/ui/screen-sizes';
  @import '@/components/ui/color-palette';

  .containerWithBg {
    margin: -12px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../assets/main-bg.jpg') $ui-color-yellow-dark no-repeat center;
    background-size: cover;
  }

  .title {
    padding: 8px 12px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .7);
  }

  .mainInfo {
    margin: 24px auto 0;
    min-width: 280px;
    max-width: 1200px;
  }

  .subtitle {
    padding: 16px 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
  }

  @media screen and (min-width: $s-screen-breakpoint--min){
    .containerWithBg {
      margin: -24px;
      height: 180px;
    }

    .title {
      padding: 12px 24px;
      font-size: 20px;
    }

    .mainInfo {
      margin-top: 48px;
    }

    .subtitle {
      padding: 24px 0;
      font-size: 20px;
    }
  }

  @media screen and (min-width: $m-screen-breakpoint--min){
    .containerWithBg {
      height: 280px;
    }

    .title {
      font-size: 24px;
    }

    .subtitle {
      padding: 40px 0;
    }
  }
</style>
