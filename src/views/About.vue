<template lang="">
<Toast />
    <div>
       <card>
           <template #title>
        <h1 class="about-h1">About</h1>
    </template>
          <template #content>
  <div id="typewriter" class="typewriter"></div>

  <div class="myname-designation" id="myname-designation"></div>
</template>
     </card> 
    </div>
</template>
<script>
export default {
  data() {
    return {
      firstStringTypingEnded: false,
    };
  },

  mounted() {
    var app = document.getElementById("typewriter");
    var typewriter = new Typewriter(app, {
      loop: false,
      delay: 45,
    });

    var test = typewriter
      .typeString(
        `<span style="color:green">KDA Register Management Software</span> is a web-based software built with MEVN (MongoDB,Express,Vue,Node) stack to make Computer Sectcion's Register maintainance easy.
It has global search field(covers Current user name, Current user department, Current user designation, product description,
) and idividual search field to find any product within few seconds.
Individual sorting for each field.All search query stored in local storage so that search filed remains 
same after hard reload.Multiple Delete option is for deleting many data at a time. Product Description field 
contains a rich text editor to insert product description efficiently. 
An Export machanism added to export the data easily to Windows Excel.About 17 themes added to Customize
UI(User Interface) in run time.that's all in short. 
`
      )
      .pauseFor(250)
      .typeString(`<div class="myname-about">Shoeb Howlader</div>`)
      .callFunction((state) => {
        // turn off animation
        state.elements.cursor.style.animation = "none";
        // hide cursor
        state.elements.cursor.style.display = "none";

        ///////////////////////////////////////////

        var app2 = document.getElementById("myname-designation");
        var typewriter2 = new Typewriter(app2, {
          loop: true,
          delay: 75,
        });
        typewriter2
          .changeDeleteSpeed(75)
          .typeString(`Programmer`)
          .pauseFor(250)
          .deleteChars(10)
          .typeString(`Dreamer`)
          .pauseFor(250)
          .deleteChars(7)
          .typeString(`Full-stack Developer `)
          .pauseFor(250)
          .start();
      })
      .start();

    if (test == true) {
      console.log("got it");
    }

    //////
    setTimeout(() => {}, 43000);
  },
  data() {
    return {};
  },
  methods: {},
};

/**
  `<p>is a web-based software built with MEVN (MongoDB,Express,Vue,Node) stack to maintain Computer Sectcion's Register easily.
It has global search field(covers Current user name, Current user department, Current user designation, product description
) and idividual search field to find any product within few seconds.It laso have Individual sorting for each field.All search query stored in local storage so that search filed remains 
same after hard reload.Multiple Delete option is for deleting many data at a time. Product Description field 
contains a rich text editor to insert product description efficiently. 
An Export machanism added to export the data easily to Windows Excel.About 17 themes added to Customize
UI(User Interface) in run time.that's all in short. 
</p>`


 * 
 */
</script>
<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Alata&family=Inconsolata:wght@200&family=Lora:ital@1&family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap");
@import url("http://fonts.cdnfonts.com/css/sofia-pro");
.about-h1 {
  font-family: "Lobster";
  font-size: larger;
}
.typewriter {
  font-family: "Alata";
  text-align: justify;
  font-size: large;
  box-shadow: inset;
  font-style: normal;
  padding: 8px;
}
.myname-about {
  font-family: "Lobster";
  font-size: larger;
  margin-top: 63px;
  margin-left: 80%;
}
.myname-designation {
  font-family: "Inconsolata";
  color: rgb(40, 0, 44);
  font-size: medium;
  margin-left: 75%;
}
</style>

