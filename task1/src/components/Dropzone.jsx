import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import { UploadIcon } from 'lucide-react';
import { useState } from 'react';

const DropZone = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = (files) => {
    const file = files[0];
    setFiles(files);
    onFileSelect(file);
  };

  return (
    <Dropzone
      className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg 
                 border-2 border-dashed border-blue-400/30 hover:border-blue-500/50
                 rounded-xl shadow-lg hover:shadow-xl
                 transition-all duration-300 ease-in-out
                 hover:scale-[1.02]"
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState>
        <div className="flex flex-col items-center gap-4 p-8">
          <div
            className="flex size-20 items-center justify-center rounded-full 
                        bg-blue-100/20 text-blue-600 transition-transform hover:scale-110"
          >
            <UploadIcon size={32} />
          </div>
          <div className="text-center space-y-2">
            <p className="font-semibold text-lg text-gray-800">
              Upload Excel File
            </p>
            <p className="text-gray-500 text-sm">
              Drag and drop your file here or click to browse
            </p>
            <p className="text-xs text-gray-400">Supported format: .xlsx</p>
          </div>
        </div>
      </DropzoneEmptyState>
      <DropzoneContent />
    </Dropzone>
  );
};

export default DropZone;
