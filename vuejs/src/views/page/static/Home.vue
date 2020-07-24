<template>
  <section :class="ismobile ? 'section mx-0 px-0' :'section mx-0 px-0' ">
    <div :class=" ismobile ? 'columns is-mobile is-centered mx-0 px-0' : 'columns is-mobile is-centered mx-0 px-0 '">
      <div class="column is-full mx-0 px-0">
        <div class="loading">
          <loading :active.sync="loading" :can-cancel="false" :is-full-page="fullpage"></loading>
        </div>
         <div v-show="netflix" class="columns is-desktop is-multiline is-centered is-vcentered mx-0 px-0">
           <div v-for="(hero, index) in mainhero" v-bind:key="index" class="column is-full mx-0 px-0 mt-0 pt-0">
             <section class="hero is-fullheight mx-0 px-0" :style="'background-image: url('+hero.poster+');background-size:cover;min-width:100%;box-shadow:inset 0 0 0 2000px rgba(0, 0, 0, 0.2);'">
              <div class="hero-body">
                <div class="container">
                  <h2 class="subtitle has-text-white">
                    {{ hero.subtitle }}
                  </h2>
                  <h1 class="title main-home-hero-title has-text-white is-1">
                    {{ hero.name }}
                  </h1>
                  <h3 class="subtitle has-text-white">
                    Watch Here
                  </h3>
                  <button class="button is-dark" @click="gotoPage('/'+hero.link+'/')">
                    <span class="icon">
                      <i class="fas fa-play"></i>
                    </span>
                    <span>Play Now</span>
                  </button>
                </div>
              </div>
            </section>
           </div>
           <div :class=" ismobile ? 'column is-full mt-2 mr-0'  : 'column is-full ml-2 mr-0 pl-4 pr-0'">
             <div class="columns is-mobile">
               <div class="column is-half">
                 <h2 class="subtitle has-text-netflix-only has-text-weight-bold">
                   Top Trending
                 </h2>
               </div>
               <div class="column pr-4 mr-4 is-half has-text-centered">
                 <span class="icon has-text-weight-bold has-text-netflix" style="cursor: pointer;font-size:18px;">
                   <i class="fas fa-arrow-alt-circle-left" @click="swipeLeft('trend')"></i>
                 </span>
                 <span class="icon has-text-weight-bold has-text-netflix" style="cursor: pointer;font-size:18px;">
                   <i class="fas fa-arrow-alt-circle-right" @click="swipeRight('trend')"></i>
                 </span>
               </div>
             </div>
             <div class="trending-block" ref="trend">
               <div v-for="(trend, index) in trending" v-bind:key="index" class="trend-link" @click="gotoPage('/'+trend.link+'/')" :style="'background: url('+trend.poster+');background-size:cover;cursor: pointer;'">
               </div>
             </div>
           </div>
           <div :class=" ismobile ? 'column is-full mt-2 mr-0'  : 'column is-full ml-2 mr-0 pl-4 pr-0'">
             <div class="columns is-mobile">
               <div class="column is-half">
                 <h2 class="subtitle has-text-netflix-only has-text-weight-bold">
                   Categories
                 </h2>
               </div>
               <div class="column pr-4 mr-4 is-half has-text-centered">
                 <span class="icon has-text-weight-bold has-text-netflix" style="cursor: pointer;font-size:18px;">
                   <i class="fas fa-arrow-alt-circle-left" @click="swipeLeft('cat')"></i>
                 </span>
                 <span class="icon has-text-weight-bold has-text-netflix" style="cursor: pointer;font-size:18px;">
                   <i class="fas fa-arrow-alt-circle-right" @click="swipeRight('cat')"></i>
                 </span>
               </div>
             </div>
             <div class="category-block" ref="cat">
               <div v-for="(cat, index) in category" v-bind:key="index" @click="gotoPage('/'+cat.link+'/')" class="cat-link" :style="'background: url('+cat.poster+');background-size:cover;cursor: pointer;'">
                 <h1 class="title is-4 has-text-centered has-text-white has-text-weight-bold" style="display: flex;align-items: baseline;">
                   {{ cat.name }}
                 </h1>
               </div>
             </div>
           </div>
         </div>
         <div v-if="!netflix" class="tags-has-addons mt-3">
           <div class="container has-text-white is-fluid">
             <h1 class="title has-text-white has-text-centered">Hey There, Whaat up?</h1>
             <div class="columns is-multiline is-centered is-vcentered is-desktop">
               <div class="column is-half">
                 <div class="box has-background-success">
                   <h1 class="title has-text-white has-text-centered">Quick Access</h1>
                   <div class="columns has-text-centered is-multiline is-vcentered is-centered">
                     <div v-for="(link, index) in quickLinks" class="column is-half" v-bind:key="index">
                       <button class="button is-success is-light" @click="gotoPage('/'+ link.link +'/')">
                         <span class="icon is-small">
                           <i :class="link.faIcon"></i>
                         </span>
                         <span>{{ link.displayname }}</span>
                       </button>
                     </div>
                     <div class="column is-half">
                       <button class="button is-success is-light"  @click="gotoPage('/')">
                         <span class="icon is-small">
                           <i class="fas fa-folder-open"></i>
                         </span>
                         <span>Go to Drive</span>
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        components: {
          Loading,
        },
        data () {
            return {
                gds: [],
                netflix: true,
                mainhero: {},
                trending: [],
                category: [],
                currgd: {},
                email: "",
                heroCss:"",
                disabled: true,
                truncatedApi: "",
                quickLinks: [],
                loading: false,
                fullpage: true,
            }
        },
        methods: {
          gotoPage(url, cmd) {
            if(cmd){
              this.$router.push({ path: '/'+ this.currgd.id + ':' + cmd + url })
            } else {
              this.$router.push({ path: '/'+ this.currgd.id + ':' + url })
            }
          },
          shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array
          },
          scrollTo(element, scrollPixels, duration) {
            const scrollPos = element.scrollLeft;
            if ( !( (scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0)))
            {
              const startTime =
                "now" in window.performance
                  ? performance.now()
                  : new Date().getTime();

              function scroll(timestamp) {
                const timeElapsed = timestamp - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                element.scrollLeft = scrollPos + scrollPixels * progress;
                if (timeElapsed < duration) {
                  window.requestAnimationFrame(scroll);
                } else {
                  return;
                }
              }
              window.requestAnimationFrame(scroll);
            }
          },
          swipeLeft(func) {
            const content = "this.$refs."+func;
            this.scrollTo(eval(content), -300, 400);
          },
          swipeRight(func) {
            const content = "this.$refs."+func;
            this.scrollTo(eval(content), 300, 400);
          },
          filterArrSlice(array){
            return this.shuffle(array.filter((arr) => {
              return arr.root == this.currgd.id
            })[0].link).slice(0,1)
          },
          filterArr(array) {
            return this.shuffle(array.filter((arr) => {
              return arr.root == this.currgd.id
            })[0].link)
          }
        },
        beforeMount() {
          this.netflix = window.themeOptions.netflix_home;
          this.mainhero = this.filterArrSlice(window.mainHeroLinks);
          this.trending = this.filterArr(window.trendingPosterLinks);
          this.category = this.filterArr(window.homeCategories);
          this.quickLinks = this.filterArr(window.quickLinks);
        },
        created() {
          if (window.gds) {
            this.gds = window.gds.map((item, index) => {
              return {
                name: item,
                id: index,
              };
            });
            let index = this.$route.params.id;
            if (this.gds) {
              this.currgd = this.gds[index];
            }
          }
        },
        computed: {
          ismobile() {
            var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if(width > 966){
              return false
            } else {
              return true
            }
          },
        },
    }
</script>
