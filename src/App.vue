<template>
  <canvas id="c"></canvas>
  <!--Menubar :model="items">
    <template #start>
      <div>
        <img alt="logo" src="@/assets/logo.svg" height="90" />
        <p>KDA Computer Cell Register</p>
      </div>
    </template>
    <template #end> </template>
  </!--Menubar-->
  <Card
    style="background-color: #f8f9fa; margin-bottom: 10px; padding: 0px"
    class="navbar p-mt-1"
    v-if="isLoggedIn"
  >
    <template #content style="padding: 0px">
      <div class="p-grid p-jc-center">
        <div class="p-col-12 p-md-12 p-sm-12 p-lg-8">
          <!--TabMenu :model="items" /-->
          <Menubar :model="items" style="border: 0px; padding: 0px">
            <template #start>
              <img
                alt="logo"
                src="@/assets/logo.svg"
                height="70"
                class="p-mr-3"
              />
            </template>
            <template #end>
              <!--h3 style="font-family: ">KDA Computer Cell Register</!--h3-->
              <Button
                label="Logout"
                class="p-button-raised p-button-danger"
                @click="UserLogout"
                v-if="isLoggedIn"
              />
            </template>
          </Menubar>
        </div>
      </div>
    </template>
  </Card>
  <router-view />

  <footer id="tsparticles">
    <div class="horizontal-scroll2"><div class="horizontal-scroll"></div></div>
    <div>
      <p class="footer-text">
        Designed and developed by<br />
        <span class="myname"> Shoeb Howlader</span>
      </p>
    </div>
  </footer>
</template>


<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  created() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  },
  mounted() {
    this.initiateProducts();
    setInterval(this.reload, 1000);

    if (localStorage.getItem("theme")) {
      let themeElement = document.getElementById("theme-link");
      themeElement.setAttribute(
        "href",
        "themes/" + localStorage.getItem("theme") + "/theme.css"
      );
    }
    var w = (c.width = window.innerWidth),
      h = (c.height = window.innerHeight),
      ctx = c.getContext("2d"),
      minDist = 10,
      maxDist = 30,
      initialWidth = 10,
      maxLines = 100,
      initialLines = 4,
      speed = 5,
      lines = [],
      frame = 0,
      timeSinceLast = 0,
      dirs = [
        // straight x, y velocity
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
        [0.7, 0.7],
        [0.7, -0.7],
        [-0.7, 0.7],
        [-0.7, -0.7],
      ],
      starter = {
        // starting parent line, just a pseudo line

        x: w / 2,
        y: h / 2,
        vx: 0,
        vy: 0,
        width: initialWidth,
      };

    function init() {
      lines.length = 0;

      for (var i = 0; i < initialLines; ++i) lines.push(new Line(starter));

      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, w, h);

      // if you want a cookie ;)
      // ctx.lineCap = 'round';
    }
    function getColor(x) {
      return "hsl( hue, 80%, 50% )".replace("hue", (x / w) * 360 + frame);
    }
    function anim() {
      window.requestAnimationFrame(anim);

      ++frame;

      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(0,0,0,.02)";
      ctx.fillRect(0, 0, w, h);
      ctx.shadowBlur = 0.5;

      for (var i = 0; i < lines.length; ++i)
        if (lines[i].step()) {
          // if true it's dead

          lines.splice(i, 1);
          --i;
        }

      // spawn new

      ++timeSinceLast;

      if (
        lines.length < maxLines &&
        timeSinceLast > 10 &&
        Math.random() < 0.5
      ) {
        timeSinceLast = 0;

        lines.push(new Line(starter));

        // cover the middle;
        ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
        ctx.beginPath();
        ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function Line(parent) {
      this.x = parent.x | 0;
      this.y = parent.y | 0;
      this.width = parent.width / 1.25;

      do {
        var dir = dirs[(Math.random() * dirs.length) | 0];
        this.vx = dir[0];
        this.vy = dir[1];
      } while (
        (this.vx === -parent.vx && this.vy === -parent.vy) ||
        (this.vx === parent.vx && this.vy === parent.vy)
      );

      this.vx *= speed;
      this.vy *= speed;

      this.dist = Math.random() * (maxDist - minDist) + minDist;
    }
    Line.prototype.step = function () {
      var dead = false;

      var prevX = this.x,
        prevY = this.y;

      this.x += this.vx;
      this.y += this.vy;

      --this.dist;

      // kill if out of screen
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) dead = true;

      // make children :D
      if (this.dist <= 0 && this.width > 1) {
        // keep yo self, sometimes
        this.dist = Math.random() * (maxDist - minDist) + minDist;

        // add 2 children
        if (lines.length < maxLines) lines.push(new Line(this));
        if (lines.length < maxLines && Math.random() < 0.5)
          lines.push(new Line(this));

        // kill the poor thing
        if (Math.random() < 0.2) dead = true;
      }

      ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(prevX, prevY);
      ctx.stroke();

      if (dead) return true;
    };

    init();
    anim();

    window.addEventListener("resize", function () {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      starter.x = w / 2;
      starter.y = h / 2;

      init();
    });
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    ...mapState([
      // ...
      "products",
      "departments",
      "categories",
    ]),
  },
  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
        { label: "Report", icon: "pi pi-fw pi-book", to: "/report" },
        { label: "About", icon: "pi pi-fw pi-calendar", to: "/about" },
        { label: "Settings", icon: "pi pi-fw pi-cog", to: "/settings" },
      ],
    };
  },
  methods: {
    UserLogout() {
      this.logout().then(() => {
        this.$router.push("/login");
      });
    },
    ...mapMutations([
      "SET_PRODUCTS",
      "DELETE_PRODUCTS",
      "DELETE_SELECTED_PRODUCTS",
    ]),
    ...mapActions(["initiateProducts", "reload", "logout"]),
  },
};

//////////ts 🙌
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}
canvas {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: -100;
}

/** */
.horizontal-scroll {
  width: 100%;
  height: 300px;
  //background: url("http://mckenziedave.co.uk/1st-touch/footer_fr.png");
  background: url("./assets/footer/footer_fr.png");
  -webkit-animation: backgroundScroll 400s linear infinite;
  animation: backgroundScroll 60s linear infinite;
  background-repeat: no-repeat;
}

@-webkit-keyframes backgroundScroll {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -600px 0;
  }
}

@keyframes backgroundScroll {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -2000px 0;
  }
}

.horizontal-scroll2 {
  width: 100%;
  height: 200px;
  //background: url("http://mckenziedave.co.uk/1st-touch/footer_bg.png");
  background: url("./assets/footer/footer_bg.png");
  -webkit-animation: backgroundScroll2 400s linear infinite;
  animation: backgroundScroll2 30s linear infinite;
  background-repeat: no-repeat;
}

@-webkit-keyframes backgroundScroll2 {
  from {
    background-position: -1000px 0;
  }
  to {
    background-position: 0 0;
  }
}

@keyframes backgroundScroll2 {
  from {
    background-position: -2000px 0;
  }
  to {
    background-position: 0 0;
  }
}
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Roboto+Mono:wght@100;200&display=swap");
.footer-text {
  font-family: "Roboto Mono";
  font-size: large;
}
.myname {
  font-family: "Lobster";
  font-size: larger;
}

footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 10px;
}
.router-link-active {
  border-bottom: 2px solid green;
}
.router-link-active-exact {
  color: green !important;
  background: #e7f9ea !important;
}

.navbar .p-card-body {
  padding: 0px;
}
.navbar .p-card-content {
  padding: 0px;
}
</style>
