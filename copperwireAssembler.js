function copperwireAssembler(desired) {
//const desired = document.getElementById("amount").value;
const copperwireOutput = 2;
const copperwireTime = 0.5;

const amountAssembler = Math.ceil(desired / (copperwireOutput / copperwireTime));
    return amountAssembler;
    console.log(amountAssembler)
}
