const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const InaccurateDataError = require('../errors/InaccurateDataError');
const ForbiddenError = require('../errors/ForbiddenError');

function createCard(req, res, next) {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
}

function getCards(req, res, next) {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findById(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Данные по указанному id не найдены');

      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) throw new ForbiddenError('Нет прав доступа');

      Card.remove(card).then(() => res.status(200).send({ data: card })).catch(next);
    })
    .catch(next);
}

function updateCardData(req, res, next, updateOptions) {
  const { cardId } = req.params;

  Card
    .findByIdAndUpdate(cardId, updateOptions, { new: true })
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные при изменении лайка карточке'));
      } else {
        next(err);
      }
    });
}

function setLikeCard(req, res, next) {
  const { userId } = req.user;
  updateCardData(req, res, next, { $addToSet: { likes: userId } });
}

function unsetLikeCard(req, res, next) {
  const { userId } = req.user;
  updateCardData(req, res, next, { $pull: { likes: userId } });
}

module.exports = {
  createCard,
  getCards,
  setLikeCard,
  unsetLikeCard,
  deleteCard,
};
