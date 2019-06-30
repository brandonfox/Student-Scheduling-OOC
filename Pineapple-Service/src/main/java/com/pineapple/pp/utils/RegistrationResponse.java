package com.pineapple.pp.utils;

public class RegistrationResponse {

    private boolean success;
    private String invalidField;

    public RegistrationResponse(){
        success = true;
    }
    public RegistrationResponse(String invalidField){
        success = false;
        this.invalidField = invalidField;
    }

    public boolean getSuccessStatus(){return success;}
    public String getInvalidField(){return invalidField;}
}
