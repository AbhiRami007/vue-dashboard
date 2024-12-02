<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LogoutPage",
  setup() {
    const router = useRouter();

    // Clear user data and redirect
    onMounted(() => {
      // Clear the user data from localStorage
      localStorage.removeItem("user");

      // Redirect to the login page
      router.push("/");
    });

    return {};
  },
};
</script>

<template>
  <!-- No UI needed for logout -->
  <div></div>
</template>
