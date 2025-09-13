import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Eye, 
  Download,
  Plus,
  Trash2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ProductImageManagerProps {
  productId: string;
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const ProductImageManager = ({ productId, images, onImagesChange }: ProductImageManagerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid File',
            description: `${file.name} is not an image file`,
            variant: 'destructive'
          });
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: 'File Too Large',
            description: `${file.name} is larger than 5MB`,
            variant: 'destructive'
          });
          continue;
        }

        // Create a data URL for preview (in a real app, you'd upload to storage)
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            
            // Update images when all files are processed
            if (newImages.length === Math.min(files.length, 10 - images.length)) {
              const updatedImages = [...images, ...newImages];
              onImagesChange(updatedImages);
              
              toast({
                title: 'Success',
                description: `${newImages.length} images uploaded successfully`
              });
            }
          }
        };
        
        reader.readAsDataURL(file);
      }
    } catch (error) {
      toast({
        title: 'Upload Error',
        description: 'Failed to upload images',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
    toast({
      title: 'Image Removed',
      description: 'Image has been removed from the product'
    });
  };

  const addImageFromUrl = (url: string) => {
    if (!url.trim()) return;
    
    // Basic URL validation
    try {
      new URL(url);
      const updatedImages = [...images, url];
      onImagesChange(updatedImages);
      toast({
        title: 'Image Added',
        description: 'Image has been added from URL'
      });
    } catch {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid image URL',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Product Images ({images.length}/10)</Label>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add URL
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Image from URL</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Image URL</Label>
                  <Input 
                    placeholder="https://example.com/image.jpg"
                    id="image-url"
                  />
                </div>
                <Button 
                  onClick={() => {
                    const input = document.getElementById('image-url') as HTMLInputElement;
                    addImageFromUrl(input.value);
                    input.value = '';
                  }}
                  className="w-full"
                >
                  Add Image
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || images.length >= 10}
          >
            <Upload className="h-4 w-4 mr-1" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e.target.files)}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="relative group overflow-hidden">
            <CardContent className="p-2">
              <div className="aspect-square relative">
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Primary badge */}
                {index === 0 && (
                  <Badge className="absolute top-2 left-2 bg-blue-600">
                    Primary
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add more placeholder */}
        {images.length < 10 && (
          <Card 
            className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 cursor-pointer transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <CardContent className="p-2">
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Add Image</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Image Preview</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Product image preview"
                className="max-w-full max-h-96 object-contain rounded-lg"
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedImage;
                  link.download = `product-image-${Date.now()}.jpg`;
                  link.click();
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Help Text */}
      <div className="text-sm text-muted-foreground">
        <p>• Maximum 10 images per product</p>
        <p>• Supported formats: JPG, PNG, GIF, WebP</p>
        <p>• Maximum file size: 5MB per image</p>
        <p>• First image will be used as the primary image</p>
      </div>
    </div>
  );
};