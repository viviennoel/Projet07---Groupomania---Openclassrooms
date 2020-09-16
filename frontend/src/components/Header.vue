<template>

    <nav class="row p-5" id="menu_home">
        <div class="col-6">
            <img class="imglogo" src="../assets/icon-left-font-monochrome-black1.png" alt="Logo Groupomania" />
        </div>
        <div class="col-6 text-right">
            <div class="btn-group">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Mon espace
                </button>
                <div class="dropdown-menu">
                    <ul class="navbar-nav mt-2">

                        <li class="nav-item " v-if="user.token !== null">
                            <router-link class="nav-link " to="/wall">Foire aux articles</router-link>
                        </li>
                        <li class="nav-item" v-if="user.token == null">
                            <router-link class="nav-link" to="/signup">Créer un compte</router-link>
                        </li>
                        <li class="nav-item" v-if="user.token == null">
                            <router-link class="nav-link" to="/login">Se connecter</router-link>
                        </li>
                        <li class="nav-item  " v-if="user.token !== null">
                            <router-link class="nav-link" to="/user">Profile de {{ user.username }}</router-link>
                        </li>
                        <li class="nav-item mt-2" v-if="user.token !== null">
                            <button type="button" class="btn btn-secondary" id="button__disconnect" @click="disconnect">Déconnexion</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </nav>

</template>

<script>import { mapState } from "vuex";

    export default {
        computed: {
            ...mapState(["user"])
        },
        methods: {
            disconnect() {
                localStorage.clear();
                setTimeout(() => {
                    this.$router.push({ path: '/login' })
                    window.location.reload();
                }, 500);

            }
        }
    };</script>

<style>
    #button__disconnect {
        width: 100%;
    }

    nav {
        position: absolute;
        top: 0;
        width: 100%;
    }

    .imglogo {
        width: 40%;
    }

    .btn {
        color: white;
    }

        .btn:hover {
            color: white;
        }

    .navbar-toggler {
        margin-left: 90%;
    }

    .nav-link {
        padding-left: 10px !important;
        padding-bottom: 10px;
        color: #000000;
        text-align: left;
    }

    .navbar-link {
        height: 50px;
        min-height: 40px
    }
</style>