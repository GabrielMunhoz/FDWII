module.exports = {
  validateAdvertisement(advertisement) {
    let validationMessage = []; 
    console.log(advertisement)
    if(advertisement.gameCategory.length <= 0) validationMessage.push({message : "Categoria do jogo e obrigatorio"});

    if(!advertisement.groupCategory) validationMessage.push({message : "Tipo de grupo e obrigatorio"});

    if( advertisement.playerHost.length <= 0) validationMessage.push({message : "Host e obrigatorio"});
    
    return validationMessage;
  },
};
