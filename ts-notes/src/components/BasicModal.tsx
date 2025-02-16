import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useModal, useModalDispatch } from '../contexts/ModalContext';
import { ModalData } from '../interfaces/ModalData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "white"
};

export default function BasicModal() {
  const modalData: ModalData = useModal()!;
  const modalDispatch = useModalDispatch();

  const handleClose = () => {
    if (modalDispatch) {
      modalDispatch({type: "close"});
    }
  };
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalData.isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalData.isOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {modalData.title}
            </Typography>
            {modalData.content}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
