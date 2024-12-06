<!-- Mobile Web App Assignment 3
Team : Abhirami Pradeep Susi (200589663), Aditya Chintha (200595829) -->
<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <!-- First Name Input -->
      <div class="input-container">
        <input
          type="text"
          v-model="firstName"
          @input="clearError('firstNameError')"
          placeholder="First Name"
          :class="firstNameError ? 'input-field input-error' : 'input-field'"
        />
        <p v-if="firstNameError" class="error-text">{{ firstNameError }}</p>
      </div>

      <!-- Last Name Input -->
      <div class="input-container">
        <input
          type="text"
          v-model="lastName"
          @input="clearError('lastNameError')"
          placeholder="Last Name"
          :class="lastNameError ? 'input-field input-error' : 'input-field'"
        />
        <p v-if="lastNameError" class="error-text">{{ lastNameError }}</p>
      </div>

      <!-- Email Input -->
      <div class="input-container">
        <input
          type="email"
          v-model="email"
          @input="clearError('emailError')"
          placeholder="Email"
          :class="emailError ? 'input-field input-error' : 'input-field'"
        />
        <p v-if="emailError" class="error-text">{{ emailError }}</p>
      </div>

      <!-- Password Input -->
      <div class="input-container">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          @input="clearError('passwordError')"
          placeholder="Password"
          :class="passwordError ? 'input-field input-error' : 'input-field'"
        />
        <span class="password-toggle" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
        <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Register</button>
    </form>

    <!-- Link to Login -->
    <div class="login">
      Already registered? <router-link to="/">Login</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "../firebase"; // Firebase setup
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "RegisterPage",
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const firstNameError = ref("");
    const lastNameError = ref("");
    const emailError = ref("");
    const passwordError = ref("");
    const router = useRouter();

    const clearError = (field) => {
      if (field === "firstNameError") firstNameError.value = "";
      if (field === "lastNameError") lastNameError.value = "";
      if (field === "emailError") emailError.value = "";
      if (field === "passwordError") passwordError.value = "";
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validateInputs = () => {
      let isValid = true;

      if (!firstName.value) {
        firstNameError.value = "First name is required.";
        isValid = false;
      }

      if (!lastName.value) {
        lastNameError.value = "Last name is required.";
        isValid = false;
      }

      if (!email.value) {
        emailError.value = "Email is required.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Please enter a valid email.";
        isValid = false;
      }

      if (!password.value) {
        passwordError.value = "Password is required.";
        isValid = false;
      } else if (password.value.length < 6) {
        passwordError.value = "Password must be at least 6 characters long.";
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateInputs()) return;

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        // Save user data to Firestore
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: user.email,
          firstName: firstName.value,
          lastName: lastName.value,
        });

        alert("User Registered Successfully!");
        router.push("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already in use.");
        } else if (error.code === "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(error.message);
        }
      }
    };

    return {
      firstName,
      lastName,
      email,
      password,
      showPassword,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      togglePasswordVisibility,
      handleSubmit,
      clearError,
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
