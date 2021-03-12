public without sharing class GetAccountInfoController {
    public GetAccountInfoController() {
         
    }

    @AuraEnabled(cacheable = true)
    public static List < Account > getAllAccount(Integer limitSize, Integer offset) {
        try {
            return [SELECT Id, Name, AccountNumber, Phone, Website FROM Account LIMIT :limitSize OFFSET :offset];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string createNewAccount(String Name, String AccountNumber, String Phone) {
        try {
            Account accobj = new Account();
            accobj.Name = Name;
            accobj.AccountNumber = AccountNumber;
            accobj.Phone = Phone;
            if (String.isNotBlank(Name)) {
                INSERT accobj;
                return 'success';
            }
            return 'failed';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}