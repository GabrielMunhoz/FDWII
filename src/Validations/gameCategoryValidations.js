module.exports = {
  validateGameCategory(gameCategory) {
    if (gameCategory.name && gameCategory.boxArtUrl) return true;
    return false;
  },
};
