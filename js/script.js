import { auth, db } from "./firebase-config.js";  
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Registro de usuario
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const team = document.getElementById("team").value;


    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    const birthDate = new Date(fechaNacimiento);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
        alert("Debes ser mayor de 18 años para registrarte.");
        return;
    }
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado:", userCredential.user);

        // Guardar datos adicionales del usuario en Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            nombre: nombre,
            email: email,
            team: team,
            fechaNacimiento: fechaNacimiento,
            createdAt: new Date()
        });

        alert("Usuario registrado con éxito");
        window.location.href = `index.html`; // Redirigir a la vista del equipo
    } catch (error) {
        console.error("Error al registrar:", error.message);
        alert(error.message);
    }
});

// Inicio de sesión
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Inicio de sesión exitoso:", userCredential.user);

        // Obtener datos adicionales del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const team = userData.team;
            alert("Inicio de sesión exitoso");
            window.location.href = `dashboard-${team}.html`; // Redirigir a la vista del equipo
        } else {
            console.error("No se encontraron datos del usuario");
            alert("No se encontraron datos del usuario");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert(error.message);
    }
});



