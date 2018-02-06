import React from 'react';
import Modal from 'react-modal';

const InfoModal = (props) => (
  <Modal isOpen={props.showModal} ariaHideApp={false} style={{overlay: {animation: 'fadein .25s'}, content: {animation: 'fadein .4s', position:'absolute', textAlign: 'center'}}}>
      <div style={{backgroundColor: '#eee', height: '85%', fontSize: '7vmin', overflowY:'scroll'}}>
      <p><br/>{'Email me: aaron.111317@gmail.com'}</p><hr/>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies non arcu non dignissim. Aenean porta eu felis at tempus. Donec purus sapien, ullamcorper id libero quis, venenatis imperdiet lectus. Pellentesque erat nisi, semper eu fringilla eget, sollicitudin id ante. Ut efficitur vulputate ligula sit amet dapibus. In egestas augue enim. Sed a tellus est.

Duis sollicitudin neque nec dignissim eleifend. Ut non urna at erat blandit pharetra. Aliquam mi felis, elementum eu mi nec, cursus condimentum velit. Etiam sodales orci vel nisl tempus, vel pretium odio luctus. Vivamus consequat libero velit, ut consectetur velit convallis sit amet. Sed consectetur, erat a finibus tempor, dolor velit auctor nisl, eget rhoncus neque felis et lacus. Vivamus facilisis, nisl porta semper facilisis, mi metus imperdiet lorem, vitae molestie ante leo accumsan ligula. In hac habitasse platea dictumst. Nam justo leo, vehicula vitae iaculis id, porta sed diam.

Cras consectetur fermentum enim, nec lacinia nunc volutpat vel. Sed in massa vel leo dictum consequat. Sed interdum faucibus dapibus. Nullam pharetra justo non dapibus ultricies. Suspendisse luctus facilisis eros, ac fringilla magna pharetra eu. Aliquam maximus ligula mollis lorem blandit, id consequat lectus facilisis. Proin ac turpis enim. Nullam eget massa condimentum, venenatis diam at, molestie mauris.

In at malesuada neque, nec feugiat est. Morbi congue sed est rhoncus condimentum. Integer nec vehicula metus. Phasellus sed euismod nibh. Pellentesque in eleifend arcu. Sed rhoncus felis turpis, ut bibendum urna scelerisque vitae. Sed finibus mauris mauris, in molestie felis semper non. Mauris non ex nisi. Cras elementum sapien non pharetra mattis. Etiam convallis ultricies auctor. Etiam faucibus a arcu vitae pellentesque. Praesent fermentum, elit a egestas molestie, nisl purus viverra neque, eget egestas purus erat vel erat.

Aliquam ipsum tellus, euismod ut sodales ac, placerat eget dui. Praesent convallis odio ac neque dignissim, at finibus dolor suscipit. Sed venenatis odio nec rutrum malesuada. Suspendisse quis metus at lorem feugiat mattis in vel diam. Suspendisse viverra, nunc nec tempus tempor, tortor neque vulputate ante, at venenatis eros nulla ac nunc. Ut libero enim, tempor et ultrices sit amet, ultricies ut metus. Phasellus pretium lacus a lacus fermentum, eget aliquam nunc accumsan. In nec dignissim justo. Quisque congue massa nisl, a ultricies nibh luctus at. Donec a augue dolor. Curabitur sodales ante ut urna molestie dapibus. Proin dolor elit, lacinia quis magna at, egestas ullamcorper nibh. Cras semper, sem sit amet viverra fermentum, sem velit sagittis felis, sed dapibus ipsum ligula eu magna. Suspendisse in ipsum ac ante egestas eleifend. Pellentesque posuere nec elit nec elementum.
      </p>
      </div>
      <br/>
      <button className="closeModal" onClick={() => {props.handleModal()}}>Close</button>
      </Modal>
)

export default InfoModal