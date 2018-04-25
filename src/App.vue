<template>
    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <!--<router-view/>-->
        <GoogleInput></GoogleInput>
        <GoogleMapsContainer name="medicide-location-project"></GoogleMapsContainer>
    </div>
</template>

<script>
    import GoogleMapsContainer from "./components/GoogleMapsContainer";
    import GoogleInput from "./components/GoogleInput";

    export default {
        name: 'App',
        components: {GoogleInput, GoogleMapsContainer},
        data() {
            return {
                location: '',
            }
        },
        methods: {
            getSearchLocation(input) {
                this.location = input;
                let self = this;
                if (this.location === '') {
                    console.log("this.location empty");
                    return false
                }
            },
        },
        mounted(){

        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
