<template>
  <div class="register-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          :class="emailError ? 'input-field input-error' : 'input-field'"
        />
        <p v-if="emailError" class="error-text">{{ emailError }}</p>
      </div>

      <div class="input-container">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          :class="passwordError ? 'input-field input-error' : 'input-field'"
        />
        <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
      </div>

      <button type="submit" class="submit-button">Login</button>
    </form>
    <div>
      Not yet registered? <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const router = useRouter();

    // Check if user is already logged in using localStorage
    onMounted(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        router.push("/dashboard"); // Redirect to dashboard if user is already logged in
      }
    });

    const handleSubmit = async () => {
      // Reset error messages
      emailError.value = "";
      passwordError.value = "";

      // Basic input validation
      let isValid = true;

      // Email validation
      if (!email.value) {
        emailError.value = "Email is required.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Please enter a valid email.";
        isValid = false;
      }

      // Password validation
      if (!password.value) {
        passwordError.value = "Password is required.";
        isValid = false;
      } else if (password.value.length < 6) {
        passwordError.value = "Password must be at least 6 characters long.";
        isValid = false;
      }

      if (!isValid) return;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        // Store user data in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
          })
        );

        // Navigate to the dashboard after successful login
        router.push("/dashboard");
      } catch (error) {
        alert("Invalid email or password. Please try again.");
      }
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.App {
  text-align: center;
}

/* Container for the register form */
.register-container {
  width: 100%;
  max-width: 500px;
  margin: 50px auto; /* Center the container on all screen sizes */
  padding: 40px;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, 0.2); /* Fixed rgba syntax */
}

/* Input container for email and password fields */
.input-container {
  position: relative;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1em;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.input-field:focus {
  outline: none;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2); /* Focus effect */
}

/* Error text styling */
.error-text {
  color: #e31010;
  font-size: 0.9em;
  margin-top: 5px;
  text-align: left;
}

/* Submit button styling */
.submit-button {
  width: 100%;
  padding: 12px;
  margin-bottom: 50px;
  font-size: 1.1em;
  background-color: #f60404;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background-color: #e5f1ff;
  transform: translateY(-2px); /* Subtle hover effect */
}

/* Password input and toggle icon */
.password-input {
  display: flex;
  align-items: center;
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%; /* Adjusted to center vertically */
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #f60404;
}

.password-toggle:hover {
  color: #e5f1ff; /* Highlight on hover */
}

/* Link styling */
a {
  color: #f60404;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #e5f1ff;
}

/* Mobile responsiveness */
@media screen and (max-width: 600px) {
  .register-container {
    width: 70%;
    margin: 50px auto; /* Center the container on all screen sizes */
    padding: 40px;
  }

  .input-field {
    font-size: 0.9em;
    padding: 10px; /* Adjusted padding */
  }

  .submit-button {
    font-size: 1em;
    padding: 10px;
  }

  .password-toggle {
    font-size: 1.1em;
  }
}

/* Tablets and medium screens */
@media screen and (min-width: 600px) and (max-width: 900px) {
  .register-container {
    max-width: 400px;
    padding: 30px;
  }

  .input-field {
    font-size: 1em;
    padding: 12px;
  }

  .submit-button {
    font-size: 1.05em;
    padding: 12px;
  }

  .password-toggle {
    font-size: 1.2em;
  }
}

/* Larger screens */
@media screen and (min-width: 900px) {
  .register-container {
    max-width: 600px;
    padding: 50px;
  }

  .input-field {
    font-size: 1.1em;
    padding: 14px;
  }

  .submit-button {
    font-size: 1.2em;
    padding: 14px;
  }

  .password-toggle {
    font-size: 1.3em;
  }
}
</style>
