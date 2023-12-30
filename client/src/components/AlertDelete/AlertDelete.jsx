import { ModalOverlay, ModalContent, Button } from "./AlertDelete.style";
import PropTypes from "prop-types";

// import AnimatedLogo from "../../assets/lotties/warning.json";

const AlertDelete = ({ onClose, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {/* <LottieSign animationData={AnimatedLogo} /> */}
        <p>Are you sure you want to leave us FOREVER?</p>
        <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
          <Button style={{ backgroundColor: "lightCoral" }} onClick={onConfirm}>
            YES
          </Button>
          <Button
            style={{ backgroundColor: "lightGreen", borderColor: "lightgreen" }}
            onClick={onClose}
          >
            NO WAY
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

AlertDelete.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertDelete;
