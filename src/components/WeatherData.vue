<template>
  <div :class="showLimited ? 'weather-widget-container' : 'weather-container'">
    <div class="weather-head">
      <h1>Weather</h1>
      <div :class="showLimited ? 'widgetInput' : 'widget-input-main'">
        <!-- Input -->
        <input
          type="text"
          placeholder="Enter your City"
          v-model="query"
          class="weather"
        />
        <!-- Search Button -->
        <button
          :class="showLimited ? 'nav-link' : 'nav-link-btn'"
          @click="fetchWeatherData"
        >
          Search
        </button>
      </div>
    </div>

    <p v-if="loading">Loading weather data...</p>

    <div v-else>
      <div v-if="weather">
        <!-- Displaying weather information from API -->
        <div class="weather-cards">
          <div class="widgetcard">
            <div class="widgetcardtwo">
              <img :src="weather.current.condition.icon" />
              <h2>{{ weather.current.temp_c }}°C</h2>
            </div>
            <p>{{ weather.current.condition.text }}</p>
            <p><b>Feels Like:</b> {{ weather.current.feelslike_c }}°C</p>
          </div>
          <div class="widgetcard">
            <p><b>City:</b> {{ weather.location.name }}</p>
            <p><b>Country:</b> {{ weather.location.country }}</p>
          </div>

          <div class="widgetcard">
            <p><b>Humidity:</b> {{ weather.current.humidity }}</p>
            <p><b>UV Index:</b> {{ weather.current.uv }}</p>
            <p><b>Wind mph:</b> {{ weather.current.wind_mph }}</p>
            <p><b>Wind kph:</b> {{ weather.current.wind_kph }}</p>
          </div>
        </div>

        <!-- Only show this section if not in limited view -->
        <div v-if="!showLimited" class="weather-cards">
          <div class="widgetcard">
            <p><b>Cloud:</b> {{ weather.current.cloud }}</p>
            <p><b>Precipitation:</b> {{ weather.current.precip_mm }} mm</p>
            <p><b>Wind:</b> {{ weather.current.wind_kph }} kph</p>
            <p><b>Wind Direction:</b> {{ weather.current.wind_dir }}</p>
          </div>
          <div class="widgetcard">
            <p><b>Dew point Celsius:</b> {{ weather.current.dewpoint_c }}°C</p>
            <p>
              <b>Dew point Fahrenheit:</b> {{ weather.current.dewpoint_f }}°F
            </p>
            <p>
              <b>Heat Index Celsius:</b> {{ weather.current.heatindex_c }}°C
            </p>
            <p>
              <b>Heat Index Fahrenheit:</b> {{ weather.current.heatindex_f }}°F
            </p>
          </div>
        </div>

        <p>Last Updated on: {{ weather.current.last_updated }}</p>
      </div>

      <p v-else>Failed to fetch data...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherData",
  props: {
    showLimited: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      weather: null, // Weather data
      loading: true, // Loading state
      query: "Toronto", // Default city
    };
  },
  methods: {
    // Fetch weather data from API
    async fetchWeatherData() {
      this.loading = true;
      const options = {
        method: "GET",
        url: `http://api.weatherapi.com/v1/current.json?key=e62123e264754e49aba172024242210&q=${this.query}`,
      };
      try {
        const response = await axios.request(options);
        console.log("Weather API response:", response.data);
        this.weather = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.weather = null;
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    // Watch for changes in the query and refetch data
    query() {
      this.fetchWeatherData();
    },
  },
  mounted() {
    // Fetch weather data on initial load
    this.fetchWeatherData();
  },
};
</script>

<style scoped>
.weather-container {
  background-color: #f3f3f3;
  padding: 2rem;
  width: 10%; /* Adjust width to make it more responsive */
  max-width: 900; /* Set a max width to avoid stretching on larger screens */
}

.weather-head {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allows content to wrap on smaller screens */
}

.weather-head > h1 {
  margin-right: 10px; /* Adjust for small screens */
  color: #f66e04;
  font-size: 1.8rem; /* Adjust font size for better scaling */
}

.widgetInput {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  height: fit-content;
}

.widget-input-main {
  display: flex;
  flex-direction: row;
  height: fit-content;
}

.nav-link,
.nav-link-btn {
  text-decoration: none;
  color: #fff;
  padding: 8px 12px;
  background-color: #0471f6;
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  flex: 1;
  margin: 5px; /* Added margin to improve spacing between buttons */
}

.nav-link:hover,
.nav-link-btn:hover {
  background-color: #e5f1ff;
  color: #ffffff;
}

.weather-cards {
  display: flex;
  gap: 10px; /* Space between cards */
}

.widgetcard {
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  width: 100%; /* Full width */
}

.widgetcardtwo {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space between items for better alignment */
}

/* Responsive design for mobile devices */
@media screen and (max-width: 600px) {
  .weather-cards {
    flex-direction: column;
  }
  .weather-container {
    width: 100%; /* Take full width of the screen */
    padding: 1rem;
  }

  .weather-head > h1 {
    font-size: 1.5rem; /* Smaller heading on mobile */
    margin-right: 0;
    margin-bottom: 1rem; /* Add margin for spacing */
  }
  .weather-head {
    flex-direction: column;
  }
  .nav-link,
  .nav-link-btn {
    font-size: 12px;
    padding: 8px;
    flex: 1; /* Links take full width */
  }

  .weather-cards {
    flex-direction: column; /* Stack cards vertically */
    width: 100%;
  }

  .widgetcard {
    width: 100%; /* Full width for cards on mobile */
  }
}

/* Tablet responsiveness */
@media screen and (min-width: 601px) and (max-width: 900px) {
  .weather-container {
    width: 95%; /* Slightly wider on tablet */
    padding: 2rem;
  }
  .weather-cards {
    flex-direction: column;
    width: 100%;
  }
  .weather-head {
    flex-direction: column;
  }
  .widgetInput {
    width: fit-content;
    margin-left: 50px;
  }
  .weather-head > h1 {
    font-size: 1.6rem;
    margin-right: 10px;
  }

  .nav-link,
  .nav-link-btn {
    font-size: 13px;
    padding: 10px;
  }
}

/* Larger screens */
@media screen and (min-width: 901px) {
  .weather-container {
    width: 80%;
    margin: 2rem auto;
  }

  .weather-head > h1 {
    font-size: 1.8rem;
  }
}
</style>
