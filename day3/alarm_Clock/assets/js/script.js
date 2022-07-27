const selectMenu = document.querySelectorAll("select"),
    currentTime = document.querySelector("h1"),

    alarmBtn = document.querySelector("button"),
    formArea = document.querySelector(".form-area");


let alarmTime, isAlarmSet,
    ringtone = new Audio("./assets/ringtone.mp3");
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let amPm = i == 1 ? "AM" : "PM";
    let option = `<option value="${amPm}">${amPm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        amPm = "AM";
    if (h >= 12) {
        h = h - 12;
        amPm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${amPm}`;

    if (alarmTime === `${h}:${m} ${amPm}`) {
        ringtone.play();
        ringtone.loop = true;
    }

}, 1000);

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        formArea.classList.remove("disable");
        alarmBtn.innerText = "Set Alarm";
        isAlarmSet = false;
        return options();
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    formArea.classList.add("disable");
    alarmBtn.innerText = "Clear Alarm";

}

alarmBtn.addEventListener("click", setAlarm);