<template>
  <div>
    <section class="section mx-0 my-0 px-0 py-0">
      <Head></Head>
        <!-- <keep-alive> -->
        <feb-alive>
            <router-view ></router-view>
        </feb-alive>
        <!-- </keep-alive> -->
        <Footer></Footer>
    </section>
  </div>
</template>

<script>
import Head from "./common/Head";
import Footer from "./common/Footer";
export default {
  data: function () {
    return {
      showInfo: true,
    };
  },
  components: {
    Head,
    Footer: Footer,
  },
};
</script>
