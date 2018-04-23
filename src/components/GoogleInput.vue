<template>
    <div class="search-wrapper">
        <div id="google-map"></div>
        <input
                ref="input"
                id="search-input"
                type="text"
                placeholder="Search Location.."
                @keypress.enter="submitHandler"
        />
        <button
                id="search-button"
                v-on:click="submitHandler"
        >Search
        </button>
    </div>
</template>

<script>
    export default {
        name: "GoogleInput",
        data() {
            return {
                location: ''
            }
        },
        methods: {
            submitHandler: function (ev) {
                let searchValue = '';
                if (ev.target.id === 'search-input') {
                    searchValue = ev.target.value;
                } else if (ev.target.id === 'search-button') {
                    searchValue = document.getElementById('search-input').value;
                }
                this.location = searchValue;
                this.$emit('searchEvent', searchValue);
                //this.decodeLatLong();
            },

            decodeLatLong() {
                if (this.location === '') {
                    console.log("this.location empty");
                    return false
                }
                console.log('not empty');
                let geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': this.location}, function (results, status) {
                    console.log("THE LOCATION: " + results[0].geometry.location);
                    this.latLong = results[0].geometry.location;

                });
            },
        },
        mounted() {
            $('input').geocomplete({
                map: '#google-map'
            })
        }
    }
</script>

<style scoped>
    .search-wrapper {
        display: block;
    }

    input {
        width: 60%;
        font-size: 45px;
        line-height: 50px;
        margin: 0 auto;
    }

    #search-button {
        width: 20%;
        font-size: 45px;
        line-height: 50px;
        margin: 0 auto;
    }
</style>