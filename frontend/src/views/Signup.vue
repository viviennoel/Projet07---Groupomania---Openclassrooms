<template>
    <main class="main_wrapp row" id="main_wrapp_signup">
        <div class="col-md-6">
            <form class="cadre w-50 m-auto">

                <h1 id="title_signup">Rejoignez nous!</h1>
                <div class="container">
                    <div class="form-group ">
                        <label for="inputEmail"> Mon e-mail</label>
                        <input type="email" class="form-control" id="inputEmail" v-model="dataSignup.email" />
                    </div>
                    <div class="form-group">
                        <label for="inputUsername"> Mon nom d'utilisateur</label>
                        <input type="text" class="form-control" id="inputUsername" v-model="dataSignup.username" />
                    </div>
                    <div class="form-group">
                        <label for="inputPassword"> Mon mot de passe</label>
                        <input type="password" class="form-control" id="inputPassword" v-model="dataSignup.password" />
                        <small>Votre mot de passe doit contenir au moins 6 caractères dont 1 majuscule, 1 minuscule et un chiffre</small>
                    </div>
                    <button @click.prevent="sendSignup" type="submit" class="btn btn-secondary mb-3 mt-3">Créer mon compte 🔒</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>//import de la bibliothèque et d'axios pour les requêtes

    import { mapState } from "vuex";
    import axios from "axios";


    export default {
        name: "SignUp",
        data() {
            return {
                dataSignup: {
                    username: null,
                    email: null,
                    password: null
                },
                msg: ""
            };
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            // requête pour créer un user, sécurité grâce au regex
            sendSignup() {
                const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
                const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
                const usernameRegex = /^[a-zA-Z ,.'-]+$/;
                if (
                    (this.dataSignup.email !== null || this.dataSignup.username !== null || this.dataSignup.password !== null) &&
                    (regexPassword.test(this.dataSignup.password) && regexEmail.test(this.dataSignup.email) && usernameRegex.test(this.dataSignup.username))
                ) {
                    axios
                        .post("http://localhost:3000/api/user/signup", this.dataSignup)
                        .then(response => {
                            console.log(response);

                            //Réinitialisation des champs après saisie
                            this.dataSignup.email = null;
                            this.dataSignup.username = null;
                            this.dataSignup.password = null;
                            this.$router.push({ path: '/login' });
                        })
                        .catch(error => console.log(error));
                } else {
                    alert("Désolé, vous n'avez pas rempli les champs correctement ! ");
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

    #main_wrapp_signup {
        background-image: url('../assets/bg_login.jpg');
    }

        #main_wrapp_signup h1 {
            font-size: 1.5em;
            font-weight: 300 !important;
            color: #a2a1a1;
            padding: 10px 20px;
            text-align: center;
            width: 100%;
            margin: auto;
        }

    .body-intro {
        margin-top: 25%;
    }

    #title_signup {
        color: #000000;
        font-size: 2em;
        position: relative !important;
        top: 0 !important;
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