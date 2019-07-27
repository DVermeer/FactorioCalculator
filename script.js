
const resources = [
    { id: 0, Name: "ironplate", title: 'Iron plate', Output: 1, Time: 3.2, Input: { ore: 1 } },
    { id: 1, Name: "gearwheel", title: 'Gear wheel', Output: 1, Time: 0.5, Input: { ironplate: 2 } },
    { id: 2, Name: "copperplate", title: 'Copper plate', Output: 1, Time: 3.2, Input: { ore: 1 } },
    { id: 3, Name: "copperwire", title: 'Copper Cable', Output: 2, Time: 0.5, Input: { copperplate: 1 } },
    { id: 4, Name: "greencircuits", title: 'Green Circuits', Output: 1, Time: 0.5, Input: { copperwire: 3, ironplate: 1 } },
    { id: 5, Name: "science_auto", title: 'Automation Science', Output: 1, Time: 5.0, Input: { copperplate: 1, gearwheel: 1 } }];

function gettotalIngredientsNeeded(resource, desired) {
    const inputs = Object.entries(resource.Input);
    const list = [];

    for (const [inputResource, count] of inputs) {
        const totalAmount = (desired * count) / resource.Output;
        list.push({ resource: inputResource, amount: totalAmount })
    }

    return list;
}

function writeTotalIngredientsList(list) {
    for (const ingredient of list) {
        const item = document.createElement('li');
        const resourceTitle = getResourceTitle(ingredient.resource)
        item.innerHTML = `${resourceTitle}: ${ingredient.amount}`
        document.getElementById("ingredients").appendChild(item);
    }
}

function getResourceTitle(name) {
    console.log(name)
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
}

// functie nog verder afmaken, check if endproduct 
function findIngredientInResource(ingredients) {
    for (const ingredient of ingredients) {
        console.log(ingredient)
        const resource = resources.find(r => r.name === ingredient);
        console.log(resource)
        return resource.Input
    }
}
function needAssembler() {
    const desired = document.getElementById("amount").value;
    const selectedResourceIndex = document.getElementById("products").selectedIndex;
    const selectedResource = resources[selectedResourceIndex];

    // Calculate needed amount assemblers           
    const result = Math.ceil(parseInt(desired) / (selectedResource.Output / selectedResource.Time));
    resultaat.innerHTML = result;

    // Determine ingredient amounts
    const totalIngredientsNeeded = gettotalIngredientsNeeded(selectedResource, desired);
    console.log(totalIngredientsNeeded)

    resetForm();
    writeTotalIngredientsList(totalIngredientsNeeded);
    findIngredientInResource(totalIngredientsNeeded);
}