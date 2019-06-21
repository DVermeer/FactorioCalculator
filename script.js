const desired = 100;
const copperwireOutput = 2;
const copperwireTime = 0.5;

function needAssembler(desired, output, timetocomplete) {
    const result = Math.ceil(desired / (output / timetocomplete));
    return result;
}
const amountAssembler = needAssembler(desired, copperwireOutput, copperwireTime)

console.log('You need ' + amountAssembler + ' Assemblers')

