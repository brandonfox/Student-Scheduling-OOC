package com.pineapple.pp.controllers;

import com.pineapple.pp.entities.Card;
import com.pineapple.pp.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CardController {

    private CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping(path = "/create-card")
    public void add(@RequestBody String json) {
        System.out.print("Creating new card " + json + "... ");
        Card card = cardService.add(json);
        if (card == null) { System.out.println("Card creation failed"); }
        else System.out.println("Card created!");
    }

    @GetMapping("/cards")
    public Iterable<Card> findAll() {
        System.out.println("Retrieving all cards");
        return cardService.list();
    }

    @PostMapping("/edit-card")
    public Card editCard(@RequestBody String json) {
        return cardService.editCard(json);
    }
}
