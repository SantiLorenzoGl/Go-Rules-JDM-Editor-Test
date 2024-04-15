"use client"
import '@gorules/jdm-editor/dist/style.css';
import { useRef, useState } from 'react';
import {
  DecisionGraph,
  DecisionGraphRef,
  GraphNode,
  JdmConfigProvider,
  NodeSpecification,
  useDecisionGraphActions
} from '@gorules/jdm-editor';
import { defaultGraph } from './defaultGraph';
import { Button, Input, Modal, Space } from 'antd';
import { ApartmentOutlined, EditOutlined } from '@ant-design/icons';

export default function Home() {
  const nameRef = useRef('');
  const ref = useRef<DecisionGraphRef>(null);
  const [value, setValue] = useState<any>(defaultGraph);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const DecisionNode = ({ specification, id, selected, data }) => {
    const { updateNode } = useDecisionGraphActions()

    const handleFileSelect = (event: any) => {
      const selectedFile = event.target.files[0];
      nameRef.current = selectedFile.name

      updateNode(id, (draft) => {
        draft.name = selectedFile.name
        draft.content.key = selectedFile.name;
        return draft;
      });

      setIsModalOpen(false);
    };

    return (
      <GraphNode
        id={id}
        name={data.name}
        isSelected={selected}
        specification={specification}
      >
        <Space.Compact>
          <Input value={nameRef.current} style={{ pointerEvents: 'none' }} />
          <Button
            type="primary"
            onClick={showModal}
            icon={<EditOutlined />}
          />
        </Space.Compact>

        <Modal
          title="Selecciona un archivo .JSON"
          centered
          width={400}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <input
            type="file"
            onChange={handleFileSelect}
          />
        </Modal>
      </GraphNode>
    )
  }

  const components: NodeSpecification[] = [
    {
      type: 'decisionNode',
      displayName: 'Decision',
      shortDescription: 'Execute decisions',
      icon: <ApartmentOutlined />,
      generateNode: () => ({
        name: nameRef.current || 'Decision',
        content: {
          key: nameRef.current
        }
      }),
      onNodeAdd: async (node) => {
        showModal()
        return node
      },
      renderNode: DecisionNode
    },
  ];

  return (
    <JdmConfigProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <DecisionGraph
          ref={ref}
          value={value}
          onChange={handleChange}
          components={components}
        />
      </div>
    </JdmConfigProvider>
  );
}