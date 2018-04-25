<template>
    <div class="search-wrapper">
        <div id="google-map"></div>
        <input
                id="search-input"
                type="text"
                placeholder="Search Location"
                @keypress.enter="falsify"
        />
        <input
                id="interest-input"
                type="text"
                placeholder="Type Point of Interest"
                @keypress.enter="falsify"
        />
        <input
                id="radius-input"
                type="number"
                placeholder="What Radius of Search"
                @keypress.enter="falsify"
        />
        <br/>
        <button
                id="search-button"
                @click="submitHandler"
        >Search
        </button>
    </div>
</template>

<script>
    import {Bus} from "../main";

    export default {
        name: "GoogleInput",
        data() {
            return {
                location: ''
            }
        },

        methods: {
            falsify() {
                return false;
            },
            submitHandler: function (ev) {
                this.location = $('#search-input').val();
                this.interest = $('#interest-input').val();
                this.radius = $('#radius-input').val();

                Bus.$emit('passLocation', this.location);
                Bus.$emit('passInterest', this.interest);
                Bus.$emit('passRadius', this.radius);

            },
        },
        mounted() {
            $('#search-input').geocomplete();
        }
    }
</script>

<style scoped>
    .search-wrapper {
        display: block;
    }

    input {
        /*width: 60%;*/
        font-size: 45px;
        line-height: 50px;
        margin: 0 auto;
    }

    #search-button {
        /*width: 20%;*/
        font-size: 45px;
        line-height: 50px;
        margin: 0 auto;
    }
</style>