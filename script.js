// ✅ Ensure script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    console.log("Page Loaded! Initializing Supabase...");

    // ✅ Initialize Supabase
    const SUPABASE_URL = "https://xvcobqcjxpwxjwrgrjhr.supabase.co";  // Replace with your actual Supabase URL
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2Y29icWNqeHB3eGp3cmdyamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNDU0MzgsImV4cCI6MjA1NDgyMTQzOH0.1g1fQWuoDM_S39MmKQb-L2f85u2_ySy2FxmlAPfcxKI";  // Replace with your actual Supabase key

    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    console.log("Supabase Initialized:", supabase); // ✅ Debugging to check if Supabase is initialized

    // ✅ Get form elements
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login-btn");
    
    const signupEmail = document.getElementById("signup-email");
    const signupPassword = document.getElementById("signup-password");
    const signupBtn = document.getElementById("signup-btn");

    // ✅ Login event
    loginBtn.addEventListener("click", async () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        console.log("Logging in with:", email);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + error.message);
        } else {
            alert("Login successful!");
            console.log("User:", data);

            // ✅ Redirect to the typing test page after successful login
            window.location.href = "typing-test.html";
        }
    });

    // ✅ Signup event
    signupBtn.addEventListener("click", async () => {
        const email = signupEmail.value;
        const password = signupPassword.value;

        console.log("Signing up with:", email);

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error("Signup failed:", error);
            alert("Signup failed: " + error.message);
        } else {
            alert("Signup successful! Check your email for verification.");
            console.log("User created:", data);
        }
    });

});
