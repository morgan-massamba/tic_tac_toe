<template>
  <div class="container">
    <h2 class="winner-heading" v-if="winner">
      <span class="winner-styling">{{ winnerName }}</span> remporte la partie !
    </h2>
    <h2 v-else-if="isDraw">Egalité !</h2>
    <h2 v-else>
      <span class="underline-style">Au tour de jouer</span> :
      <span :class="player=='X' ? 'colorNameBlue' : 'colorName'">{{ playerName }}</span>
    </h2>

    <div v-for="x in 3" :key="x" class="row">
      <div v-for="y in 3" :key="y" class="column" :class="squares[x-1][y-1]=='X' ? 'cl-blue' : ''" @click="move(x, y)">
        {{ squares[x - 1][y - 1] }}
      </div>
    </div>

    <button @click="reset()" class="reset-btn">Rejouer</button>
    <button @click="backHome()" class="reset-btn">
      Retour au menu principal
    </button>
  </div>
</template>

<script>
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Board',
  setup() {
    const store = useStore();
    const router = useRouter();
    const player = ref('X');
    const squares = ref([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    const winner = computed(() => calculateWinner(squares.value.flat()));

    const isDraw = computed(() => {
      let squareArray = squares.value.flat();
      return squareArray.filter((item) => !item).length === 0;
    });

    const playerName = computed(() => {
      return player.value == 'X'
        ? store.state.firstPlayer
        : store.state.secondPlayer;
    });

    const winnerName = computed(() => {
      return winner.value == 'X'
        ? store.state.firstPlayer
        : store.state.secondPlayer;
    });

    const move = (x, y) => {
      if (winner.value || squares.value[x - 1][y - 1]) return;
      squares.value[x - 1][y - 1] = player.value;
      player.value = player.value === 'X' ? 'O' : 'X';
    };

    const reset = () => {
      player.value = 'X';
      squares.value = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
    };

    const backHome = () => {
      router.push('/');
    };

    return {
      player,
      squares,
      winner,
      move,
      reset,
      isDraw,
      playerName,
      winnerName,
      backHome,
    };
  },
};
</script>

<style lang="scss" scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.container {
  margin: 0 auto;
  text-align: center;
  height: 100vh;
  overflow: hidden;
}
h2 {
  margin: 30px 0;
}
.row {
  width: 540px;
  margin: 0 auto;
  height: 180px;
  display: flex;
  flex-wrap: nowrap;
  &:nth-child(3){
      border-top: 2px solid rgba($color: #000000, $alpha: 0.2);
      border-bottom: 2px solid rgba($color: #000000, $alpha: 0.2) ;
  }
}
.column {
  color: #39BCD4;
  width: 33.3%;
  height: 100%;
  font-size: 8rem;
  font-weight: 600;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  &.cl-blue{
    color: #3989d4;
  }
  &:nth-child(2){
    border-left: 2px solid rgba($color: #000000, $alpha: 0.2);
    border-right: 2px solid rgba($color: #000000, $alpha: 0.2);
  }
}
.reset-btn {
  margin-top: 30px;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  background: rgba($color: #000000, $alpha: 0.85);
  color: white;
  margin-left: 40px;
  cursor: pointer;
}
.winner-heading{
  background: linear-gradient(to bottom, transparent 50%, beige 50%);
  display: inline-block;
}
.winner-styling {
  text-transform: uppercase;
}
.underline-style {
  text-decoration: underline;
}
.colorName{
  color:#39BCD4;
  text-transform: capitalize;
}
.colorNameBlue{
  color:#3989d4;
  text-transform: capitalize;
}
@media screen and (max-width: 600px) {
  .row {
    width: 350px;
    height: 150px;
  }
  .column {
    font-size: 4rem;
  }
  .reset-btn {
    margin: 30px auto;
    display: block;
  }
}
</style>
