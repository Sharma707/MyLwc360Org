public with sharing class GetAllContactController {
    @AuraEnabled
    public static List<Contact> getAllContact(){
        try {
            return [SELECT Id,FirstName,LastName,Email FROM Contact ORDER BY CreatedDate DESC LIMIT 100];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}