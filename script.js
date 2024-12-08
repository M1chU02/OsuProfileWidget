const clientId = "";
const clientSecret = "";
const apiBaseUrl = "https://osu.ppy.sh/api/v2";

async function fetchOsuData(username) {
  try {
    // Get access token
    const tokenResponse = await fetch("https://osu.ppy.sh/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "public",
      }),
    });

    const { access_token } = await tokenResponse.json();

    // Fetch user data
    const userResponse = await fetch(`${apiBaseUrl}/users/${username}/osu`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userData = await userResponse.json();

    // Update UI
    document.getElementById("profile-pic").src = userData.avatar_url;
    document.getElementById(
      "rank"
    ).textContent = `#${userData.statistics.global_rank}`;
    document.getElementById("pp").textContent = `${userData.statistics.pp}pp`;
    document.getElementById(
      "accuracy"
    ).textContent = `${userData.statistics.hit_accuracy.toFixed(2)}%`;
    document.getElementById("profile-info").style.display = "block";
  } catch (error) {
    console.error("Error fetching Osu! data:", error);
    alert("Failed to fetch profile. Please check the username.");
  }
}

document.getElementById("fetch-profile").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (username) {
    fetchOsuData(username);
  } else {
    alert("Please enter a username.");
  }
});
