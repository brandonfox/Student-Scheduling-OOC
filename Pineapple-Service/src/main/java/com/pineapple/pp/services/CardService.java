package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.entities.Card;
import com.pineapple.pp.repositories.CardRepository;

import java.util.ArrayList;
import java.util.List;

public interface CardService {

    default List<Card> list() {
        System.out.println("In list() in CardService.java");
        List<Card> userList = new ArrayList<>();
        for (Card card : getCardRepository().findAll()) {
            System.out.println(card.getTitle());
            userList.add(card);
        }
        return userList;
    }

    CardRepository getCardRepository();

    Gson getGson();

    default Card add(String json) {
        Card card = getGson().fromJson(json, Card.class);
        getCardRepository().save(card);
        return card;
    }

    default Card editCard(String json) {
        Card card = getGson().fromJson(json, Card.class);
        Card cardFromDB = getCardRepository().findCardById(card.getId());
        cardFromDB.setTitle(card.getTitle());
        cardFromDB.setDescription(card.getDescription());
        cardFromDB.setStatus(card.getStatus());
        cardFromDB.setUsers(card.getUsers());
        getCardRepository().save(cardFromDB);
        return cardFromDB;
    }

    // todo: remove card
}
