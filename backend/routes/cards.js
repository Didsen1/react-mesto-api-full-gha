const router = require('express').Router();
const { validateCardId, validateNewCard } = require('../utils/validation');
const {
  createCard,
  getCards,
  setLikeCard,
  unsetLikeCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', validateNewCard, createCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, setLikeCard);

router.delete('/:cardId/likes', validateCardId, unsetLikeCard);

module.exports = router;
