public with sharing class LookupCompController {
    public LookupCompController() {

    }
    @AuraEnabled
    public static  List<sObject> inputSearchApex(String objectApiName, String inputValue,Integer numberOfRecord, String searchField,String recordId,Boolean defaultData){
        try {
            String query = '';
            String likeOperater = '\'%' + inputValue + '%\'';
            if(String.isNotBlank(inputValue)){
                query = 'SELECT Id,Name FROM '+objectApiName+' WHERE '+searchField+' LIKE '+likeOperater+' LIMIT '+numberOfRecord;
            }else if(defaultData == true && String.isBlank(recordId)){
                query = 'SELECT Id,Name FROM '+objectApiName+' ORDER BY CreatedDate DESC LIMIT '+numberOfRecord;
            }else if(String.isNotBlank(recordId)){
                query = 'SELECT Id,Name FROM '+objectApiName+' WHERE Id= \''+recordId+'\' LIMIT 1';
            }
            List<sObject> sobjectList = new List<sObject>();
            sobjectList = Database.query(query);
            return sobjectList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}