module.exports = {
  validateGameCategory(gameCategory) {
    console.log(gameCategory)
    let validationMessage = []; 
    if(!gameCategory.name) validationMessage.push({message : "Nome da categoria de jogo e obrigatorio"});
    if(!gameCategory.boxArtUrl) validationMessage.push({message : "Imagem da categoria de jogo e obrigatorio"});
    

    return validationMessage;
  },
};
