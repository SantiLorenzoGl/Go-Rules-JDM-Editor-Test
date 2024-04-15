import { Modal } from 'antd';
import React, { useState } from 'react';

import './styles.css'

const FileSelectionModal: React.FC = ({ handleOk, onFileSelected, open, }: any) => {
  const [file, setFile] = useState()

  console.log('file', file)
  const handleChange = (event: any) => {
    setFile(event.target.files[0])
  }

  return (
    <Modal
      centered
      open={open}
      width={400}
      title="Selecciona un archivo .JSON"
      onOk={() => {
        onFileSelected(file)
      }}
      onCancel={() => )}
    >
  <form>
    <input type="file" onChange={handleChange} />
  </form>
    </Modal >
  );
};

export default FileSelectionModal