import React from 'react';
import Modal from 'react-modal';

const InfoModal = (props) => (
  <Modal isOpen={props.showModal} ariaHideApp={false} className="info_modal" overlayClassName="info_modal_overlay">
      <div style={{height: '85%', overflowY:'hidden', boxSizing:'border-box'}}>
      <p><br/><a href="mailto:aaron.111317@gmail.com">Email Me</a></p>
      <p><br/>{'Visit my '}<a href="https://www.linkedin.com/in/aaron-chan/" target="_blank">LinkedIn</a></p>
      <p><br/>{'Visit my '}<a href="https://github.com/ac-2017" target="_blank">GitHub</a></p>
      </div>

      <button className="closeModal" onClick={() => {props.handleModal()}}>Close</button>
      </Modal>
)

export default InfoModal