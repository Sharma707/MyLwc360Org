import {
    LightningElement,
    api,
    track
} from 'lwc';

export default class ContactTable extends LightningElement {
    @api contactList;

    @track tableShow = true;
    @api columns;
    handleRowAction(event) {
        const actionName = event.detail.action.name;

        const row = event.detail.row;
        switch (actionName) {
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }
    showRowDetails(row) {
        const viewEvent = new CustomEvent('viewcontact', {
            detail: row
        });
        this.dispatchEvent(viewEvent);
    }
    get contactFound(){
        if(this.contactList){
            return true;
        }
        return false;
    }
    /*get getcontactList(){
        return this.contactList;
    }
    @api 
    get contacts(){
        return this.contactList;
    } 
    set contacts(value){
         this.contactList =value;
    }
    */
    @api
    toggalTable(){
        if(this.tableShow){
            this.tableShow = false;
        }else{
            this.tableShow = true;
        }
    }
}