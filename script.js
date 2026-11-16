
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

calculateBtn.addEventListener("click", calculateTime);

resetBtn.addEventListener("click", resetCalculator);

function calculateTime() {

    const rawTime = getValue("rawTime");

    const missesBench = getValue("missesBench");
    const missesTarget = getValue("missesTarget");
    const handlingErrors = getValue("handlingErrors");
    const outsidePasses = getValue("outsidePasses");
    const coneTouches = getValue("coneTouches");
    const bonusHits = getValue("bonusHits");

    const inputs = [
        rawTime,
        missesBench,
        missesTarget,
        handlingErrors,
        outsidePasses,
        coneTouches,
        bonusHits
    ];

    if (inputs.some(value => !Number.isFinite(value) || value < 0)) {
        alert("Please enter valid non-negative numbers.");
        return;
    }

    const penalties =
        (missesBench * 5) +
        (missesTarget * 3) +
        (handlingErrors * 3) +
        (outsidePasses * 2) +
        (coneTouches * 2);

    // 1 second penalty for every second above 43 seconds
    const overtimePenalty = Math.max(0, rawTime - 43);

    const bonus = bonusHits * 1;

    const finalTime =
        rawTime +
        penalties +
        overtimePenalty -
        bonus;

    // Display results
    document.getElementById("finalTime").textContent =
        finalTime.toFixed(2) + " seconds";

    document.getElementById("displayRaw").textContent =
        rawTime.toFixed(2) + "s";

    document.getElementById("displayPenalties").textContent =
        "+" + penalties.toFixed(2) + "s";

    document.getElementById("displayOvertime").textContent =
        "+" + overtimePenalty.toFixed(2) + "s";

    document.getElementById("displayBonus").textContent =
        "-" + bonus.toFixed(2) + "s";

    document.getElementById("result").hidden = false;
}

function getValue(id) {
    const value = document.getElementById(id).value;

    if (value.trim() === "") return NaN;

    return Number(value);
}

function resetCalculator() {

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = input.id === "rawTime" ? "0" : "0";
    });

    document.getElementById("result").hidden = true;
}
