<template>
	<div class="tabla-flex"
		:style="{
			width: sizeWidth,
			height: sizeHeight,
		}">
		
		<div class="celda-flex" v-for="(row, index) in terrain" :key="index" >
			<div class="celda-flex" v-for="(column, index) in row" :key="index">
				<div class="">
				{{column}}
			</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Game',
  components: {
  },
  props: {
    },
  data() {
	return {
		terrain: [[1,2],[3,4]],
		isBorder: true,
		sizeWidth: 400,
		sizeHeight: 400,
  	}
  },
  methods: {
  },
  mounted() {
  },
  beforeUnmount() {
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabla-flex {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.fila-flex {
  display: table-row;
}

.celda-flex {
  display: table-cell;
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
</style>