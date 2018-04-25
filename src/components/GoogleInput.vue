<template>
    <div class="search-wrapper" v-bind:class="{ hide: searched }">
        <!--<div id="google-map"></div>-->
        <input
                id="search-input"
                type="text"
                placeholder="Search Location"
                @keypress.enter="falsify"
        />
        <select multiple id="interest-input"></select>
        <input
                id="radius-input"
                step=100
                type="number"
                placeholder="Radius of Search in Meters"
                @keypress.enter="falsify"
        />
        <br/>
        <button
                id="search-button"
                @click="submitHandler"
        >Search
        </button>
        <h3>error:{{errorType}}</h3>
    </div>
</template>

<script>
    import {Bus} from "../main";

    export default {
        name: "GoogleInput",
        data() {
            return {
                location: '',
                errorType: '',
                formErrors: {
                    location: 'Please Enter a location to search',
                    interest: 'You need to have at least one interest for this search',
                    radius: 'You have to set a radius'
                },
                searched: false
            }
        },
        computed: {
            falsify() {
                return false;
            },
        },

        methods: {
            validation() {
                //let errorType = undefined;
                let formValidity = true;

                if (!this.location) {
                    formValidity = false;
                    this.errorType = this.formErrors.location
                }else if(!this.interest){
                    formValidity = false;
                    this.errorType = this.formErrors.interest
                }else if(!this.radius){
                    formValidity = false;
                    this.errorType = this.formErrors.radius
                }else{
                    return true;
                }

            },
            submitHandler() {
                this.location = $('#search-input').val();
                this.interest = $('#interest-input').val();
                this.radius = $('#radius-input').val();
                
                if (this.validation()) {

                    this.searched = true;
                    // this.speak();


                    if (!(this.location || this.interest || this.radius)) {

                    }
                    Bus.$emit('passLocation', this.location);
                    Bus.$emit('passInterest', this.interest);
                    Bus.$emit('passRadius', this.radius);
                    Bus.$emit('passSearched', this.searched);
                }
            },
            populateTypes() {
                let gTypes = [
                    'accounting',
                    'airport',
                    'amusement_park',
                    'aquarium',
                    'art_gallery',
                    'atm',
                    'bakery',
                    'bank',
                    'bar',
                    'beauty_salon',
                    'bicycle_store',
                    'book_store',
                    'bowling_alley',
                    'bus_station',
                    'cafe',
                    'campground',
                    'car_dealer',
                    'car_rental',
                    'car_repair',
                    'car_wash',
                    'casino',
                    'cemetery',
                    'church',
                    'city_hall',
                    'clothing_store',
                    'convenience_store',
                    'courthouse',
                    'dentist',
                    'department_store',
                    'doctor',
                    'electrician',
                    'electronics_store',
                    'embassy',
                    'fire_station',
                    'florist',
                    'funeral_home',
                    'furniture_store',
                    'gas_station',
                    'grocery_or_supermarket',
                    'gym',
                    'hair_care',
                    'hardware_store',
                    'hindu_temple',
                    'home_goods_store',
                    'hospital',
                    'insurance_agency',
                    'jewelry_store',
                    'laundry',
                    'lawyer',
                    'library',
                    'liquor_store',
                    'local_government_office',
                    'locksmith',
                    'lodging',
                    'meal_delivery',
                    'meal_takeaway',
                    'mosque',
                    'movie_rental',
                    'movie_theater',
                    'moving_company',
                    'museum',
                    'night_club',
                    'painter',
                    'park',
                    'parking',
                    'pet_store',
                    'pharmacy',
                    'physiotherapist',
                    'plumber',
                    'police',
                    'post_office',
                    'real_estate_agency',
                    'restaurant',
                    'roofing_contractor',
                    'rv_park',
                    'school',
                    'shoe_store',
                    'shopping_mall',
                    'spa',
                    'stadium',
                    'storage',
                    'store',
                    'subway_station',
                    'synagogue',
                    'taxi_stand',
                    'train_station',
                    'travel_agency',
                    'university',
                    'veterinary_care',
                    'zoo'
                ];
                let i;
                for (i = 0; i < gTypes.length; i++) {
                    document.getElementById("interest-input").innerHTML += '<option id="optionNumber-' + i + '">' +
                        '' + gTypes[i].replace('_', ' ') +
                        '</option>';
                }
            },
            

            speak() {
                responsiveVoice.speak(
                    "Your search for " +
                    this.interest +
                    ' in '
                    + this.location +
                    ' with a radius of ' +
                    this.radius +
                    ' meters will appear above. Feel Free to reload this page and search again!'
                );

            },
        },
        mounted() {
            $('#search-input').geocomplete();
            this.populateTypes();

        },
    }
</script>

<style scoped>
    .search-wrapper {
        /*display: none;*/
        /*height: 50vh;*/
        display: inline-block;
        text-align: center;
        margin: 25px auto;
    }

    input, #search-button, select {
        font-size: 25px;
        line-height: 35.5px;
        width: 100%;
        border-radius: 5px;
    }

    input, select {
        padding-left: 10px;
        border: #44c6c5 1px solid;
        box-sizing: border-box;
        margin: 5px auto;

    }

    #search-button {
        background: #1d1d1d;
        color: white;
        font-weight: 900;
        border: none;
    }

    .hide {
        display: none !important;
    }
</style>