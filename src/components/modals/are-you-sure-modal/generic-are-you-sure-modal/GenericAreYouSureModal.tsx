import Button from '../../../buttons/generic-button/Button';
import IAreYouSureModal from '../../../../models/IAreYouSureModal';
import './GenericAreYouSuraModal.css';
import GenericModal from '../../generic-modal/GenericModal';


function GenericAreYouSureModal(props: IAreYouSureModal) {

  return (
    <GenericModal
      isOpen={props.isOpen}
      onAfterOpen={undefined}
      onRequestClose={undefined}
      closeModal={props.closeModal}
      insideHteml={
        <div className='generic-are-you-suer-inside'>
          <h1>{props.textBeforeButtons}</h1>
          <div className='buttons-div'>
            <Button className={"cancel-button"} onButtenClicked={props.onCancelClick} buttenText={'no, cancel'} />
            <Button className='' id={"yes-button"} onButtenClicked={props.onYesClick} buttenText={'yes, delete!'} />
          </div>
        </div>
      }
    />
  )
}

export default GenericAreYouSureModal