import { auth, db } from "./firebase-config.js";  
import { signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Cerrar sesión
document.getElementById("logout")?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
    }
});

// Cargar datos de partidos
async function loadMatches() {
    const matchesList = document.getElementById("matches-list");
    matchesList.innerHTML = ""; // Limpiar la lista antes de cargar nuevos datos

    const matchesSnapshot = await getDocs(collection(db, "matches"));
    
    matchesSnapshot.forEach((doc) => {
        const match = doc.data();
        const li = document.createElement("li");

        console.log("Datos obtenidos:", match); // Verifica la estructura en la consola

        if (match.date && match.date.seconds) {
            // Convertir Timestamp de Firestore a JavaScript Date
            const matchDate = new Date(match.date.seconds * 1000);  
            const dateString = matchDate.toLocaleDateString();
            const timeString = matchDate.toLocaleTimeString();

            li.textContent = `${match.team1} vs ${match.team2} - ${dateString} - ${timeString}`;
        } else {
            li.textContent = `${match.team1} vs ${match.team2} - Fecha y hora no disponibles`;
        }

        matchesList.appendChild(li);
    });
}


// Cargar tabla de posiciones
async function loadStandings() {
    const standingsBody = document.getElementById("standings-body");
    standingsBody.innerHTML = ""; // Limpiar la tabla antes de cargar nuevos datos

    const standingsSnapshot = await getDocs(collection(db, "standings"));
    const standingsArray = [];

    standingsSnapshot.forEach((doc) => {
        standingsArray.push(doc.data());
    });

    // Ordenar el array por puntos de mayor a menor
    standingsArray.sort((a, b) => b.points - a.points);

    standingsArray.forEach((team) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${team.name}</td>
            <td>${team.pj}</td>
            <td>${team.pg}</td>
            <td>${team.pe}</td>
            <td>${team.pp}</td>
            <td>${team.gf}</td>
            <td>${team.gc}</td>
            <td>${team.dg}</td>
            <td>${team.points}</td>
        `;
        standingsBody.appendChild(tr);
    });
}

// Llamar a las funciones para cargar los datos
loadMatches();
loadStandings();