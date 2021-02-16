<template>
  <div class="wrapper">

    <form @submit.prevent="startGame()">

      <div class="form-item">
        <label for="firstPlayer">Joueur 1:</label>
        <input type="text" v-model="firstPlayer" id="firstPlayer" />
      </div>

      <div class="form-item">
        <label for="secondPlayer">Joueur 2:</label>
        <input type="text" v-model="secondPlayer" id="secondPlayer" />
      </div>

      <button type="submit">Commencer la partie</button>

    </form>

  </div>
</template>

<script>

import {useRouter} from 'vue-router'
import { useStore } from 'vuex'     
import {ref} from 'vue'

export default {
    name:"Lobby",
    setup(){

        const firstPlayer = ref("")
        const secondPlayer = ref("")   
        const router = useRouter()
        const store = useStore()

        const startGame = () => {
            if( firstPlayer.value && secondPlayer.value) {
                store.commit('savePlayersName', {firstPlayer: firstPlayer.value, secondPlayer: secondPlayer.value })
                router.push("/board")
            }
            else{
                alert('Veuillez remplir les noms des joueurs :)')
            }

        }

        return{firstPlayer, secondPlayer, startGame}
    }
};
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}
.wrapper{
    margin: 0px auto;
    display: flex;
    align-items: center;
    height: 100vh;
}
form{
    margin:0 auto;  
    border-radius: 15px;
    padding: 80px 20px;
    background: linear-gradient(to bottom right,#3989d4, #39BCD4);
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
}
.form-item label{
    font-size: 2.2rem;
    display: block;
    text-align: center;
    color: white;
}
.form-item input{
    display: block;
    margin-bottom: 60px;
    margin-top: 20px;
    width: 70%;
    padding: 10px 20px;
    outline: none;
    margin-left:auto;
    margin-right: auto;
    border-radius: 15px;
    border: none;
    font-size: 1.5rem;
}
button{
    display: block;
    border-radius: 10px;
    padding:20px 30px ;
    width: 45%;
    margin: 0 auto;
    background: white;
    border: none;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 1.3rem;
    outline: none;
    transition: transform 0.3s ease;
}
button:hover{
    transform:scale(1.1);
    transition: transform 0.3s ease;
}
@media screen and (max-width:600px) {
  form{
    width: 350px;
  }
  button{
      width: 70%;
  }

}
</style>
