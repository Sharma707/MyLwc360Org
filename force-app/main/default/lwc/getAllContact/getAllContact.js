import {
    LightningElement,
    track,api
} from 'lwc';
import getAllContact from '@salesforce/apex/GetAllContactController.getAllContact'
import {
    NavigationMixin
} from 'lightning/navigation';
export default class GetAllContact extends NavigationMixin(LightningElement) {
    @track columns = [{
            label: 'First Name',
            fieldName: 'nameUrl',
            type: 'url',
            typeAttributes: {
                label: {
                    fieldName: 'FirstName'
                },
                target: '_self'
            },
            sortable: true
        },
        {
            label: 'Last Name',
            fieldName: 'LastName',
            type: 'text',
            sortable: true
        },
        {
            label: 'Email',
            fieldName: 'Email',
            type: 'text',
            sortable: true
        },
        {
            label: "Action",
            type: 'button',
            typeAttributes: {
                label: 'View',
                name: 'show_details'
            }
        }



    ];
    @track bgColor;
    @track contactList;
    connectedCallback() {
        this.getContacts();
    }
    renderedCallback(){
         this.template.querySelector(".bgColor").style="background-color:"+this.bgColor;
    }
    getContacts() {
        getAllContact().then(response => {
            if (response) {
                response.forEach(function (contact) {
                    contact.nameUrl = '/' + contact.Id;
                });
                this.contactList = response;
            }

        }).catch(error => {
            console.log('--Exception--' + error.body.message);
        });
    }

    newContactRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: "Contact",
                actionName: "new"
            }
        });
    }
    viewcontactHandler(event) {
        const row = event.detail;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                objectApiName: "Contact", // objectApiName is optional
                actionName: "view"
            }
        });
    }
    showHideHandler(){
        const parent = this.template.querySelector('c-contact-table');
        if(parent){
            parent.toggalTable();
        }
    }
    getlookupidEvent(event){
        console.log('event.detail:'+ JSON.stringify(event.detail));
    }
    @api get colorCode() {
        return this.bgColor;
    }
    
    set colorCode(value) {
        this.bgColor = value;
    }

}