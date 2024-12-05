async function loadInfo() {
  const id = new URLSearchParams(window.location.search).get("id");
  const type = new URLSearchParams(window.location.search).get("type");

  const droneInfo = await fetch(`./items.json`).then((response) =>
    response.json()
  );

  const drone = droneInfo.drones.find((drone) => drone.id == id);
  console.log(drone);
  if (drone) {
  }
}

window.addEventListener("load", loadInfo);
