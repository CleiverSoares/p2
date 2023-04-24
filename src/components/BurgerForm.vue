<template>
  <div class="forms">
    <Message :msg="msg" v-show="msg" />
    <div>
      <transition name="appear">
        <form v-if="visivel" id="burger-form" @submit="createBurger">

          <div class="input-container">
            <label class="nome-label" for="nome">Nome do cliente: </label>
            <input required type="text" id="nome" class="nome-input" name="nome" v-model="nome"
              placeholder="Digite o seu nome" />
            <label class="telefone-label" for="telefone">Telefone do cliente: </label>
            <input required type="number" id="telefone" class="telefone-input" name="telefone" v-model="telefone"
              placeholder="Digite o seu telefone" />
          </div>
          <div class="input-container">
            <label for="pao">Escolha o pão: </label>
            <select name="pao" id="pao" v-model="pao" required>
              <option value="">Selecione o seu pão</option>
              <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                {{ pao.tipo }}
              </option>
            </select>
          </div>
          <div class="input-container">
            <label for="carne">Escolha a carne do seu Burger: </label>
            <select name="carne" id="carne" v-model="carne" required>
              <option value="">Selecione o tipo de carne</option>
              <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                {{ carne.tipo }}
              </option>
            </select>
          </div>
          <div id="opcionais-container" class="input-container">
            <label id="opcionais-title" for="opcionais">Selecione os acompanhamentos:
            </label>
            <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
              <input id="chek" type="checkbox" name="opcionais" v-model="opcionais[opcional.tipo]"
                :value="opcional.tipo" />
              <span for="chek">{{ opcional.tipo }}</span>
            </div>
          </div>
          <div class="input-container">
            <input :class="{ 'animated': true }" type="submit" class="submit-btn" value="Criar meu Burger!" />
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Message from "@/components/Message.vue";
import axios from "axios";
export default {
  name: "BurgerForm",
  components: {
    Message,
  },

  data() {
    return {
      visivel: false,
      paes: "",
      carnes: "",
      opcionaisdata: null,
      nome: null,
      pao: "",
      carne: "",
      opcionais: [],
      status: "Solicitado",
      msg: null,
      telefone: ""
    };
  },

  methods: {
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/ingredientes");
      const data = await req.json();
      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisdata = data.opcionais;
      setTimeout(() =>  (this.visivel = true), 500);
    },

    async createBurger(e) {
      e.preventDefault();
      try {
        const data = {
          nome: this.nome,
          carne: this.carne,
          pao: this.pao,
          opcionais: Object.keys(this.opcionais),
          status: "Solicitado",
          telefone: this.telefone
        };
        // const dataJson = JSON.stringify(data);
       const res= await axios.post("http://localhost:3000/pedido", {
          nome: this.nome,
          carne: this.carne,
          pao: this.pao,
          opcionais: Object.keys(this.opcionais),
          status: "Solicitado",
          telefone: this.telefone
        });
        console.log(res,"req");
        // const res = await req.json();
        if (this.nome.length < 3) {
          Swal.fire({
            position: "center",
            icon: "error",
            background: "rgba(209,21,113,255)",
            color: "#222",
            iconColor: "#222",
            title: `Erro!`,
            text: `O nome precisa ter mais de 3 caracteres`,
            timer: 3500,
          });
          return;
        } else if (data.opcionais < 1) {
          Swal.fire({
            position: "center",
            icon: "error",
            background: "rgba(209,21,113,255)",
            color: "#222",
            iconColor: "#222",
            title: `Erro!`,
            text: `Seleciona pelo menos um acompanhamento`,
            timer: 3500,
          });
          return;
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            background: "rgba(209,21,113,255)",
            color: "#222",
            iconColor: "#222",
            title: `Pedido confirmado!`,
            text: `Pedido Nº ${res.data.id}  realizado com sucesso!`,
            timer: 4000,
          });
        }

        this.telefone = ""
        this.nome = "";
        this.carne = "";
        this.pao = "";
        this.opcionais = []

        // this.msg = `Pedido Nº ${res.id} realizado com sucesso`;
        // setTimeout(() => (this.msg = ""), 2000);

      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          background: "rgba(209,21,113,255)",
          color: "#222",
          iconColor: "#222",
          title: `Erro!`,
          text: `erro desconhecido garotão`,
          timer: 3500,
        });
      }

    },
  },
  mounted() {
    this.getIngredientes();
  },
};
</script>

<style scoped>
.animated {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    background-color: #424141;
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.appear-enter-active,
.appear-leave-active {
  transition: transform 0.4s, opacity 0.4s;
}

.appear-enter-from,
.appear-leave-to {
  transform: translateX(200%);
  opacity: 0;
}

.appear-enter-to,
.appear-leave-from {
  transform: translateX(0);
  opacity: 1;
}

#burger-form {
  max-width: 310px;
  margin: 0 auto;
}

#nome {
  margin-right: 15px;
  border-radius: 6px;
  width: 300px;
}

#nome2 {
  margin-left: 10px;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid var(--c-default);
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: var(--c-default);
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 5px;
}

.telefone-label {
  margin-top: 15px;
}

.telefone-input {
  border-radius: 6px;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}

@media screen and (max-width: 445px) {
  .submit-btn {
    width: auto;
  }

  .nome-label {
    margin-left: -01px;
  }

  .nome-input {
    margin-left: 10px;
  }
}
</style>