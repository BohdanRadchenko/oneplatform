import { FC, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Upload, X } from 'lucide-react';
import { Card, CardContent } from '../shadcn/ui/card';
import { useDropzone } from 'react-dropzone';
import { Button } from '../shadcn/ui/button';
import { Label } from '../shadcn/ui/label';
import undefinedImage from '../../assets/files/undefined.png';
import docImage from '../../assets/files/doc.png';
import pdfImage from '../../assets/files/pdf.png';
import xlsImage from '../../assets/files/xlsx.png';
import txtImage from '../../assets/files/txt.png';
import zipImage from '../../assets/files/zip.png';

interface IProps {
    onImageUpload: (file: File | null) => void
    label?: string
    maxSizeMB?: number
    acceptedFileTypes?: string[]
}

const PREVIEWS = {
    'text/plain': txtImage,
    'application/pdf': pdfImage,
    'application/msword': docImage,
    'application/document': docImage,
    'application/vnd.ms-excel': xlsImage,
    'application/sheet': xlsImage,
    'application/zip': zipImage,
    undefined: undefinedImage,
}

export const NLTImageDropZone: FC<IProps> = observer(({ label, onImageUpload, maxSizeMB = 6, acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif'] }) => {
    const { t } = useTranslation('common');
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file && file.size <= maxSizeMB * 1024 * 1024) {
            onImageUpload(file)
            const reader = new FileReader();
            console.log('NLTImageDropZone', file.type)
            // @ts-ignore
            if (PREVIEWS[file?.type]) {
                // @ts-ignore
                setPreview(PREVIEWS[file.type])
                return;
            }
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            alert(`${t('fileSizeAlert')} ${maxSizeMB}MB`)
        }
    }, [maxSizeMB, onImageUpload])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
        maxFiles: 1
    })

    const removeImage = (e: any) => {
        e.stopPropagation();
        setPreview(null);
        onImageUpload(null);
    }

    return (
        <Card className="min:w-[300px]">
            <CardContent className="p-4">
                <Label htmlFor="image-upload">{label || t('uploadImage')}</Label>
                <div
                    {...getRootProps()}
                    className={`mt-2 ${preview ? '' : 'border-2'} border-dashed rounded-lg text-center cursor-pointer h-[200px] flex items-center justify-center ${isDragActive ? 'border-primary' : 'border-gray-300'}`}
                >
                    <input {...getInputProps()} id="image-upload" />
                    {preview ? (
                        <div className="relative w-full h-full">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={removeImage}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="text-gray-500 p-4 w-full">
                            <Upload className="w-8 h-8 mx-auto mb-2" />
                            <p className='text-ellipsis overflow-hidden' >{t('acceptableFileTypes') + acceptedFileTypes}</p>
                            <p>{t('maxSize') + maxSizeMB + ' MB'}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
})
