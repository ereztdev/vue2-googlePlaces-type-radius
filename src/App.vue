<template>

    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <!--<router-view/>-->
        <InfoWindow></InfoWindow>
        <GoogleInput></GoogleInput>
        <GoogleMapsContainer name="googlePlaces-location-project"></GoogleMapsContainer>
    </div>

</template>

<script>
    import GoogleMapsContainer from "./components/GoogleMapsContainer";
    import GoogleInput from "./components/GoogleInput";
    import InfoWindow from "./components/InfoWindow";

    export default {
        name: 'App',
        components: {InfoWindow, GoogleInput, GoogleMapsContainer},
        data() {
            return {
                location: '',
            }
        },
        methods: {        },
        mounted() {
        }
    }
</script>

<style>
    body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
