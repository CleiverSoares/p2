<template>
  <!-- <Message :msg="msg" v-show="msg" /> -->
  <div id="responsivo">
    <div id="burger-table">
      <div>
        <div id="burger-table-heading">

          <div class="order-id">#:</div>
          <div>Cliente:</div>
          <div>Pão:</div>
          <div>Carne:</div>
          <div>Opcionais:</div>
          <div>Ações:</div>
        </div>
      </div>
      <div id="burger-table-rows">
        <div class="burger-table-row" v-for="burger in state.pedidos" :key="burger.id" v-if="state.showPedido">

          <div class="order-number">{{ burger.id }}</div>
          <div>{{ burger.nome }}</div>
          <div>{{ burger.pao }}</div>
          <div>{{ burger.carne }}</div>
          <div>
            <ul>
              <li v-for="(opcional, index) in burger.opcionais" :key="index">
                {{ opcional }}
              </li>
            </ul>
          </div>
          <div>
            <select :style="{ backgroundColor: burger.status.cor }" name="status"
              @change="updateBurger($event, burger.id)">
              <option style="background-color: aliceblue;" v-for="s in state.status" :key="s.id" :value="s.tipo"
                :selected="burger.status.tipo == s.tipo">
                {{ s.tipo }}
              </option>
            </select>
            <button class="delete-btn animated-button" :class="{ 'animated-button--active': animating }"
              @click="deleteBurger(burger.id)">
              Cancelar
            </button>
          </div>
        </div>
        <div id="nao-produtivo" v-else>
          <h3>
            <p>
              Nenhum pedido registrado - {{ formatDate(new Date()) }} 🤞🤷‍♂️
            </p>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios'
import Message from "@/components/Message.vue";
import { ref, reactive, onMounted } from 'vue'
import { useStore } from "vuex";
import { GET_PEDIDOS, GET_STATUS } from "@/store/type-actions";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {
    Message,
  },

  setup() {
    const store = useStore();
    const state = reactive({
      date: new Date(),
      showPedido: true,
      pedido: null,
      pedidos: [],
      burger_id: null,
      status: [],
      msg: null,
      cores: [],
      status: []
    })
    const animating = ref(true)

    setTimeout(() => {
      animating.value = false
    }, 200)

    onMounted(() => {
      getPedidos();
      getStatus();

    })



    function formatDate(date) {
      const dateTime = new Date(date);
      const dia = String(dateTime.getDate()).padStart(2, '0');
      const mes = String(dateTime.getMonth() + 1).padStart(2, '0');
      const ano = dateTime.getFullYear();
      const final = `${dia}/${mes}/${ano}`;
      return final;
    }

    async function getStatus() {

      const status = await store.dispatch(GET_STATUS);
      state.status = status;
      console.log(state.status, "pagina");


    }
    async function getPedidos() {

      const pedidos = await store.dispatch(GET_PEDIDOS);
      state.pedidos = pedidos;
      console.log(state.pedidos.length);
      if (state.pedidos.length < 1) {

        state.showPedido = false
      }
      getStatus();
    }

    async function deleteBurger(id) {
      try {
        const req = await fetch(`http://localhost:3000/pedido/${id}`, {
          method: "DELETE",
        });
        const res = await req.json()
        Swal.fire({
          position: "center",
          icon: "success",
          background: "rgba(209,21,113,255)",
          color: "#222",
          iconColor: "#222",
          title: `Deletado!`,
          text: `Pedido Nº ${id} deletado com sucesso!`,
          timer: 4000,
        });
        getPedidos()
        console.log(res);
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          background: "rgba(209,21,113,255)",
          color: "#222",
          iconColor: "#222",
          title: `Erro!`,
          text: `Erro ao deletar pedido`,
          timer: 2500,
        });
        return;
      }
      finally {
        getPedidos()
      }

    }
    async function updateBurger(event, id) {
      console.log(event.target.value,"update");

      for (let index = 0; index < this.state.status.length; index++) {
        if (event.target.value == this.state.status[index].tipo) {
          const req = await axios.patch(`http://localhost:3000/pedido/${id}`, {
            status: this.state.status[index],
          });
          console.log(req);


          //actualizar a tablea
          Swal.fire({
            position: "center",
            icon: "success",
            background: "rgba(209,21,113,255)",
            color: "#222",
            iconColor: "#222",
            title: `Atualizado!`,
            text: `Pedido Nº ${id} atualizado para  ${req.data.status.tipo}!`,
            timer: 3000,
          });

          getPedidos();
          return
        }
      }




    }


    return {
      state,
      animating,
      formatDate,
      updateBurger,
      deleteBurger

    }
  },


};
</script>

<style scoped>
.status {
  background-color: #222;
  color: var(--c-default);
  font-weight: bold;
  width: 119px;
}

.animated-button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #0077c2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-out;
}

.animated-button span {
  position: relative;
  z-index: 2;
}

.animated-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background-color: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.animated-button--active {
  background-color: #d10000;
}

.animated-button--active::before {
  width: 300px;
  height: 300px;
}

#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  align-items: center;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
  border-radius: 5px;
}

.delete-btn {
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

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}

#nao-produtivo {
  margin-top: 50px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  left: 50px;

}

#nao-produtivo p {
  margin-left: 10px;
}

#nao-produtivo h3 {
  border-left: 5px solid var(--c-default);
}


@media screen and (max-width: 450px) {
  #responsivo {
    font-size: 10px;
  }


  select,
  .delete-btn {
    width: 40px;
    height: 30px;
    font-size: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 15px;
  }
}
</style>