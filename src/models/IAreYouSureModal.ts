export default interface IAreYouSureModal {
    isOpen: boolean,
    onAfterOpen?:Function,
    onRequestClose?:Function
    closeModal: any,
    onYesClick: any,
    onCancelClick: any,
    textBeforeButtons: string
}