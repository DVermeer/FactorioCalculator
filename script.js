function calculateAmount(desired) {
//const desired = document.getElementById("amount").value;
const copperwireOutput = 2;
const copperwireTime = 0.5;

function needAssembler(desired, output, timetocomplete) {
    const result = Math.ceil(desired / (output / timetocomplete));
    return result;
}
const amountAssembler = needAssembler(desired, copperwireOutput, copperwireTime)
    return amountAssembler;

console.log('You need ' + amountAssembler + ' Assemblers')
}
//const lijstje = ['a','b','c'];


}

