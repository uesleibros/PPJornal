<template>
	<div>
		<slot />
	</div>
</template>

<script>
	export default {
	    mounted() {
	      let fontawesome = document.createElement('script');
	      let jquery = document.createElement('script');
	      fontawesome.setAttribute('src', 'https://kit.fontawesome.com/507c3629aa.js');
	      jquery.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js');
	      document.head.appendChild(fontawesome);
	      document.head.appendChild(jquery);
	    },
	}
</script>

<style scoped>
	@import '~/static/app.css';
</style>