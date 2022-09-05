<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20 lg:py-0"
  >
    <div
      class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-green-500 md:text-2xl"
        >
          Create your account...
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="signUpUser">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Your email</label
            >
            <input
              type="text"
              name="email"
              v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@email.com"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="New Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <p v-if="errorMsg" class="text-red-500 text-center">{{ errorMsg }}</p>
          <button
            type="submit"
            class="w-full text-white bg-green-500 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200 ease-in-out"
          >
            Create account
          </button>
          <p class="text-sm font-light text-gray-500">
            Already have an account?
            <router-link
              :to="{ name: 'sign-in' }"
              class="font-medium text-primary-600 hover:underline"
              >Sign in</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "@/main";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMsg: null,
    };
  },
  methods: {
    async signUpUser() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(({ user }) => {
          this.email = "";
          this.password = "";

          setDoc(doc(db, "users", user.uid), {
            email: user.email,
            id: user.uid,
            createdAt: Timestamp.now(),
          }).then(() => {
            const localList = JSON.parse(localStorage.getItem("mylist"));

            if (localList)
              setDoc(doc(db, "user-movie-list", user.uid), {
                list: localList,
              });
            this.$router.replace("/");
          });
        })
        .catch((err) => {
          this.password = "";
          switch (err.code) {
            case "auth/email-already-exists":
            case "auth/email-already-in-use":
              this.errorMsg =
                "This email is already exist, please try another email.";
              break;
            case "auth/invalid-email":
              this.errorMsg = "The email you provided is invalid";
              break;
            case "auth/weak-password":
              this.errorMsg = "The password must be atleast six characters.";
              break;
            default:
              this.errorMsg = "Something went wrong.";
          }
        });
    },
  },
};
</script>
