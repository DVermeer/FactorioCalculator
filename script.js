
const resources = [
    { id: 0, Name: "ironplate", title: 'Iron plate', Output: 1, Time: 3.2, Input: { ironore: 2 } }, //for test, input is wrong, ore is 1 
    { id: 1, Name: "gearwheel", title: 'Gear wheel', Output: 1, Time: 0.5, Input: { ironplate: 2 } },
    { id: 2, Name: "copperplate", title: 'Copper plate', Output: 1, Time: 3.2, Input: { copperore: 1 } },
    { id: 3, Name: "copperwire", title: 'Copper Cable', Output: 2, Time: 0.5, Input: { copperplate: 1 } },
    { id: 4, Name: "greencircuits", title: 'Green Circuits', Output: 1, Time: 0.5, Input: { copperwire: 3, ironplate: 1 } },
    { id: 5, Name: "science_auto", title: 'Automation Science', Output: 1, Time: 5.0, Input: { copperplate: 1, gearwheel: 1 } },
    { id: 6, Name: "assembler1", title: "Assembling Machine 1", Output: 1, Time: 0.5, Input: { greencircuits: 3, gearwheel: 5, ironplate: 9 } },
    { id: 7, Name: "steelplate", title: "Steel plate", Output: 1, Time: 16, Input: { ironplate: 5 } }
];


function getTotalIngredientsNeeded(resource, desired) {
    const inputs = Object.entries(resource.Input);
    //add; if resource.Input is undefined return (resource, desire)
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

function calculateAssembler(resource, desired) {
    const result = Math.ceil(parseInt(desired) / (resource.Output / resource.Time));
    //add; modifier for selected assembler machine 
    return result;
}

// functie nog verder afmaken, check if endproduct 
function findIngredientInResource(ingredients) {
    const totalRaw = []
    for (const ingredient of ingredients) {
        const resours = resources.find(r => r.Name === ingredient.resource);
        const desired = ingredient.amount;
        const raw = getTotalIngredientsNeeded(resours, desired);
        console.log(raw) // combine raws to total
        totalRaw.push({ raw }); // raw.resource = undefined
    }
    console.log(totalRaw)
    return totalRaw

}
function needAssembler() {
    const desired = document.getElementById("amount").value;
    const selectedResourceIndex = document.getElementById("products").selectedIndex;
    const selectedResource = resources[selectedResourceIndex];

    // Calculate needed amount assemblers           
    const result = Math.ceil(parseInt(desired) / (selectedResource.Output / selectedResource.Time));
    resultaat.innerHTML = result;

    // Determine ingredient amounts
    const totalIngredientsNeeded = getTotalIngredientsNeeded(selectedResource, desired);

    resetForm();
    writeTotalIngredientsList(totalIngredientsNeeded);
    const totalRaw = findIngredientInResource(totalIngredientsNeeded);
}