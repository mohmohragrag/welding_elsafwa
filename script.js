function calculate() {
    const densityOfSteel = 7850; // Density of steel in kg/m³
    const resultsTable = document.getElementById('results-table').getElementsByTagName('tbody')[0];
    resultsTable.innerHTML = ''; // Clear previous results

    let totalArea = 0;
    let totalVolume = 0;
    let totalWeight = 0;

    for (let i = 1; i <= 6; i++) {
        const filletInMillimeters = parseFloat(document.getElementById(`fillet${i}`).value);
        const lengthInMillimeters = parseFloat(document.getElementById(`length${i}`).value);

        if (!isNaN(filletInMillimeters) && !isNaN(lengthInMillimeters)) {
            // Convert mm to meters
            const filletInMeters = filletInMillimeters / 1000;
            const lengthInMeters = lengthInMillimeters / 1000;

            // Calculate area, volume, and weight
            const area = 0.5 * Math.pow(filletInMeters, 2);
            const volume = area * lengthInMeters;
            const weight = volume * densityOfSteel;

            // Add results to the table
            const row = resultsTable.insertRow();
            row.insertCell().textContent = `Fillet ${i}`;
            row.insertCell().textContent = area.toFixed(6);
            row.insertCell().textContent = volume.toFixed(6);
            row.insertCell().textContent = weight.toFixed(6);

            // Add to totals
            totalArea += area;
            totalVolume += volume;
            totalWeight += weight;
        }
    }

    // Add a row for totals
    if (totalArea > 0 || totalVolume > 0 || totalWeight > 0) {
        const totalRow = resultsTable.insertRow();
        totalRow.insertCell().textContent = "Total";
        totalRow.insertCell().textContent = totalArea.toFixed(6);
        totalRow.insertCell().textContent = totalVolume.toFixed(6);
        totalRow.insertCell().textContent = totalWeight.toFixed(6);
    }

    // Apply coefficient to total weight
    const coefficient = parseFloat(document.getElementById('coefficient').value);
    const totalWeightAfterCoefficient = totalWeight * coefficient;

    // Get weight of steel
    const weightOfSteel = parseFloat(document.getElementById('weight-of-steel').value) || 0;

    // Calculate total weight in steel
    const totalWeightInSteel = totalWeightAfterCoefficient + weightOfSteel;

    // Display total weight before and after coefficient
    document.getElementById('total-weight-before').textContent = totalWeight.toFixed(6);
    document.getElementById('total-weight-after').textContent = totalWeightAfterCoefficient.toFixed(6);
    document.getElementById('total-weight-in-steel').textContent = totalWeightInSteel.toFixed(6);

    // Calculate and display number of coils
    const selectedNumber = parseFloat(document.getElementById('coil-number').value);
    const numberCoil = totalWeight / selectedNumber;
    document.getElementById('number-coil-result').textContent = numberCoil.toFixed(6);
}