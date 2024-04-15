"use client"
import '@gorules/jdm-editor/dist/style.css';
import { useRef, useState } from 'react';
import { createJdmNode, GraphNode } from '@gorules/jdm-editor';
import FileSelectionModal from './ui/FileSelectionModal';
import { Button, Input, Space, Typography } from 'antd';
import { ApartmentOutlined, EditOutlined } from '@ant-design/icons';

export const decisionNode = createJdmNode({
  displayName: 'Decision',
  shortDescription: 'External decisions',
  kind: '',
  icon: <ApartmentOutlined />,
  onNodeAdd: (node) => {
    setData({ open: true, targetId: node.id })
    return node
  },
  renderNode: (node) => (
    <GraphNode
      id={'fe2781c3-4495-4c01-9cf7-253954afc213'}
      specification={{
        displayName: 'Decision',
        icon: <ApartmentOutlined />,
      }}
      type="decisionNode"
      name={'Decision Name'}
      handleLeft={true}
      handleRight={true}
    >
      <div>
        <Typography>Decision File</Typography>
        <Space.Compact>
          <Input value={inputValue} onChange={({ target }) => setInputValue(target.value)} />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setData({ open: true, targetId: node.id })} />
        </Space.Compact>
      </div>
    </GraphNode>
  ),
})
