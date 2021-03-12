import {
    LightningElement,
    api,
    track
} from 'lwc';
import inputSearchApex from '@salesforce/apex/LookupCompController.inputSearchApex';
export default class LookupComponent extends LightningElement {
    
    @api disabled = false;
    @api required = false;
    @api defaultData = false;
    @api recordId = '';
    @api label = 'Account Lookup';
    @api logoName = 'standard:account';
    @api objectApiName = 'Account';
    @api limit = 5;
    @api searchField = 'Name';
    @api placeholder = 'Please enter the name..';
    
    @track recordName = '';
    @track inputvalue = '';
    @track objectList = [];
    inputHandler(event) {
        this.inputvalue = event.target.value;
        if (this.inputvalue) {
            this.getApexResult();
        }else{
            this.objectList = [];
        }
    }
    onClickEvent(){
        if(this.defaultData && !this.recordId){
            this.getApexResult();
            this.inputvalue = '';
        }
    }
    onmouseleaveEvent(){
        if(this.defaultData && !this.recordId){
            this.clearDetails();
        }
    }
    connectedCallback(){
        if(this.recordId){
            this.getApexResult();
            this.inputvalue = '';
        }
    }
    getApexResult() {
        inputSearchApex({
            objectApiName: this.objectApiName,
            inputValue: this.inputvalue,
            numberOfRecord: this.limit,
            searchField: this.searchField,
            recordId:this.recordId,
            defaultData: this.defaultData
        }).then(respose => {
            if(this.inputvalue){
                this.objectList = respose;
            }else if(this.defaultData && !this.recordId){
                this.objectList = respose;
            }else if(this.recordId){
               this.recordId = respose[0].Id;
               this.recordName = respose[0].Name;
            }else{
                this.objectList = [];
            }
            this.dispatchEvent(new CustomEvent('getlookupid',{detail:respose}));
        }).catch(error => {
            console.log('--Exception--' + error.body.message);
        })
    }
    
    selectItemEvent(event) {
        const recordId = event.currentTarget.dataset.recordId;
        const recordName = event.currentTarget.dataset.recordName;
        this.recordId = recordId;
        this.recordName = recordName;
        this.objectList = [];
    }
    get recordIdFound(){
        if(this.recordId){
            return true;
        }
        return false;
    }
    get objectLListFound(){
        if(this.objectList.length > 0){
            return true;
        }
        return false;
    }
    clearDetails(){
        this.recordId = '';
        this.recordName = '';
        this.inputvalue = '';
        this.objectList = [];
    }
}