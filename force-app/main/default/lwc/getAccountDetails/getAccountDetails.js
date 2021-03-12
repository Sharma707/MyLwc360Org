import {
    LightningElement,
    track
} from 'lwc';
import getAllAccount from '@salesforce/apex/GetAccountInfoController.getAllAccount';
import newAccount from '@salesforce/apex/GetAccountInfoController.createNewAccount';
const columns = [{
        label: 'Name',
        fieldName: 'Name'
    },
    {
        label: 'Website',
        fieldName: 'Website',
        type: 'url'
    },
    {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone'
    },
    {
        label: 'Account Number',
        fieldName: 'AccountNumber',
        type: 'text'
    }
];
export default class GetAccountDetails extends LightningElement {
    data = [];
    columns = columns;
    error;
    rowLimit =10;
    rowOffSet=0;
    @track isModalOpen = false;
    @track Name;
    @track Phone;
    @track Website;
    @track AccountNumber;
    connectedCallback() {
        this.loadData();
    }

    loadData(){
        return  getAllAccount({ limitSize: this.rowLimit , offset : this.rowOffSet })
        .then(result => {
            let updatedRecords = [...this.data, ...result];
            this.data = updatedRecords;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.data = undefined;
        });
    }

    getAccountInfo() {
        return getAllAccount({ limitSize: this.rowLimit , offset : this.rowOffSet }).then((response) => {
            this.data = response;
        }).catch((error) => {
            console.log('Exception--' + error.body.message);
        })
    }
    handleNewClick() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;;
    }
    successHandel(event) {
        if (event.detail.Id) {
            this.getAccountInfo();
            this.isModalOpen = false;
        }
    }
    saveModal() {
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')].reduce((validSoFar, inputField) => {
            inputField.reportValidity();
            return validSoFar && inputField.checkValidity();
        }, true);
        if (isInputsCorrect) {
            console.log('--Name--' + this.Name);
            console.log('--AccountNumber--' + this.AccountNumber);
            console.log('--Phone--' + this.Phone);

            this.isModalOpen = false;
            newAccount({
                Name: this.Name,
                AccountNumber: this.AccountNumber,
                Phone: this.Phone
            }).then(response => {
                console.log('--response--' + response);
            }).catch(error => {
                console.log('Exception--' + error.body.message);
            })
        }
    }
    inputHandler(event) {
        if (event.target.dataset.fieldapi == 'Name') {
            this.Name = event.target.value;
        } else if (event.target.dataset.fieldapi == 'AccountNumber') {
            this.AccountNumber = event.target.value;
        } else if (event.target.dataset.fieldapi == 'Phone') {
            this.Phone = event.target.value;
        } 
    }
    loadMoreData(event) {
        const currentRecord = this.data;
        const { target } = event;
        target.isLoading = true;

        this.rowOffSet = this.rowOffSet + this.rowLimit;
        this.loadData()
            .then(()=> {
                target.isLoading = false;
            });   
    }



}