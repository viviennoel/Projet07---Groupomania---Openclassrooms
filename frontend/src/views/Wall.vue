<template>
    <div id="wall" class="wall">
        <CreatePost />
        <Post v-for="post in allPosts" v-bind:key="post.id" :post="post" @infosPost="setInfos" />
        <modalBoxModerate :post="post" />
    </div>
</template>

<script>import axios from "axios";
    import CreatePost from "../components/CreatePost";
    import Post from "../components/Post";
    import modalBoxModerate from "../components/ModifPost";

    export default {
        name: "Wall",
        components: {
            CreatePost,
            Post,
            modalBoxModerate
        },
        data() {
            return {
                post: {
                    id: "",
                    content: "",
                    image: ""
                },
                allPosts: []

            };
        },
        methods: {
            setInfos(payload) {
                this.post = payload.post;
            }
        },
        mounted() {
            axios
                .get("http://localhost:3000/api/post", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                //.get("http://localhost:3000/api/post",this.$store.state.headerParams)
                .then(response => {
                    console.log("post", response.data);
                    this.allPosts = response.data;
                })
                .catch(error => {
                    console.log(error); //affiche pas le message 'normalement' envoyé par le back
                }),
                this.$store.dispatch("getUserInfos");
        }
    };</script>

<style scope>
    .wall {
        margin: auto;
        padding-top: 20%;
        background-image: url('../assets/bg_post.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 2px 2px 2px #000000;
        background-position: right;
        width: 100vw;
        height: 100vh;
    }

    .block-post {
        background-color: #ffffff8c;
        width: 50%;
        margin: auto;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
        border-radius: 0.25rem;
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
</style>