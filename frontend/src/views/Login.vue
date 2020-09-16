<template>
    <main class="main_wrapp" id="main_wrapp_login">
        <div class="col-md-6">
            <form class="cadre w-50 m-auto">
                <h1 class="black">Rejoignez nous!</h1>
                <div class="container ">
                    <div class="form-group ">
                        <label for="inputemail ">Mon e-mail</label>
                        <input type="text" class="form-control" id="inputemail" v-model="dataLogin.email" />
                    </div>
                    <div class="form-group ">
                        <label for="inputPassword">Mon mot de passe</label>
                        <input type="password" class="form-control" id="inputPassword" v-model="dataLogin.password" />
                    </div>
                    <small> Pas de compte? <router-link class="redirection-signup" to="/signup">Inscription!</router-link></small> <br>
                    <button @click.prevent="logIn" type="submit" class="btn btn-secondary mb-3 mt-3">Connexion 🔒</button>
                </div>
            </form>
        </div>
        <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
    </main>

</template>

<script>//import de la bibliothèque et d'axios pour les requêtes

    import axios from "axios";
    import { mapState } from "vuex";
    // import du component Modale pour l'alerte du mot de passe ou email incorrect
    import modale from "../components/modale"


    export default {
        name: "SignUp",
        data() {
            return {
                dataLogin: {
                    email: null,
                    password: null
                },
                msg: "",
                revele: false
            };
        },
        components: {
            'modale': modale
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            // fonction modale qui revele ou non la modale si il y a une erreur
            toggleModale: function () {
                this.revele = !this.revele
            },

            // requête pour connecter l'user déja existant
            logIn() {
                if (
                    this.dataLogin.email !== null || this.dataLogin.password !== null
                ) {
                    axios
                        .post("http://localhost:3000/api/user/login", this.dataLogin)
                        .then(response => {
                            localStorage.setItem('token', response.data.token)
                            this.$router.push({ path: 'Wall' })
                        })
                        .catch(error => {
                            console.log(error)
                            this.revele = !this.revele
                        })

                } else {
                    console.log("oops !");
                }
            }
        }
    };</script>

<style scope>

    .cadre {
        padding: 10px;
        border: #000000 1px solid !important;
        background-color: #ffffff5e;
        animation: fade 1s ease-in forwards;
    }

        .cadre:hover {
            background-color: #ffffffc7;
        }

    .btn {
        background-color: #6c757d !important;
    }

    .main_wrapp {
        padding-top: 20%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right;
        width: 100vw;
        height: 100vh;
    }

    #main_wrapp_login {
        background-image: url('../assets/bg_login.jpg');
    }

        #main_wrapp_login h1 {
            font-size: 1.5em;
            font-weight: 300 !important;
            color: #a2a1a1;
            padding: 10px 20px;
            text-align: center;
            width: 100%;
            margin: auto;
        }

    .redirection-signup {
        color: #6c757d;
        text-decoration: none;
    }

        .redirection-signup:hover {
            color: #fd2d01;
        }

    .body-intro {
        margin-top: 25%;
    }

    .black {
        color: #000000;
        font-size: 2em;
        position: relative;
        top: 0;
    }

    @keyframes fade {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @-webkit-keyframes fade {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }

        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>