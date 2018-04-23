<template>
    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <!--<router-view/>-->
        <GoogleInput @searchEvent="getSearchLocation($event)"></GoogleInput>
        <GoogleMapsContainer :location="location" name="medicide-location-project"></GoogleMapsContainer>
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
                var self = this;
                //console.log("app.vue getSearchProps: " + input);
                if (this.location === '') {
                    console.log("this.location empty");
                    return false
                }
                console.log('not empty');
                // let geocoder = new google.maps.Geocoder();
                // let address = this.location;
                // geocoder.geocode({'address': address}, function (results, status) {
                //     //console.log("results: " + JSON.stringify(results), "status: " + status);
                //     self.latLong = results[0].geometry.location;
                //     console.log("latitude: ", self.latLong.lat());
                //     console.log("longitude: ", self.latLong.lng());
                // })

            },
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
