<template>
    <div class="col-10 offset-1 col-md-6 offset-md-3">
        <div class="card mb-4 mx-auto">
            <div class="row">

                <!--On the left side-->
                <div class="col-md-6">

                    <!--HEADER Posted by & options dropdown-->
                    <div class="card-header d-flex justify-content-between">
                        <div> Merci à <strong class="post_info">{{post.User.username}}</strong> pour sa contribution le <strong class="post_info">{{post.createdAt}}</strong> ~</div>
                        <div class="dropdown" v-if="user.isAdmin==true || user.username == post.User.username">
                            <svg class="bi bi-three-dots dropdown-toggle" id="dropdownMenuPost" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                 width="1.2em" height="1.2em" viewBox="0 0 15 15" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuPost">
                                <button class="dropdown-item modifPost"
                                        data-toggle="modal"
                                        data-target="#modalEditPost"
                                        type="button"
                                        @click="emitInfoPost();changeEditStyle('modify');">
                                    Modifier
                                </button>
                                <button class="dropdown-item deletePost"
                                        data-toggle="modal"
                                        data-target="#modalEditPost"
                                        type="button"
                                        @click="emitInfoPost();changeEditStyle('delete');">
                                    Supprimer le post
                                </button>
                            </div>
                        </div>
                    </div>

                    <!--THE TEXT is displayed here-->
                    <div class="card-text p-4 text-justify" id="text_article" v-if="post.content!=='null'">
                        <p class="mb-0">  {{post.content}}  </p>
                    </div>
                </div>

                <!--On the right side-->
                <div class="col-md-6">

                    <!--IMAGE Displayed on the right-->
                    <div class="card-body">
                        <div class="card-img-top mx-auto" v-if="post.attachement">
                            <img :src="post.attachement" alt="..." class="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>// import de la bibliothèque vuex

    import { mapState } from "vuex";

    export default {
        name: "Post",
        components: {},
        data() {
            return {};
        },
        computed: {
            ...mapState(["user", "editOption"])
        },
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        methods: {
            //création de fonction pour modifier ou supprimer le post
            emitInfoPost() {
                this.$emit("infosPost", { post: this.post });
            },
            changeEditStyle(value) {
                this.$store.dispatch("changeEditStyle", value);
            }
        }
    };</script>

<style>
    body {
        background-image: linear-gradient(to bottom, #a7c4e2, transparent);
    }

    #text_article {
        height: 50%;
        background-image: linear-gradient(to bottom, #c1c1c1, transparent);
    }

    .card {
        border: rgb(24, 10, 95) 1px solid !important;
        border-radius: 40px;
        box-shadow: #000000 0px 0px 14px 0px;
    }

    .card-img-top img {
        border-radius: 40px;
        box-shadow: #000000 0px 0px 7px 0px;
    }

    .post_info {
        color: #ffffff;
    }

    .card-header {
        background-color: rgba(167, 162, 162, 0.658);
        border-radius: 40px 0px 0 0 !important;
    }
</style>