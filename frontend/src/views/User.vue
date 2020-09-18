<template>
    <div class="main_wrapp row" id="main_wrapp_user">
        <div class="col-md-6 col-10 offset-1 ">
            <main class="main-connect">
                <h1 class="mb-5"> Profile de {{user.username}}</h1>
                <section class="user-info ml-5 pl-5 pr-5">
                    <div class="col-12 text-center">
                        <h2 id="information_title">Toutes mes informations</h2>
                        <div class="user-info__block mt-5">
                            <p class="user-info__block__title title mb-0 mt-3">Votre Email est {{user.email}}</p>
                        </div>
                        <div class="user-info__block mt-3">
                            <p class="user-info__block__title title mb-0">Votre nom d'utilisateur est {{user.username}}</p>
                        </div>

                        <div class="user-info__block mt-3 nb-5">
                            <p class="user-info__block__title title mb-0">Votre mot de passe contient bien au minimum 6 caractères dont une majuscule, une miniscule et un chiffre</p>
                        </div>
                        <button type="button" class="btn btn-secondary mr-5" id="button_modify-user" data-toggle="modal" data-target="#BoxModalChgPwd" @click="testInputs">Modifier mes informations ⚒</button>

                        <!--Box Modal-->
                        <div class="modal fade" id="BoxModalChgPwd" tabindex="-1" role="dialog" aria-labelledby="BoxModalChgPwd__title" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="BoxModalChgPwd__title">Modifer mon mot de passe </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group form_modify_user">
                                                <label for="InputNewPassword">Mon nouveau mot de passe</label>
                                                <input type="password"
                                                       class="form-control"
                                                       id="InputNewPassword"
                                                       v-model="changePwd.newPassword" />
                                                <small id="emailHelp"
                                                       class="form-text text-muted">Au minimum 6 caractères dont une majuscule, un minuscule et un chiffre</small>
                                            </div>
                                            <div class="form-group form_modify_user">
                                                <label for="RepeatInputNewPassword">Je confirme mon nouveau mot de passe</label>
                                                <input type="password"
                                                       class="form-control"
                                                       id="RepeatInputNewPassword"
                                                       v-model="changePwd.RepeatNewPassword" />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                        <button type="button" class="btn btn-success" @click="changePassword">Sauvergarder les modifications</button>
                                    </div>
                                    <p id="retour-api" class="text-center">{{retourAPI}}</p>
                                </div>
                            </div>
                        </div>
                        <!--END: Box Modal-->

                        <button type="button" class="btn btn-danger white d-block mx-auto mt-5 mb-2" @click="deleteAccount">Supprimer mon compte ☠ </button>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>

<script>import axios from "axios";
    import { mapState } from "vuex";

    export default {
        name: "User",
        data() {
            return {
                retourAPI: "",
                changePwd: {
                    newPassword: null,
                    RepeatNewPassword: null
                }
            };
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            //fonction pour supprimer le compte

            deleteAccount() {
                axios
                    .delete("http://localhost:3000/api/user/delete", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(() => {
                        localStorage.clear();
                        setTimeout(() => {
                            this.$router.push({ name: 'Login' });
                        }, 500);
                    })

                    .catch(error => console.log(error));
            },

            // fonction pour changer le mot de passe
            changePassword() {
                //Controle de la saisie du nouveau password
                //Controle de repeat et non null
                if (
                    this.changePwd.newPassword == this.changePwd.RepeatNewPassword &&
                    this.changePwd.newPassword != "" &&
                    this.changePwd.RepeatNewPassword != ""
                ) {
                    axios
                        .put(
                            "http://localhost:3000/api/user/update",
                            {
                                newPassword: this.changePwd.newPassword
                            },
                            {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            }
                        )
                        .then(response => {
                            console.log("pwd change", response);
                            document.getElementById("retour-api").classList.add("text-success");
                            this.retourAPI = response.data.confirmation;
                            setTimeout(() => {
                                this.retourAPI = "";
                                window.location.reload();
                            }, 2000);
                        })
                        .catch(err => {
                            console.log("admin", err);
                            this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
                        });
                } else {
                    document.getElementById("retour-api").classList.add("text-danger");
                    this.retourAPI = "Les mots de passe ne sont pas identiques ou ne respectent pas les conditions requises";
                }
            },
            // fonction pour tester les saisies de l'user dasn les inputs

            testInputs() {
                //6 caractères dont au minimum une majuscule, une minuscule et un chiffre

                const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
                let inputNewPwd = document.getElementById("InputNewPassword");
                let inputRepeatNewPwd = document.getElementById("RepeatInputNewPassword");
                inputNewPwd.addEventListener("input", function (e) {
                    let value = e.target.value;
                    let testValue = regexPassword.test(value);
                    if (testValue) {
                        inputNewPwd.style.backgroundColor = "#4CAF50";
                    } else {
                        inputNewPwd.style.backgroundColor = "#f44336";
                    }
                });
                inputRepeatNewPwd.addEventListener("input", function () {
                    if (
                        inputRepeatNewPwd.value == inputNewPwd.value &&
                        regexPassword.test(inputRepeatNewPwd.value)
                    ) {
                        inputRepeatNewPwd.style.backgroundColor = "#4CAF50";
                    } else {
                        inputRepeatNewPwd.style.backgroundColor = "#f44336";
                    }
                });
            }
        },
        // modifications seront effectuées lorsque la requête sera faite
        mounted() {
            this.$store.dispatch("getUserInfos");
        }
    };

</script>

<style scope>
    #information_title{
        position:relative;
        animation:none;
        bottom:0;
    }

    .modal-title {
        color: #000000 !important;
    }

    .form_modify_user label {
        color: #000000 !important;
    }
    #button_modify-user {
        width: 100%;
        margin-top: 20px;
    }

    .main-connect {
        background-color: #000000b8;
        border: 2px;
        border-style: double;
        border-color: #ffffff;
        border-radius: 40px;
        box-shadow: 0 0 7px 0;
    }

    .main_wrapp {
        padding-top: 15%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: right;
        width: 100%;
        height: 100vh;
    }

    #main_wrapp_user {
        background-image: url('../assets/bg_profile.jpg');
    }

    h1 {
        color: #ffffff;
        margin-top: 30px;
        text-align: center;
    }

    hr {
        border-width: 3px;
        border-color: #ffffff;
        width: 75%;
    }

    .user-info {
        color: #ffffff;
    }

    .title {
        font-weight: bold;
    }

    small {
        font-size: 0.9em;
    }
</style>