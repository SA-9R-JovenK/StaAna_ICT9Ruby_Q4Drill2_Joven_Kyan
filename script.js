function HeatIndex() {

    let temp = parseFloat(document.getElementById("temp").value);
    let fuel = parseFloat(document.getElementById("humid").value);
    let time = parseFloat(document.getElementById("time").value);

    let primary = document.getElementById("primary").value;
    let secondary = document.getElementById("secondary").value;

    let output = document.getElementById("message1");

    if (isNaN(temp) || isNaN(fuel) || isNaN(time)) {
        output.innerHTML = `<span class="pyro-danger">[ERROR]</span> Invalid input detected.`;
        return;
    }

    if (time < 0) {
        output.innerHTML = `<span class="pyro-danger">[ERROR]</span> Time on target cannot be negative.`;
        return;
    }

    let CI = temp + (0.33 * fuel) - 4;

    let timeMultiplier = 1 + (time / 10);

    let primaryMod = 1;
    let weaponNote = "";

    switch(primary) {
        case "phlog":
            primaryMod = 1.4;
            weaponNote = "Maximum afterburn output.";
            break;
        case "backburner":
            primaryMod = 1.3;
            weaponNote = "High afterburn damage.";
            break;
        case "stock":
            primaryMod = 1.1;
            weaponNote = "Standard balanced output.";
            break;
        case "dragonsfury":
            primaryMod = 0.9;
            weaponNote = "Focuses on burst damage, weaker afterburn.";
            break;
        case "degreaser":
            primaryMod = 0.7;
            weaponNote = "Lowest afterburn, optimized for switching.";
            break;
    }

    let secondaryMod = 1;
    let secondaryNote = "";

    switch(secondary) {
        case "flaregun":
            secondaryMod = 1.3;
            secondaryNote = "Direct ignition increases afterburn duration.";
            break;
        case "detonator":
            secondaryMod = 1.2;
            secondaryNote = "Area ignition enhances burn spread.";
            break;
        case "scorch":
            secondaryMod = 1.25;
            secondaryNote = "Reliable ignition with moderate boost.";
            break;
        case "manmelter":
            secondaryMod = 1.1;
            secondaryNote = "Slight increase in burn efficiency.";
            break;
        case "gas":
            secondaryMod = 1.35;
            secondaryNote = "Gas exposure amplifies combustion significantly.";
            break;
        case "none":
            secondaryMod = 1.0;
            secondaryNote = "No secondary modifier.";
            break;
    }

    let AE = CI * timeMultiplier * primaryMod * secondaryMod;

    let status = "";
    let message = "";
    let color = "";

    if (AE <= 50) {
        status = "Weak Afterburn";
        message = "Combustion insufficient for sustained damage.";
        color = "#0db14a";
    }
    else if (AE <= 90) {
        status = "Sustained Burn";
        message = "Stable afterburn applied.";
        color = "#d3aa06";
    }
    else if (AE <= 130) {
        status = "High Afterburn";
        message = "Target experiencing heavy burn damage.";
        color = "#a64e06";
    }
    else {
        status = "Critical Afterburn";
        message = "Maximum burn intensity. Severe thermal damage.";
        color = "#ae0707";
    }


    output.innerHTML = `
    <div class="pyro-terminal">
        <span class="pyro-system">--- AFTERBURN ANALYSIS ---</span><br>

        Combustion Index: ${CI.toFixed(1)}<br>
        Time on Target: ${time}s<br>
        Final Efficiency: <b>${AE.toFixed(1)}</b><br><br>

        Status: <span style="color:${color}">${status}</span><br>
        Assessment: ${message}<br><br>

        Primary: ${primary} → ${weaponNote}<br>
        Secondary: ${secondary} → ${secondaryNote}<br>

        <span class="pyro-system">--------------------------</span>
    </div>`;
}