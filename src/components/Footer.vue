<template>
  <footer id="footer">
    <!-- <p>Point dos amigos &copy; {{ getAnoAtual() }}</p> -->
    <div class="socialLink-pai">
      <a href="https://www.facebook.com/pizzariapointdosamigos/" target="blank">
        <i class="fa-brands socialLink fa-facebook-f" title="Facebook Point">
        </i>
      </a>


      <a href="https://www.instagram.com/pointdosamigosdelivery/" target="blank">
        <i class="socialLink fa-brands fa-instagram"
          title="instagran Point"></i></a>


      <a href="https://www.ifood.com.br/delivery/teresopolis-rj/point-dos-amigos-ermitage/ffa39d85-3047-416d-bbd2-459349ecc10e" target="blank">
        <i class="socialLink fa-solid socialLink fa-burger"
          title="Ifood Point"></i></a>

      <a href="https://api.whatsapp.com/send?phone=5521992593031&text=%C3%92la,%20eu%20vim%20pelo%20site,%20queria%20fazer%20um%20pedido%20por%20favor..." target="blank">
        <i class=" socialLink  fa-brands fa-whatsapp" title="Whattsap Point "></i></a>
    </div>
  </footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  methods: {
    getAnoAtual() {
      const data = new Date()
      return data.getFullYear()
    }
  }
}
</script>

<style scoped>
#footer {
  width: 100%;
  height: 80px;
  background-color: #222;
  border-top: 4px solid #111;
  color: rgba(209, 21, 113, 255);
  display: flex;
  align-items: center;
  justify-content: center;
}

.socialLink-pai {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

i {
  color: var(--c-default)
}

.socialLink {
  border: 1px solid var(--c-default);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 04px;
  padding: 18px;
}

@media screen and (max-width: 300px) {
 
  #footer{
    width: 130%;
  }
}
</style>