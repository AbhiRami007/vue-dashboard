<template>
    <div class="dashboard-container">

      <div class="banner">
        <div class="banner-left">
          <div class="bannertext">
            <h2 class="title">
              {{ userData ? `Hello, ${userData.firstName} ${userData.lastName}!` : "Hello!" }}
            </h2>
            <h2 class="subtitle">Welcome to your Dashboard..</h2>
          </div>
        </div>
      </div>

      <div className="widgets-container">
        <div className="flex-1">
          <div className="widget" id="widget-1">
            <UserProfile />
          </div>
          <div className="widget" id="widget-3">
            <WeatherData showLimited={true} />
          </div>
        </div>
        <div className="flex-2">
          <div className="widget" id="widget-2">
            <UserList showLimited={true} />
          </div>
          <div className="widget" id="widget-4">
            <NewsData showLimited={true} />
          </div>
          <div className="widget" id="widget-5">
            <SpaceStationData showLimited={true} />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
  import UserProfile from "./UserProfile.vue";
import NewsData from "./NewsData.vue";
import WeatherData from "./WeatherData.vue";
import UserList from "./UserList.vue";
import SpaceStationData from "./SpaceStationData.vue";
  
  export default {
    name: "DashboardPage",
    components: {
      UserProfile,
      NewsData,
      WeatherData,
      UserList,
      SpaceStationData
    },
    setup() {
      const user = ref(null);
      const userData = ref(null);
      const loading = ref(true);
  
      const db = getFirestore();
  
      onMounted(async () => {
        const storedUser = localStorage.getItem("user");
  
        if (storedUser) {
          user.value = JSON.parse(storedUser);
  
          const fetchUserData = async () => {
            try {
              const userQuery = query(
                collection(db, "users"),
                where("email", "==", user.value.email)
              );
              const querySnapshot = await getDocs(userQuery);
              if (!querySnapshot.empty) {
                userData.value = querySnapshot.docs[0].data();
              } else {
                console.log("No user data found in Firestore.");
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            } finally {
              loading.value = false;
            }
          };
  
          fetchUserData();
        } else {
          loading.value = false;
        }
      });
  
      return {
        userData,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
  padding-top: 30px;
  margin: 0;
}

.title {
  text-align: left;
  font-size: 24px; /* Larger title for better visibility */
}

.subtitle {
  text-align: left;
  font-size: 18px;
  font-weight: 400;
}


.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.weather {
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #595959;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 300px; /* Limit width on larger screens */
}

.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
}

.bannertext {
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navigation {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.weather {
  margin-left: 5rem;
}

.nav-linktwo {
  text-decoration: none;
  color: #000;
  padding: 8px 12px;
  background-color: #e8e8e8;
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
}

.nav-linktwo:hover {
  background-color: #0471f6;
  color: #ffffff;
}

.widgets-container {
  display: flex;
  flex-direction: column; /* Default to column for smaller screens */
  gap: 20px; /* Space between widgets */
}

.widget {
  background-color: #f3f3f3;
  border-radius: 8px;
  text-align: left;
  padding: 20px;
  margin: 0; /* Remove margin for better fit on small screens */
  width: 100%; /* Full width for responsiveness */
}

.widgetcardSpace {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  text-align: left;
  margin-bottom: 20px;
}

.widgetcardSpace h3,
.widgetcardSpace h1 {
  font-size: 16px;
  padding: 0;
  color: #000;
}

.widget p {
  font-size: 14px;
  font-weight: 400;
  color: #595959;
}

.widget b {
  font-size: 14px;
  font-weight: 600;
  color: black;
}

h3 {
  font-size: 16px;
}

.widget h1 {
  font-size: 22px;
  font-weight: 800;
  padding: 0 0 10px;
  color: #f66e04;
}

.widget h2 {
  font-size: 30px;
  font-weight: 800;
  padding: 0;
  color: #0471f6;
}

.user-list-text {
  color: #000;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: scale(1.02);
}

.user-details h4 {
  margin: 0;
  font-size: 14px;
  color: #007bff;
}

.user-details p {
  color: #555;
}

.user-profile-widget,
.flex-1,
.flex-2 {
  display: flex;
  padding: 1rem;
  gap: 10px;
}

.user-profile-widget {
  height: 12rem;
}

#widget-1 {
  width: 40%;
  height: fit-content;
}

#widget-3 {
  width: 60%;
}

.news-data-container,
.userlist-container-main,
.space-data-container {
  background-color: #f3f3f3;
  padding: 2rem;
  width: fit-content;
  margin-left: 20%;
}

.userlist-container-main,
.space-data-container {
  width: 50%; /* Full width */
}

.news-data-container > h1,
.userlist-container-main > h1,
.space-data-container > h1 {
  color: #f66e04;
  text-align: center;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .banner {
    flex-direction: column; /* Stack banner items */
    align-items: center;
    width: 100%; /* Full width */
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .navigation {
    flex-direction: column; /* Stack navigation items */
    width: 100%; /* Full width for smaller screens */
  }

  .widgets-container {
    flex-direction: column; /* Stack widgets vertically */
  }
  .user-profile-widget,
  .flex-1,
  .flex-2 {
    flex-direction: column;
    margin-bottom: 20px;
    padding: 1rem;
    gap: 10px;
  }
  .flex-1 {
    flex: 1;
  }
  #widget-1 {
    width: 100%;
  }
  #widget-3 {
    width: 100%;
  }
  .user-profile-widget {
    height: fit-content;
  }

  .widget {
    width: 100%; /* Full width for widgets */
    margin: 0; /* Remove side margins */
  }

  .widget h2 {
    font-size: 20px; /* Adjust heading size */
  }

  .user-profile-widget {
    flex-direction: column; /* Stack user profile widget items */
  }

  .news-data-container,
  .userlist-container-main,
  .space-data-container {
    width: 90%; /* Adjust container width */
    margin-left: auto; /* Center align */
    margin-right: auto; /* Center align */
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 20px; /* Smaller title for small screens */
  }

  .subtitle {
    font-size: 16px; /* Smaller subtitle for small screens */
  }

  .widget h1 {
    font-size: 16px; /* Adjust widget title size */
  }

  .widget h2 {
    font-size: 18px; /* Adjust widget subtitle size */
  }
}

  </style>
  