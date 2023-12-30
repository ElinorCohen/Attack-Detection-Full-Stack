import {
  ModalOverlay,
  ModalContent,
  Button,
  LottieSign,
} from "./AlertComponent .style";
import PropTypes from "prop-types";

import AnimatedLogo from "../../assets/lotties/warning.json";

const AlertComponent = ({ message, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <LottieSign animationData={AnimatedLogo} />
        <p>{message}</p>
        <Button onClick={onClose}>OK</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

AlertComponent.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertComponent;
