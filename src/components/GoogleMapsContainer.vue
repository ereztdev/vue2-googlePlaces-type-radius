<template>
    <div class="map-container" :id="theMap"></div>
</template>

<script>
    import { Bus } from "../main";

    export default {
        name: "GoogleMapsContainer",
        data() {
            return {
                theMap: "map-for-" + this.name,
                location: {
                    type: String,
                    default: function () {
                        return 'Israel'
                    }
                },
                latLong: {
                    latitude: '',
                    longitude: ''
                },
            }
        },
        props: {
            name,
            'latitude': {
                type: Number,
                default: function () {
                    return 39.50
                }
            },
            'longitude': {
                type: Number,
                default: function () {
                    return -98.35
                }
            },
            'zoom': {
                type: Number,
                default: function () {
                    return 4
                }
            }
        },
        methods: {
            showMap() {
                this.map = new google.maps.Map(document.getElementById(this.theMap), {
                    center: {lat: this.latitude, lng: this.longitude},
                    zoom: this.zoom
                });
            },
            geoDecoding() {
                let geocoder = new google.maps.Geocoder();
                let theLocation = this.location;
                let latLong = this.latLong;
                console.log(theLocation.default());

                // if (theLocation) {
                    return new Promise(function (resolve, reject) {
                        geocoder.geocode({'address': theLocation.default()}, function (results, status) {
                            console.log(results);
                            if (status === google.maps.GeocoderStatus.OK) {
                                console.log("resolve(results)", resolve(results));
                                console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                latLong.latitude = results[0].geometry.location.lat();
                                latLong.longitude = results[0].geometry.location.lng();
                            } else {
                                reject(status);
                            }
                        });
                        console.log('oh here');
                    });
                // }
            }
        },
        mounted() {
            this.showMap();
        },
        created() {
            Bus.$on('passLocation', (input) => {
                this.location = input;
            });
            this.geoDecoding();
        },


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