module.exports = {
  validateAdvertisement(advertisement) {
    let validationMessage = []; 
    if(!advertisement.gameCategory) validationMessage.push({message : "Categoria do jogo e obrigatorio"});

    if(!advertisement.groupCategory) validationMessage.push({message : "Tipo de grupo e obrigatorio"});

    if(!advertisement.playerHost) validationMessage.push({message : "Host e obrigatorio"});
    
    return validationMessage;
  },
};
