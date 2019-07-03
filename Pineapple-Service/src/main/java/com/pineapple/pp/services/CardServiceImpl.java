package com.pineapple.pp.services;

import com.google.gson.Gson;
import com.pineapple.pp.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardServiceImpl implements CardService{

    private CardRepository cardRepository;

    private final Gson gson;

    @Autowired
    public CardServiceImpl(CardRepository cardRepository, Gson gson) {
        this.cardRepository = cardRepository;
        this.gson = gson;
    }

    @Override
    public CardRepository getCardRepository() {
        return cardRepository;
    }

    @Override
    public Gson getGson() { return gson; }
}
