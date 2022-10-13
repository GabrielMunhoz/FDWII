module.exports = {
  validatePlayer(player) {
    let validationMessage = []; 
    if(!player.name) validationMessage.push({message : "Nome do jogador e obrigatorio"});
    if(!player.lastname) validationMessage.push({message : "Ultimo nome do jogador e obrigatorio"});
    if(!player.email) validationMessage.push({message : "Email do jogador e obrigatorio"});
    if(!player.password) validationMessage.push({message : "Senha do jogador e obrigatorio"});
    if(!player.nickname) validationMessage.push({message : "Apelido do jogador e obrigatorio"});

    return validationMessage;
  },
  validatePlayerLogin(player) {
    let validationMessage = []; 
    if(!player.password) validationMessage.push({message : "Senha do jogador e obrigatorio"});
    if(!player.nickname) validationMessage.push({message : "Apelido do jogador e obrigatorio"});

    return validationMessage;
  },
};
