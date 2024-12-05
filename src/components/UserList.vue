<!-- Mobile Web App Assignment 3
Team : Abhirami Pradeep Susi (200589663), Aditya Chintha (200595829) -->

<template>
  <div :class="!showLimited ? 'userlist-container-main' : ''">
    <h1>User List</h1>

    <div class="user-list-container">
      <ul class="user-list">
        <!-- Show only the first 10 users if showLimited is true -->
        <li
          v-for="(user, index) in users.slice(
            0,
            showLimited ? 10 : users.length
          )"
          :key="index"
          class="user-card"
        >
          <div class="user-details">
            <h4>Name: {{ user.firstName }} {{ user.lastName }}</h4>
            <p>Email: {{ user.email }}</p>
          </div>
        </li>
      </ul>

      <!-- Display 'View More' link if showLimited is true and there are more than 10 users -->
      <router-link
        v-if="showLimited && users.length > 10"
        to="/users"
        class="view-more-link"
      >
        View More
      </router-link>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase"; // Importing db
import { collection, query, getDocs } from "firebase/firestore"; // Importing collection, query, and getdocs

export default {
  name: "UserList",
  props: {
    showLimited: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      users: [], // Holds the list of users fetched from Firestore
    };
  },
  methods: {
    // Fetch all user data from Firestore
    async fetchUsers() {
      try {
        const userQuery = query(collection(db, "users"));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userList = querySnapshot.docs.map((doc) => doc.data());
          this.users = userList;
        } else {
          console.log("No user data found in Firestore.");
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    },
  },
  mounted() {
    // Fetch users when the component is mounted
    this.fetchUsers();
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 30px;
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

.stickybar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0471f6;
  padding: 0 30px;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.stickybarContent {
  display: flex;
  align-items: center;
  gap: 30px;
  color: #ffffff;
}

.stickybar p {
  font-size: 12px;
}

.stickybar h1 {
  font-size: 20px;
}

.stickybar-icon {
  font-size: 20px;
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
  font-weight: 500;
  padding: 0 0 10px;
  color: #000000;
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
  text-align: left;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: scale(1.02);
}

.user-details h4 {
  margin: 0;
  font-size: 14px;
  color: #0e0f0f;
}

.user-details p {
  color: #555;
}

.user-profile-widget,
.flex-1,
.flex-2 {
  display: flex;
  margin-bottom: 20px;
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
  margin: 5rem;
  margin-top: 2rem;
  background-color: #f3f3f3;
  padding: 2rem;
  width: fit-content;
  border-radius: 5px;
}

.userlist-container-main,
.space-data-container {
  width: 80%; /* Full width */
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
