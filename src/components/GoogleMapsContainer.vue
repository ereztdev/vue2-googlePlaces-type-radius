<template>
    <div class="map-container" :id="theMap"></div>
</template>
<script>
    import {Bus} from "../main";

    export default {
        name: "GoogleMapsContainer",
        data() {
            return {
                theMap: "map-for-" + this.name,
                location: '',
                latLong: {
                    latitude: 39.5,
                    longitude: -72
                },
                zoom: 16
            }
        },
        props: {
            name,
        },
        methods: {
            showMap() {
                this.map = new google.maps.Map(document.getElementById(this.theMap), {
                    center: {lat: this.latLong.latitude, lng: this.latLong.longitude},
                    zoom: this.zoom
                });
            },
            geoDecoding() {
                let geocoder = new google.maps.Geocoder();
                let theLocation = this.location;
                let latLong = this.latLong;
                self = this;

                return new Promise(function (resolve, reject) {
                    geocoder.geocode({'address': (theLocation ? theLocation : 'canada')}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            latLong.latitude = results[0].geometry.location.lat();
                            latLong.longitude = results[0].geometry.location.lng();
                            let myLatlng = new google.maps.LatLng(latLong.latitude, latLong.longitude);
                            self.map.panTo(myLatlng);
                        } else {
                            reject(status);
                        }
                    });
                });
            }
        },
        mounted() {
            //this.geoDecoding();
            this.showMap();
        },
        created() {
            //this.showMap();
            //this.geoDecoding();
            Bus.$on('passLocation', (input) => {
                this.location = input;
                this.geoDecoding();
            });
        },


    }
</script>

<style scoped>
    .map-container {
        width: 80vw;
        margin: 5vh auto;
        height: 50vh;
        background: fuchsia;
    }
</style>