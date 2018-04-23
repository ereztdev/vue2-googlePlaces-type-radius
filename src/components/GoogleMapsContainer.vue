<template>
    <div class="map-container" :id="theMap"></div>
</template>

<script>
    export default {
        name: "GoogleMapsContainer",
        data() {
            return {
                theMap: "map-for-" + this.name,
                latLong: {
                    latitude: '',
                    longitude: ''
                },
            }
        },
        props: ['name', 'location'],
        methods: {
            decodeLatLong() {
                let geocoder = new google.maps.Geocoder();
                let theLocation = this.location;
                let latLong = this.latLong;
                return new Promise(function (resolve, reject) {
                    geocoder.geocode({'address': theLocation}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log("resolve(results)", resolve(results));
                            console.log(results[0].geometry.location.lat());
                            latLong.latitude = results[0].geometry.location.lat();
                            latLong.longitude = results[0].geometry.location.lng();
                        } else {
                            reject(status);
                        }
                    });
                    console.log('oh here');

                });
            },
            showMap(){
                let lat = this.latLong.latitude;
                let lng = this.latLong.longitude;

                const element = document.getElementById(this.theMap);
                const options = {
                    zoom: 7,
                    center: new google.maps.LatLng((lat ? lat : 54.35202520000001), (lng ? lng : 18.64663840000003))
                };
                const map = new google.maps.Map(element, options);
            }
        },


        mounted() {
            this.showMap();
        },
        updated(){
            console.log('updated');
        }

    }
</script>

<style scoped>
    .map-container {
        width: 80vw;
        margin: 5vh auto;
        height: 50vh;
        background: fuchsia;
        content: 'PLEASE BE PATIENT ON A SLOW CONNECTIONS';
    }
</style>