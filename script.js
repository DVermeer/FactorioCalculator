
const resources = [
    { id: 0, Name: "ironplate", title: 'Iron plate', Output: 1, Time: 3.2 },
    { id: 1, Name: "gearwheel", title: 'Gear wheel', Output: 1, Time: 0.5, Input: { ironplate: 2 } },
    { id: 2, Name: "copperplate", title: 'Copper plate', Output: 1, Time: 3.2 },
    { id: 3, Name: "copperwire", title: 'Copper cable', Output: 2, Time: 0.5, Input: { copperplate: 1 } },
    { id: 4, Name: "greencircuit", title: 'Green Circuit', Output: 1, Time: 0.5, Input: { copperwire: 3, ironplate: 1 } },
    { id: 5, Name: "science_auto", title: 'Automation Science', Output: 1, Time: 5.0, Input: { copperplate: 1, gearwheel: 1 } },
    { Name: "science_logistics", title: "Logistics Science", Output: 1, Time: 6, Input: { inserter: 1, transportbelt: 1 } },
    { id: 6, Name: "assembler1", title: "Assembling Machine 1", Output: 1, Time: 0.5, Input: { greencircuit: 3, gearwheel: 5, ironplate: 9 } },
    { id: 7, Name: "steelplate", title: "Steel plate", Output: 1, Time: 16, Input: { ironplate: 5 } },
    { id: 8, Name: "plasticbar", title: "Plastic bar", Output: 2, Time: 1 },
    { id: 9, Name: "redcircuit", title: "Advanced circuit", Output: 1, Time: 6, Input: { copperwire: 4, greencircuit: 2, plasticbar: 2 } },
    { id: 10, Name: "inserter", title: "Inserter", Output: 1, Time: 0.5, Input: { ironplate: 1, greencircuit: 1, gearwheel: 1 } },
    { id: 11, Name: "transportbelt", title: "Transport belt", Output: 2, Time: 0.5, Input: { gearwheel: 1, ironplate: 1 } }
];

function getTotalIngredientsNeeded(resource, desired) {
    var list = [];
    if (resource.Input) {
        const inputs = Object.entries(resource.Input);
        for (const [inputResource, count] of inputs) {
            const totalAmount = (desired * count) / resource.Output;
            list.push({ resource: inputResource, amount: totalAmount })
        }
    } else {
        list = { resource: resource.Name, amount: desired };
    }
    return list;
}

function writeTotalIngredientsList(list, listID) {
    for (const ingredient of list) {
        const item = document.createElement('li');
        const resourceTitle = getResourceTitle(ingredient.resource)
        if (ingredient.belt) {
            item.innerHTML = `${resourceTitle}: ${ingredient.amount}, need a ${ingredient.belt}`
        }
        else {
            item.innerHTML = `${resourceTitle}: ${ingredient.amount}`
        }
        document.getElementById(listID).appendChild(item);
    }
}

function getResourceTitle(name) {
    const resource = resources.find(r => r.Name === name)
    return resource.title || resource.Name
}

function fillProductsList() {
    for (const resource of resources) {
        const option = document.createElement('option');
        option.value = resource.Name
        option.innerHTML = resource.title || resource.Name
        document.getElementById("products").appendChild(option);
    }
}

function resetForm() {
    document.getElementById("ingredients").innerHTML = "";
    document.getElementById("secondingredients").innerHTML = "";
    document.getElementById("totalRaw").innerHTML = "";
}

function calculateAssembler(resource, desired) {
    const result = Math.ceil(parseInt(desired) / (resource.Output / resource.Time));
    //add; modifier for selected assembler machine 
    return result;
}

function determineTransportbelt(amount) {
    // also include half of belt 
    var neededBelt;

    if (amount <= 15) {
        neededBelt = "yellow Transport Belt";
    }
    else if (15 < amount <= 30) {
        neededBelt = "red Transport belt";
    }
    else if (30 < amount <= 45) {
        neededBelt = "blue Transport belt";
    }
    return neededBelt;
}

function addBeltToResources(list) {
    for (const resource of list) {
        const Belt = determineTransportbelt(resource.amount);
        resource.belt = Belt;
    }
    return list;
}

function sumSameResource(list) {
    // create function for adding amount of similar resources - unfinished
    var holder = {};
    list.forEach(function (d) {
        if (holder.hasOwnProperty(d.resource)) {
            holder[d.resource] = holder[d.resource] + d.amount;
        } else {
            holder[d.resource] = d.amount
        }
    });
    var list2 = [];
    for (var prop in holder) {
        list2.push({ resource: prop, amount: Math.ceil(holder[prop]) });
    }
    return list2
}

function findIngredientInResource(ingredients) {
    var totalRaw = [];
    for (const ingredient of ingredients) {
        const resource = resources.find(r => r.Name === ingredient.resource);
        const desired = ingredient.amount;
        const raw = getTotalIngredientsNeeded(resource, desired);
        totalRaw = totalRaw.concat(raw);
    }
    return totalRaw
}

function needAssembler() {
    const desired = document.getElementById("amount").value;
    const selectedResourceIndex = document.getElementById("products").selectedIndex;
    const selectedResource = resources[selectedResourceIndex];
    const productionRate = document.querySelector('input[name="craftspeed"]:checked').value;
    const selectedAssemblerMod = document.querySelector('input[name="assemblermachine"]:checked').value
    // Calculate needed amount assemblers           
    const result = calculateAssembler(selectedResource, desired)
    resultaat.innerHTML = result;

    // Determine ingredient amounts
    const totalIngredientsNeeded = getTotalIngredientsNeeded(selectedResource, desired);

    resetForm();
    writeTotalIngredientsList(totalIngredientsNeeded, "ingredients");
    const secondIngredients = addBeltToResources(sumSameResource(findIngredientInResource(totalIngredientsNeeded)));
    writeTotalIngredientsList(secondIngredients, "secondingredients");

    const totalRaw = sumSameResource(findIngredientInResource(findIngredientInResource(findIngredientInResource(totalIngredientsNeeded))));
    // make function for above statement 
    writeTotalIngredientsList(totalRaw, "totalRaw");
}