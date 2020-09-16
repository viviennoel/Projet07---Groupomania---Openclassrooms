<template>
    <div>
        <div class="main_wrapp text-center" id="main_wrapp_home">
            <h1>Il est temps de s'amuser sur Groupomania!</h1>
            <h2>Grupomania - Le fun à l'état pur!</h2>
        </div>

        <div class="mt-5">
            <h2 class="pr-5">Chez Groupomania, l'échange est essentiel!</h2>

        </div>
    </div>
</template>

<script>


export default {
  name: "Accueil"
}  

</script>

<style scope>


.main_wrapp {
    background-size: cover;
    background-repeat:no-repeat;
    width:100vw;
    height:100vh;
}

#main_wrapp_home{
    background-image: url('../assets/bg_home.jpg');
}

.main_wrapp h1 {
    font-size: 3em;
    font-weight: 500 !important;
    color: #ffffff;
    position: absolute;
    top: 50vh;
    padding: 0px 20px;
    text-align: center;
    width: 100%;
    margin: auto;
}

.main_wrapp h2 {
        font-size: 1.5em;
        font-weight: 500 !important;
        color: #ffffff;
        position: absolute;
        bottom: 10vh;
        padding: 0px 20px;
        text-align: center;
        animation: fade_wiggle 2s ease-in-out infinite;
    }

@keyframes fade_wiggle {
        0% {
            opacity: 0.5;
            transform: translateX(0);
        }

        50% {
            transform: translateX(35px);
            opacity: 1;
        }

        100% {
            transform: translateX(0);
            opacity:0.5;
        }
    }

    @-webkit-keyframes fade_wiggle {
        from {
            opacity: 0.5;
            transform: translateX(0px);
        }

        10% {
            transform: translateX(35px);
            opacity: 1;
        }
        to {
            opacity: 0.5;
            transform: translateX(0px);
        }
    }
</style>