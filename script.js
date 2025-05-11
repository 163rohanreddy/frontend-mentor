let aFetchedData = [];
const rootStyles = getComputedStyle(document.documentElement);

function fnFetchData() {
  fetch("/data.json")
    .then((response) => {
      if (!response.ok) return console.log("Oops! Something went wrong.");

      return response.json();
    })
    .then((data) => {
      aFetchedData = data;
      onNavigationClick("daily");
    });
}

function onNavigationClick(sPeriod) {
  document.querySelectorAll("[data-period]").forEach((navigation) => {
    navigation.style.color = rootStyles.getPropertyValue("--Purple-500").trim();
  });
  for (const oActivity of aFetchedData) {
    const currentElement = document.querySelector(
      `.activity-current-time[data-activity="${oActivity.title}"]`
    );
    const previousElement = document.querySelector(
      `.activity-previous-time[data-activity="${oActivity.title}"]`
    );

    if (currentElement && previousElement) {
      document.querySelector(`a[data-period="${sPeriod}"]`).style.color =
        rootStyles.getPropertyValue("--White").trim();
      currentElement.innerText = `${oActivity.timeframes[sPeriod].current}hrs`;
      let sLastActivityText;
      switch (sPeriod) {
        case "daily":
          sLastActivityText = "Yesterday";
          break;
        case "weekly":
          sLastActivityText = "Last Week";
          break;
        case "monthly":
          sLastActivityText = "Last Month";
          break;
      }
      previousElement.innerText = `${sLastActivityText} - ${oActivity.timeframes[sPeriod].previous}hrs`;
    }
  }
}

fnFetchData();
